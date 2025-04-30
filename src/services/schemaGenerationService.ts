import { generateText } from "@/lib/geminiClient";
import { Project, TableField } from "@/types/types";
import { getApiKey } from "@/utils/apiKeyUtils";
import { Edge, MarkerType, Node } from "@xyflow/react";

export interface SchemaGenerationInput {
  prompt: string;
  project: Project;
}

export interface SchemaGenerationResult {
  nodes: Node[];
  edges: Edge[];
}

/**
 * Generate a database schema from a natural language prompt
 * @param input - Schema generation input object containing prompt and project
 * @returns Promise resolving to schema generation result with nodes and edges
 * @throws Error if generation fails or API response is invalid
 */
export async function generateSchema(input: SchemaGenerationInput): Promise<SchemaGenerationResult> {
  const { prompt, project } = input;
  const apiKey = getApiKey(project);

  const fullPrompt = createSchemaPrompt(prompt, project.databaseType);
  
  const responseSchema = {
    type: "OBJECT",
    properties: {
      nodesList: {
        type: "ARRAY",
        description: "Array of serialized JSON strings representing table nodes",
        items: { type: "STRING" },
      },
      edgesList: {
        type: "ARRAY",
        description: "Array of serialized JSON strings representing relationship edges",
        items: { type: "STRING" },
      },
    },
    required: ["nodesList", "edgesList"],
  };

  const result = await generateText(fullPrompt, apiKey, true, responseSchema);

  if (!result || !result.nodesList || !Array.isArray(result.nodesList)) {
    throw new Error("Invalid response format from AI model");
  }

  try {
    const parsedNodes: Node[] = result.nodesList.map((nodeStr) =>
      JSON.parse(nodeStr)
    );
    let parsedEdges: Edge[] = [];

    if (result.edgesList && Array.isArray(result.edgesList)) {
      parsedEdges = processEdges(
        result.edgesList.map((edgeStr) => JSON.parse(edgeStr)),
        parsedNodes
      );
    }

    // Position nodes intelligently based on relationships
    const positionedNodes = positionNodes(parsedNodes, parsedEdges);

    return {
      nodes: positionedNodes,
      edges: parsedEdges,
    };
  } catch (parseError) {
    console.error("Error parsing AI response:", parseError);
    throw new Error(
      "Failed to parse the generated schema. The AI response was not in the expected format."
    );
  }
}

/**
 * Creates the prompt for schema generation
 */
function createSchemaPrompt(prompt: string, databaseType: string): string {
  return `Generate a complete database schema with tables and relationships based on this description: "${prompt}".
For the ${databaseType} database, create tables (nodes) and relationships (edges) following best practices:
- Proper primary keys and foreign keys
- Appropriate data types for each field
- Logical table relationships (one-to-many, one-to-one)
- Meaningful field names and descriptions

The response should be an object with two properties:
1. nodesList: An array of JSON strings, each representing a table node
2. edgesList: An array of JSON strings, each representing a relationship edge

Each node string should deserialize to an object with this structure:
{
  "id": "table_1", // Unique identifier for the table
  "type": "tableNode", // Always use "tableNode"
  "data": {
    "name": "table_name", // The name of the table (e.g., "users", "products")
    "fields": [
      {
        "id": "uuid-string", // Unique identifier for the field
        "name": "field_name", // Name of the field (e.g., "id", "username")
        "type": "DATA_TYPE", // The SQL data type (e.g., "INT", "VARCHAR")
        "primaryKey": true/false,
        "nullable": true/false,
        "autoIncrement": true/false,
        "description": "Field description",
        "unique": true/false
      }
      // ... more fields
    ],
    "contextDescription": "Description of this table's purpose"
  },
  // Position will be calculated later, just include placeholder values
  "position": { "x": 0, "y": 0 }
}

Each edge string should deserialize to an object with this structure:
{
  "id": "edge_1", // Unique identifier for the edge
  "source": "table_1", // ID of the source table
  "target": "table_2", // ID of the target table
  "sourceHandle": "field_name", // Name of the field in the source table
  "targetHandle": "field_name", // Name of the field in the target table
  "type": "relationshipEdge", // Always use "relationshipEdge"
  "data": {
    "relationship": "one-to-many" // Relationship type: "one-to-many", "one-to-one", etc.
  }
}`;
}

