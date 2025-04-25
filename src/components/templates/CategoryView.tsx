import { Button } from "@/components/ui/button";
import { TemplateCategory, TemplateData } from "@/types/types";
import { ChevronRight } from "lucide-react";
import React from "react";
import { getCategoryIcon } from "../../utils/templateUtils";
import { TemplateListItem } from "./TemplateListItem";

interface CategoryViewProps {
  categories: TemplateCategory[];
  templates: TemplateData[];
  selectedCategory: TemplateCategory | null;
  onCategorySelect: (category: TemplateCategory) => void;
  onTemplateSelect: (template: TemplateData) => void;
  onBackToCategories: () => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categories,
  templates,
  selectedCategory,
  onCategorySelect,
  onTemplateSelect,
  onBackToCategories,
}) => {
  if (!selectedCategory) {
    return (
      <div className="max-h-[350px] overflow-y-auto grid gap-3">
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center justify-between p-3 rounded-md border hover:border-primary hover:bg-muted/40 cursor-pointer transition-colors"
            onClick={() => onCategorySelect(category)}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full mr-3">
                {getCategoryIcon(category)}
              </div>
              <h3 className="font-semibold">{category}</h3>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-h-[350px] overflow-y-auto">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-2"
        onClick={onBackToCategories}
      >
        ← Back to Categories
      </Button>
      <div className="grid gap-3">
        {templates
          .filter(template => template.category === selectedCategory)
          .map((template) => (
            <TemplateListItem 
              key={template.id} 
              template={template} 
              onClick={onTemplateSelect} 
            />
          ))}
      </div>
    </div>
  );
};