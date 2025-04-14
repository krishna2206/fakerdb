import { TableDefinition, TableRowData } from "@/types/types";

/**
 * Generates appropriate CREATE TABLE SQL statement based on database type
 * @param tableDefinition - The definition of the table
 * @returns SQL string for creating the table in the specified database dialect
 */
export function generateCreateTableSQL(tableDefinition: TableDefinition): string {
  const dbType = tableDefinition.databaseType;

  switch (dbType) {
    case "MySQL":
      return generateMySQLCreateTable(tableDefinition);
    case "PostgreSQL":
      return generatePostgreSQLCreateTable(tableDefinition);
    case "SQLite":
      return generateSQLiteCreateTable(tableDefinition);
    case "Oracle":
      return generateOracleCreateTable(tableDefinition);
    default:
      return generateMySQLCreateTable(tableDefinition);
  }
}

/**
 * Generates MySQL-specific CREATE TABLE statement
 * @param tableDefinition - The definition of the table
 * @returns MySQL CREATE TABLE SQL string
 */
export function generateMySQLCreateTable(tableDefinition: TableDefinition): string {
  let sql = `CREATE TABLE \`${tableDefinition.name}\` (\n`;

  // Get primary key fields to check for compound primary key
  const primaryKeyFields = tableDefinition.fields.filter(
    (field) => field.primaryKey
  );
  const hasCompoundPrimaryKey = primaryKeyFields.length > 1;

  const fieldDefinitions = tableDefinition.fields.map((field) => {
    let fieldDef = `  \`${field.name}\` ${field.type}`;

    // Add length if applicable
    if (field.length && ["VARCHAR", "CHAR", "DECIMAL"].includes(field.type)) {
      fieldDef += `(${field.length})`;
    }

    // Add constraints
    if (!field.nullable) {
      fieldDef += " NOT NULL";
    }

    if (field.autoIncrement) {
      fieldDef += " AUTO_INCREMENT";
    }

    // Only add PRIMARY KEY at column level if it's not part of a compound key
    if (field.primaryKey && !hasCompoundPrimaryKey) {
      fieldDef += " PRIMARY KEY";
    }

    // Add comment if there's a description
    if (field.description) {
      fieldDef += ` COMMENT '${field.description}'`;
    }

    return fieldDef;
  });

  // Add field definitions
  sql += fieldDefinitions.join(",\n");

  // Add compound primary key constraint if needed
  if (hasCompoundPrimaryKey) {
    const pkFields = primaryKeyFields
      .map((field) => `\`${field.name}\``)
      .join(", ");
    sql += `,\n  PRIMARY KEY (${pkFields})`;
  }

  sql +=
    "\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

  return sql;
}

/**
 * Generates PostgreSQL-specific CREATE TABLE statement with proper type mappings
 * @param tableDefinition - The definition of the table
 * @returns PostgreSQL CREATE TABLE SQL string with additional comments as needed
 */
export function generatePostgreSQLCreateTable(
  tableDefinition: TableDefinition
): string {
  let sql = `CREATE TABLE "${tableDefinition.name}" (\n`;

  // Get primary key fields to check for compound primary key
  const primaryKeyFields = tableDefinition.fields.filter(
    (field) => field.primaryKey
  );
  const hasCompoundPrimaryKey = primaryKeyFields.length > 1;

  const fieldDefinitions = tableDefinition.fields.map((field) => {
    // Map MySQL types to PostgreSQL types
    const pgType = mapToPostgreSQLType(field.type);

    let fieldDef = `  "${field.name}" ${pgType}`;

    // Add length if applicable
    if (field.length && ["VARCHAR", "CHAR"].includes(field.type)) {
      fieldDef += `(${field.length})`;
    } else if (field.length && field.type === "DECIMAL") {
      fieldDef += `(${field.length}, 2)`; // Assume 2 decimal places
    }

    // Add constraints
    if (!field.nullable) {
      fieldDef += " NOT NULL";
    }

    // Only add PRIMARY KEY at column level if it's not part of a compound key
    if (field.primaryKey && !hasCompoundPrimaryKey) {
      fieldDef += " PRIMARY KEY";
    }

    if (field.autoIncrement) {
      // In PostgreSQL, we typically use SERIAL or BIGSERIAL types
      // But since we already specified the type, we can modify it here
      if (field.type === "INT" || field.type === "BIGINT") {
        fieldDef += " GENERATED ALWAYS AS IDENTITY";
      }
    }

    return fieldDef;
  });

  // Add field definitions
  sql += fieldDefinitions.join(",\n");

  // Add compound primary key constraint if needed
  if (hasCompoundPrimaryKey) {
    const pkFields = primaryKeyFields
      .map((field) => `"${field.name}"`)
      .join(", ");
    sql += `,\n  PRIMARY KEY (${pkFields})`;
  }

  sql += "\n);";

  // Add comments as separate statements
  const comments = tableDefinition.fields
    .filter((field) => field.description)
    .map(
      (field) =>
        `COMMENT ON COLUMN "${tableDefinition.name}"."${field.name}" IS '${field.description}';`
    );

  if (comments.length > 0) {
    sql += "\n\n" + comments.join("\n");
  }

  return sql;
}

