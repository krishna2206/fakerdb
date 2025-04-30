/* eslint-disable no-useless-escape */
import { DatabaseType } from "@/types/types";

/**
 * Converts INSERT SQL statements to CSV format
 * @param insertSQL The SQL INSERT statements to convert
 * @param databaseType The database type for proper SQL parsing
 * @returns An object containing CSV content for each table
 */
export function convertSQLToCSV(insertSQL: string, databaseType: DatabaseType): Record<string, string> {
  const csvByTable: Record<string, string> = {};
  
  if (!insertSQL) return csvByTable;
  
  // Split SQL by semicolons and line breaks to handle large statements more reliably
  const statements = insertSQL
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);
  
  for (const statement of statements) {
    // Only process INSERT statements
    if (!statement.toUpperCase().startsWith('INSERT')) continue;
    
    try {
      const { tableName, headers, rows } = parseInsertStatement(statement, databaseType);
      
      if (tableName && headers.length > 0 && rows.length > 0) {
        // Create CSV content with properly escaped values
        const headerRow = headers.map(escapeCSVField).join(',');
        const dataRows = rows.map(row => 
          row.map(escapeCSVField).join(',')
        ).join('\n');
        
        csvByTable[tableName] = `${headerRow}\n${dataRows}`;
      }
    } catch (error) {
      console.error(`Error parsing INSERT statement:`, error);
      // Continue to the next statement instead of failing completely
      continue;
    }
  }
  
  return csvByTable;
}

/**
 * Escapes a field value according to CSV standards
 * @param value The value to escape
 * @returns Properly escaped CSV field value
 */
