import DiagramEditor from "@/components/diagram/DiagramEditor";
import AuthModal from "@/components/modals/AuthModal";
import ProjectSettingsModal from "@/components/modals/ProjectSettingsModal";
import SettingsModal from "@/components/modals/SettingsModal";
import GeneratingIndicator from "@/components/sections/GeneratingIndicator";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from "@/hooks/useApiKey";
import { useAuth } from "@/hooks/useAuth";
import { generateMultitableData } from "@/services/multiTableService";
import { getProject } from "@/services/projectService";
import { GeneratedData, Project } from "@/types/types";
import { Edge, Node } from "@xyflow/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user, logout } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);
  const [apiKeyRefresh, setApiKeyRefresh] = useState(0);
  const { apiKey, isApiKeyExpired } = useApiKey(apiKeyRefresh);
  const [generatedSQL, setGeneratedSQL] = useState<GeneratedData>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [showSQLResults, setShowSQLResults] = useState(false);

  // Check if both global and project API keys are missing
  const noGlobalKey = !apiKey;
  const noProjectKey = project && !project.geminiApiKey;
  const apiKeyMissing = noGlobalKey && noProjectKey;

  useEffect(() => {
    const loadData = async () => {
      if (!projectId || !isAuthenticated) return;

      try {
        setLoading(true);

        // Fetch project details
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

  const handleProjectSettings = () => {
    setIsProjectSettingsOpen(true);
  };

  const handleProjectUpdated = (updatedProject: Project) => {
    setProject(updatedProject);
  };

  const handleGenerateSQL = async (
    nodes: Node[],
    edges: Edge[],
    rowCount: number = 10
  ): Promise<GeneratedData> => {
    if (!project) return null;

    setIsGenerating(true);
    setShowSQLResults(false);

    try {
      const sql = await generateMultitableData(
        project.id,
        project.databaseType,
        nodes,
        edges,
        rowCount
      );

      setGeneratedSQL(sql);
      setShowSQLResults(true);

      toast({
        title: "SQL Generated",
        description: "SQL code has been successfully generated",
      });
      
      // Return the SQL data for the slide-up panel
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

  if (loading) {
    return (
      <LoadingSpinner />
    );
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
      <div className="flex-grow flex flex-col overflow-hidden">
        <DiagramEditor
          project={project}
          apiKeyMissing={apiKeyMissing}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenProjectSettings={handleProjectSettings}
          onGenerateSQL={handleGenerateSQL}
          user={user}
          onLogout={() => logout(() => navigate("/"))}
        />

        {isGenerating && (
          <div 
            className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-200 ease-in-out ${
              showIndicator ? 'opacity-100' : 'opacity-0 backdrop-blur-none'
            }`}
          >
            <div className={`transition-opacity duration-500 ease-in-out ${showIndicator ? 'opacity-100' : 'opacity-0'}`}>
              <GeneratingIndicator
                message={`Generating SQL for ${
                  project?.databaseType || "database"
                }`}
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
      <ProjectSettingsModal
        open={isProjectSettingsOpen}
        onOpenChange={setIsProjectSettingsOpen}
        project={project}
        onProjectUpdated={handleProjectUpdated}
        onProjectDeleted={(projectId) => {
          // Navigate back to projects list when the current project is deleted
          navigate("/projects");
        }}
      />
    </div>
  );
};

export default ProjectDetail;
