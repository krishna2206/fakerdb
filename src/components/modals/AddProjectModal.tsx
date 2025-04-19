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
import { createProject } from "@/services/projectService";
import { Project } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreated?: (project: Project) => void;
}

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100),
  description: z.string().max(500).optional(),
  databaseType: z.enum(["MySQL", "PostgreSQL", "SQLite", "Oracle"]),
  useCustomApiKey: z.boolean().default(false),
  geminiApiKey: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const AddProjectModal = ({
  open,
  onOpenChange,
  onProjectCreated,
}: AddProjectModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);

    try {
      // Create a new project with the form data
      const newProject = await createProject({
        name: data.name,
        description: data.description || "",
        databaseType: data.databaseType,
        geminiApiKey: data.useCustomApiKey ? data.geminiApiKey : null,
        userId: "", // Just specify a blank user id to avoid ESLint error, we get the user id in the project service
        previewImage: "/placeholder-diagram.svg", // Initialize with the placeholder image
        tableCount: 0, // Initialize with zero tables
      });

      // Reset the form and close the dialog
      form.reset();
      onOpenChange(false);

      toast({
        title: "Project Created",
        description: "Your new project has been created successfully",
      });

      if (onProjectCreated) {
        onProjectCreated(newProject);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project to organize multiple related database tables.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create Project"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;
