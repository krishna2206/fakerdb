import { TemplateData, TemplateVariation } from "@/types/types";
import { FileText, X } from "lucide-react";
import React from "react";

interface TemplateBadgeProps {
  template: TemplateData;
  variation?: TemplateVariation;
  onRemove: () => void;
}

export const TemplateBadge: React.FC<TemplateBadgeProps> = ({
  template,
  variation,
  onRemove,
}) => {
  return (
    <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
      <FileText className="h-3 w-3 mr-1" />
      {template.name}
      {variation && variation.name !== "Default" && (
        <span className="text-blue-600 dark:text-blue-400 ml-1">: {variation.name}</span>
      )}
      <button
        type="button"
        className="ml-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-200 hover:bg-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label={`Remove ${template.name} template`}
      >
        <X className="h-2 w-2 text-blue-700 dark:text-blue-300" />
      </button>
    </div>
  );
};