/**
 * Processes edges from the AI response and prepares them for React Flow
 * - Adds proper handle suffixes
 * - Creates valid connections based on field types in the tables
 */
function processEdges(
  edges: Array<{
    id: string;
    source: string;
    target: string;
    sourceHandle: string;
    targetHandle: string;
    type: string;
    data: { relationship: string };
  }>,
  nodes: Node[]
): Edge[] {
  return edges
    .map((edge) => {
      try {
        // Find the nodes for source and target
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);

        if (!sourceNode || !targetNode) {
          console.warn(
            `Skipping edge ${edge.id}: Could not find source or target node`
          );
          return null;
        }

        // Find the field objects in the nodes
        const sourceField = (sourceNode.data as { fields: TableField[] }).fields.find(
          (f: TableField) => f.name === edge.sourceHandle
        );
        const targetField = (targetNode.data as { fields: TableField[] }).fields.find(
          (f: TableField) => f.name === edge.targetHandle
        );

        if (!sourceField || !targetField) {
          console.warn(
            `Skipping edge ${edge.id}: Could not find fields ${edge.sourceHandle} or ${edge.targetHandle}`
          );
          return null;
        }

        // For foreign key relationships (the usual case)
        // The source should be the table with primary key
        // The target should be the table with foreign key

        // In relationships, we need both a source and target handle side
        // Decide which side to use (left or right) for primary and foreign key fields
        const primarKeySide = Math.random() > 0.5 ? "left" : "right";
        const foreignKeySide = primarKeySide === "left" ? "right" : "left";

        // Identify which field is the primary key and which is the foreign key
        let primaryKeyNode, primaryKeyField, primaryKeyHandle;
        let foreignKeyNode, foreignKeyField, foreignKeyHandle;

        // Typically, the source is the primary key and target is the foreign key
        // But we should check to be sure
        if (sourceField.primaryKey && !targetField.primaryKey) {
          // Standard case: source has the primary key, target has the foreign key
          primaryKeyNode = sourceNode;
          primaryKeyField = sourceField;
          primaryKeyHandle = `${edge.sourceHandle}-${primarKeySide}`;

          foreignKeyNode = targetNode;
          foreignKeyField = targetField;
          foreignKeyHandle = `${edge.targetHandle}-${foreignKeySide}`;
        } else if (!sourceField.primaryKey && targetField.primaryKey) {
          // Reversed case: target has the primary key, source has the foreign key
          primaryKeyNode = targetNode;
          primaryKeyField = targetField;
          primaryKeyHandle = `${edge.targetHandle}-${primarKeySide}`;

          foreignKeyNode = sourceNode;
          foreignKeyField = sourceField;
          foreignKeyHandle = `${edge.sourceHandle}-${foreignKeySide}`;
        } else if (sourceField.primaryKey && targetField.primaryKey) {
          // Both are primary keys (many-to-many through join table)
          // Default to original direction
          primaryKeyNode = sourceNode;
          primaryKeyField = sourceField;
          primaryKeyHandle = `${edge.sourceHandle}-${primarKeySide}`;

          foreignKeyNode = targetNode;
          foreignKeyField = targetField;
          foreignKeyHandle = `${edge.targetHandle}-${foreignKeySide}`;
        } else {
          // Neither is a primary key, assume source references target
          primaryKeyNode = targetNode;
          primaryKeyField = targetField;
          primaryKeyHandle = `${edge.targetHandle}-${primarKeySide}`;

          foreignKeyNode = sourceNode;
          foreignKeyField = sourceField;
          foreignKeyHandle = `${edge.sourceHandle}-${foreignKeySide}`;
        }

        // Create the edge with the primary key as source and foreign key as target
        return {
          id: edge.id,
          source: primaryKeyNode.id,
          target: foreignKeyNode.id,
          sourceHandle: primaryKeyHandle,
          targetHandle: foreignKeyHandle,
          type: "relationshipEdge",
          data: {
            relationship:
              edge.data.relationship ||
              (foreignKeyField.unique ? "one-to-one" : "one-to-many"),
          },
          markerEnd: { type: MarkerType.ArrowClosed },
          animated: true,
        };
      } catch (error) {
        console.error("Error processing edge:", error);
        return null;
      }
    })
    .filter(Boolean);
}

