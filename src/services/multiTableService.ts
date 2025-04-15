import { generateText } from "@/lib/geminiClient";
import { getProject } from "@/services/projectService";
import { TableField } from "@/types/types";
import { getApiKey } from "@/utils/apiKeyUtils";
import { needsLength } from "@/utils/fieldTypes";
import { Edge, Node } from "@xyflow/react";

/**
 * Generates SQL code from a diagram of tables and relationships using a structured English approach
 *
 * @param projectId - The project ID
 * @param databaseType - The database type (MySQL, PostgreSQL, etc.)
 * @param nodes - The diagram nodes representing tables
 * @param edges - The diagram edges representing relationships
 * @returns Promise with a structured result containing createTableSQL and insertDataSQL
 */
export async function generateSQLFromDiagram(
  projectId: string,
  databaseType: string,
  nodes: Node[],
  edges: Edge[]
): Promise<{ createTableSQL: string; insertDataSQL: string }> {
  try {
    const project = await getProject(projectId);

    const apiKey = getApiKey(project);

    // Calculate optimal creation order based on relationships
    const tableNames = nodes.map((node) => node.data.name) as string[];
    const tableRelations = edges.map((edge) => {
      const sourceTable = nodes.find((n) => n.id === edge.source)?.data.name;
      const targetTable = nodes.find((n) => n.id === edge.target)?.data.name;

      return {
        sourceTable,
        targetTable,
      };
    }).filter((relation): relation is { sourceTable: string; targetTable: string } => 
      typeof relation.sourceTable === 'string' && typeof relation.targetTable === 'string'
    );

    // Simple topological sort to determine table creation order
    const creationOrder = calculateCreationOrderFromDiagram(
      tableNames,
      tableRelations
    );

    let prompt = `Generate database content for a ${databaseType} database based on the following schema:`;

    prompt += "\n\nTables (in the order they should be created):";

    creationOrder.forEach((tableName, index) => {
      const table = nodes.find((n) => n.data.name === tableName);
      if (!table) return;

      prompt += `\n\n### Table ${index + 1}: ${table.data.name}`;

      // Add table context description if available
      if (table.data.contextDescription) {
        prompt += `\nDescription: ${table.data.contextDescription}`;
      }

      prompt += `\nFields:`;

      // Add fields
      (table.data.fields as TableField[]).forEach((field: TableField) => {
        // Format the type to include length for applicable types
        let typeStr: string = field.type;
        if (needsLength(field.type) && field.length !== undefined) {
          typeStr = `${field.type}(${field.length})`;
        }
        
        let fieldDesc = `\n- ${field.name} (${typeStr})`;
        if (field.primaryKey) fieldDesc += " PRIMARY KEY";
        if (field.autoIncrement) fieldDesc += " AUTO_INCREMENT";
        if (!field.nullable) fieldDesc += " NOT NULL";
        if (field.unique && !field.primaryKey) fieldDesc += " UNIQUE";
        
        // Use contextHint as the field description
        if (field.contextHint) {
          fieldDesc += ` - ${field.contextHint}`;
        }

        prompt += fieldDesc;
      });
    });

    // Add relationship definitions
    if (edges.length > 0) {
      prompt += `\n\nRelationships:`;

      edges.forEach((edge, index) => {
        const sourceTable = nodes.find((n) => n.id === edge.source)?.data.name;
        const targetTable = nodes.find((n) => n.id === edge.target)?.data.name;
        const sourceField = edge.sourceHandle;
        const targetField = edge.targetHandle;
        const type = edge.data?.relationship || "one-to-many";

        prompt += `\n- Relationship ${
          index + 1
        }: ${sourceTable}.${sourceField} to ${targetTable}.${targetField} (${type})`;
      });
    }

    // Add database-specific syntax guidance
    prompt += `\n\nImportant: Follow these specific syntax rules for ${databaseType}:`;

    switch (databaseType) {
      case "MySQL":
        prompt += `
- Use backticks (\`table_name\`) for table and column identifiers
- Use AUTO_INCREMENT for primary key columns that need automatic incrementing
- For DATE/DATETIME columns, use 'YYYY-MM-DD' and 'YYYY-MM-DD HH:MM:SS' formats
- End the CREATE TABLE statement with "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
- For INSERT statements, use the multi-row syntax: INSERT INTO table (col1, col2) VALUES (val1, val2), (val3, val4);
- For BOOLEAN values, use 1 (true) and 0 (false)`;
        break;
      case "PostgreSQL":
        prompt += `
- Use double quotes ("table_name") for table and column identifiers
- Use SERIAL or GENERATED ALWAYS AS IDENTITY for auto-incrementing columns (not AUTO_INCREMENT)
- For JSON data, use the JSONB type with proper casting (::jsonb)
- For BOOLEAN values, use TRUE and FALSE (not 1 and 0)
- Add COMMENT ON statements as separate commands after the CREATE TABLE statement
- For timestamp values, use proper timestamp casting ('value'::timestamp)`;
        break;
      case "SQLite":
        prompt += `
- Use double quotes ("table_name") for table and column identifiers
- SQLite has only 5 storage classes: INTEGER, REAL, TEXT, BLOB, and NULL
- Use AUTOINCREMENT (must be combined with PRIMARY KEY) for auto-incrementing columns
- SQLite doesn't support complex types - use TEXT for date/time, JSON, and ENUM values
- For BOOLEAN values, use 0 and 1 as SQLite has no native BOOLEAN type`;
        break;
      case "Oracle":
        prompt += `
- Use double quotes ("table_name") for table and column identifiers
- Oracle has no auto-increment - use sequences and triggers instead
- For numeric types, use NUMBER(precision, scale)
- Use VARCHAR2 instead of VARCHAR
- For auto-incrementing columns, create a sequence (e.g., CREATE SEQUENCE seq_name) and a trigger
- For BOOLEAN values, use 1 and 0 as Oracle has no native BOOLEAN type
- For larger datasets, use individual INSERT statements
- For smaller datasets, use INSERT with SELECT UNION ALL approach
- For date/time values, use TO_TIMESTAMP('value', 'YYYY-MM-DD HH24:MI:SS')`;
        break;
    }

    // Add instructions for handling relationships
    prompt += `\n\nCritical rules for generating data with relationships:
1. Ensure referential integrity in the generated data - all foreign key values must exist in the referenced table
2. Generate parent tables first (those that are referenced by other tables)
3. For foreign key fields, use only valid primary key values from the referenced tables
4. Make the relationship data logical and consistent with the table context`;

    const responseSchema = {
      type: "OBJECT",
      properties: {
        createTableSQL: {
          type: "STRING",
          description: `CREATE TABLE SQL statements specific to the ${databaseType} database syntax`,
        },
        insertDataSQL: {
          type: "STRING",
          description: `INSERT statements for the sample data specific to the ${databaseType} database syntax`,
        },
      },
      required: ["createTableSQL", "insertDataSQL"],
    };

    // Update output format instructions to specify we want separate CREATE and INSERT statements
    prompt += `\n\nPlease generate the following in separate sections:
1. Complete CREATE TABLE statements with proper primary keys, foreign keys, and constraints
2. Add appropriate indexes for performance
3. Include proper foreign key relationships between tables
4. Sample INSERT statements with realistic data for each table (at least 5 rows per table)

Your response should have two distinct parts:
- createTableSQL: All CREATE TABLE statements including indexes and constraints
- insertDataSQL: All INSERT statements with sample data

Use the specific syntax for ${databaseType} in both sections.`;
    const result = await generateText(prompt, apiKey, true, responseSchema);

    if (!result || typeof result !== "object") {
      throw new Error("Invalid response format from AI model");
    }

    if (!result.createTableSQL || !result.insertDataSQL) {
      throw new Error("Incomplete data received from AI model");
    }

    return {
      createTableSQL: result.createTableSQL,
      insertDataSQL: result.insertDataSQL,
    };
  } catch (error) {
    console.error(
      "Error generating SQL from diagram:",
      error
    );
    throw error;
  }
}

/**
 * Helper function to calculate table creation order based on relationships
 * @param tableNames - Array of table names
 * @param relations - Array of relationships between tables
 * @returns Array of table names in the order they should be created
 */
function calculateCreationOrderFromDiagram(
  tableNames: string[],
  relations: {
    sourceTable: string | undefined;
    targetTable: string | undefined;
  }[]
): string[] {
  // Create a dependency graph
  const graph: Record<string, string[]> = {};
  tableNames.forEach((tableName) => {
    graph[tableName] = [];
  });

  // Add dependencies (a dependency means the target table must be created before the source table)
  relations.forEach((relation) => {
    if (relation.sourceTable && relation.targetTable) {
      // The source table depends on the target table (foreign key points to target)
      graph[relation.sourceTable].push(relation.targetTable);
    }
  });

  // Use depth-first search to find creation order
  const visited = new Set<string>();
  const result: string[] = [];

  function dfs(node: string) {
    if (visited.has(node)) return;
    visited.add(node);

    if (graph[node]) {
      for (const dependency of graph[node]) {
        dfs(dependency);
      }
    }

    result.push(node);
  }

  // Visit all nodes
  for (const node of tableNames) {
    dfs(node);
  }

  return result;
}
