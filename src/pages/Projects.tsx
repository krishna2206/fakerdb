/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/layout/Navbar";
import AddProjectModal from "@/components/modals/AddProjectModal";
import ProjectSettingsModal from "@/components/modals/ProjectSettingsModal";
import SettingsModal from "@/components/modals/SettingsModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  getProjectDiagramCounts,
  getProjectPreviewImages,
} from "@/services/diagramService";
import { fetchProjects } from "@/services/projectService";
import { Project } from "@/types/types";
import { getTimeAgo } from "@/utils/timeUtils";
import {
  ChevronLeft,
  ChevronRight,
  Database,
  FolderKanban,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  // Data states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<
    (Project & { tableCount: number; previewImage?: string })[]
  >([]);

  // Pagination and search state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const perPage = 6;

  const loadProjects = async (page = currentPage, search = searchTerm) => {
    try {
      setIsSearching(true);

      // Fetch projects from the backend with pagination and search
      const projectsResponse = await fetchProjects(page, perPage, search);

      setTotalPages(projectsResponse.totalPages);
      setTotalItems(projectsResponse.totalItems);

      if (projectsResponse.items.length > 0) {
        // Get project IDs
        const projectIds = projectsResponse.items.map((project) => project.id);

        // Get diagram counts (node counts) for each project
        const diagramCounts = await getProjectDiagramCounts(projectIds);

        // Get preview images for each project
        const previewImages = await getProjectPreviewImages(projectIds);

        // Combine projects with their diagram counts (table counts) and preview images
        const projectsWithData = projectsResponse.items.map((project) => ({
          ...project,
          tableCount: diagramCounts[project.id] || 0,
          previewImage: previewImages[project.id] || "/placeholder-diagram.svg",
        }));

        setProjects(projectsWithData);
      } else {
        setProjects([]);
      }

      setIsLoaded(true);
      setIsSearching(false);
    } catch (error) {
      console.error("Error loading projects:", error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
      setIsLoaded(true);
      setIsSearching(false);
    }
  };

  // Fetch projects when the component mounts
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      loadProjects();
    }
  }, [isAuthenticated, isLoading]);

  // Debounced search function for automatic search while typing
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (isAuthenticated && !isLoading && isLoaded) {
        loadProjects(1, searchTerm);
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleSettingsSaved = () => {
    loadProjects();
  };

  // Project handlers
  const handleCreateProject = () => {
    setIsAddProjectModalOpen(true);
  };

  const handleOpenProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const handleProjectSettings = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProject(project);
    setIsProjectSettingsOpen(true);
  };

  const handleOnProjectUpdated = () => {
    loadProjects(1);
    setCurrentPage(1);
  };

  const handleOnProjectCreated = () => {
    loadProjects(1);
    setCurrentPage(1);
  };

  const handleOnProjectDeleted = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  // Pagination and search handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadProjects(page, searchTerm);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    loadProjects(1, searchTerm);
  };

  if (isLoading || !isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar
        // Use empty functions since the sign in / sign up buttons will never appear in projects page
        onSignInClick={() => {}}
        onSignUpClick={() => {}}
        onSettingsClick={() => setIsSettingsModalOpen(true)}
      />

      <FadeIn duration={400} direction="up">
        <Container className="py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              {user ? (
                <Alert className="border-0 p-0">
                  <AlertTitle className="text-3xl font-bold tracking-tight">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-b from-primary/40 to-primary dark:from-foreground dark:to-primary/70 bg-clip-text text-transparent">
                      {user.name || user.email}
                    </span>
                  </AlertTitle>
                  <AlertDescription className="text-muted-foreground mt-1">
                    Manage your database design projects. All projects are
                    synced across your devices.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Projects
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your database design projects
                  </p>
                </>
              )}
            </div>
            <Button
              onClick={handleCreateProject}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative flex">
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-full"
              />
              <Button
                type="submit"
                // disabled={isSearching}
                className="absolute right-0 rounded-l-none h-10"
                variant="default"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>

          {projects.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No projects yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Create your first project to start designing database tables
                </p>
                <Button
                  onClick={handleCreateProject}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="cursor-pointer hover:border-primary/50 transition-colors flex flex-col h-[220px]"
                    onClick={() => handleOpenProject(project.id)}
                  >
                    <div className="flex flex-col h-full">
                      <CardHeader className="pb-0 pt-3 px-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base truncate pr-2">
                            {project.name}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full ml-auto -mr-2"
                            onClick={(e) => handleProjectSettings(project, e)}
                          >
                            <Settings className="h-3.5 w-3.5" />
                            <span className="sr-only">Project settings</span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 py-2 flex-grow">
                        <div className="relative h-32 w-full mb-1">
                          <img
                            src={project.previewImage}
                            alt={`${project.name} preview`}
                            className="w-full h-full object-cover rounded-md absolute"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="px-4 pt-0 pb-3 flex items-center justify-between mt-auto">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Database className="h-3 w-3" />
                          {project.tableCount}{" "}
                          {project.tableCount === 1 ? "table" : "tables"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Updated {getTimeAgo(project.updatedAt)}
                        </span>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
              </div>

              {totalItems > 6 && (
                <div className="mt-8 border-t pt-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="flex items-center gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Container>
      </FadeIn>

      <AddProjectModal
        open={isAddProjectModalOpen}
        onOpenChange={setIsAddProjectModalOpen}
        onProjectCreated={handleOnProjectCreated}
      />
      <SettingsModal
        open={isSettingsModalOpen}
        onOpenChange={setIsSettingsModalOpen}
        onSettingsSaved={handleSettingsSaved}
      />
      <ProjectSettingsModal
        open={isProjectSettingsOpen}
        onOpenChange={setIsProjectSettingsOpen}
        project={selectedProject}
        onProjectUpdated={handleOnProjectUpdated}
        onProjectDeleted={handleOnProjectDeleted}
      />
    </>
  );
};

export default Projects;
