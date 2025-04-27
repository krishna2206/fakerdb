import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AuthUser } from "@/hooks/useAuth";
import {
  getProjectDiagram,
  saveProjectDiagram,
} from "@/services/diagramService";
import { MAX_ROW_COUNT } from "@/services/singleTableService";
import { GeneratedData, Project, TableField } from "@/types/types";
import {
  convertFieldType,
  supportsAutoIncrement,
} from "@/utils/fieldTypesUtils";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  EdgeTypes,
  MarkerType,
  MiniMap,
  Node,
  NodeTypes,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Code } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScreenshot } from "use-react-screenshot";
import ApiKeyAlert from "../alerts/ApiKeyAlert";
import SQLDisplay from "../SQLDisplay";
import DiagramSidebar from "./DiagramSidebar";
import DiagramToolbar from "./DiagramToolbar";
import RelationshipEdge from "./RelationshipEdge";
import RelationshipSidebar from "./RelationshipSidebar";
import TableNode from "./TableNode";

const nodeTypes: NodeTypes = {
  tableNode: TableNode,
};

const edgeTypes: EdgeTypes = {
  relationshipEdge: RelationshipEdge,
};

const EmptyDiagramMessage = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4 p-6 max-w-md text-center z-10">
    <div className="bg-muted/70 border border-border rounded-xl px-6 py-8 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-center mb-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce text-primary"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </div>
      <h3 className="text-lg font-medium mb-2">Your diagram is empty</h3>
      <p className="text-muted-foreground">
        Click the "Add Table" button in the toolbar to start designing your
        database
      </p>
    </div>
  </div>
);

interface DiagramEditorProps {
  project: Project;
  apiKeyMissing?: boolean;
  onOpenSettings: () => void;
  onOpenProjectSettings: () => void;
  onGenerateSQL: (
    nodes: Node[],
    edges: Edge[],
    rowCount?: number
  ) => Promise<GeneratedData>;
  user?: AuthUser;
  onLogout?: () => void;
}

