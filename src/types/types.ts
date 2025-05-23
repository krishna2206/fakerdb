// Template categories
export type TemplateCategory =
  | "Person"
  | "Date"
  | "Internet"
  | "Phone"
  | "Animal"
  | "Book"
  | "Commerce"
  | "Finance"
  | "Food"
  | "Location"
  | "Lorem"
  | "Vehicle";

// Template variation types
export type TemplateVariationType =
  | "Country"
  | "Provider"
  | "Format"
  | "Source"
  | "Age Range"
  | "Gender"
  | "Style"
  | "Field"
  | "Default"
  | "Category"
  | "Protocol"
  | "Strength"
  | "Extended"
  | "Browser"
  | "Device"
  | "Genre"
  | "Currency"
  | "Range"
  | "Quality"
  | "Region"
  | "Length"
  | "Quantity"
  | "Brand"
  | "Type"
  | "Model"
  | "Color"
  | "Manufacturer"
  | "VIN"
  | "Fuel";

// Template data structure
export interface TemplateData {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  fieldType: FieldType;
  defaultLength?: number;
  variations: TemplateVariation[];
}

// Template variation structure
export interface TemplateVariation {
  id: string;
  name: string;
  type: TemplateVariationType;
  description: string;
  contextHint: string;
  exampleValues: string[];
}

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
  template?: TemplateData;
  templateVariation?: TemplateVariation;
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
}

export interface Dataset {
  id: string;
  diagramId: string;
  projectId?: string; // Added for convenience when joining with diagrams
  createTableSQL: string;
  insertDataSQL: string;
  tableCount: number;
  rowCount: number;
  created: string;
  updated: string;
}

export interface SQLEditResult {
  updatedSQL: string;
  modifiedLines: number[];
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
  system_instruction?: {
    parts: Array<{
      text: string;
    }>;
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
