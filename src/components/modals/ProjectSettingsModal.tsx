import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { deleteProject, updateProject } from "@/services/projectService";
import { Project } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Info, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProjectSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onProjectUpdated?: (project: Project) => void;
  onProjectDeleted?: (projectId: string) => void;
}

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100),
  description: z.string().max(500).optional(),
  databaseType: z.enum(["MySQL", "PostgreSQL", "SQLite", "Oracle"]),
  useCustomApiKey: z.boolean().default(false),
  geminiApiKey: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const ProjectSettingsModal = ({
  open,
  onOpenChange,
  project,
  onProjectUpdated,
  onProjectDeleted,
}: ProjectSettingsModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletionOpen, setIsDeletionOpen] = useState(false);
  const [confirmProjectName, setConfirmProjectName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      databaseType: "MySQL",
      useCustomApiKey: false,
      geminiApiKey: "",
    },
  });

  // Update form values when project changes
  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        description: project.description || "",
        databaseType: project.databaseType,
        useCustomApiKey: !!project.geminiApiKey,
        geminiApiKey: project.geminiApiKey || "",
      });
      // Reset deletion state
      setIsDeletionOpen(false);
      setConfirmProjectName("");
    }
  }, [project, form]);

  const handleClose = () => {
    form.reset();
    setIsDeletionOpen(false);
    setConfirmProjectName("");
    onOpenChange(false);
  };

  const onSubmit = async (data: ProjectFormValues) => {
    if (!project) return;

    setIsSubmitting(true);

    try {
      // Only include API key if useCustomApiKey is true
      const projectData: Partial<Project> = {
        name: data.name,
        description: data.description,
        databaseType: data.databaseType,
        geminiApiKey: data.useCustomApiKey ? data.geminiApiKey : null,
      };

      const updatedProject = await updateProject(project.id, projectData);

      toast({
        title: "Project Updated",
        description: "The project settings have been updated successfully.",
      });

      if (onProjectUpdated) {
        onProjectUpdated(updatedProject);
      }

      handleClose();
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to update project settings.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!project) return;

    setIsDeleting(true);

    try {
      await deleteProject(project.id);

      toast({
        title: "Project Deleted",
        description: "Your project has been deleted successfully",
      });

      if (onProjectDeleted) {
        onProjectDeleted(project.id);
      }

      handleClose();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleDeletionSection = () => {
    setIsDeletionOpen(!isDeletionOpen);
    setConfirmProjectName("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Project Settings</DialogTitle>
          <DialogDescription>
            Configure your project settings and API key preferences.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="max-h-[70vh] overflow-y-auto pr-1 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., E-commerce Database" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of your project"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="databaseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Database Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select database type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MySQL">MySQL</SelectItem>
                        <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                        <SelectItem value="SQLite">SQLite</SelectItem>
                        <SelectItem value="Oracle">Oracle</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border rounded-md p-4 space-y-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="custom-api-key" className="font-medium">
                      Use Custom API Key
                    </Label>
                    <FormField
                      control={form.control}
                      name="useCustomApiKey"
                      render={({ field }) => (
                        <Switch
                          id="custom-api-key"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Toggle to use a project-specific Gemini API key instead of the
                    global one.
                  </p>
                </div>

                {form.watch("useCustomApiKey") && (
                  <FormField
                    control={form.control}
                    name="geminiApiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Gemini API Key</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter Gemini API key for this project"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription className="flex items-center gap-1">
                          <Info className="h-3.5 w-3.5" />
                          This key will only be used for this project
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Project Deletion Section */}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium text-destructive">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Actions here cannot be undone
                  </p>
                </div>

                {!isDeletionOpen ? (
                  <Button
                    variant="outline-destructive"
                    className="w-full"
                    onClick={toggleDeletionSection}
                  >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete this project
                </Button>
                ) : (
                  <div className="border border-destructive rounded-md p-4 space-y-4">
                    <Alert variant="error">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        This action cannot be undone. This will permanently delete
                        the <strong>{project?.name}</strong> project, all its
                        tables and associated data.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirm-delete"
                        className="text-sm font-medium"
                      >
                        Please type <strong>{project?.name}</strong> to confirm
                      </Label>
                      <Input
                        id="confirm-delete"
                        value={confirmProjectName}
                        onChange={(e) => setConfirmProjectName(e.target.value)}
                        className="border-muted-foreground"
                      />
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={toggleDeletionSection}
                        disabled={isDeleting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        disabled={
                          confirmProjectName !== project?.name || isDeleting
                        }
                        onClick={handleDeleteProject}
                      >
                        {isDeleting ? (
                          <span className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Deleting...
                          </span>
                        ) : (
                          "I understand, delete this project"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || isDeleting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectSettingsModal;
