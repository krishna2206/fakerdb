import { ArrowUp, Loader2, Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
    generateSchema,
    schemaPromptSuggestions
} from "@/services/schemaGenerationService";
import { Project } from "@/types/types";
import { Edge, Node } from "@xyflow/react";
import { Textarea } from "../ui/textarea";

interface SchemaGenerationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerateSchema: (nodes: Node[], edges: Edge[]) => void;
  project: Project;
  apiKeyMissing?: boolean;
}

/**
 * Dialog component for generating database schema from natural language descriptions
 * Uses AI to convert text prompts into a complete database diagram
 */
export function SchemaGenerationDialog({
  open,
  onOpenChange,
  onGenerateSchema,
  project,
  apiKeyMissing,
}: SchemaGenerationDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description:
          "Please enter a description of the database schema you want to generate.",
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

    setIsGenerating(true);
    try {
      const result = await generateSchema({
        prompt: prompt.trim(),
        project,
      });

      onGenerateSchema(result.nodes, result.edges);

      toast({
        title: "Schema generated",
        description: `Created ${result.nodes.length} tables based on your description.`,
      });

      onOpenChange(false);
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

  // Auto-resize the textarea based on content, with a maximum height of 200px
  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    textarea.style.height = 'auto';
    
    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [prompt]);

  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
      autoResizeTextarea();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[550px] p-0 border-0 overflow-hidden rounded-lg shadow-md"
        closeButtonClassName="absolute right-4 top-4 rounded-full p-1 flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-primary-foreground/10 focus:outline-none text-white"
      >
        <div className="relative h-16 overflow-hidden rounded-t-lg">
          <div className="absolute inset-0 bg-primary/90"></div>
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-white" />
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Design with AI
              </h2>
            </div>
          </div>
        </div>
        
        {/* Hidden DialogTitle for accessibility */}
        <DialogTitle className="sr-only">Design Database Schema with AI</DialogTitle>

        <div className="p-5 space-y-5">
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Describe your database needs and I'll create a complete schema
              with properly connected tables. Be specific about the entities and
              their relationships.
            </p>
          </div>

          <div className="space-y-3">
            <div className={cn(
              "rounded-xl overflow-hidden shadow-sm transition-all duration-300 border border-border bg-card relative input-container",
              isFocused && "focused"
            )}>
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex-1 p-3 bg-card">
                  <Textarea
                    className="w-full border-0 bg-transparent ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-muted-foreground/60 min-h-[50px] resize-none outline-none text-sm overflow-y-auto"
                    placeholder="What database would you like to build?"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating}
                    ref={textareaRef}
                    style={{ maxHeight: '200px', overflow: 'auto' }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey && !isGenerating && prompt.trim()) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="text-xs text-muted-foreground/80 pl-2 flex-1">
                    <span className="hidden sm:inline">
                      Press Enter to generate
                    </span>
                  </div>
                  <Button
                    type="submit"
                    className={cn(
                      "rounded-full h-8 w-8 p-0",
                    )}
                    variant="default"
                    size="icon"
                    disabled={!prompt.trim() || isGenerating}
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

            <div className="space-y-2">
              <div className="text-xs text-muted-foreground font-medium">
                Try one of these examples:
              </div>
              <div className="flex flex-wrap gap-2">
                {schemaPromptSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs py-1 px-2 h-auto rounded-full bg-muted/50 border-muted hover:bg-muted"
                    onClick={() => setPrompt(suggestion.prompt)}
                    title={suggestion.prompt}
                  >
                    {suggestion.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
