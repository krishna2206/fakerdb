import DiagramEditor from "@/components/diagram/DiagramEditor";
import AuthModal from "@/components/modals/AuthModal";
import ProjectSettingsModal from "@/components/modals/ProjectSettingsModal";
import SettingsModal from "@/components/modals/SettingsModal";
import { DatasetView } from "@/components/sections/DatasetView";
import { ProjectSidebar } from "@/components/sections/ProjectSidebar";
import { SchemaDesignView } from "@/components/sections/SchemaDesignView";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { getProject } from "@/services/projectService";
import { Dataset, Project } from "@/types/types";
import { Edge, Node, ReactFlowProvider, useEdgesState, useNodesState } from "@xyflow/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const { toast } = useToast();
  const { isAuthenticated, logout } = useAuth();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode] = useState<"signin" | "signup">("signin");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [currentView, setCurrentView] = useState<"design" | "diagram" | "data" >("diagram");
  const [datasetsRefreshKey, setDatasetsRefreshKey] = useState(0);
  const [activeDatasetId, setActiveDatasetId] = useState<string | undefined>(undefined);

  const [diagramNodes, setDiagramNodes, onNodesChange] = useNodesState([]);
  const [diagramEdges, setDiagramEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const loadData = async () => {
      if (!projectId || !isAuthenticated) return;

      try {
        setLoading(true);
        const projectData = await getProject(projectId);
        setProject(projectData);
      } catch (error) {
        console.error("Error loading project data:", error);
        toast({
          title: "Error",
          description: "Failed to load project data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [projectId, isAuthenticated, toast]);

  const handleDatasetDeleted = (datasetId: string) => {
    if (activeDatasetId === datasetId) {
      setActiveDatasetId(undefined);
      setCurrentView("diagram");
    }

    // Increment the refresh key to trigger dataset reload
    setDatasetsRefreshKey((prev) => prev + 1);
  };

  const handleProjectSettings = () => setIsProjectSettingsOpen(true);
  const handleProjectUpdated = (updatedProject: Project) => setProject(updatedProject);
  const handleProjectDeleted = () => navigate("/projects");
  const handleToggleSidebar = () => setSidebarExpanded((prev) => !prev);

  const handleViewChange = (view: "diagram" | "data" | "design", datasetId?: string) => {
    setCurrentView(view);
    if (datasetId) {
      setActiveDatasetId(datasetId);
    }
  };

  const handleDatasetGenerated = (dataset: Dataset) => {
    // Increase the delay to ensure PocketBase has time to process the request
    // and the dataset is available in the database
    setTimeout(() => {
      // First increase the refresh key to trigger data reload
      setDatasetsRefreshKey((prev) => prev + 1);

      // Then set the active dataset and view
      // This ensures the sidebar will show the dataset as active
      setTimeout(() => {
        setActiveDatasetId(dataset.id);
        setCurrentView("data");
      }, 50);
    }, 500);
  };

  const handleGenerateSchema = (nodes: Node[], edges: Edge[]) => {
    setDiagramNodes(nodes);
    setDiagramEdges(edges);
    
    setCurrentView("diagram");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Button onClick={() => navigate("/projects")} className="mt-4">
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-grow flex flex-row overflow-hidden">
        <ProjectSidebar
          expanded={sidebarExpanded}
          currentView={currentView}
          onToggle={handleToggleSidebar}
          onViewChange={handleViewChange}
          onOpenProjectSettings={handleProjectSettings}
          projectId={projectId}
          refreshKey={datasetsRefreshKey}
          onLogout={() => logout(() => navigate("/"))}
          onOpenUserSettings={() => setIsSettingsOpen(true)}
          onSignIn={() => setIsAuthOpen(true)}
          activeDatasetId={activeDatasetId}
          onDatasetDeleted={handleDatasetDeleted}
        />

        <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
          <ReactFlowProvider>
            {currentView === "diagram" && (
              <DiagramEditor
                project={project}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenProjectSettings={handleProjectSettings}
                onDatasetGenerated={handleDatasetGenerated}
                onSignIn={() => setIsAuthOpen(true)}
                nodes={diagramNodes}
                edges={diagramEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                setNodes={setDiagramNodes}
                setEdges={setDiagramEdges}
              />
            )}

            {currentView === "data" && (
              <DatasetView
                project={project}
                datasetId={activeDatasetId}
                onDatasetUpdated={() => setDatasetsRefreshKey((prev) => prev + 1)}
              />
            )}

            {currentView === "design" && (
              <SchemaDesignView
                project={project}
                existingNodesCount={diagramNodes.length}
                onGenerateSchema={handleGenerateSchema}
                onBackToDiagram={() => setCurrentView("diagram")}
              />
            )}
          </ReactFlowProvider>
        </div>
      </div>

      <AuthModal
        open={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        initialMode={authMode}
      />
      <SettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      <ProjectSettingsModal
        open={isProjectSettingsOpen}
        onOpenChange={setIsProjectSettingsOpen}
        project={project}
        onProjectUpdated={handleProjectUpdated}
        onProjectDeleted={handleProjectDeleted}
      />
    </div>
  );
};

export default ProjectPage;
