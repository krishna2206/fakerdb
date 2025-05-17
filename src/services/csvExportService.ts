interface CSVData {
  headers: string;
  values: string[];
}

interface ParsedTable {
  tableName: string;
  csvData: CSVData;
}

export async function convertSQLToCSV(
  insertDataSQL: string
): Promise<Record<string, string>> {
  if (!insertDataSQL.trim()) {
    return {};
  }

  try {
    const parsedTables = parseSQLInsertStatements(insertDataSQL);
    
    const resultObject: Record<string, string> = {};
    parsedTables.forEach((table) => {
      const csvString = [table.csvData.headers, ...table.csvData.values].join("\n");
      resultObject[table.tableName] = csvString;
    });

    return resultObject;
  } catch (error) {
    console.error("Error converting SQL to CSV:", error);
    throw error;
  }
}

function parseSQLInsertStatements(sql: string): ParsedTable[] {
  const tables: ParsedTable[] = [];
  const statements = splitIntoStatements(sql);
  
  // Process each statement
  statements.forEach(stmt => {
    const parsedStmt = parseInsertStatement(stmt);
    if (parsedStmt) {
      // Check if we already have this table
      const existingTableIndex = tables.findIndex(t => t.tableName === parsedStmt.tableName);
      
      if (existingTableIndex >= 0) {
        // Append values to existing table
        tables[existingTableIndex].csvData.values.push(...parsedStmt.csvData.values);
      } else {
        // Add as new table
        tables.push(parsedStmt);
      }
    }
  });
  
  return tables;
}

function splitIntoStatements(sql: string): string[] {
  // Remove SQL comments
  const sqlWithoutComments = sql.replace(/--[^\n]*(\n|$)/g, '');
  
  // Split by semicolons but preserve those inside quotes
  const result: string[] = [];
  let currentStmt = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inBacktick = false;
  let escapeNext = false;
  
  for (let i = 0; i < sqlWithoutComments.length; i++) {
    const char = sqlWithoutComments[i];
    
    if (escapeNext) {
      currentStmt += char;
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      currentStmt += char;
      escapeNext = true;
      continue;
    }
    
    if (char === "'" && !escapeNext) {
      inSingleQuote = !inSingleQuote;
    } else if (char === '"' && !escapeNext) {
      inDoubleQuote = !inDoubleQuote;
    } else if (char === '`' && !escapeNext) {
      inBacktick = !inBacktick;
    }
    
    const inQuote = inSingleQuote || inDoubleQuote || inBacktick;
    
    if (char === ';' && !inQuote) {
      if (currentStmt.trim()) {
        result.push(currentStmt.trim());
      }
      currentStmt = '';
    } else {
      currentStmt += char;
    }
  }
  
  // Add the last statement if it exists
  if (currentStmt.trim()) {
    result.push(currentStmt.trim());
  }
  
  return result.filter(stmt => 
    stmt.toUpperCase().includes('INSERT INTO') && 
    stmt.toUpperCase().includes('VALUES')
  );
}

function parseInsertStatement(stmt: string): ParsedTable | null {
  // Enhanced regex to extract table name and columns, handling backticks and double quotes better
  const tableRegex = /INSERT\s+INTO\s+[`"']?([^\s`"'(]+)[`"']?\s*\(([^)]+)\)/i;
  const tableMatch = stmt.match(tableRegex);
  
  if (!tableMatch) return null;
  
  const tableName = tableMatch[1].replace(/[`"']/g, '');
  const columns = tableMatch[2].split(',').map(col => col.trim().replace(/[`"']/g, ''));
  
  // Extract values
  const values: string[][] = [];
  
  // Extract the entire VALUES section, including all rows
  const valuesRegex = /VALUES\s*\((.+)(?:;|\s*$)/is;
  const valuesMatch = stmt.match(valuesRegex);
  
  if (!valuesMatch) return null;
  
  // Handle function calls like TO_DATE by preprocessing the values section
  let valuesSection = valuesMatch[1];
  
  // For single-row inserts, add closing parenthesis if it was captured in the regex
  if (valuesSection.endsWith(')')) {
    valuesSection = '(' + valuesSection;
  } else {
    valuesSection = '(' + valuesSection + ')';
  }
  
  // Parse individual value groups (rows) with better handling of nested parentheses and functions
  const valueRowRegex = /\(([^()]*(?:\([^()]*(?:\([^()]*\)[^()]*)*\)[^()]*)*)\)/g;
  let match;
  
  while ((match = valueRowRegex.exec(valuesSection)) !== null) {
    const rowValues = parseValueRow(match[1]);
    if (rowValues.length > 0) {
      values.push(rowValues);
    }
  }
  
  // Convert to CSV format
  const csvValues = values.map(row => {
    return row.map(value => {
      // Properly escape values that need quotes
      if (value === null || value === 'NULL') return '';
      
      // Handle SQL functions like TO_DATE by extracting the date value
      if (value.toUpperCase().includes('TO_DATE')) {
        const dateMatch = value.match(/'([^']+)'/);
        return dateMatch ? dateMatch[1] : value;
      }
      
      // Remove surrounding quotes if they exist
      const cleanValue = value.replace(/^(['"])(.*)\1$/, '$2');
      
      // Check if we need to quote this value
      const needsQuotes = cleanValue.includes(',') || cleanValue.includes('"') || cleanValue.includes('\n');
      
      if (needsQuotes) {
        // Double escape quotes for CSV format
        return `"${cleanValue.replace(/"/g, '""')}"`;
      }
      
      return cleanValue;
    }).join(',');
  });
  
  return {
    tableName,
    csvData: {
      headers: columns.join(','),
      values: csvValues
    }
  };
}

function parseValueRow(rowStr: string): string[] {
  const values: string[] = [];
  let currentValue = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let parenthesesDepth = 0;
  let escapeNext = false;
  
  for (let i = 0; i < rowStr.length; i++) {
    const char = rowStr[i];
    
    if (escapeNext) {
      currentValue += char;
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      currentValue += char;
      escapeNext = true;
      continue;
    }
    
    if (char === "'" && !escapeNext) {
      inSingleQuote = !inSingleQuote;
      currentValue += char;
      continue;
    }
    
    if (char === '"' && !escapeNext) {
      inDoubleQuote = !inDoubleQuote;
      currentValue += char;
      continue;
    }
    
    // Track parentheses depth for handling functions like TO_DATE()
    if (char === '(' && !inSingleQuote && !inDoubleQuote) {
      parenthesesDepth++;
      currentValue += char;
      continue;
    }
    
    if (char === ')' && !inSingleQuote && !inDoubleQuote) {
      parenthesesDepth--;
      currentValue += char;
      continue;
    }
    
    const inQuote = inSingleQuote || inDoubleQuote;
    
    // Only split by comma if we're not inside quotes and not inside a function call
    if (char === ',' && !inQuote && parenthesesDepth === 0) {
      values.push(currentValue.trim());
      currentValue = '';
      continue;
    }
    
    currentValue += char;
  }
  
  // Add the last value
  if (currentValue.trim()) {
    values.push(currentValue.trim());
  }
  
  return values;
}

export function downloadCSV(csvContent: string, fileName: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadMultipleCSVAsZip(
  csvByTable: Record<string, string>,
  exportName: string
): Promise<void> {
  try {
    const JSZip = (await import("jszip")).default;
    
    const zip = new JSZip();

    Object.entries(csvByTable).forEach(([tableName, csvContent]) => {
      zip.file(`${tableName}_data.csv`, csvContent);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportName}_csv_export.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error creating ZIP file:", error);
    throw new Error("Failed to create ZIP file for download");
  }
}
