import { TemplateData } from "@/types/types";

export const dateRangeTemplate: TemplateData = {
  id: "date-range-template", 
  name: "Date Range",
  category: "Business Data",
  description: "Custom date range for generating dates between two points",
  fieldType: "DATE",
  variations: [
    {
      id: "date-range-30days",
      name: "Last 30 Days",
      type: "Format",
      description: "Dates within the last 30 days",
      contextHint: "Generate dates within the last 30 days in ISO format",
      exampleValues: [
        
      ]
    },
    {
      id: "date-range-90days",
      name: "Last 90 Days",
      type: "Format",
      description: "Dates within the last 90 days",
      contextHint: "Generate dates within the last 90 days in ISO format",
      exampleValues: [
        
      ]
    },
    {
      id: "date-range-year",
      name: "Last Year",
      type: "Format",
      description: "Dates within the last year",
      contextHint: "Generate dates within the last year in ISO format",
      exampleValues: [
        
      ]
    },
    {
      id: "date-range-custom",
      name: "Custom Range",
      type: "Format",
      description: "Pick a custom date range",
      contextHint: "Generate dates between a custom date range in ISO format",
      exampleValues: [
        
      ]
    }
  ]
};