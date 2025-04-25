import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TemplateData } from "@/types/types";
import { Search } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { TemplateListItem } from "./TemplateListItem";

interface SearchTemplatesViewProps {
  templates: TemplateData[];
  search: string;
  onSearchChange: (value: string) => void;
  onSelectTemplate: (template: TemplateData) => void;
}

export const SearchTemplatesView: React.FC<SearchTemplatesViewProps> = ({
  templates,
  search,
  onSearchChange,
  onSelectTemplate,
}) => {
  // Focus the search input when the component mounts
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Filter templates based on search term
  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-10"
          ref={searchInputRef}
        />
        {search && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            onClick={() => onSearchChange("")}
          >
            <span className="sr-only">Clear search</span>
            <span className="h-6 w-4">x</span>
          </Button>
        )}
      </div>

      <div className="max-h-[350px] my-2 overflow-y-auto grid gap-3">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <TemplateListItem
              key={template.id}
              template={template}
              onClick={onSelectTemplate}
            />
          ))
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No templates found
          </div>
        )}
      </div>
    </>
  );
};
