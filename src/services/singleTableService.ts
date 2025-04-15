import { generateText } from "@/lib/geminiClient";
import { GeneratedData, TableDefinition } from "@/types/types";
import { validateApiKey } from "@/utils/apiKeyUtils";

export const MAX_ROW_COUNT = 50;

/**
 * Generates sample data for a database table using the Gemini API
 * @param tableDefinition - The definition of the table including name, fields, and metadata
 * @param rowCount - Number of rows to generate (will be capped at MAX_ROW_COUNT)
 * @returns Promise resolving to generated SQL statements and data
 * @throws Error if API key is missing, expired, or if data generation fails
 */
export async function generateSingleTableData(
  tableDefinition: TableDefinition,
  rowCount: number
): Promise<GeneratedData> {
  try {
    const safeRowCount = Math.min(rowCount, MAX_ROW_COUNT);
    if (safeRowCount < rowCount) {
      console.warn(
        `Row count reduced from ${rowCount} to maximum allowed (${MAX_ROW_COUNT})`
      );
    }

    try {
      // Always use global API key for single table mode
      const validation = validateApiKey();
      if (!validation.valid || !validation.apiKey) {
        throw new Error(
          validation.error?.message ||
            "No API key available. Please set a global API key in settings."
        );
      }

      return await generateDataWithGemini(
        tableDefinition,
        safeRowCount,
        validation.apiKey
      );
    } catch (error) {
      console.error("Error using Gemini API:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error generating data:", error);
    throw error;
  }
}

/**
 * Calls the Gemini API to generate sample data based on the table definition
 * @param tableDefinition - The definition of the table including name, fields, and metadata
 * @param rowCount - Number of rows to generate
 * @param apiKey - Direct API key string
 * @returns Promise resolving to generated SQL statements and data
 * @throws Error if API request fails or response cannot be parsed
 */
async function generateDataWithGemini(
  tableDefinition: TableDefinition,
  rowCount: number,
  apiKey: string
): Promise<GeneratedData> {
  const prompt = createSingletablePrompt(tableDefinition, rowCount);

  const responseSchema = {
    type: "OBJECT",
    properties: {
      createTableSQL: {
        type: "STRING",
        description: `CREATE TABLE SQL statement specific to the ${tableDefinition.databaseType} database syntax`,
      },
      insertDataSQL: {
        type: "STRING",
        description: `INSERT statements for the sample data specific to the ${tableDefinition.databaseType} database syntax`,
      },
      rawData: {
        type: "ARRAY",
        description: `Generated sample data for ${rowCount} rows as an array of JSON strings, each representing a row of data`,
        items: {
          type: "STRING",
          description:
            "JSON string containing all field values for a single row",
        },
      },
    },
    required: ["createTableSQL", "insertDataSQL", "rawData"],
    propertyOrdering: ["createTableSQL", "insertDataSQL", "rawData"],
  };

  const result = await generateText(prompt, apiKey, true, responseSchema);

  if (!result || typeof result !== "object") {
    throw new Error("Invalid response format from AI model");
  }

  if (
    !result.createTableSQL ||
    !result.insertDataSQL ||
    !Array.isArray(result.rawData)
  ) {
    throw new Error("Incomplete data received from AI model");
  }

  if (result.rawData.length === 0) {
    throw new Error("No sample data rows were generated");
  }

  if (Array.isArray(result.rawData)) {
    const parsedData = result.rawData.map((jsonString) => {
      try {
        if (typeof jsonString === "object") return jsonString;
        return JSON.parse(jsonString);
      } catch (error) {
        console.error("Error parsing JSON string:", error, jsonString);
        return {};
      }
    });

    // Use the parsed objects as rawData
    return {
      createTableSQL: result.createTableSQL,
      insertDataSQL: result.insertDataSQL,
      rawData: parsedData,
    };
  }

  return {
    createTableSQL: result.createTableSQL,
    insertDataSQL: result.insertDataSQL,
    rawData: result.rawData,
  };
}

/**
 * Creates a detailed prompt for the Gemini AI model describing the table structure and data requirements
 * @param tableDefinition - The definition of the table including name, fields, and metadata
 * @param rowCount - Number of rows to generate
 * @returns Formatted prompt string for the AI model
 */
function createSingletablePrompt(
  tableDefinition: TableDefinition,
  rowCount: number
): string {
  // Generate field descriptions including context hints if available
  const fieldsDescription = tableDefinition.fields
    .map((field) => {
      let desc = `- ${field.name} (${field.type}${
        field.length ? `(${field.length})` : ""
      })`;
      if (field.primaryKey) desc += " PRIMARY KEY";
      if (field.autoIncrement) desc += " AUTO_INCREMENT";
      if (!field.nullable) desc += " NOT NULL";
      if (field.description) desc += ` - ${field.description}`;

      // Add context hint if available
      if (field.contextHint) {
        desc += `\n  Context: ${field.contextHint}`;
      }

      return desc;
    })
    .join("\n");

  let prompt = `Generate database content for a ${tableDefinition.databaseType} table named '${tableDefinition.name}' with the following fields:
${fieldsDescription}`;

  // Add table context if available
  if (tableDefinition.contextDescription) {
    prompt += `\n\nAdditional context about the table:\n${tableDefinition.contextDescription}`;
  }

  // Add database-specific syntax guidance
  prompt += `\n\nImportant: Follow these specific syntax rules for ${tableDefinition.databaseType}:`;

  switch (tableDefinition.databaseType) {
    case "MySQL":
      prompt += `
- Use backticks (\`table_name\`) for table and column identifiers
- Use AUTO_INCREMENT for primary key columns that need automatic incrementing
- For DATE/DATETIME columns, use 'YYYY-MM-DD' and 'YYYY-MM-DD HH:MM:SS' formats
- End the CREATE TABLE statement with "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
- For INSERT statements, use the multi-row syntax: INSERT INTO table (col1, col2) VALUES (val1, val2), (val3, val4);
- For BOOLEAN values, use 1 (true) and 0 (false)`;
      break;
    case "PostgreSQL":
      prompt += `
- Use double quotes ("table_name") for table and column identifiers
- Use SERIAL or GENERATED ALWAYS AS IDENTITY for auto-incrementing columns (not AUTO_INCREMENT)
- For JSON data, use the JSONB type with proper casting (::jsonb)
- For BOOLEAN values, use TRUE and FALSE (not 1 and 0)
- Add COMMENT ON statements as separate commands after the CREATE TABLE statement
- For timestamp values, use proper timestamp casting ('value'::timestamp)`;
      break;
    case "SQLite":
      prompt += `
- Use double quotes ("table_name") for table and column identifiers
- SQLite has only 5 storage classes: INTEGER, REAL, TEXT, BLOB, and NULL
- Use AUTOINCREMENT (must be combined with PRIMARY KEY) for auto-incrementing columns
- SQLite doesn't support complex types - use TEXT for date/time, JSON, and ENUM values
- For BOOLEAN values, use 0 and 1 as SQLite has no native BOOLEAN type`;
      break;
    case "Oracle":
      prompt += `
- Use double quotes ("table_name") for table and column identifiers
- Oracle has no auto-increment - use sequences and triggers instead
- For numeric types, use NUMBER(precision, scale)
- Use VARCHAR2 instead of VARCHAR
- For auto-incrementing columns, create a sequence (e.g., CREATE SEQUENCE seq_name) and a trigger
- For BOOLEAN values, use 1 and 0 as Oracle has no native BOOLEAN type
- For larger datasets, use individual INSERT statements
- For smaller datasets, use INSERT with SELECT UNION ALL approach
- For date/time values, use TO_TIMESTAMP('value', 'YYYY-MM-DD HH24:MI:SS')`;
      break;
  }

  // Complete the prompt with instructions for structured response
  prompt += `\n\nPlease provide:
1. CREATE TABLE SQL statement specific to ${tableDefinition.databaseType} syntax with proper indentation, formatting, and database-specific type mappings.
2. INSERT statements for the sample data in ${tableDefinition.databaseType} syntax with proper indentation, formatting, and type-specific value handling.
3. Generated sample data for ${rowCount} rows as objects with keys matching the field names.

Ensure the generated data is realistic and consistent with the field types and provided context. For example:
- For name-related fields, use realistic names
- For email fields, use realistic email addresses
- For phone fields, use realistic phone numbers
- For dates, use realistic dates
- For numeric fields, use appropriate number ranges

You will return a structured JSON response with the following fields:
- createTableSQL: A string containing the CREATE TABLE statement
- insertDataSQL: A string containing the INSERT statements
- rawData: An array of objects representing the generated data rows

Format the SQL with proper indentation and spacing to ensure readability.`;

  // Prompt used to generate the raw data used by data preview
  prompt += `\n\nPlease format the rawData as an array of JSON strings (not objects), where each string is a valid JSON object with property names matching the field names.`;

  return prompt;
}