/**
 * Generates SQLite-specific CREATE TABLE statement with simplified type system
 * @param tableDefinition - The definition of the table
 * @returns SQLite CREATE TABLE SQL string
 */
export function generateSQLiteCreateTable(tableDefinition: TableDefinition): string {
  let sql = `CREATE TABLE "${tableDefinition.name}" (\n`;

  // Get primary key fields to check for compound primary key
  const primaryKeyFields = tableDefinition.fields.filter(
    (field) => field.primaryKey
  );
  const hasCompoundPrimaryKey = primaryKeyFields.length > 1;

  const fieldDefinitions = tableDefinition.fields.map((field) => {
    // Map MySQL types to SQLite types
    const sqliteType = mapToSQLiteType(field.type);

    let fieldDef = `  "${field.name}" ${sqliteType}`;

    // Add constraints
    if (!field.nullable) {
      fieldDef += " NOT NULL";
    }

    // Only add PRIMARY KEY at column level if it's not part of a compound key
    if (field.primaryKey && !hasCompoundPrimaryKey) {
      fieldDef += " PRIMARY KEY";

      // SQLite has special syntax for autoincrement that only works with PRIMARY KEY
      if (field.autoIncrement) {
        fieldDef += " AUTOINCREMENT";
      }
    }

    return fieldDef;
  });

  // Add field definitions
  sql += fieldDefinitions.join(",\n");

  // Add compound primary key constraint if needed
  if (hasCompoundPrimaryKey) {
    const pkFields = primaryKeyFields
      .map((field) => `"${field.name}"`)
      .join(", ");
    sql += `,\n  PRIMARY KEY (${pkFields})`;
  }

  sql += "\n);";

  return sql;
}

/**
 * Generates Oracle-specific CREATE TABLE statement with sequences and triggers for auto-increment
 * @param tableDefinition - The definition of the table
 * @returns Oracle CREATE TABLE SQL string with additional sequence and trigger creation statements
 */
