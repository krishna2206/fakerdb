import { Badge } from "@/components/ui/badge";
import { TemplateData } from "@/types/types";
import React from "react";
import { truncateText } from "../../utils/templateUtils";

interface TemplateListItemProps {
  template: TemplateData;
  onClick: (template: TemplateData) => void;
}

export const TemplateListItem: React.FC<TemplateListItemProps> = ({
  template,
  onClick,
}) => {
  const renderExampleBadges = (examples: string[]) => {
    return (
      <div className="flex flex-wrap gap-1">
        {examples.map((example, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-xs font-normal bg-background/60 px-1.5 py-0 h-5"
            title={example}
          >
            {truncateText(example)}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div
      className="flex flex-col p-3 rounded-md border hover:border-primary hover:bg-muted/40 cursor-pointer transition-colors"
      onClick={() => onClick(template)}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{template.name}</h3>
        <Badge variant="secondary" className="font-normal">
          {template.category}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        {template.description}
      </p>

      {template.variations && template.variations[0]?.exampleValues && (
        <div className="mt-4">
          <h4 className="text-xs font-medium mb-1">Examples:</h4>
          {renderExampleBadges(template.variations[0].exampleValues)}
        </div>
      )}
    </div>
  );
};
