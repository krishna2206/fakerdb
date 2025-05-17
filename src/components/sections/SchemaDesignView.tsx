import { ArrowLeft, ArrowUp, Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { FadeIn } from "@/components/ui/fade-in";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { cn } from "@/lib/utils";
import {
  generateSchema,
  schemaPromptSuggestions,
} from "@/services/schemaGenerationService";
import { Project } from "@/types/types";
import { Edge, Node } from "@xyflow/react";

interface SchemaDesignViewProps {
  project: Project;
  existingNodesCount: number;
  onGenerateSchema: (nodes: Node[], edges: Edge[]) => void;
  onBackToDiagram: () => void;
}

export function SchemaDesignView({
  project,
  existingNodesCount,
  onGenerateSchema,
  onBackToDiagram,
}: SchemaDesignViewProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { apiKey } = useApiKey();
  const { toast } = useToast();
  const navigate = useNavigate();

  const apiKeyMissing = !apiKey && !project.geminiApiKey;

  // Auto-resize the textarea based on content
  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 250);
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    if (textareaRef.current) {
      autoResizeTextarea();
    }
  }, [prompt]);

  const handleGenerateSchema = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description of the database schema you want to generate.",
        variant: "destructive",
      });
      return;
    }

    if (apiKeyMissing) {
      toast({
        title: "API Key Required",
        description: "Please configure an API key in settings first.",
        variant: "destructive",
      });
      return;
    }

    // Check if there are existing nodes and show warning if needed
    if (existingNodesCount > 0) {
      setShowWarningDialog(true);
      return;
    }

    await generateSchemaFromPrompt();
  };

  const generateSchemaFromPrompt = async () => {
    setIsGenerating(true);
    try {
      const result = await generateSchema({
        prompt: prompt.trim(),
        project,
      });

      onGenerateSchema(result.nodes, result.edges);
      onBackToDiagram();

      toast({
        title: "Schema generated",
        description: `Created ${result.nodes.length} tables based on your description.`,
      });
    } catch (error) {
      console.error("Error generating schema:", error);
      toast({
        title: "Generation failed",
        description:
          "An error occurred while generating the schema. Please try again with a more detailed description.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirmOverwrite = () => {
    setShowWarningDialog(false);
    generateSchemaFromPrompt();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-8 w-8"
            onClick={() => navigate("/projects")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium">{project.name}</h1>
            <div className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded">
              {project.databaseType || "PostgreSQL"}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-3xl">
            <FadeIn delay={100} duration={300} className="mb-6 text-center">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <h2 className="text-4xl font-semibold animate-gradient-x bg-gradient-to-r from-primary via-primary/70 to-primary/40 dark:from-foreground dark:via-primary dark:to-primary/70 bg-clip-text text-transparent bg-300% transition-all">Design with AI</h2>
                </div>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  Describe your database needs, and AI will create a schema with tables and relationships for you. Be specific about the entities and
              their relationships.
                </p>
              </div>
            </FadeIn>

            {apiKeyMissing && (
              <FadeIn delay={150} duration={300} className="mb-4">
                <Alert className="border-amber-500/50 text-amber-500">
                  <AlertTitle>API Key Required</AlertTitle>
                  <AlertDescription>
                    You need to configure a Gemini API key in project or global settings to generate schema.
                  </AlertDescription>
                </Alert>
              </FadeIn>
            )}

            <FadeIn delay={200} duration={300}>
              <div className={cn(
                "rounded-xl overflow-hidden shadow-sm transition-all duration-300 border border-border bg-card relative",
                isFocused && "border-primary shadow-[0_0_0_1px_hsl(var(--primary)/20%)]"
              )}>
                <form onSubmit={(e) => { e.preventDefault(); handleGenerateSchema(); }} className="flex flex-col">
                  <div className="flex-1 p-3 bg-card">
                    <Textarea
                      className="w-full border-0 bg-transparent ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-muted-foreground/60 min-h-[40px] resize-none outline-none text-sm overflow-hidden"
                      placeholder="Describe your database schema needs..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      disabled={isGenerating}
                      ref={textareaRef}
                      rows={3}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && !isGenerating && prompt.trim()) {
                          e.preventDefault();
                          handleGenerateSchema();
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="text-xs text-muted-foreground/80 pl-2 flex-1">
                      <span className="hidden sm:inline">Press Enter to generate schema</span>
                    </div>
                    <Button
                      type="submit"
                      className="rounded-full h-8 w-8 p-0"
                      variant="default"
                      size="icon"
                      disabled={!prompt.trim() || isGenerating || apiKeyMissing}
                    >
                      {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowUp className="h-4 w-4" />
                      )}
                      <span className="sr-only">Generate schema</span>
                    </Button>
                  </div>
                </form>
              </div>
            </FadeIn>

            {/* Prompt templates */}
            <FadeIn delay={300} duration={300} className="mt-8">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground text-center">Example prompts</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {schemaPromptSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 px-3 h-auto rounded-full bg-muted/50 border-muted hover:bg-muted"
                      onClick={() => setPrompt(suggestion.prompt)}
                      title={suggestion.prompt}
                    >
                      {suggestion.title}
                    </Button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Warning dialog for overwriting existing schema */}
      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace existing schema?</DialogTitle>
            <DialogDescription>
              Your diagram already has {existingNodesCount} table{existingNodesCount !== 1 && 's'}.
              Generating a new schema will replace all existing tables and relationships.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWarningDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmOverwrite}>
              Replace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}