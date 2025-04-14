export type FieldType = 
  | "INT" 
  | "TINYINT"
  | "SMALLINT" 
  | "MEDIUMINT"
  | "BIGINT" 
  | "FLOAT" 
  | "DOUBLE" 
  | "DECIMAL" 
  | "VARCHAR" 
  | "CHAR" 
  | "TEXT" 
  | "DATE" 
  | "DATETIME" 
  | "TIMESTAMP" 
  | "TIME" 
  | "YEAR" 
  | "BOOLEAN" 
  | "ENUM" 
  | "JSON";

export type DatabaseType = "MySQL" | "PostgreSQL" | "SQLite" | "Oracle";

// Define a more specific type for table row data
export type TableRowData = Record<string, string | number | boolean | null>;

export interface TableField {
  id: string;
  name: string;
  type: FieldType;
  length?: number;
  primaryKey: boolean;
  unique?: boolean;
  autoIncrement: boolean;
  nullable: boolean;
  description: string;
  contextHint?: string;
}

export interface TableDefinition {
  name: string;
  fields: TableField[];
  databaseType: DatabaseType;
  contextDescription?: string;
  rowCount?: number;
}

export interface GeneratedData {
  createTableSQL?: string;
  insertDataSQL?: string;
  rawData?: TableRowData[] | string[];
}


export interface GeminiRequestBody {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
    response_mime_type?: string;
    response_schema?: Record<string, unknown>;
  };
}

// Project and Table models for multi-table support
export interface Project {
  id: string;
  name: string;
  description?: string;
  userId: string; // Foreign key to user
  databaseType: DatabaseType; // Moving database type to project level
  geminiApiKey?: string | null; // Optional custom API key for this project
  createdAt: string;
  updatedAt: string;
  expanded?: Record<string, any>; // For expanded relations
}

export interface Table {
  id: string;
  name: string;
  description?: string;
  projectId: string; // Foreign key to project
  contextDescription?: string;
  createdAt: string;
  updatedAt: string;
  expanded?: Record<string, any>; // For expanded relations
}

export interface TableRelation {
  id: string;
  sourceTableId: string;
  targetTableId: string;
  sourceFieldId: string;
  targetFieldId: string;
  relationType: "one-to-one" | "one-to-many" | "many-to-many";
}
