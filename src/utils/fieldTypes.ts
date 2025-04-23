import { DatabaseType, FieldType } from "../types/types";

export const databaseTypes: Record<DatabaseType, FieldType[]> = {
  MySQL: [
    "INT",
    "TINYINT",
    "SMALLINT",
    "MEDIUMINT",
    "BIGINT",
    "DECIMAL",
    "FLOAT",
    "DOUBLE",
    "CHAR",
    "VARCHAR",
    "TEXT",
    "DATE",
    "TIME",
    "DATETIME",
    "TIMESTAMP",
    "YEAR",
    "BOOLEAN",
    "JSON",
  ],
  PostgreSQL: [
    "INTEGER",
    "SMALLINT",
    "BIGINT",
    "DECIMAL",
    "NUMERIC",
    "REAL",
    "DOUBLE PRECISION",
    "SERIAL",
    "CHAR",
    "VARCHAR",
    "TEXT",
    "DATE",
    "TIME",
    "TIMESTAMP",
    "INTERVAL",
    "BOOLEAN",
    "JSON",
    "JSONB",
  ],
  SQLite: ["INTEGER", "REAL", "TEXT", "BLOB"],
  Oracle: [
    "NUMBER",
    "FLOAT",
    "BINARY_FLOAT",
    "BINARY_DOUBLE",
    "CHAR",
    "VARCHAR2",
    "NCHAR",
    "NVARCHAR2",
    "CLOB",
    "DATE",
    "TIMESTAMP",
    "XML",
  ],
};

// Legacy all-types list for backward compatibility
export const fieldTypes: FieldType[] = Array.from(
  new Set([
    ...databaseTypes.MySQL,
    ...databaseTypes.PostgreSQL,
    ...databaseTypes.SQLite,
    ...databaseTypes.Oracle,
  ])
);

// Type mapping when switching database types
export const typeMapping: Record<string, Record<DatabaseType, string>> = {
  INT: {
    MySQL: "INT",
    PostgreSQL: "INTEGER",
    SQLite: "INTEGER",
    Oracle: "NUMBER",
  },
  INTEGER: {
    MySQL: "INT",
    PostgreSQL: "INTEGER",
    SQLite: "INTEGER",
    Oracle: "NUMBER",
  },
  TINYINT: {
    MySQL: "TINYINT",
    PostgreSQL: "SMALLINT",
    SQLite: "INTEGER",
    Oracle: "NUMBER",
  },
  SMALLINT: {
    MySQL: "SMALLINT",
    PostgreSQL: "SMALLINT",
    SQLite: "INTEGER",
    Oracle: "NUMBER",
  },
  MEDIUMINT: {
    MySQL: "MEDIUMINT",
    PostgreSQL: "INTEGER",
    SQLite: "INTEGER",
    Oracle: "NUMBER",
  },
  BIGINT: {
    MySQL: "BIGINT",
    PostgreSQL: "BIGINT",
    SQLite: "INTEGER",
    Oracle: "NUMBER",
  },
  FLOAT: {
    MySQL: "FLOAT",
    PostgreSQL: "REAL",
    SQLite: "REAL",
    Oracle: "BINARY_FLOAT",
  },
  REAL: {
    MySQL: "FLOAT",
    PostgreSQL: "REAL",
    SQLite: "REAL",
    Oracle: "BINARY_FLOAT",
  },
  DOUBLE: {
    MySQL: "DOUBLE",
    PostgreSQL: "DOUBLE PRECISION",
    SQLite: "REAL",
    Oracle: "BINARY_DOUBLE",
  },
  "DOUBLE PRECISION": {
    MySQL: "DOUBLE",
    PostgreSQL: "DOUBLE PRECISION",
    SQLite: "REAL",
    Oracle: "BINARY_DOUBLE",
  },
  DECIMAL: {
    MySQL: "DECIMAL",
    PostgreSQL: "NUMERIC",
    SQLite: "REAL",
    Oracle: "NUMBER",
  },
  NUMERIC: {
    MySQL: "DECIMAL",
    PostgreSQL: "NUMERIC",
    SQLite: "REAL",
    Oracle: "NUMBER",
  },
  SERIAL: {
    MySQL: "INT AUTO_INCREMENT",
    PostgreSQL: "SERIAL",
    SQLite: "INTEGER",
    Oracle: "NUMBER",
  },
  BINARY_FLOAT: {
    MySQL: "FLOAT",
    PostgreSQL: "REAL",
    SQLite: "REAL",
    Oracle: "BINARY_FLOAT",
  },
  BINARY_DOUBLE: {
    MySQL: "DOUBLE",
    PostgreSQL: "DOUBLE PRECISION",
    SQLite: "REAL",
    Oracle: "BINARY_DOUBLE",
  },
  NUMBER: {
    MySQL: "DECIMAL",
    PostgreSQL: "NUMERIC",
    SQLite: "REAL",
    Oracle: "NUMBER",
  },

  VARCHAR: {
    MySQL: "VARCHAR",
    PostgreSQL: "VARCHAR",
    SQLite: "TEXT",
    Oracle: "VARCHAR2",
  },
  VARCHAR2: {
    MySQL: "VARCHAR",
    PostgreSQL: "VARCHAR",
    SQLite: "TEXT",
    Oracle: "VARCHAR2",
  },
  CHAR: {
    MySQL: "CHAR",
    PostgreSQL: "CHAR",
    SQLite: "TEXT",
    Oracle: "CHAR",
  },
  NCHAR: {
    MySQL: "CHAR",
    PostgreSQL: "CHAR",
    SQLite: "TEXT",
    Oracle: "NCHAR",
  },
  NVARCHAR2: {
    MySQL: "VARCHAR",
    PostgreSQL: "VARCHAR",
    SQLite: "TEXT",
    Oracle: "NVARCHAR2",
  },
  TEXT: {
    MySQL: "TEXT",
    PostgreSQL: "TEXT",
    SQLite: "TEXT",
    Oracle: "CLOB",
  },
  CLOB: {
    MySQL: "TEXT",
    PostgreSQL: "TEXT",
    SQLite: "TEXT",
    Oracle: "CLOB",
  },
  BLOB: {
    MySQL: "BLOB",
    PostgreSQL: "BYTEA",
    SQLite: "BLOB",
    Oracle: "BLOB",
  },

  DATE: {
    MySQL: "DATE",
    PostgreSQL: "DATE",
    SQLite: "TEXT",
    Oracle: "DATE",
  },
  DATETIME: {
    MySQL: "DATETIME",
    PostgreSQL: "TIMESTAMP",
    SQLite: "TEXT",
    Oracle: "TIMESTAMP",
  },
  TIMESTAMP: {
    MySQL: "TIMESTAMP",
    PostgreSQL: "TIMESTAMP",
    SQLite: "TEXT",
    Oracle: "TIMESTAMP",
  },
  TIME: {
    MySQL: "TIME",
    PostgreSQL: "TIME",
    SQLite: "TEXT",
    Oracle: "VARCHAR2",
  },
  YEAR: {
    MySQL: "YEAR",
    PostgreSQL: "INTEGER",
    SQLite: "TEXT",
    Oracle: "NUMBER",
  },
  INTERVAL: {
    MySQL: "VARCHAR",
    PostgreSQL: "INTERVAL",
    SQLite: "TEXT",
    Oracle: "INTERVAL",
  },

  BOOLEAN: {
    MySQL: "BOOLEAN",
    PostgreSQL: "BOOLEAN",
    SQLite: "INTEGER",
    Oracle: "NUMBER",
  },
  JSON: {
    MySQL: "JSON",
    PostgreSQL: "JSON",
    SQLite: "TEXT",
    Oracle: "CLOB",
  },
  JSONB: {
    MySQL: "JSON",
    PostgreSQL: "JSONB",
    SQLite: "TEXT",
    Oracle: "CLOB",
  },
  XML: {
    MySQL: "TEXT",
    PostgreSQL: "XML",
    SQLite: "TEXT",
    Oracle: "XML",
  },
};

