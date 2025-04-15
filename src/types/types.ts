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

export interface Project {
  id: string;
  name: string;
  description?: string;
  userId: string;
  databaseType: DatabaseType;
  geminiApiKey?: string | null;
  createdAt: string;
  updatedAt: string;
  expanded?: Record<string, unknown>;
}