// Main component that will be exported
function DiagramEditorContent({
  project,
  apiKeyMissing,
  onOpenSettings,
  onOpenProjectSettings,
  onGenerateSQL,
  user,
  onLogout,
}: DiagramEditorProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const reactFlowInstance = useReactFlow();
  const [apiKeyAlertDismissed, setApiKeyAlertDismissed] = useState(false);
  const [, takeScreenshot] = useScreenshot();

  const [isSQLPanelOpen, setSQLPanelOpen] = useState(false);
  const [generatedSQL, setGeneratedSQL] = useState<GeneratedData>(null);
  const [rowCount, setRowCount] = useState(10);

  const handleRowCountChange = useCallback(
    (value: number) => {
      // Apply the same MAX_ROW_COUNT limit as in single table mode
      const safeRowCount = Math.min(value, MAX_ROW_COUNT);

      if (safeRowCount < value) {
        toast({
          title: "Row count limited",
          description: `Maximum number of rows is limited to ${MAX_ROW_COUNT}`,
          variant: "warning",
        });
      }

      setRowCount(safeRowCount);
    },
    [toast]
  );

  // Load diagram data when component mounts
  useEffect(() => {
    const loadDiagram = async () => {
      try {
        if (project.id) {
          const diagramData = await getProjectDiagram(project.id);

          if (
            diagramData &&
            diagramData.nodes &&
            diagramData.nodes.length > 0
          ) {
            setNodes(diagramData.nodes);
            setEdges(diagramData.edges || []);
          } else {
            // If no saved diagram, set empty state
            setNodes([]);
            setEdges([]);
          }
        }
      } catch (error) {
        console.error("Error loading diagram:", error);
        // Set empty state
        setNodes([]);
      }
    };

    loadDiagram();
  }, [project.id]);

  // Mark changes as unsaved when nodes or edges change
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params: Connection) => {
      // Helper functions to check connection validity
      const isValidConnection = (params: Connection) => {
        // Check for self-connections
        if (params.source === params.target) {
          showErrorToast(
            "Invalid relationship",
            "A table cannot have a relationship with itself"
          );
          return false;
        }

        // Check for duplicate connections
        if (isDuplicateConnection(params)) {
          showErrorToast(
            "Duplicate relationship",
            "This exact relationship already exists"
          );
          return false;
        }

        // Check if source field already has a relationship with the target table
        if (hasRelationshipToSameTable(params)) {
          showErrorToast(
            "Invalid relationship",
            "This field already has a relationship with this table"
          );
          return false;
        }

        // Check if target field is already in a relationship
        if (isTargetFieldAlreadyConnected(params)) {
          showErrorToast(
            "Field already connected",
            "This target field is already part of a relationship"
          );
          return false;
        }

        return true;
      };

      // Check for duplicate connections
      const isDuplicateConnection = (params: Connection) => {
        return edges.some((edge) => {
          const edgeSourceHandle = edge.sourceHandle?.split("-")[0];
          const edgeTargetHandle = edge.targetHandle?.split("-")[0];
          const paramSourceHandle = params.sourceHandle?.split("-")[0];
          const paramTargetHandle = params.targetHandle?.split("-")[0];

          return (
            edge.source === params.source &&
            edge.target === params.target &&
            edgeSourceHandle === paramSourceHandle &&
            edgeTargetHandle === paramTargetHandle
          );
        });
      };

      // Check if source field already has a relationship with the target table
      const hasRelationshipToSameTable = (params: Connection) => {
        return edges.some((edge) => {
          const edgeSourceHandle = edge.sourceHandle?.split("-")[0];
          const paramSourceHandle = params.sourceHandle?.split("-")[0];

          return (
            edge.source === params.source &&
            edge.target === params.target &&
            edgeSourceHandle === paramSourceHandle
          );
        });
      };

      // Check if target field is already in a relationship
      const isTargetFieldAlreadyConnected = (params: Connection) => {
        return edges.some((edge) => {
          const edgeTargetHandle = edge.targetHandle?.split("-")[0];
          const paramTargetHandle = params.targetHandle?.split("-")[0];

          return (
            edge.target === params.target &&
            edgeTargetHandle === paramTargetHandle
          );
        });
      };

      // Check field compatibility
      const areFieldsCompatible = (
        sourceField: TableField,
        targetField: TableField
      ) => {
        // Type compatibility check
        if (sourceField.type !== targetField.type) {
          showErrorToast(
            "Incompatible field types",
            `Cannot connect ${sourceField.type} to ${targetField.type}. Foreign keys must be the same type as their referenced fields.`
          );
          return false;
        }

        // Check if source field can be referenced
        if (!sourceField.primaryKey && !sourceField.unique) {
          showErrorToast(
            "Invalid source field",
            "The source field must be either a primary key or have a unique constraint to be referenced by a foreign key."
          );
          return false;
        }

        return true;
      };

      // Helper function to show error toasts
      const showErrorToast = (title: string, description: string) => {
        toast({
          title,
          description,
          variant: "destructive",
        });
      };

      if (!isValidConnection(params)) {
        return;
      }

      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      // Extract source and target fields
      const sourceFieldName = params.sourceHandle.split("-")[0];
      const targetFieldName = params.targetHandle.split("-")[0];
      const sourceField = sourceNode.data.fields.find(
        (field: TableField) => field.name === sourceFieldName
      );
      const targetField = targetNode.data.fields.find(
        (field: TableField) => field.name === targetFieldName
      );

      if (
        sourceNode &&
        targetNode &&
        params.sourceHandle &&
        params.targetHandle &&
        sourceField &&
        targetField
      ) {
        if (!areFieldsCompatible(sourceField, targetField)) {
          return;
        }
      }

      // Create the connection
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "relationshipEdge",
            data: {
              relationship: targetField.unique ? "one-to-one" : "one-to-many",
            },
            markerEnd: { type: MarkerType.ArrowClosed },
            animated: true,
          },
          eds
        )
      );
      setHasUnsavedChanges(true);
    },
    [setEdges, toast, edges, nodes]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      // First check if we're clicking on the same node
      if (selectedNode && selectedNode.id === node.id) {
        return; // No need to update if it's the same node
      }

      setSelectedNode(node);
      setSelectedEdge(null);
      setSidebarOpen(true);
    },
    [selectedNode]
  );

  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
    setSidebarOpen(true);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
    setSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
    if (!isSidebarOpen) {
      // When opening the sidebar without a selection
      setSelectedNode(null);
      setSelectedEdge(null);
    }
  }, [isSidebarOpen]);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const addNewTable = useCallback(() => {
    const newId = `table_${Date.now()}`;

    // Default position (in case there are no nodes)
    let positionX = 250;
    let positionY = 100;

    // Table node dimensions (approximate)
    const TABLE_WIDTH = 220;
    const TABLE_HEIGHT = 200;
    const SPACING = 50;

    // Get last node position to place next to it
    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];

      // Start by positioning to the right of the last node
      positionX = lastNode.position.x + TABLE_WIDTH + SPACING;
      positionY = lastNode.position.y;

      // If we're getting too far to the right, create a new row
      const MAX_X = 2000; // prevent nodes from going too far right
      if (positionX > MAX_X) {
        positionX = 250;
        // Find the maximum Y to start a new row below all existing nodes
        const maxY = Math.max(
          ...nodes.map((node) => node.position.y + TABLE_HEIGHT)
        );
        positionY = maxY + SPACING;
      }

      // Check for overlaps with any existing node
      let hasOverlap = true;
      let attemptCount = 0;
      const MAX_ATTEMPTS = 10;

      while (hasOverlap && attemptCount < MAX_ATTEMPTS) {
        hasOverlap = false;

        // Check if the new position overlaps with any existing node
        for (const node of nodes) {
          // Simple bounding box overlap check
          const overlap = !(
            positionX + TABLE_WIDTH < node.position.x ||
            positionX > node.position.x + TABLE_WIDTH ||
            positionY + TABLE_HEIGHT < node.position.y ||
            positionY > node.position.y + TABLE_HEIGHT
          );

          if (overlap) {
            hasOverlap = true;

            // Move to the right on initial attempts
            if (attemptCount < 3) {
              positionX += TABLE_WIDTH / 2;
            } else if (attemptCount < 6) {
              // Then try moving down a bit
              positionX = node.position.x;
              positionY += TABLE_HEIGHT + SPACING;
            } else {
              // Last resort: move to a slightly random position, but still arranged
              positionX = 250 + Math.random() * 100;
              positionY =
                Math.max(...nodes.map((n) => n.position.y + TABLE_HEIGHT)) +
                SPACING;
            }

            break;
          }
        }

        attemptCount++;
      }
    }

    const newNodeIdType =
      project.databaseType === "MySQL"
        ? "INT"
        : convertFieldType("INT", project.databaseType);
    const newNode = {
      id: newId,
      type: "tableNode",
      data: {
        name: `new_table_${nodes.length + 1}`,
        fields: [
          {
            id: crypto.randomUUID(),
            name: "id",
            type: newNodeIdType,
            primaryKey: true,
            nullable: false,
            autoIncrement: supportsAutoIncrement(newNodeIdType),
            description: "Primary key",
          },
        ],
      },
      position: {
        x: positionX,
        y: positionY,
      },
    };

    // Update nodes state
    setNodes((nds) => [...nds, newNode]);

    // Select the new node and open sidebar
    setTimeout(() => {
      setSelectedNode(newNode);
      setSidebarOpen(true);

      // Scroll the node into view if it's outside the visible area
      if (reactFlowInstance) {
        reactFlowInstance.fitView({
          nodes: [newNode],
          padding: 0.5,
          duration: 600,
        });
      }
    }, 50);

    toast({
      title: "New table added",
      description: "Click on the table to edit its properties",
    });
    setHasUnsavedChanges(true);
  }, [nodes, setNodes, toast, reactFlowInstance]);

  const updateNodeData = useCallback(
    (
      nodeId: string,
      data: {
        name?: string;
        fields?: Array<{
          id: string;
          name: string;
          type: string;
          primaryKey?: boolean;
          nullable?: boolean;
          autoIncrement?: boolean;
          description?: string;
          length?: number;
        }>;
      }
    ) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            };
          }
          return node;
        })
      );
      setHasUnsavedChanges(true);
    },
    [setNodes]
  );

  const removeNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
      setSelectedNode(null);
      toast({
        title: "Table deleted",
        description: "The table and its relationships have been removed",
      });
      setHasUnsavedChanges(true);
    },
    [setNodes, setEdges, toast]
  );

  const removeEdge = useCallback(
    (edgeId: string) => {
      setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
      setSelectedEdge(null);
      toast({
        title: "Relationship removed",
        description: "The relationship has been deleted",
      });
      setHasUnsavedChanges(true);
    },
    [setEdges, toast]
  );

  const saveDiagram = useCallback(async () => {
    try {
      if (project.id) {
        setIsSaving(true);
        let previewImage = "/placeholder-diagram.svg";

        if (nodes.length > 0) {
          // Reset viewport to ensure we capture the whole diagram
          reactFlowInstance.fitView({ padding: 0.2 });

          // Wait a moment for viewport to update
          await new Promise((resolve) => setTimeout(resolve, 100));

          try {
            // Use the react-screenshot library to capture the diagram
            const reactFlowContainer = document.querySelector(".react-flow");

            if (reactFlowContainer) {
              // Take screenshot of the flow container
              previewImage =
                (await takeScreenshot(reactFlowContainer)) ||
                "/placeholder-diagram.svg";
            }
          } catch (err) {
            console.error("Error capturing diagram preview:", err);
            // Fall back to default image
            previewImage = "/placeholder-diagram.svg";
          }
        }

        await saveProjectDiagram(project.id, nodes, edges, previewImage);
        setHasUnsavedChanges(false);
        toast({
          title: "Diagram saved",
          description: "Your database design has been saved successfully",
        });
      }
    } catch (error) {
      console.error("Error saving diagram:", error);
      toast({
        title: "Save failed",
        description: "There was a problem saving your diagram",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [project.id, nodes, edges, toast, reactFlowInstance, takeScreenshot]);

  const handleGenerateSQL = useCallback(async () => {
    if (apiKeyMissing) {
      toast({
        title: "API Key Required",
        description: "Please configure an API key in settings first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Pass rowCount as an additional parameter
      const result = await onGenerateSQL(nodes, edges, rowCount);
      if (result && typeof result === "object" && "createTableSQL" in result) {
        setGeneratedSQL(result);
        setSQLPanelOpen(true);
      }
    } catch (error) {
      console.error("Error generating SQL:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [nodes, edges, apiKeyMissing, onGenerateSQL, rowCount, toast]);

  const toggleSQLPanel = useCallback(() => {
    setSQLPanelOpen((prev) => !prev);
  }, []);

  const handleBack = useCallback(() => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm(
        "You have unsaved changes. Save before leaving?"
      );
      if (confirm) {
        saveDiagram();
      }
    }
    navigate("/projects");
  }, [hasUnsavedChanges, saveDiagram, navigate]);

  return (
    <div className="flex flex-col h-full relative">
      <DiagramToolbar
        projectName={project.name || ""}
        databaseType={project.databaseType}
        hasUnsavedChanges={hasUnsavedChanges}
        isGenerating={isGenerating}
        isSaving={isSaving}
        apiKeyMissing={apiKeyMissing}
        user={user}
        rowCount={rowCount}
        onRowCountChange={handleRowCountChange}
        onBack={handleBack}
        onAddTable={addNewTable}
        onSave={saveDiagram}
        onGenerateSQL={handleGenerateSQL}
        onOpenProjectSettings={onOpenProjectSettings}
        onOpenSettings={onOpenSettings}
        onLogout={onLogout}
        nodesCount={nodes.length}
      />

      {/* React Flow */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            fitView
          >
            <Background
              gap={150}
              variant={BackgroundVariant.Lines}
              color="var(--grid-color, rgba(150, 150, 150, 0.1))"
              className="bg-background"
            />
            <Controls />
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case "tableNode":
                    return "#55b9cd";
                  default:
                    return "#eee";
                }
              }}
            />
            <Panel
              position="top-center"
              className="bg-card bg-opacity-70 p-2 rounded shadow text-xs"
            >
              Drag connections between fields • Click tables or relations to
              edit
            </Panel>
          </ReactFlow>

          {/* Empty diagram message */}
          {nodes.length === 0 && <EmptyDiagramMessage />}

          {/* Sidebar toggle button */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className="absolute right-4 top-4 z-10 bg-card shadow-md hover:bg-accent"
            title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>

          {/* Compact API Key Alert */}
          {apiKeyMissing && !apiKeyAlertDismissed && (
            <div className="absolute left-4 top-4 z-10">
              <ApiKeyAlert
                compact={true}
                onGlobalSettings={onOpenSettings}
                onProjectSettings={onOpenProjectSettings}
                onDismiss={() => setApiKeyAlertDismissed(true)}
                className="max-w-xs"
              />
            </div>
          )}
        </div>

        {/* Unified sidebar with single AnimatePresence */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              key="sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="border-l bg-background overflow-y-auto h-full"
            >
              {selectedNode && (
                <DiagramSidebar
                  key={selectedNode.id}
                  node={selectedNode}
                  updateNodeData={updateNodeData}
                  removeNode={removeNode}
                  onClose={closeSidebar}
                  edges={edges}
                  nodes={nodes}
                  databaseType={project.databaseType}
                />
              )}

              {selectedEdge && (
                <RelationshipSidebar
                  edge={selectedEdge}
                  nodes={nodes}
                  removeEdge={removeEdge}
                  onClose={closeSidebar}
                />
              )}

              {!selectedNode && !selectedEdge && (
                <DiagramSidebar
                  onClose={closeSidebar}
                  databaseType={project.databaseType}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SQL Panel Toggle Button */}
      {generatedSQL && (
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSQLPanel}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 shadow-md gap-2 bg-card"
        >
          <Code className="h-4 w-4" />
          {isSQLPanelOpen ? "Hide generated SQL" : "Show generated SQL"}
        </Button>
      )}

      {/* SQL Panel Slide-up */}
      <AnimatePresence>
        {isSQLPanelOpen && generatedSQL && (
          <motion.div
            className="absolute top-[56px] bottom-0 left-0 right-0 bg-background border-t border-border z-40 shadow-lg overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="h-full overflow-auto">
              <SQLDisplay
                createTableSQL={generatedSQL.createTableSQL}
                insertDataSQL={generatedSQL.insertDataSQL}
                databaseType={project.databaseType}
                project={project}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Wrapper component with ReactFlowProvider
export default function DiagramEditor(props: DiagramEditorProps) {
  return (
    <ReactFlowProvider>
      <DiagramEditorContent {...props} />
    </ReactFlowProvider>
  );
}
