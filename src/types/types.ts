export type FieldType =
  | "INT"
  | "INTEGER"
  | "TINYINT"
  | "SMALLINT"
  | "MEDIUMINT"
  | "BIGINT"
  | "FLOAT"
  | "REAL"
  | "DOUBLE"
  | "DOUBLE PRECISION"
  | "DECIMAL"
  | "NUMERIC"
  | "NUMBER"
  | "SERIAL"
  | "BINARY_FLOAT"
  | "BINARY_DOUBLE"
  | "VARCHAR"
  | "VARCHAR2"
  | "CHAR"
  | "NCHAR"
  | "NVARCHAR2"
  | "TEXT"
  | "CLOB"
  | "BLOB"
  | "DATE"
  | "DATETIME"
  | "TIMESTAMP"
  | "TIME"
  | "YEAR"
  | "INTERVAL"
  | "BOOLEAN"
  | "JSON"
  | "JSONB"
  | "XML"
  | "BYTEA";

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
  previewImage?: string;
  tableCount?: number;
  createdAt: string;
  updatedAt: string;
  expanded?: Record<string, unknown>;
}
