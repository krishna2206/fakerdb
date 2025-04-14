import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import {
  ArrowLeft, Save,
  Settings,
  Sparkles,
  Table
} from "lucide-react";
import React from "react";

interface DiagramToolbarProps {
  projectName: string;
  databaseType: string;
  hasUnsavedChanges: boolean;
  isGenerating: boolean;
  apiKeyMissing?: boolean;
  user?: { name?: string; email?: string; picture?: string };
  onBack: () => void;
  onAddTable: () => void;
  onSave: () => void;
  onGenerateSQL: () => void;
  onOpenProjectSettings: () => void;
  onOpenSettings: () => void;
  onLogout?: () => void;
}

const DiagramToolbar: React.FC<DiagramToolbarProps> = ({
  projectName,
  databaseType,
  hasUnsavedChanges,
  isGenerating,
  apiKeyMissing,
  user,
  onBack,
  onAddTable,
  onSave,
  onGenerateSQL,
  onOpenProjectSettings,
  onOpenSettings,
  onLogout,
}) => {
  return (
    <div className="border-b border-border py-2 px-4 flex justify-between items-center bg-card h-16">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">
          {projectName || "Database Designer"}
        </h1>
        <div className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded">
          {databaseType}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onAddTable}
          className="h-10 flex items-center"
        >
          <Table className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Add Table</span>
        </Button>
        <Button
          variant={hasUnsavedChanges ? "default" : "ghost"}
          size="sm"
          onClick={onSave}
          className="h-10 flex items-center"
        >
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Save</span>
        </Button>
        <Button
          onClick={onGenerateSQL}
          disabled={isGenerating || apiKeyMissing}
          size="sm"
          className="h-10 flex items-center"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Generate SQL</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenProjectSettings}
          className="h-10 flex items-center"
        >
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Project settings</span>
        </Button>
        
        {/* User profile avatar and dropdown */}
        {user && (
          <div className="ml-2 flex items-center">
            <UserAvatar 
              user={user} 
              onLogout={onLogout}
              onSettingsClick={onOpenSettings}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagramToolbar;