import { generateText } from "@/lib/geminiClient";
import { Project } from "@/types/types";
import { getApiKey, validateApiKey } from "@/utils/apiKeyUtils";

/**
 * Refines SQL statements using the Gemini AI model
 * @param {string} sql - The original SQL statement to refine
 * @param {"create" | "insert"} sqlType - The type of SQL statement (create or insert)
 * @param {string} databaseType - The target database type (e.g., MySQL, PostgreSQL)
 * @param {Project} [project] - Optional project object for multi-table mode
 * @returns {Promise<string>} The refined SQL statement
 * @throws {Error} If refinement fails or API key is invalid
 */
export async function refineSQLWithGemini(
  sql: string,
  sqlType: "create" | "insert",
  databaseType: string,
  project?: Project
): Promise<string> {
  try {
    const prompt = createSQLRefinementPrompt(sql, sqlType, databaseType);

    const responseSchema = {
      type: "OBJECT",
      properties: {
        refinedSQL: {
          type: "STRING",
          description: `Refined ${sqlType.toUpperCase()} SQL statement for ${databaseType} with proper syntax and formatting`,
        },
      },
      required: ["refinedSQL"],
    };
    
    let apiKey: string;
    
    // If project is provided (multi-table mode), use project-specific API key
    if (project) {
      apiKey = getApiKey(project);
    } else {
      // Otherwise (single-table mode), use the global API key
      const validation = validateApiKey();
      if (!validation.valid || !validation.apiKey) {
        throw new Error(
          validation.error?.message || 
          "No API key available. Please set a global API key in settings."
        );
      }
      apiKey = validation.apiKey;
    }

    const result = await generateText(prompt, apiKey, true, responseSchema);

    if (result && result.refinedSQL) {
      return result.refinedSQL;
    } else {
      throw new Error(
        "Invalid response format from AI model for SQL refinement"
      );
    }
  } catch (error) {
    console.error("Error refining SQL:", error);
    throw error;
  }
}

/**
 * Creates a prompt for the AI model to refine SQL statements
 * @param {string} sql - The original SQL statement to refine
 * @param {"create" | "insert"} sqlType - The type of SQL statement (create or insert)
 * @param {string} databaseType - The target database type (e.g., MySQL, PostgreSQL)
 * @returns {string} The formatted prompt for the AI model
 * @private
 */
function createSQLRefinementPrompt(
  sql: string,
  sqlType: "create" | "insert",
  databaseType: string
): string {
  return `You are an expert SQL developer. Please review and fix the following ${sqlType.toUpperCase()} SQL statement for ${databaseType}. 
Fix any syntax errors and optimize the structure if needed.

\`\`\`sql
${sql}
\`\`\`

Please provide the refined SQL statement with proper indentation and formatting to ensure readability.
Return only the refined SQL statement without any explanations or additional commentary.`;
}