/**
 * Positions nodes based on their relationships in the diagram
 * Uses a breadth-first traversal to layout nodes in levels
 */
function positionNodes(nodes: Node[], edges: Edge[]): Node[] {
  const spacingX = 350; // Horizontal spacing between nodes
  const spacingY = 300; // Vertical spacing between nodes
  const startX = 250;
  const startY = 100;

  // Create a graph representation to calculate node positions
  const graph: Record<string, string[]> = {};
  const inDegree: Record<string, number> = {};

  // Initialize graph and in-degree for all nodes
  nodes.forEach((node) => {
    graph[node.id] = [];
    inDegree[node.id] = 0;
  });

  // Build the graph based on edges
  edges.forEach((edge) => {
    if (edge.source && edge.target) {
      graph[edge.source].push(edge.target);
      inDegree[edge.target] = (inDegree[edge.target] || 0) + 1;
    }
  });

  // Find root nodes (those with no incoming edges)
  const queue: string[] = [];
  nodes.forEach((node) => {
    if (inDegree[node.id] === 0) {
      queue.push(node.id);
    }
  });

  // If no root nodes, take the first node
  if (queue.length === 0 && nodes.length > 0) {
    queue.push(nodes[0].id);
  }

  // Assign levels to each node (depth in the graph)
  const levels: Record<string, number> = {};
  const visited = new Set<string>();

  // BFS to assign levels
  let currentLevel = 0;
  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const nodeId = queue.shift()!;
      if (visited.has(nodeId)) continue;

      visited.add(nodeId);
      levels[nodeId] = currentLevel;

      // Add neighbors to the queue
      graph[nodeId].forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      });
    }

    currentLevel++;
  }

  // Count nodes per level
  const nodesPerLevel: Record<number, number> = {};
  Object.entries(levels).forEach(([nodeId, level]) => {
    nodesPerLevel[level] = (nodesPerLevel[level] || 0) + 1;
  });

  // Calculate positions for each node based on its level
  const positionMap: Record<string, { x: number; y: number }> = {};
  const levelCurrentCount: Record<number, number> = {};

  Object.entries(levels).forEach(([nodeId, level]) => {
    levelCurrentCount[level] = levelCurrentCount[level] || 0;

    // Calculate position
    const x = startX + level * spacingX;
    const y = startY + levelCurrentCount[level] * spacingY;

    positionMap[nodeId] = { x, y };
    levelCurrentCount[level]++;
  });

  // Assign positions to nodes
  return nodes.map((node) => ({
    ...node,
    position: positionMap[node.id] || { x: startX, y: startY },
  }));
}

export interface SchemaPromptSuggestion {
  title: string;
  prompt: string;
}

export const schemaPromptSuggestions: SchemaPromptSuggestion[] = [
  {
    title: "Create an e-commerce database",
    prompt: "Create an e-commerce database with products, orders, customers, and shopping carts",
  },
  {
    title: "Design a blog",
    prompt: "Design a blog with users, posts, comments, and categories",
  },
  {
    title: "Build a library management system",
    prompt: "Build a library management system with books, authors, borrowers, and loans",
  },
  {
    title: "Make a social media platform",
    prompt: "Make a social media platform with users, posts, comments, and friend relationships",
  },
];