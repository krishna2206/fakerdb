import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TemplateData, TemplateVariation } from "@/types/types";
import React from "react";
import { truncateText } from "../../utils/templateUtils";

interface TemplateVariationListProps {
  template: TemplateData;
  onSelectVariation: (variation: TemplateVariation) => void;
  onBack: () => void;
}

export const TemplateVariationList: React.FC<TemplateVariationListProps> = ({
  template,
  onSelectVariation,
  onBack,
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
    <div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-3"
        onClick={onBack}
      >
        ← Back to Templates
      </Button>
      <div className="flex flex-col gap-3 max-h-[450px] overflow-y-auto">
        {template.variations.map((variation) => (
          <div 
            key={variation.id}
            className="flex flex-col p-3 rounded-md border hover:border-primary hover:bg-muted/40 cursor-pointer transition-colors"
            onClick={() => onSelectVariation(variation)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{variation.name}</h3>
              <Badge variant="secondary" className="font-normal">{variation.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{variation.description}</p>
            
            <div className="mt-4">
              <h4 className="text-xs font-medium mb-1">Examples:</h4>
              {renderExampleBadges(variation.exampleValues)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};