/**
 * Utility functions for API key validation that can be used in both hooks and services
 */

import { Project } from "@/types/types";

/**
 * Validates if a Gemini API key exists and is not expired
 * @returns {Object} Validation result with the following properties:
 * @returns {boolean} valid - Whether the API key is valid
 * @returns {Error} [error] - Error object if validation fails
 * @returns {string} [apiKey] - The valid API key if found
 */
export function validateApiKey(): { valid: boolean; error?: Error; apiKey?: string } {
  try {
    // Check for API key in local storage
    const apiKey = localStorage.getItem("gemini_api_key");

    // Check if API key is expired
    const expiryDateStr = localStorage.getItem("gemini_api_key_expiry_date");
    if (expiryDateStr) {
      const expiryDate = parseInt(expiryDateStr, 10);
      if (Date.now() > expiryDate) {
        // Key is expired, clean it up
        localStorage.removeItem("gemini_api_key");
        localStorage.removeItem("gemini_api_key_expiry_date");
        return {
          valid: false,
          error: new Error(
            "API key has expired. Please enter a new key in settings."
          )
        };
      }
    }

    if (!apiKey) {
      return {
        valid: false,
        error: new Error(
          "No Gemini API key found. Please enter an API key in settings to generate data."
        )
      };
    }

    return { valid: true, apiKey };
  } catch (error) {
    return { valid: false, error: error instanceof Error ? error : new Error(String(error)) };
  }
}

/**
 * Gets the appropriate API key to use based on project settings or global settings
 * 
 * @param project - Optional project that may have a custom API key
 * @returns The API key to use, or throws an error if none is available
 */
export function getApiKey(project?: Project | null): string {
  // Check for project-specific API key first
  if (project?.geminiApiKey) {
    return project.geminiApiKey;
  }
  
  // Fall back to global API key
  const validation = validateApiKey();
  
  if (!validation.valid || !validation.apiKey) {
    throw new Error(
      validation.error?.message || 
      "No API key available. Please set a global API key in settings or a project-specific key."
    );
  }
  
  return validation.apiKey;
}