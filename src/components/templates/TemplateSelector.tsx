import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { dateRangeTemplate } from "@/templates";
import { TemplateData, TemplateVariation } from "@/types/types";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { DateRangePicker } from "./DateRangePicker";
import { TemplateList } from "./TemplateList";
import { TemplateVariationList } from "./TemplateVariationList";

interface TemplateSelectorProps {
  onSelectTemplate: (
    template: TemplateData,
    variation?: TemplateVariation
  ) => void;
  className?: string;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onSelectTemplate,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(
    null
  );
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);

  const handleSelectTemplate = (template: TemplateData) => {
    // Special handling for date range template
    if (template.id === dateRangeTemplate.id) {
      setSelectedTemplate(template);
      setIsDateRangePickerOpen(true);
      return;
    }

    // For templates with a single variation, select it automatically
    if (!template.variations || template.variations.length <= 1) {
      onSelectTemplate(template, template.variations?.[0]);
      setOpen(false);
    } else {
      // For templates with multiple variations, show the variation selection view
      setSelectedTemplate(template);
    }
  };

  const handleSelectVariation = (variation: TemplateVariation) => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate, variation);
      resetSelectionState();
      closeTemplateSelector();
    }
  };

  const handleDateRangeApply = (
    template: TemplateData,
    variation: TemplateVariation
  ) => {
    onSelectTemplate(template, variation);
    resetSelectionState();
    closeTemplateSelector();
  };

  // Handle back navigation from template variations or date range picker
  const handleBackToTemplates = () => {
    resetSelectionState();
  };

  // Reset internal selection state
  const resetSelectionState = () => {
    setSelectedTemplate(null);
    setIsDateRangePickerOpen(false);
  };

  const closeTemplateSelector = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`h-16 relative bg-background border border-input text-foreground hover:bg-accent hover:text-accent-foreground ${className}`}
        >
          <div className="flex items-center w-full">
            <div className="flex items-center self-stretch mr-2">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col items-start justify-center flex-1">
              <div className="flex items-center w-full">
                <span className="font-medium">Use a template</span>
              </div>
              <span className="text-xs text-muted-foreground">Pick from most common used data</span>
            </div>
            <div className="flex items-center self-stretch ml-2">
              <img 
                src="/templates-box.png" 
                alt="Templates" 
                className="h-10 w-10" 
              />
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="mb-4">
          <DialogTitle>
            {isDateRangePickerOpen
              ? "Configure Date Range"
              : selectedTemplate
              ? `Select a variation for ${selectedTemplate.name}`
              : "Select a template"}
          </DialogTitle>
        </DialogHeader>

        {isDateRangePickerOpen && selectedTemplate ? (
          <DateRangePicker
            onApply={handleDateRangeApply}
            onBack={handleBackToTemplates}
          />
        ) : selectedTemplate ? (
          <TemplateVariationList
            template={selectedTemplate}
            onSelectVariation={handleSelectVariation}
            onBack={handleBackToTemplates}
          />
        ) : (
          <TemplateList onSelectTemplate={handleSelectTemplate} />
        )}
      </DialogContent>
    </Dialog>
  );
};
