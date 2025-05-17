import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface FloatingHeaderProps {
  projectName: string;
  databaseType: string;
  onBack: () => void;
}

const FloatingHeader: React.FC<FloatingHeaderProps> = ({
  projectName,
  databaseType,
  onBack,
}) => {
  return (
    <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={onBack}
        className="h-10 w-10 bg-card shadow-md hover:bg-accent"
        title="Back to projects"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2">
        <h1 className="text-base font-medium text-foreground/90">
          {projectName || "Database Designer"}
        </h1>
        <div className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded">
          {databaseType}
        </div>
      </div>
    </div>
  );
};

export default FloatingHeader;
