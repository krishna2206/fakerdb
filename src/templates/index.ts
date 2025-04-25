import { TemplateCategory, TemplateData } from "@/types/types";
import { dateRangeTemplate } from "./date/dateRange";
import { currentDateTemplate, dateOfBirthTemplate } from "./human/dates";
import { emailTemplate } from "./human/emails";
import {
  firstNameTemplate,
  fullNameTemplate,
  lastNameTemplate,
  middleNameTemplate,
  prefixTemplate,
  suffixTemplate
} from "./human/names";
import {
  bioTemplate,
  genderTemplate,
  jobAreaTemplate,
  jobDescriptorTemplate,
  jobTitleTemplate,
  jobTypeTemplate,
  sexTemplate,
  sexTypeTemplate,
  zodiacSignTemplate
} from "./human/personal";
import { phoneNumberTemplate } from "./human/phones";

// Export all human-related templates
export const humanTemplates: TemplateData[] = [
  fullNameTemplate,
  firstNameTemplate,
  lastNameTemplate,
  middleNameTemplate,
  prefixTemplate,
  suffixTemplate,
  emailTemplate,
  phoneNumberTemplate,
  dateOfBirthTemplate,
  currentDateTemplate,
  dateRangeTemplate,
  jobTitleTemplate,
  jobAreaTemplate,
  jobDescriptorTemplate,
  jobTypeTemplate,
  genderTemplate,
  sexTemplate,
  sexTypeTemplate,
  zodiacSignTemplate,
  bioTemplate
];

export const getAllTemplates = (): TemplateData[] => {
  return [
    ...humanTemplates,
    // We can add other template categories here in the future
  ];
};

export const getTemplatesByCategory = (category: TemplateCategory): TemplateData[] => {
  return getAllTemplates().filter(template => template.category === category);
};

export const getTemplateById = (id: string): TemplateData | undefined => {
  return getAllTemplates().find(template => template.id === id);
};

export const getAllTemplateCategories = (): TemplateCategory[] => {
  const categoriesSet = new Set<TemplateCategory>();
  getAllTemplates().forEach(template => {
    categoriesSet.add(template.category);
  });
  return Array.from(categoriesSet);
};

// Export all templates for direct use
export * from "./date/dateRange";
export * from "./human/dates";
export * from "./human/emails";
export * from "./human/names";
export * from "./human/personal";
export * from "./human/phones";

