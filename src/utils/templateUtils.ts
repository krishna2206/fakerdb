import {
  TemplateCategory,
  TemplateData,
  TemplateVariation,
} from "@/types/types";
import { Book, Calendar, Car, CreditCard, FileText, Globe, MapPin, Phone, Rabbit, ShoppingBag, User, Utensils } from "lucide-react";
import React from "react";

/**
 * Get an icon component for a template category
 */
export const getCategoryIcon = (
  category: TemplateCategory
): React.ReactNode => {
  switch (category) {
    case "Person":
      return React.createElement(User, { className: "w-4 h-4" });
    case "Date":
      return React.createElement(Calendar, { className: "w-4 h-4" });
    case "Internet":
      return React.createElement(Globe, { className: "w-4 h-4" });
    case "Phone":
      return React.createElement(Phone, { className: "w-4 h-4" });
    case "Animal":
      return React.createElement(Rabbit, { className: "w-4 h-4" });
    case "Book":
      return React.createElement(Book, { className: "w-4 h-4" });
    case "Commerce":
      return React.createElement(ShoppingBag, { className: "w-4 h-4" });
    case "Finance":
      return React.createElement(CreditCard, { className: "w-4 h-4" });
    case "Food":
      return React.createElement(Utensils, { className: "w-4 h-4" });
    case "Location":
      return React.createElement(MapPin, { className: "w-4 h-4" });
    case "Lorem":
      return React.createElement(FileText, { className: "w-4 h-4" });
    case "Vehicle":
      return React.createElement(Car, { className: "w-4 h-4" });
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
