import DiagramEditor from "@/components/diagram/DiagramEditor";
import AuthModal from "@/components/modals/AuthModal";
import DatabaseTypeModal from "@/components/modals/DatabaseTypeModal";
import SettingsModal from "@/components/modals/SettingsModal";
import UnauthenticatedDatasetModal from "@/components/modals/UnauthenticatedDatasetModal";
import { ProjectSidebar } from "@/components/sections/ProjectSidebar";
import { SchemaDesignView } from "@/components/sections/SchemaDesignView";
import { useAuth } from "@/hooks/useAuth";
import { DatabaseType, Dataset, GeneratedData, Project } from "@/types/types";
import { Edge, Node, useEdgesState, useNodesState } from "@xyflow/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UntitledProjectPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDbTypeModalOpen, setIsDbTypeModalOpen] = useState(false);
  const [databaseType, setDatabaseType] = useState<DatabaseType>("MySQL");
  const [currentView, setCurrentView] = useState<"design" | "diagram">("diagram");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // State for diagram nodes and edges
  const [diagramNodes, setDiagramNodes, onNodesChange] = useNodesState([]);
  const [diagramEdges, setDiagramEdges, onEdgesChange] = useEdgesState([]);

  // Unauthenticated dataset state
  const [isDatasetModalOpen, setIsDatasetModalOpen] = useState(false);
  const [generatedSQL, setGeneratedSQL] = useState<GeneratedData | null>(null);

  // Temporary project for unauthenticated user
  const tempProject: Project = {
    id: "temp",
    name: "Untitled Project",
    databaseType: databaseType,
    userId: "",
    tableCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    previewImage: "/placeholder-diagram.svg",
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/projects");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setIsDbTypeModalOpen(true);
  }, []);

  const handleSignIn = () => {
    setAuthMode("signin");
    setIsAuthOpen(true);
  };

  const handleProjectSettings = () => {
    setIsDbTypeModalOpen(true);
  };

  const handleDatabaseTypeChange = (type: DatabaseType) => {
    setDatabaseType(type);
    tempProject.databaseType = type;
  };

  const handleViewChange = (
    view: "design" | "diagram",
  ) => {
    setCurrentView(view);
  };

  const handleDatasetGenerated = (dataset: Dataset) => {
    if (dataset.createTableSQL && dataset.insertDataSQL) {
      const sqlData: GeneratedData = {
        createTableSQL: dataset.createTableSQL,
        insertDataSQL: dataset.insertDataSQL,
      };

      // Use setTimeout to ensure state updates happen after the current execution context
      setTimeout(() => {
        setGeneratedSQL(sqlData);
        setIsDatasetModalOpen(true);
      }, 100);
    } else {
      console.error("Missing SQL data in dataset:", dataset);
    }
  };

  const handleGenerateSchema = (nodes: Node[], edges: Edge[]) => {
    setDiagramNodes(nodes);
    setDiagramEdges(edges);
    setCurrentView("diagram");
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <ProjectSidebar
        expanded={sidebarExpanded}
        currentView={currentView}
        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
        onViewChange={handleViewChange}
        onOpenProjectSettings={handleProjectSettings}
        onOpenUserSettings={() => setIsSettingsOpen(true)}
        onSignIn={handleSignIn}
        refreshKey={0}
      />

      <div className="flex-grow flex flex-col overflow-hidden">
        {currentView === "diagram" && (
          <DiagramEditor
            project={tempProject}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenProjectSettings={handleProjectSettings}
            onSignIn={handleSignIn}
            nodes={diagramNodes}
            edges={diagramEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            setNodes={setDiagramNodes}
            setEdges={setDiagramEdges}
            onDatasetGenerated={handleDatasetGenerated}
          />
        )}

        {currentView === "design" && (
          <SchemaDesignView
            project={tempProject}
            existingNodesCount={diagramNodes.length}
            onGenerateSchema={handleGenerateSchema}
            onBackToDiagram={() => setCurrentView("diagram")}
          />
        )}
      </div>

      <AuthModal
        open={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        initialMode={authMode}
      />
      <SettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      <DatabaseTypeModal
        open={isDbTypeModalOpen}
        onOpenChange={setIsDbTypeModalOpen}
        initialValue={databaseType}
        onSave={handleDatabaseTypeChange}
      />
      <UnauthenticatedDatasetModal
        open={isDatasetModalOpen}
        onOpenChange={setIsDatasetModalOpen}
        generatedSQL={generatedSQL}
        databaseType={databaseType}
      />
    </div>
  );
};

export default UntitledProjectPage;