export function generateOracleCreateTable(tableDefinition: TableDefinition): string {
  let sql = `CREATE TABLE "${tableDefinition.name}" (\n`;

  // Get primary key fields to check for compound primary key
  const primaryKeyFields = tableDefinition.fields.filter(
    (field) => field.primaryKey
  );
  const hasCompoundPrimaryKey = primaryKeyFields.length > 1;

  const fieldDefinitions = tableDefinition.fields.map((field) => {
    // Map MySQL types to Oracle types
    const oracleType = mapToOracleType(field.type);

    let fieldDef = `  "${field.name}" ${oracleType}`;

    // Add length if applicable
    if (field.length && ["VARCHAR", "CHAR"].includes(field.type)) {
      fieldDef += `(${field.length})`;
    } else if (field.length && field.type === "DECIMAL") {
      fieldDef += `(${field.length}, 2)`; // Assume 2 decimal places
    }

    // Add constraints
    if (!field.nullable) {
      fieldDef += " NOT NULL";
    }

    // Only add PRIMARY KEY at column level if it's not part of a compound key
    if (field.primaryKey && !hasCompoundPrimaryKey) {
      fieldDef += " PRIMARY KEY";
    }

    return fieldDef;
  });

  // Add field definitions
  sql += fieldDefinitions.join(",\n");

  // Add compound primary key constraint if needed
  if (hasCompoundPrimaryKey) {
    const pkFields = primaryKeyFields
      .map((field) => `"${field.name}"`)
      .join(", ");
    sql += `,\n  CONSTRAINT "PK_${tableDefinition.name}" PRIMARY KEY (${pkFields})`;
  }

  sql += "\n)";

  // For auto-increment in Oracle, we typically use sequences and triggers
  const autoIncrementFields = tableDefinition.fields.filter(
    (field) => field.autoIncrement
  );
  if (autoIncrementFields.length > 0) {
    sql += ";\n\n";

    for (const field of autoIncrementFields) {
      const seqName = `SEQ_${tableDefinition.name}_${field.name}`.toUpperCase();
      const triggerName =
        `TRG_${tableDefinition.name}_${field.name}`.toUpperCase();

      sql += `CREATE SEQUENCE ${seqName} START WITH 1 INCREMENT BY 1;\n\n`;
      sql += `CREATE OR REPLACE TRIGGER ${triggerName}\n`;
      sql += `BEFORE INSERT ON "${tableDefinition.name}"\n`;
      sql += `FOR EACH ROW\n`;
      sql += `BEGIN\n`;
      sql += `  SELECT ${seqName}.NEXTVAL INTO :NEW."${field.name}" FROM DUAL;\n`;
      sql += `END;`;
    }
  } else {
    sql += ";";
  }

  return sql;
}

/**
 * Maps MySQL data types to their PostgreSQL equivalents
 * @param mysqlType - The MySQL data type to convert
 * @returns Equivalent PostgreSQL data type
 */
export function mapToPostgreSQLType(mysqlType: string): string {
  switch (mysqlType) {
    case "INT":
      return "INTEGER";
    case "TINYINT":
      return "SMALLINT";
    case "BIGINT":
      return "BIGINT";
    case "FLOAT":
      return "REAL";
    case "DOUBLE":
      return "DOUBLE PRECISION";
    case "DECIMAL":
      return "NUMERIC";
    case "VARCHAR":
      return "VARCHAR";
    case "CHAR":
      return "CHAR";
    case "TEXT":
      return "TEXT";
    case "DATE":
      return "DATE";
    case "DATETIME":
    case "TIMESTAMP":
      return "TIMESTAMP";
    case "TIME":
      return "TIME";
    case "YEAR":
      return "INTEGER";
    case "BOOLEAN":
      return "BOOLEAN";
    case "ENUM":
      return "TEXT"; // PostgreSQL has ENUM but it's implemented differently
    case "JSON":
      return "JSONB";
    default:
      return mysqlType;
  }
}

/**
 * Maps MySQL data types to SQLite's simplified type system
 * @param mysqlType - The MySQL data type to convert
 * @returns Equivalent SQLite data type (INTEGER, REAL, TEXT, or BLOB)
 */
export function mapToSQLiteType(mysqlType: string): string {
  // SQLite has a simpler type system
  switch (mysqlType) {
    case "INT":
    case "TINYINT":
    case "SMALLINT":
    case "BIGINT":
    case "YEAR":
      return "INTEGER";
    case "FLOAT":
    case "DOUBLE":
    case "DECIMAL":
      return "REAL";
    case "VARCHAR":
    case "CHAR":
    case "TEXT":
    case "ENUM":
      return "TEXT";
    case "DATE":
    case "DATETIME":
    case "TIMESTAMP":
    case "TIME":
      return "TEXT";
    case "BOOLEAN":
      return "INTEGER"; // 0 or 1
    case "JSON":
      return "TEXT";
    default:
      return "TEXT";
  }
}

/**
 * Maps MySQL data types to their Oracle equivalents
 * @param mysqlType - The MySQL data type to convert
 * @returns Equivalent Oracle data type
 */
