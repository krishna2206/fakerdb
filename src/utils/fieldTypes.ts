import { FieldType } from "../types/types";

export const fieldTypes: FieldType[] = [
  "INT",
  "TINYINT",
  "SMALLINT", 
  "MEDIUMINT",
  "BIGINT",
  "FLOAT",
  "DOUBLE",
  "DECIMAL",
  "VARCHAR",
  "CHAR",
  "TEXT",
  "DATE",
  "DATETIME",
  "TIMESTAMP",
  "TIME",
  "YEAR",
  "BOOLEAN",
  "ENUM",
  "JSON"
];

export const needsLength = (type: FieldType): boolean => {
  return ["VARCHAR", "CHAR", "DECIMAL"].includes(type);
};

export const getDefaultLength = (type: FieldType): number => {
  switch (type) {
    case "VARCHAR":
      return 255;
    case "CHAR":
      return 1;
    case "DECIMAL":
      return 10;
    default:
      return 0;
  }
};

// Function to check if a field type supports auto-increment
export const supportsAutoIncrement = (type: FieldType): boolean => {
  // These types typically support auto-increment in most databases
  return ["INT", "TINYINT", "SMALLINT", "MEDIUMINT", "BIGINT"].includes(type);
};
