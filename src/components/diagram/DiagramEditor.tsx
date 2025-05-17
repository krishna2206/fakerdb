import GeneratingIndicator from "@/components/sections/GeneratingIndicator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MAX_ROW_COUNT } from "@/constants";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { useAuth } from "@/hooks/useAuth";
import { saveDataset } from "@/services/datasetService";
import {
  getProjectDiagram,
  getProjectDiagramId,
  saveProjectDiagram,
} from "@/services/diagramService";
import { generateMultitableData } from "@/services/sqlGenerationService";
import { Dataset, Project, TableField } from "@/types/types";
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
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScreenshot } from "use-react-screenshot";
import ApiKeyAlert from "../alerts/ApiKeyAlert";
import WorkspaceAlert from "../alerts/WorkspaceAlert";
import { FadeIn } from "../ui/fade-in";
import DiagramFloatingToolbar from "./DiagramFloatingToolbar";
import DiagramSidebar from "./DiagramSidebar";
import FloatingHeader from "./FloatingHeader";
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
      <h3 className="text-lg font-medium mb-2">Your diagram is empty</h3>
      <p className="text-muted-foreground mb-4">
        Click the "Add Table" button in the toolbar to start designing your
        database
      </p>
    </div>
  </div>
);

interface DiagramEditorProps {
  project: Project;
  onOpenSettings: () => void;
  onOpenProjectSettings: () => void;
  onSignIn?: () => void;
  onDatasetGenerated?: (dataset: Dataset) => void;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

function DiagramEditorContent({
  project,
  onOpenSettings,
  onOpenProjectSettings,
  onSignIn,
  onDatasetGenerated,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  setNodes,
  setEdges,
}: DiagramEditorProps) {
  const { apiKey } = useApiKey();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const reactFlowInstance = useReactFlow();
  const [, takeScreenshot] = useScreenshot();

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [rowCount, setRowCount] = useState(10);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const noGlobalKey = !apiKey;
  const noProjectKey = project && !project.geminiApiKey;
  const apiKeyMissing = noGlobalKey && noProjectKey;
  const isUnauthenticated = !isAuthenticated;

  const handleRowCountChange = useCallback(
    (value: number) => {
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

  const onConnect = useCallback(
    (params: Connection) => {
      const showErrorToast = (title: string, description: string) => {
        toast({
          title,
          description,
          variant: "destructive",
        });
      };
      
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

      if (!isValidConnection(params)) {
        return;
      }

      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      // Extract source and target fields
      const sourceFieldName = params.sourceHandle.split("-")[0];
      const targetFieldName = params.targetHandle.split("-")[0];
      const sourceField = (sourceNode.data.fields as TableField[]).find(
        (field: TableField) => field.name === sourceFieldName
      );
      const targetField = (targetNode.data.fields as TableField[]).find(
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
      if (selectedNode && selectedNode.id === node.id) {
        return;
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
    let positionX = 250;
    let positionY = 100;
    const TABLE_WIDTH = 220;
    const TABLE_HEIGHT = 200;
    const SPACING = 50;

    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      positionX = lastNode.position.x + TABLE_WIDTH + SPACING;
      positionY = lastNode.position.y;

      const MAX_X = 2000;
      if (positionX > MAX_X) {
        positionX = 250;
        const maxY = Math.max(
          ...nodes.map((node) => node.position.y + TABLE_HEIGHT)
        );
        positionY = maxY + SPACING;
      }

      let hasOverlap = true;
      let attemptCount = 0;
      const MAX_ATTEMPTS = 10;

      while (hasOverlap && attemptCount < MAX_ATTEMPTS) {
        hasOverlap = false;
        for (const node of nodes) {
          const overlap = !(
            positionX + TABLE_WIDTH < node.position.x ||
            positionX > node.position.x + TABLE_WIDTH ||
            positionY + TABLE_HEIGHT < node.position.y ||
            positionY > node.position.y + TABLE_HEIGHT
          );

          if (overlap) {
            hasOverlap = true;
            if (attemptCount < 3) {
              positionX += TABLE_WIDTH / 2;
            } else if (attemptCount < 6) {
              positionX = node.position.x;
              positionY += TABLE_HEIGHT + SPACING;
            } else {
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

    setNodes((nds) => [...nds, newNode]);
    setTimeout(() => {
      setSelectedNode(newNode);
      setSidebarOpen(true);
      if (reactFlowInstance) {
        reactFlowInstance.fitView({
          nodes: [newNode],
          padding: 0.5,
          duration: 600,
        });
      }
    }, 50);
    setHasUnsavedChanges(true);
  }, [nodes, setNodes, reactFlowInstance, project.databaseType]);

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
          reactFlowInstance.fitView({ padding: 0.5 });
          await new Promise((resolve) => setTimeout(resolve, 100));
          try {
            const reactFlowContainer = document.querySelector(".react-flow");
            if (reactFlowContainer) {
              previewImage =
                (await takeScreenshot(reactFlowContainer)) ||
                "/placeholder-diagram.svg";
            }
          } catch (err) {
            console.error("Error capturing diagram preview:", err);
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
      // For unauthenticated users with temp project, we pass null instead of project.id
      // This will prevent the generateMultitableData function from trying to fetch project-specific data
      const projectId = project.id === "temp" ? null : project.id;

      const result = await generateMultitableData(
        projectId,
        project.databaseType,
        nodes,
        edges,
        rowCount
      );

      if (result && typeof result === "object" && "createTableSQL" in result) {
        // Handle unauthenticated/temporary project case
        if (project.id === "temp") {
          if (onDatasetGenerated) {
            const tempDataset = {
              id: "temp-" + Date.now(),
              diagramId: "temp",
              createTableSQL: result.createTableSQL,
              insertDataSQL: result.insertDataSQL,
              tableCount: nodes.length,
              rowCount: rowCount,
              created: new Date().toISOString(),
              updated: new Date().toISOString()
            };

            onDatasetGenerated(tempDataset);
            
            toast({
              title: "SQL generated successfully",
              description: "Your SQL has been generated and is ready to view",
            });
          }
        } else {
          // Handle authenticated user case - save to database
          await saveDiagram();
          
          const diagramId = await getProjectDiagramId(project.id);
          if (!diagramId) {
            throw new Error("No diagram found for this project");
          }

          const savedDataset = await saveDataset(
            diagramId,
            result,
            nodes.length,
            rowCount
          );

          if (onDatasetGenerated) {
            onDatasetGenerated(savedDataset);
          }

          toast({
            title: "SQL generated successfully",
            description: "Switching to the dataset view to explore your data",
          });
        }
      }
    } catch (error) {
      console.error("Error generating SQL:", error);

      toast({
        title: "Generation failed",
        description: "There was a problem generating SQL",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [
    project.id,
    project.databaseType,
    nodes,
    edges,
    rowCount,
    apiKeyMissing,
    toast,
    onDatasetGenerated,
    saveDiagram,
  ]);

  const handleBack = useCallback(() => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirmLeave) {
        return;
      }
    }
    if (isUnauthenticated) {
      navigate("/");
    } else {
      navigate("/projects");
    }
  }, [hasUnsavedChanges, navigate, isUnauthenticated]);

  // Effects
  useEffect(() => {
    const loadDiagram = async () => {
      try {
        // Skip loading if we already have nodes (from schema generation)
        if (nodes.length > 0) {
          setTimeout(() => {
            reactFlowInstance.fitView({ padding: 0.5, duration: 600 });
          }, 250);
          return;
        }

        if (project.id) {
          if (project.id === "temp") {
            return;
          }

          const diagramData = await getProjectDiagram(project.id);
          if (
            diagramData &&
            diagramData.nodes &&
            diagramData.nodes.length > 0
          ) {
            setNodes(diagramData.nodes);
            setEdges(diagramData.edges || []);
          } else {
            setNodes([]);
            setEdges([]);
          }
        }
      } catch (error) {
        console.error("Error loading diagram:", error);
        setNodes([]);
        setEdges([]);
      }
    };
    loadDiagram();
  }, [project.id, setNodes, setEdges, nodes.length, reactFlowInstance]);

  useEffect(() => {
    // Only set unsaved changes if there are nodes or edges,
    // to avoid marking as unsaved on initial load of an empty diagram.
    if (nodes.length > 0 || edges.length > 0) {
      setHasUnsavedChanges(true);
    }
  }, [nodes, edges]);

  return (
    <div
      className={`flex flex-col h-full relative${
        isGenerating ? " pointer-events-none" : ""
      }`}
    >
      <FloatingHeader
        projectName={project.name || ""}
        databaseType={project.databaseType}
        onBack={handleBack}
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
            <Controls className="rounded-md overflow-hidden shadow-md" />
            <MiniMap
              className="rounded-lg overflow-hidden border border-border shadow-md"
              nodeColor={(node) => {
                switch (node.type) {
                  case "tableNode":
                    return "#55b9cd";
                  default:
                    return "#eee";
                }
              }}
            />
          </ReactFlow>

          {/* Floating Toolbar for diagram-specific actions */}
          <DiagramFloatingToolbar
            hasUnsavedChanges={hasUnsavedChanges}
            isGenerating={isGenerating}
            isSaving={isSaving}
            apiKeyMissing={apiKeyMissing}
            rowCount={rowCount}
            onRowCountChange={handleRowCountChange}
            onAddTable={addNewTable}
            onGenerateSQL={handleGenerateSQL}
            onSave={saveDiagram}
            nodesCount={nodes.length}
            isUnauthenticated={isUnauthenticated}
          />

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

          {/* Alerts Container */}
          <div className="absolute left-4 top-20 z-10 flex flex-col gap-3">
            {apiKeyMissing && (
              <ApiKeyAlert
                compact={true}
                onGlobalSettings={onOpenSettings}
                onProjectSettings={onOpenProjectSettings}
                className="max-w-xs"
                isUnauthenticated={isUnauthenticated}
              />
            )}

            {isUnauthenticated && <WorkspaceAlert onSignIn={onSignIn} />}
          </div>
        </div>

        {/* Sidebar */}
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

      {/* Full-page Generating Indicator Overlay */}
      {isGenerating && (
        <FadeIn delay={100}>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-[100] pointer-events-auto">
            <GeneratingIndicator
              message={`Generating SQL for ${
                project?.databaseType || "database"
              }`}
            />
          </div>
        </FadeIn>
      )}
    </div>
  );
}

export default function DiagramEditor(props: DiagramEditorProps) {
  return (
    <ReactFlowProvider>
      <DiagramEditorContent {...props} />
    </ReactFlowProvider>
  );
}
