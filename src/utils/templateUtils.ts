import {
  TemplateCategory,
  TemplateData,
  TemplateVariation,
} from "@/types/types";
import { Building, DollarSign, Globe, MapPin, User } from "lucide-react";
import React from "react";

/**
 * Get an icon component for a template category
 */
export const getCategoryIcon = (
  category: TemplateCategory
): React.ReactNode => {
  switch (category) {
    case "Human Data":
      return React.createElement(User, { className: "w-4 h-4" });
    case "Business Data":
      return React.createElement(Building, { className: "w-4 h-4" });
    case "Location Data":
      return React.createElement(MapPin, { className: "w-4 h-4" });
    case "Financial Data":
      return React.createElement(DollarSign, { className: "w-4 h-4" });
    case "Internet Data":
      return React.createElement(Globe, { className: "w-4 h-4" });
    default:
      return null;
  }
};

/**
 * Find a specific variation in a template by name
 */
export const findTemplateVariation = (
  template: TemplateData | null,
  variationName: string
): TemplateVariation | undefined => {
  if (!template) return undefined;
  return template.variations.find((v) => v.name === variationName);
};

/**
 * Truncate text with ellipsis for display
 */
export const truncateText = (text: string, maxLength: number = 30): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
};