function escapeCSVField(value: string): string {
  // If the value contains quotes, commas, or newlines, wrap in quotes and escape internal quotes
  if (value.includes('"') || value.includes(',') || value.includes('\n') || value.includes('\r')) {
    // Escape quotes by doubling them (CSV standard)
    const escapedValue = value.replace(/"/g, '""');
    return `"${escapedValue}"`;
  }
  return value;
}

/**
 * Parses an INSERT SQL statement to extract table name, column headers, and data rows
 * @param statement The SQL INSERT statement to parse
 * @param databaseType The database type for proper SQL parsing
 * @returns Object containing the table name, column headers, and data rows
 */
function parseInsertStatement(statement: string, databaseType: DatabaseType): { 
  tableName: string;
  headers: string[];
  rows: string[][];
} {
  let tableName = '';
  let headers: string[] = [];
  let rows: string[][] = [];
  
  // Extract table name with improved regex that handles quotes more reliably
  const tableNameRegex = /INSERT\s+INTO\s+(?:(?:`|"|'|\[)?([^`"'\s\[\]()]+)(?:`|"|'|\])?)/i;
  const tableMatch = statement.match(tableNameRegex);
  if (tableMatch && tableMatch[1]) {
    tableName = tableMatch[1];
  }
  
  // Extract column headers with improved pattern to handle multi-line SQL
  const headersRegex = /INSERT\s+INTO\s+(?:(?:`|"|'|\[)?[^`"'\s\[\]()]+(?:`|"|'|\])?)(?:\s+|\n)\(([^)]+)\)/i;
  const headersMatch = statement.match(headersRegex);
  if (headersMatch && headersMatch[1]) {
    headers = parseHeaderValues(headersMatch[1], databaseType);
  }
  
  // Extract values rows
  const valuesText = extractValuesText(statement);
  if (valuesText) {
    // Use the enhanced value parser for large datasets
    rows = parseInsertValues(valuesText, databaseType, headers.length);
  }
  
  return { tableName, headers, rows };
}

/**
 * Parse the column headers from the INSERT statement
 * @param headersText The text containing the column headers
 * @param databaseType The database type for proper SQL parsing
 * @returns Array of parsed header names
 */
function parseHeaderValues(headersText: string, databaseType: DatabaseType): string[] {
  const headers: string[] = [];
  
  // Tokenize the headers text properly, considering quotes and delimiters
  let currentHeader = '';
  let inQuote = false;
  let quoteChar = '';
  
  for (let i = 0; i < headersText.length; i++) {
    const char = headersText[i];
    const nextChar = i < headersText.length - 1 ? headersText[i + 1] : '';
    
    // Handle quotes
    if ((char === '"' || char === "'" || char === '`' || char === '[' || char === ']') && (!inQuote || 
        (quoteChar === '"' && char === '"') || 
        (quoteChar === "'" && char === "'") || 
        (quoteChar === '`' && char === '`') || 
        (quoteChar === '[' && char === ']'))) {
      
      if (inQuote && ((quoteChar === '[' && char === ']') || (quoteChar !== '[' && quoteChar === char))) {
        // End of quoted section
        inQuote = false;
      } else if (!inQuote) {
        // Start of quoted section
        inQuote = true;
        quoteChar = char === '[' ? '[' : char;
      }
    } 
    // Handle commas (column separators)
    else if (char === ',' && !inQuote) {
      // Add the current header to the list and reset
      headers.push(cleanHeaderName(currentHeader.trim(), databaseType));
      currentHeader = '';
    } 
    // Add character to current header
    else {
      currentHeader += char;
    }
  }
  
  // Add the last header if there's content
  if (currentHeader.trim()) {
    headers.push(cleanHeaderName(currentHeader.trim(), databaseType));
  }
  
  return headers;
}

/**
 * Clean header names by removing quotes and other database-specific decorators
 * @param headerName The raw header name
 * @param databaseType The database type for proper SQL parsing
 * @returns Cleaned header name
 */
function cleanHeaderName(headerName: string, databaseType: DatabaseType): string {
  let cleaned = headerName.trim();
  
  // Remove various types of quoting and brackets based on database type
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) ||
      (cleaned.startsWith("'") && cleaned.endsWith("'")) ||
      (cleaned.startsWith('`') && cleaned.endsWith('`')) ||
      (cleaned.startsWith('[') && cleaned.endsWith(']'))) {
    cleaned = cleaned.substring(1, cleaned.length - 1);
  }
  
  return cleaned;
}

/**
 * Extracts the VALUES portion of an INSERT statement
 * @param statement The full INSERT statement
 * @returns The values text or null if not found
 */
function extractValuesText(statement: string): string | null {
  // Enhanced pattern to capture VALUES more reliably, including multi-line statements
  const valuesMatch = statement.match(/VALUES\s*(\([\s\S]*)/i);
  if (!valuesMatch) return null;
  
  // Return everything after VALUES keyword
  return valuesMatch[1].trim();
}

/**
 * Parser for INSERT VALUES that handles large datasets more efficiently
 * @param valuesText The text containing the VALUES portion
 * @param databaseType The database type for proper SQL parsing
 * @param expectedColumnCount Expected number of columns (for validation)
 * @returns Array of rows, each containing an array of field values
 */
function parseInsertValues(
  valuesText: string, 
  databaseType: DatabaseType, 
  expectedColumnCount: number
): string[][] {
  const rows: string[][] = [];

  // State machine variables
  let currentPosition = 0;
  let inRow = false;
  let rowStartPosition = 0;
  
  // Process the values text character by character
  while (currentPosition < valuesText.length) {
    const char = valuesText[currentPosition];
    
    // Handle row start
    if (char === '(' && !inRow) {
      inRow = true;
      rowStartPosition = currentPosition;
    }
    // Handle row end
    else if (char === ')' && inRow) {
      const rowContent = valuesText.substring(rowStartPosition + 1, currentPosition);
      const rowValues = parseRowValues(rowContent, databaseType);
      
      // Only add rows with the correct number of columns if expectedColumnCount is provided
      if (rowValues.length === expectedColumnCount || expectedColumnCount === 0) {
        rows.push(rowValues);
      }
      
      inRow = false;
    }
    
    currentPosition++;
  }
  
  return rows;
}

/**
 * Parse a single row of values from an INSERT statement
 * @param rowContent The content between the parentheses for a single row
 * @param databaseType The database type for proper SQL parsing
 * @returns Array of field values for this row
 */
function parseRowValues(rowContent: string, databaseType: DatabaseType): string[] {
  const values: string[] = [];
  let currentPosition = 0;
  let currentValue = '';
  let inQuote = false;
  let quoteChar = '';
  let nestedLevel = 0;
  
  // Process the row content character by character
  while (currentPosition < rowContent.length) {
    const char = rowContent[currentPosition];
    const nextChar = currentPosition < rowContent.length - 1 ? rowContent[currentPosition + 1] : '';
    
    // Handle quotes
    if ((char === "'" || char === '"' || char === '`') && (nestedLevel === 0 || inQuote)) {
      if (inQuote && char === quoteChar) {
        // Check for escaped quotes (e.g., '' in SQL)
        if (nextChar === char) {
          // This is an escaped quote, add to value and skip next char
          currentValue += char;
          currentPosition++;
        } else {
          // End of quoted value
          inQuote = false;
        }
      } else if (!inQuote) {
        // Start of quoted value
        inQuote = true;
        quoteChar = char;
      } else {
        // A different quote inside another quote - add literally
        currentValue += char;
      }
    }
    // Handle nested structures (JSON objects/arrays, function calls, etc.)
    else if ((char === '{' || char === '[' || char === '(') && !inQuote) {
      nestedLevel++;
      currentValue += char;
    }
    else if ((char === '}' || char === ']' || char === ')') && !inQuote) {
      nestedLevel--;
      currentValue += char;
    }
    // Handle commas as value separators (when not in quotes or nested structures)
    else if (char === ',' && !inQuote && nestedLevel === 0) {
      values.push(formatValueForCSV(currentValue.trim(), databaseType));
      currentValue = '';
    }
    else {
      currentValue += char;
    }
    
    currentPosition++;
  }
  
  // Add the last value if there is one
  if (currentValue.trim()) {
    values.push(formatValueForCSV(currentValue.trim(), databaseType));
  }
  
  return values;
}

/**
 * Formats a value for CSV output, handling escaping and data type conversions
 * @param value The value to format
 * @param databaseType The database type for proper SQL parsing
 * @returns Value properly formatted for CSV
 */
function formatValueForCSV(value: string, databaseType: DatabaseType): string {
  // Handle NULL values
  if (value.toUpperCase() === 'NULL') {
    return '';
  }
  
  // Handle JSON values - preserve the JSON structure
  if ((value.startsWith('{') && value.endsWith('}')) || 
      (value.startsWith('[') && value.endsWith(']'))) {
    try {
      // Try to parse it as JSON to validate
      JSON.parse(value);
      // Valid JSON, return as is but properly escaped for CSV
      return value;
    } catch (e) {
      // Not valid JSON, proceed with normal processing
    }
  }
  
  // Handle quoted string literals
  if ((value.startsWith("'") && value.endsWith("'")) || 
      (value.startsWith('"') && value.endsWith('"')) || 
      (value.startsWith('`') && value.endsWith('`'))) {
    // Remove the outer quotes
    let formatted = value.substring(1, value.length - 1);
    
    // Unescape SQL escaped quotes
    formatted = formatted.replace(/''/g, "'").replace(/""/g, '"').replace(/``/g, '`');
    
    return formatted;
  }
  
  // Handle database-specific conversions
  if (databaseType === 'PostgreSQL' && value.includes('::')) {
    // Handle PostgreSQL casting syntax (e.g., '2023-01-01'::date)
    const parts = value.split('::');
    let formatted = parts[0];
    
    // Remove quotes if present
    if ((formatted.startsWith("'") && formatted.endsWith("'")) || 
        (formatted.startsWith('"') && formatted.endsWith('"'))) {
      formatted = formatted.substring(1, formatted.length - 1);
    }
    
    return formatted;
  }
  
  return value;
}

/**
 * Exports a CSV file for download
 * @param csvContent The CSV content to download
 * @param fileName The name of the file to download
 */
export function downloadCSV(csvContent: string, fileName: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
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
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();
  
  for (const [tableName, csvContent] of Object.entries(csvByTable)) {
    zip.file(`${tableName}.csv`, csvContent);
  }
  
  const content = await zip.generateAsync({ type: 'blob' });
  
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${projectName || 'fakerdb'}_export.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}