import { TemplateCategory, TemplateData } from "@/types/types";

// Import all template modules
import * as animalModule from "./animal";
import * as bookModule from "./book";
import * as commerceModule from "./commerce";
import * as dateModule from "./date";
import * as financeModule from "./finance";
import * as foodModule from "./food";
import * as internetModule from "./internet";
import * as locationModule from "./location";
import * as loremModule from "./lorem";
import * as personModule from "./person";
import * as phoneModule from "./phone";
import * as vehicleModule from "./vehicle";

/**
 * Automatically collects all template objects from imported modules
 * This approach eliminates the need to manually list each template
 */
const collectAllTemplates = (): TemplateData[] => {
  const modules = [
    personModule,
    dateModule,
    internetModule,
    phoneModule,
    animalModule,
    bookModule,
    commerceModule,
    financeModule,
    foodModule,
    locationModule,
    loremModule,
    vehicleModule,
  ];

  const templates: TemplateData[] = [];
  
  // Extract all exported template objects from each module
  modules.forEach(module => {
    Object.values(module).forEach(exportedItem => {
      // Add any object that matches the TemplateData interface
      if (
        exportedItem && 
        typeof exportedItem === 'object' && 
        'id' in exportedItem &&
        'name' in exportedItem &&
        'category' in exportedItem
      ) {
        templates.push(exportedItem as TemplateData);
      }
    });
  });
  
  return templates;
};

/**
 * Gets all available templates from all template modules
 * When adding new template files, just import the module above and add it to the modules array
 */
export const getAllTemplates = (): TemplateData[] => {
  return collectAllTemplates();
};

/**
 * Filter templates by category
 */
export const getTemplatesByCategory = (category: TemplateCategory): TemplateData[] => {
  return getAllTemplates().filter(template => template.category === category);
};

/**
 * Find a template by its ID
 */
export const getTemplateById = (id: string): TemplateData | undefined => {
  return getAllTemplates().find(template => template.id === id);
};

/**
 * Get all unique template categories
 */
export const getAllTemplateCategories = (): TemplateCategory[] => {
  const categoriesSet = new Set<TemplateCategory>();
  getAllTemplates().forEach(template => {
    categoriesSet.add(template.category);
  });
  return Array.from(categoriesSet);
};

// Re-export all templates for direct imports
export * from "./animal";
export * from "./book";
export * from "./commerce";
export * from "./date";
export * from "./finance";
export * from "./food";
export * from "./internet";
export * from "./location";
export * from "./lorem";
export * from "./person";
export * from "./phone";
export * from "./vehicle";