/**
 * Converts a field type to an equivalent type in another database system
 * @param currentType The current field type
 * @param targetDbType The target database type
 * @returns The mapped field type for the target database
 */
export const convertFieldType = (currentType: FieldType, targetDbType: DatabaseType): FieldType => {
  // Normalize the type to handle special cases
  const normalizedType = currentType.trim();
  
  // If the type doesn't exist in the mapping, default to a safe type
  if (!typeMapping[normalizedType]) {
    return targetDbType === 'SQLite' ? 'TEXT' : 
           targetDbType === 'Oracle' ? 'VARCHAR2' : 
           targetDbType === 'PostgreSQL' ? 'VARCHAR' : 'VARCHAR';
  }

  return typeMapping[normalizedType][targetDbType] as FieldType;
};

/**
 * Determines if a field type needs a length parameter
 * @param type The field type to check
 * @returns Boolean indicating if length is needed
 */
export const needsLength = (type: FieldType): boolean => {
  // Common types that typically need length parameters
  return [
    "VARCHAR",
    "VARCHAR2",
    "NVARCHAR2",
    "CHAR",
    "NCHAR",
    "DECIMAL",
    "NUMERIC",
    "NUMBER",
  ].includes(type);
};

/**
 * Gets the default length for a field type
 * @param type The field type
 * @returns Default length value
 */
export const getDefaultLength = (type: FieldType): number => {
  switch (type) {
    case "VARCHAR":
    case "VARCHAR2":
    case "NVARCHAR2":
      return 255;
    case "CHAR":
    case "NCHAR":
      return 1;
    case "DECIMAL":
    case "NUMERIC":
    case "NUMBER":
      return 10;
    default:
      return 0;
  }
};

/**
 * Checks if a field type supports auto-increment
 * @param type The field type to check
 * @returns Boolean indicating if auto-increment is supported
 */
export const supportsAutoIncrement = (type: FieldType): boolean => {
  return [
    "INT",
    "INTEGER",
    "TINYINT",
    "SMALLINT",
    "MEDIUMINT",
    "BIGINT",
    "SERIAL",
  ].includes(type);
};