export function mapToOracleType(mysqlType: string): string {
  switch (mysqlType) {
    case "INT":
    case "TINYINT":
    case "SMALLINT":
      return "NUMBER(10)";
    case "BIGINT":
      return "NUMBER(19)";
    case "FLOAT":
    case "DOUBLE":
      return "FLOAT";
    case "DECIMAL":
      return "NUMBER";
    case "VARCHAR":
      return "VARCHAR2";
    case "CHAR":
      return "CHAR";
    case "TEXT":
      return "CLOB";
    case "DATE":
      return "DATE";
    case "DATETIME":
    case "TIMESTAMP":
      return "TIMESTAMP";
    case "TIME":
      return "TIMESTAMP";
    case "YEAR":
      return "NUMBER(4)";
    case "BOOLEAN":
      return "NUMBER(1)";
    case "ENUM":
      return "VARCHAR2(255)";
    case "JSON":
      return "CLOB";
    default:
      return "VARCHAR2(255)";
  }
}

/**
 * Generates appropriate INSERT SQL statements based on database type
 * @param tableDefinition - The definition of the table
 * @param data - Array of data rows to insert
 * @returns SQL string for inserting the data in the specified database dialect
 */
export function generateInsertSQL(
  tableDefinition: TableDefinition,
  data: TableRowData[]
): string {
  if (data.length === 0) {
    return "";
  }

  const dbType = tableDefinition.databaseType;

  switch (dbType) {
    case "MySQL":
      return generateMySQLInsert(tableDefinition, data);
    case "PostgreSQL":
      return generatePostgreSQLInsert(tableDefinition, data);
    case "SQLite":
      return generateSQLiteInsert(tableDefinition, data);
    case "Oracle":
      return generateOracleInsert(tableDefinition, data);
    default:
      return generateMySQLInsert(tableDefinition, data);
  }
}

/**
 * Generates MySQL-specific INSERT statements for multiple rows
 * @param tableDefinition - The definition of the table
 * @param data - Array of data rows to insert
 * @returns MySQL INSERT SQL string using multi-row VALUES syntax
 */
export function generateMySQLInsert(
  tableDefinition: TableDefinition,
  data: TableRowData[]
): string {
  const fieldNames = tableDefinition.fields
    .map((field) => `\`${field.name}\``)
    .join(", ");

  let sql = `INSERT INTO \`${tableDefinition.name}\` (${fieldNames}) VALUES\n`;

  const rows = data.map((row) => {
    const values = tableDefinition.fields.map((field) => {
      const value = row[field.name];

      if (value === null || value === undefined) {
        return "NULL";
      }

      // Format based on data type
      switch (field.type) {
        case "INT":
        case "TINYINT":
        case "SMALLINT":
        case "BIGINT":
        case "FLOAT":
        case "DOUBLE":
        case "DECIMAL":
        case "YEAR":
          return value;
        case "BOOLEAN":
          return value ? "1" : "0";
        case "JSON":
          return `'${String(value).replace(/'/g, "''")}'`;
        default:
          return `'${String(value).replace(/'/g, "''")}'`;
      }
    });

    return `(${values.join(", ")})`;
  });

  sql += rows.join(",\n");
  sql += ";";

  return sql;
}

/**
 * Generates PostgreSQL-specific INSERT statements with proper type handling
 * @param tableDefinition - The definition of the table
 * @param data - Array of data rows to insert
 * @returns PostgreSQL INSERT SQL string using multi-row VALUES syntax
 */
export function generatePostgreSQLInsert(
  tableDefinition: TableDefinition,
  data: TableRowData[]
): string {
  const fieldNames = tableDefinition.fields
    .map((field) => `"${field.name}"`)
    .join(", ");

  let sql = `INSERT INTO "${tableDefinition.name}" (${fieldNames}) VALUES\n`;

  const rows = data.map((row) => {
    const values = tableDefinition.fields.map((field) => {
      const value = row[field.name];

      if (value === null || value === undefined) {
        return "NULL";
      }

      // Format based on data type
      switch (field.type) {
        case "INT":
        case "TINYINT":
        case "SMALLINT":
        case "BIGINT":
        case "FLOAT":
        case "DOUBLE":
        case "DECIMAL":
        case "YEAR":
          return value;
        case "BOOLEAN":
          return value ? "TRUE" : "FALSE";
        case "JSON":
          return `'${String(value).replace(/'/g, "''")}'::jsonb`;
        case "DATE":
        case "DATETIME":
        case "TIMESTAMP":
          return `'${value}'::timestamp`;
        default:
          return `'${String(value).replace(/'/g, "''")}'`;
      }
    });

    return `(${values.join(", ")})`;
  });

  sql += rows.join(",\n");
  sql += ";";

  return sql;
}

