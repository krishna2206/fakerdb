/* eslint-disable no-useless-escape */
import { generateText } from "@/lib/geminiClient";
import { DatabaseType, Project } from "@/types/types";
import { getApiKey, validateApiKey } from "@/utils/apiKeyUtils";

/**
 * Converts INSERT SQL statements to CSV format using Gemini AI
 * @param insertSQL The SQL INSERT statements to convert
 * @param databaseType The database type for proper SQL parsing
 * @param project Optional project object for multi-table mode
 * @returns An object containing CSV content for each table
 */
export async function convertSQLToCSV(
  insertSQL: string,
  databaseType: DatabaseType,
  project?: Project
): Promise<Record<string, string>> {
  if (!insertSQL.trim()) {
    return {};
  }

  try {
    let apiKey: string;
    if (project) {
      apiKey = getApiKey(project);
    } else {
      const validation = validateApiKey();
      if (!validation.valid || !validation.apiKey) {
        throw new Error(
          validation.error?.message ||
            "No API key available. Please set a global API key in settings."
        );
      }
      apiKey = validation.apiKey;
    }

    const prompt = createCSVConversionPrompt(insertSQL, databaseType);

    const responseSchema = {
      type: "STRING",
      description:
        "JSON string containing an array of objects with each object having 'tableName' for table name and 'csvData' for CSV content",
    };

    const result = await generateText(prompt, apiKey, true, responseSchema);

    if (result) {
      try {
        const parsedArray = JSON.parse(result) as Array<{ tableName: string; csvData: string }>;
        // Convert array of objects to Record<string, string> format
        const resultObject: Record<string, string> = {};
        parsedArray.forEach((item) => {
          if (item.tableName && item.csvData) {
            resultObject[item.tableName] = item.csvData;
          }
        });
        return resultObject;
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        throw new Error("Failed to parse AI model response for CSV conversion");
      }
    } else {
      throw new Error(
        "Invalid response format from AI model for CSV conversion"
      );
    }
  } catch (error) {
    console.error("Error converting SQL to CSV:", error);
    throw error;
  }
}

/**
 * Creates a prompt for the AI model to convert SQL to CSV
 * @param insertSQL The INSERT SQL statements to convert
 * @param databaseType The database type for proper SQL parsing
 * @returns The formatted prompt for the AI model
 */
function createCSVConversionPrompt(
  insertSQL: string,
  databaseType: string
): string {
  return `Generate a JSON string with an array of objects, where each object has a "tableName" field for the table name and a "csvData" field for the CSV data, extracted from these ${databaseType} INSERT SQL statements:

\`\`\`sql
${insertSQL}
\`\`\`

Follow these precise data conversion and CSV formatting rules:
- Parse all tables and their column structure from the INSERT statements
- Generate one CSV file per table, with column headers as the first row
- Follow RFC 4180 CSV standard rigorously, especially for handling special characters:
  * Enclose values containing commas, quotes, or newlines in double quotes
  * For values with double quotes, escape them by doubling the quotes (e.g., "" within a quoted field)
  * Always quote text/string fields even if they don't contain special characters
- Handle all SQL data types correctly:
  * Numbers: No surrounding quotes unless part of a string field
  * Strings: Always enclosed in quotes and properly escaped
  * NULL values: Represented as empty fields in the CSV (,,)
  * Dates/Timestamps: Formatted consistently as ISO strings and enclosed in quotes
  * Boolean values: "true" or "false" without quotes
- All column names should be preserved exactly as they appear in the SQL
- Maintain the exact same data order as presented in the INSERT statements

The response must be a valid JSON array structured as follows:
[
  {
    "tableName": "table_name1",
    "csvData": "header1,header2,header3\\nvalue1,\"value2, with comma\",value3\\nvalue4,\"value with \"\"quotes\"\"\",value6"
  },
  {
    "tableName": "table_name2",
    "csvData": "header1,header2\\nvalue1,\"text, with comma\"\\nvalue3,value4"
  }
]

Where:
- Each object has a "tableName" field with the table name exactly as it appears in the SQL
- Each object has a "csvData" field containing the complete CSV string with headers in the first row
- Newlines are represented as '\\n' in the JSON string values
- Values containing commas must be enclosed in double quotes
- Double quotes within values must be escaped by doubling them
- All data types are correctly represented in their CSV form following RFC 4180

For tables with multiple INSERT statements, combine all rows into a single CSV output maintaining the original order.`;
}

/**
 * Exports a CSV file for download
 * @param csvContent The CSV content to download
 * @param fileName The name of the file to download
 */
export function downloadCSV(csvContent: string, fileName: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Creates a ZIP file containing multiple CSV files
 * @param csvByTable Object containing CSV content by table name
 * @param projectName The name of the project for the zip file name
 */
export async function downloadMultipleCSVAsZip(
  csvByTable: Record<string, string>,
  projectName: string
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  for (const [tableName, csvContent] of Object.entries(csvByTable)) {
    zip.file(`${tableName}.csv`, csvContent);
  }

  const content = await zip.generateAsync({ type: "blob" });

  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${projectName || "fakerdb"}_export.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
