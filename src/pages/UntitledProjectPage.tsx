// filepath: /Users/krishna/Dev/fakerdb/src/pages/DiagramEditorPage.tsx
import DiagramEditor from "@/components/diagram/DiagramEditor";
import AuthModal from "@/components/modals/AuthModal";
import DatabaseTypeModal from "@/components/modals/DatabaseTypeModal";
import SettingsModal from "@/components/modals/SettingsModal";
import GeneratingIndicator from "@/components/sections/GeneratingIndicator";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from "@/hooks/useApiKey";
import { useAuth } from "@/hooks/useAuth";
import { generateMultitableData } from "@/services/sqlGenerationService";
import { DatabaseType, GeneratedData, Project } from "@/types/types";
import { Edge, Node } from "@xyflow/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UntitledProjectPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDbTypeModalOpen, setIsDbTypeModalOpen] = useState(false);
  const [databaseType, setDatabaseType] = useState<DatabaseType>("MySQL");
  const [apiKeyRefresh, setApiKeyRefresh] = useState(0);
  const { apiKey } = useApiKey(apiKeyRefresh);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  // Create a temporary project for the unauthenticated user
  const tempProject: Project = {
    id: "temp",
    name: "Untitled Project",
    databaseType: databaseType,
    userId: "",
    tableCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    previewImage: "/placeholder-diagram.svg"
  };

  // Check if API key is missing
  const apiKeyMissing = !apiKey;

  // If user becomes authenticated, redirect to projects page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/projects");
    }
  }, [isAuthenticated, navigate]);

  // Show database type modal on first load
  useEffect(() => {
    setIsDbTypeModalOpen(true);
  }, []);

  useEffect(() => {
    let timer: number;
    if (isGenerating) {
      setShowIndicator(true);
    } else {
      setShowIndicator(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isGenerating]);

  const handleSignIn = () => {
    setAuthMode("signin");
    setIsAuthOpen(true);
  };

  const handleSignUp = () => {
    setAuthMode("signup");
    setIsAuthOpen(true);
  };

  const handleGenerateSQL = async (
    nodes: Node[],
    edges: Edge[],
    rowCount: number = 10
  ): Promise<GeneratedData> => {
    setIsGenerating(true);

    try {
      const sql = await generateMultitableData(
        null,
        databaseType,
        nodes,
        edges,
        rowCount
      );

      toast({
        title: "SQL Generated",
        description: "SQL code has been successfully generated",
      });
      
      return sql;
    } catch (error) {
      console.error("Error generating SQL:", error);
      toast({
        title: "Generation Failed",
        description: "An error occured when generating SQL.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleProjectSettings = () => {
    setIsDbTypeModalOpen(true);
  };

  const handleDatabaseTypeChange = (type: DatabaseType) => {
    setDatabaseType(type);
    tempProject.databaseType = type;
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-grow flex flex-col overflow-hidden">
        <DiagramEditor
          project={tempProject}
          apiKeyMissing={apiKeyMissing}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenProjectSettings={handleProjectSettings}
          onGenerateSQL={handleGenerateSQL}
          user={user}
          isUnauthenticated={true}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
        />

        {isGenerating && (
          <div 
            className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-200 ease-in-out ${
              showIndicator ? 'opacity-100' : 'opacity-0 backdrop-blur-none'
            }`}
          >
            <div className={`transition-opacity duration-500 ease-in-out ${showIndicator ? 'opacity-100' : 'opacity-0'}`}>
              <GeneratingIndicator
                message={`Generating SQL for ${databaseType}`}
              />
            </div>
          </div>
        )}
      </div>

      <AuthModal
        open={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        initialMode={authMode}
      />
      <SettingsModal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        onSettingsSaved={() => setApiKeyRefresh((prev) => prev + 1)}
      />
      <DatabaseTypeModal
        open={isDbTypeModalOpen}
        onOpenChange={setIsDbTypeModalOpen}
        initialValue={databaseType}
        onSave={handleDatabaseTypeChange}
      />
    </div>
  );
};

export default UntitledProjectPage;