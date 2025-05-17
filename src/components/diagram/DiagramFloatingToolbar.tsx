import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MAX_ROW_COUNT } from "@/constants";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Grid2x2Plus, Loader2, Save, Sparkles } from "lucide-react";
import React from "react";

interface DiagramFloatingToolbarProps {
  hasUnsavedChanges: boolean;
  isGenerating: boolean;
  isSaving: boolean;
  apiKeyMissing?: boolean;
  rowCount: number;
  onRowCountChange: (count: number) => void;
  onAddTable: () => void;
  onGenerateSQL: () => void;
  onSave: () => void;
  nodesCount?: number;
  isUnauthenticated?: boolean;
}

const DiagramFloatingToolbar: React.FC<DiagramFloatingToolbarProps> = ({
  hasUnsavedChanges,
  isGenerating,
  isSaving,
  apiKeyMissing,
  rowCount,
  onRowCountChange,
  onAddTable,
  onGenerateSQL,
  onSave,
  nodesCount = 0,
  isUnauthenticated,
}) => {
  return (
    <TooltipProvider>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-md">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onAddTable}
              className="h-9 w-9"
              aria-label="Add a new table"
            >
              <Grid2x2Plus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add a new table</p>
          </TooltipContent>
        </Tooltip>

        {/* Only show save button for authenticated users */}
        {!isUnauthenticated && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={
                  isSaving ? "ghost" : hasUnsavedChanges ? "default" : "ghost"
                }
                size="icon"
                onClick={onSave}
                disabled={!hasUnsavedChanges || isSaving}
                className="h-9 w-9"
                aria-label="Save diagram"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isSaving ? "Saving..." : "Save diagram"}</p>
            </TooltipContent>
          </Tooltip>
        )}

        <div className="flex items-center gap-2 rounded px-2 bg-background">
          <Label
            htmlFor="floating-row-count"
            className="text-xs whitespace-nowrap"
          >
            Rows:
          </Label>
          <Input
            id="floating-row-count"
            type="number"
            min="1"
            max={MAX_ROW_COUNT}
            value={rowCount || 10}
            onChange={(e) => onRowCountChange(parseInt(e.target.value) || 10)}
            className="w-16 h-9 text-xs border-0"
            aria-label={`Number of data rows to generate (max: ${MAX_ROW_COUNT})`}
          />
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onGenerateSQL}
              disabled={isGenerating || apiKeyMissing || nodesCount === 0}
              size="icon"
              className="h-9 w-9"
              aria-label="Generate SQL"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {isGenerating
                ? "Generating..."
                : nodesCount === 0
                ? "Add tables to generate SQL"
                : "Generate SQL statements"}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default DiagramFloatingToolbar;
