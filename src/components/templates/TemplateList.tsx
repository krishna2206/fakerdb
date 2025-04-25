import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllTemplateCategories, getAllTemplates } from '@/templates';
import { TemplateCategory, TemplateData, TemplateVariation } from '@/types/types';
import React, { useCallback, useState } from 'react';
import { CategoryView } from './CategoryView';
import { SearchTemplatesView } from './SearchTemplatesView';

interface TemplateListProps {
  onSelectTemplate: (template: TemplateData, variation?: TemplateVariation) => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({ 
  onSelectTemplate 
}) => {
  
  const [activeTab, setActiveTab] = useState<"all" | "categories">("all");
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | null>(null);
  const [search, setSearch] = useState("");
  
  const templates = getAllTemplates();
  const categories = React.useMemo(() => {
    return getAllTemplateCategories();
  }, []);
  
  const handleSelectTemplate = useCallback((template: TemplateData, variation?: TemplateVariation) => {
    onSelectTemplate(template, variation);
  }, [onSelectTemplate]);
  
  const handleCategorySelect = useCallback((category: TemplateCategory) => {
    setSelectedCategory(category);
  }, []);
  
  const handleBackToCategories = useCallback(() => {
    setSelectedCategory(null);
  }, []);
  
  return (
    <div className="flex flex-col gap-3">
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => {
          setActiveTab(value as "all" | "categories");
          setSelectedCategory(null);
        }}
        className="w-full"
      >
        <TabsList className="w-full mb-2 grid grid-cols-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="p-0 m-0">
          <SearchTemplatesView
            templates={templates}
            search={search}
            onSearchChange={setSearch}
            onSelectTemplate={handleSelectTemplate}
          />
        </TabsContent>
        
        <TabsContent value="categories" className="p-0 m-0">
          <CategoryView
            categories={categories}
            templates={templates}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            onTemplateSelect={handleSelectTemplate}
            onBackToCategories={handleBackToCategories}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};