/**
 * Generates SQLite-specific INSERT statements
 * @param tableDefinition - The definition of the table
 * @param data - Array of data rows to insert
 * @returns SQLite INSERT SQL string using multi-row VALUES syntax
 */
export function generateSQLiteInsert(
  tableDefinition: TableDefinition,
  data: TableRowData[]
): string {
  const fieldNames = tableDefinition.fields
    .map((field) => `"${field.name}"`)
    .join(", ");

  let sql = `INSERT INTO "${tableDefinition.name}" (${fieldNames}) VALUES\n`;

  const rows = data.map((row) => {
    const values = tableDefinition.fields.map((field) => {
      const value = row[field.name];

      if (value === null || value === undefined) {
        return "NULL";
      }

      // Format based on data type
      switch (mapToSQLiteType(field.type)) {
        case "INTEGER":
        case "REAL":
          return value;
        default:
          return `'${String(value).replace(/'/g, "''")}'`;
      }
    });

    return `(${values.join(", ")})`;
  });

  sql += rows.join(",\n");
  sql += ";";

  return sql;
}

/**
 * Generates Oracle-specific INSERT statements with appropriate syntax
 * @param tableDefinition - The definition of the table
 * @param data - Array of data rows to insert
 * @returns Oracle INSERT SQL strings, using individual statements for large datasets
 *          or SELECT UNION ALL approach for smaller datasets
 */
export function generateOracleInsert(
  tableDefinition: TableDefinition,
  data: TableRowData[]
): string {
  // Oracle doesn't support multi-row VALUES syntax in the same way
  // So we'll use multiple individual INSERT statements or UNION ALL approach

  const fieldNames = tableDefinition.fields
    .map((field) => `"${field.name}"`)
    .join(", ");
  let sql = "";

  // For larger datasets, use multiple individual INSERT statements
  if (data.length > 5) {
    data.forEach((row, index) => {
      const values = tableDefinition.fields.map((field) => {
        const value = row[field.name];

        if (value === null || value === undefined) {
          return "NULL";
        }

        // Format based on data type
        switch (field.type) {
          case "INT":
          case "TINYINT":
          case "SMALLINT":
          case "BIGINT":
          case "FLOAT":
          case "DOUBLE":
          case "DECIMAL":
          case "YEAR":
            return value;
          case "BOOLEAN":
            return value ? "1" : "0";
          case "DATE":
          case "DATETIME":
          case "TIMESTAMP":
            return `TO_TIMESTAMP('${value}', 'YYYY-MM-DD HH24:MI:SS')`;
          default:
            return `'${String(value).replace(/'/g, "''")}'`;
        }
      });

      sql += `INSERT INTO "${
        tableDefinition.name
      }" (${fieldNames}) VALUES (${values.join(", ")});\n`;
    });
  }
  // For smaller datasets, use INSERT with SELECT UNION ALL approach
  else {
    sql = `INSERT INTO "${tableDefinition.name}" (${fieldNames})\n`;
    sql += "SELECT * FROM (\n";

    const selects = data.map((row) => {
      const values = tableDefinition.fields.map((field) => {
        const value = row[field.name];

        if (value === null || value === undefined) {
          return "NULL";
        }

        // Format based on data type
        switch (field.type) {
          case "INT":
          case "TINYINT":
          case "SMALLINT":
          case "BIGINT":
          case "FLOAT":
          case "DOUBLE":
          case "DECIMAL":
          case "YEAR":
            return `${value} AS "${field.name}"`;
          case "BOOLEAN":
            return `${value ? "1" : "0"} AS "${field.name}"`;
          case "DATE":
          case "DATETIME":
          case "TIMESTAMP":
            return `TO_TIMESTAMP('${value}', 'YYYY-MM-DD HH24:MI:SS') AS "${field.name}"`;
          default:
            return `'${String(value).replace(/'/g, "''")}' AS "${field.name}"`;
        }
      });

      return `  SELECT ${values.join(", ")} FROM DUAL`;
    });

    sql += selects.join("\n  UNION ALL\n");
    sql += "\n);";
  }

  return sql;
}
