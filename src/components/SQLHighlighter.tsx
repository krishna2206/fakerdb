import React from 'react';

// Define token types for SQL syntax highlighting
type TokenType = 
  | 'keyword'     // SQL keywords (SELECT, FROM, WHERE, etc.)
  | 'function'    // SQL functions (COUNT, SUM, AVG, etc.)
  | 'datatype'    // Data types (VARCHAR, INTEGER, etc.)
  | 'operator'    // Operators (+, -, *, /, =, etc.)
  | 'number'      // Numeric literals
  | 'string'      // String literals
  | 'identifier'  // Table and column names
  | 'comment'     // SQL comments
  | 'punctuation' // Punctuation marks
  | 'error'       // Invalid syntax
  | 'whitespace'  // Spaces, tabs, newlines
  | 'parenthesis' // Parentheses
  | 'comma'       // Commas
  | 'semicolon'   // Semicolons
  | 'default';    // Default token type

interface Token {
  type: TokenType;
  value: string;
}

// Function to highlight SQL code
export const highlightSQL = (sql: string): React.ReactNode => {
  const tokens = tokenizeSQL(sql);
  
  return tokens.map((token, index) => {
    const className = getTokenClassName(token.type);
    return (
      <span key={index} className={className}>
        {token.value}
      </span>
    );
  });
};

// SQL Keywords for different dialects
const SQL_KEYWORDS = new Set([
  // Common SQL keywords
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP',
  'TABLE', 'VIEW', 'INDEX', 'TRIGGER', 'PROCEDURE', 'FUNCTION', 'DATABASE', 'SCHEMA',
  'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'CROSS', 'NATURAL',
  'GROUP', 'BY', 'HAVING', 'ORDER', 'ASC', 'DESC', 'LIMIT', 'OFFSET',
  'INTO', 'VALUES', 'SET', 'AS', 'ON', 'AND', 'OR', 'NOT', 'NULL', 'IS', 'IN',
  'BETWEEN', 'LIKE', 'EXISTS', 'ALL', 'ANY', 'SOME', 'DISTINCT', 'UNION', 'INTERSECT',
  'EXCEPT', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'WITH',
  
  // MySQL specific
  'SHOW', 'DESCRIBE', 'EXPLAIN', 'USE', 'IGNORE', 'PARTITION', 'STRAIGHT_JOIN',
  'HIGH_PRIORITY', 'LOW_PRIORITY', 'DELAYED', 'QUICK', 'SQL_SMALL_RESULT',
  'SQL_BIG_RESULT', 'SQL_BUFFER_RESULT', 'SQL_CACHE', 'SQL_NO_CACHE', 'SQL_CALC_FOUND_ROWS',
  
  // PostgreSQL specific
  'RETURNING', 'CONFLICT', 'LATERAL', 'WINDOW', 'OVER', 'PARTITION', 'RANGE',
  'ROWS', 'GROUPS', 'PRECEDING', 'FOLLOWING', 'CURRENT', 'ROW', 'ONLY',
  'FETCH', 'FIRST', 'NEXT', 'FOR', 'UPDATE', 'SHARE', 'NOWAIT', 'SKIP', 'LOCKED',
  'TABLESAMPLE', 'COLLATE', 'USING', 'ILIKE', 'SIMILAR', 'TO',
  
  // SQLite specific
  'PRAGMA', 'VACUUM', 'ANALYZE', 'ATTACH', 'DETACH', 'INDEXED', 'REINDEX',
  'INSTEAD', 'VIRTUAL', 'ROWID', 'WITHOUT', 'RECURSIVE',
  
  // Oracle specific
  'MINUS', 'START', 'CONNECT', 'PRIOR', 'NOCYCLE', 'LEVEL', 'ROWNUM',
  'SYSDATE', 'SYSTIMESTAMP', 'MODEL', 'PIVOT', 'UNPIVOT', 'VERSIONS',
  'FLASHBACK', 'SAMPLE', 'MERGE', 'PURGE', 'MATERIALIZED', 'SAVEPOINT',
  'ROLLBACK', 'COMMIT', 'GRANT', 'REVOKE'
]);

// SQL Functions
const SQL_FUNCTIONS = new Set([
  // Common functions
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'NULLIF', 'CAST', 'CONVERT',
  'UPPER', 'LOWER', 'TRIM', 'LTRIM', 'RTRIM', 'LENGTH', 'SUBSTRING', 'CONCAT',
  'ROUND', 'CEIL', 'FLOOR', 'ABS', 'POWER', 'SQRT', 'CURRENT_DATE', 'CURRENT_TIME',
  'CURRENT_TIMESTAMP', 'EXTRACT', 'YEAR', 'MONTH', 'DAY', 'HOUR', 'MINUTE', 'SECOND',
  
  // MySQL specific
  'DATE_FORMAT', 'STR_TO_DATE', 'DATEDIFF', 'IF', 'IFNULL', 'DATE_ADD', 'DATE_SUB',
  'GROUP_CONCAT', 'JSON_EXTRACT', 'JSON_OBJECT', 'JSON_ARRAY', 'REGEXP',
  
  // PostgreSQL specific
  'TO_CHAR', 'TO_DATE', 'TO_TIMESTAMP', 'ARRAY_AGG', 'STRING_AGG', 'JSONB_AGG',
  'PERCENTILE_CONT', 'PERCENTILE_DISC', 'ARRAY', 'ROW_NUMBER', 'RANK', 'DENSE_RANK',
  'NTILE', 'LAG', 'LEAD', 'FIRST_VALUE', 'LAST_VALUE', 'NTH_VALUE',
  
  // SQLite specific
  'RANDOM', 'CHANGES', 'TOTAL_CHANGES', 'LAST_INSERT_ROWID',
  
  // Oracle specific
  'TO_NUMBER', 'NVL', 'NVL2', 'DECODE', 'INSTR', 'REGEXP_LIKE', 'REGEXP_REPLACE',
  'REGEXP_SUBSTR', 'LISTAGG', 'LPAD', 'RPAD', 'MONTHS_BETWEEN', 'ADD_MONTHS',
  'NEXT_DAY', 'LAST_DAY', 'TRUNC', 'SYSTIMESTAMP', 'REGEXP_COUNT'
]);

// SQL Data Types
const SQL_DATATYPES = new Set([
  // Common data types
  'INT', 'INTEGER', 'SMALLINT', 'BIGINT', 'TINYINT', 'DECIMAL', 'NUMERIC',
  'FLOAT', 'REAL', 'DOUBLE', 'MONEY', 'BOOLEAN', 'BIT',
  'CHAR', 'VARCHAR', 'TEXT', 'NCHAR', 'NVARCHAR', 'CLOB', 'NCLOB',
  'DATE', 'TIME', 'TIMESTAMP', 'DATETIME', 'INTERVAL',
  'BINARY', 'VARBINARY', 'BLOB', 'BYTEA',
  'XML', 'JSON', 'JSONB', 'ARRAY', 'ENUM', 'UUID', 'GEOMETRY',
  
  // MySQL specific
  'TINYTEXT', 'MEDIUMTEXT', 'LONGTEXT', 'TINYBLOB', 'MEDIUMBLOB', 'LONGBLOB',
  'YEAR', 'SET', 'MEDIUMINT',
  
  // PostgreSQL specific
  'SERIAL', 'BIGSERIAL', 'SMALLSERIAL', 'MONEY', 'CIDR', 'INET', 'MACADDR',
  'BIT VARYING', 'CHARACTER VARYING', 'TIME WITH TIME ZONE', 'TIMESTAMP WITH TIME ZONE',
  'TSQUERY', 'TSVECTOR', 'BOX', 'CIRCLE', 'LINE', 'LSEG', 'PATH', 'POINT', 'POLYGON',
  
  // Oracle specific
  'NUMBER', 'VARCHAR2', 'NVARCHAR2', 'RAW', 'LONG RAW', 'ROWID', 'UROWID',
  'BFILE', 'LONG', 'SDO_GEOMETRY',
  
  // Type modifiers
  'PRECISION', 'VARYING', 'LARGE', 'UNSIGNED', 'ZEROFILL', 'WITHOUT TIME ZONE',
  'WITH TIME ZONE', 'NOT NULL', 'PRIMARY KEY', 'UNIQUE', 'REFERENCES', 'CHECK',
  'DEFAULT', 'AUTO_INCREMENT', 'IDENTITY', 'SERIAL'
]);

// SQL Operators
const SQL_OPERATORS = new Set([
  '+', '-', '*', '/', '%', '^', '=', '!=', '<>', '<', '>', '<=', '>=', 
  ':=', '||', '&&', '!', '~', '&', '|', '#', '<<', '>>', '->>', '->', '@>', '<@', 
  '?', '?|', '?&', '::',
]);

// Function to tokenize SQL code
const tokenizeSQL = (sql: string): Token[] => {
  const tokens: Token[] = [];
  let current = 0;
  
  while (current < sql.length) {
    const char = sql[current];
    
    // Handle whitespace
    if (/\s/.test(char)) {
      let value = '';
      while (current < sql.length && /\s/.test(sql[current])) {
        value += sql[current];
        current++;
      }
      tokens.push({ type: 'whitespace', value });
      continue;
    }
    
    // Handle single-line comments (-- ...)
    if (char === '-' && sql[current + 1] === '-') {
      let value = '--';
      current += 2;
      
      while (current < sql.length && sql[current] !== '\n') {
        value += sql[current];
        current++;
      }
      
      tokens.push({ type: 'comment', value });
      continue;
    }
    
    // Handle multi-line comments (/* ... */)
    if (char === '/' && sql[current + 1] === '*') {
      let value = '/*';
      current += 2;
      
      while (current < sql.length && !(sql[current] === '*' && sql[current + 1] === '/')) {
        value += sql[current];
        current++;
        
        if (current >= sql.length) {
          // Unclosed comment, mark as error
          tokens.push({ type: 'error', value });
          return tokens;
        }
      }
      
      // Include the closing */
      value += '*/';
      current += 2;
      
      tokens.push({ type: 'comment', value });
      continue;
    }
    
    // Handle string literals with single quotes
    if (char === "'") {
      let value = "'";
      let escaped = false;
      current++;
      
      while (current < sql.length && (sql[current] !== "'" || escaped)) {
        // Handle escape characters
        if (sql[current] === '\\') {
          escaped = !escaped;
        } else {
          escaped = false;
        }
        
        value += sql[current];
        current++;
        
        if (current >= sql.length) {
          // Unclosed string literal, mark as error
          tokens.push({ type: 'error', value });
          return tokens;
        }
      }
      
      // Include the closing quote
      if (current < sql.length) {
        value += "'";
        current++;
      }
      
      tokens.push({ type: 'string', value });
      continue;
    }
    
    // Handle string literals with double quotes (usually identifiers in some dialects)
    if (char === '"') {
      let value = '"';
      let escaped = false;
      current++;
      
      while (current < sql.length && (sql[current] !== '"' || escaped)) {
        // Handle escape characters
        if (sql[current] === '\\') {
          escaped = !escaped;
        } else {
          escaped = false;
        }
        
        value += sql[current];
        current++;
        
        if (current >= sql.length) {
          // Unclosed identifier, mark as error
          tokens.push({ type: 'error', value });
          return tokens;
        }
      }
      
      // Include the closing quote
      if (current < sql.length) {
        value += '"';
        current++;
      }
      
      tokens.push({ type: 'identifier', value });
      continue;
    }
    
    // Handle backtick-quoted identifiers (MySQL)
    if (char === '`') {
      let value = '`';
      let escaped = false;
      current++;
      
      while (current < sql.length && (sql[current] !== '`' || escaped)) {
        // Handle escape characters
        if (sql[current] === '\\') {
          escaped = !escaped;
        } else {
          escaped = false;
        }
        
        value += sql[current];
        current++;
        
        if (current >= sql.length) {
          // Unclosed identifier, mark as error
          tokens.push({ type: 'error', value });
          return tokens;
        }
      }
      
      // Include the closing backtick
      if (current < sql.length) {
        value += '`';
        current++;
      }
      
      tokens.push({ type: 'identifier', value });
      continue;
    }
    
    // Handle bracket-quoted identifiers (SQL Server)
    if (char === '[') {
      let value = '[';
      current++;
      
      while (current < sql.length && sql[current] !== ']') {
        value += sql[current];
        current++;
        
        if (current >= sql.length) {
          // Unclosed identifier, mark as error
          tokens.push({ type: 'error', value });
          return tokens;
        }
      }
      
      // Include the closing bracket
      if (current < sql.length) {
        value += ']';
        current++;
      }
      
      tokens.push({ type: 'identifier', value });
      continue;
    }
    
    // Handle numbers (integers and decimals)
    if (/[0-9]/.test(char) || (char === '.' && /[0-9]/.test(sql[current + 1]))) {
      let value = '';
      let hasDecimal = false;
      
      // If starting with decimal point
      if (char === '.') {
        value += char;
        current++;
        hasDecimal = true;
      }
      
      // Get all digits and possibly one decimal point
      while (current < sql.length && (/[0-9]/.test(sql[current]) || (sql[current] === '.' && !hasDecimal))) {
        if (sql[current] === '.') {
          hasDecimal = true;
        }
        value += sql[current];
        current++;
      }
      
      // Handle exponent notation (e.g., 1e10, 1.5e-3)
      if (current < sql.length && (sql[current] === 'e' || sql[current] === 'E')) {
        value += sql[current];
        current++;
        
        // Allow for a sign after the 'e'
        if (current < sql.length && (sql[current] === '+' || sql[current] === '-')) {
          value += sql[current];
          current++;
        }
        
        // Must have at least one digit after 'e'
        if (current < sql.length && /[0-9]/.test(sql[current])) {
          while (current < sql.length && /[0-9]/.test(sql[current])) {
            value += sql[current];
            current++;
          }
        } else {
          // Invalid exponent notation
          tokens.push({ type: 'error', value });
          continue;
        }
      }
      
      tokens.push({ type: 'number', value });
      continue;
    }
    
    // Handle parentheses
    if (char === '(' || char === ')') {
      tokens.push({ type: 'parenthesis', value: char });
      current++;
      continue;
    }
    
    // Handle commas
    if (char === ',') {
      tokens.push({ type: 'comma', value: char });
      current++;
      continue;
    }
    
    // Handle semicolons
    if (char === ';') {
      tokens.push({ type: 'semicolon', value: char });
      current++;
      continue;
    }
    
    // Handle operators
    if (SQL_OPERATORS.has(char) || 
        (current + 1 < sql.length && SQL_OPERATORS.has(char + sql[current + 1])) ||
        (current + 2 < sql.length && SQL_OPERATORS.has(char + sql[current + 1] + sql[current + 2]))) {
      
      // Try to match multi-character operators
      let opLength = 3;
      while (opLength >= 1) {
        if (current + opLength - 1 < sql.length) {
          const op = sql.substring(current, current + opLength);
          if (SQL_OPERATORS.has(op)) {
            tokens.push({ type: 'operator', value: op });
            current += opLength;
            break;
          }
        }
        opLength--;
      }
      
      if (opLength < 1) {
        // Single character operator
        tokens.push({ type: 'operator', value: char });
        current++;
      }
      
      continue;
    }
    
    // Handle identifiers and keywords
    if (/[a-zA-Z_]/.test(char)) {
      let value = '';
      
      while (current < sql.length && /[a-zA-Z0-9_]/.test(sql[current])) {
        value += sql[current];
        current++;
      }
      
      // Check if it's a keyword, function, or datatype
      const upperValue = value.toUpperCase();
      
      if (SQL_KEYWORDS.has(upperValue)) {
        tokens.push({ type: 'keyword', value });
      } else if (SQL_FUNCTIONS.has(upperValue)) {
        tokens.push({ type: 'function', value });
      } else if (SQL_DATATYPES.has(upperValue)) {
        tokens.push({ type: 'datatype', value });
      } else {
        tokens.push({ type: 'identifier', value });
      }
      
      continue;
    }
    
    // Handle all other characters as punctuation or default
    tokens.push({ type: 'default', value: char });
    current++;
  }
  
  return tokens;
};

// Function to get CSS class based on token type
const getTokenClassName = (tokenType: TokenType): string => {
  switch (tokenType) {
    case 'keyword':
      return 'text-blue-500 dark:text-blue-400 font-medium';
    case 'function':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'datatype':
      return 'text-green-500 dark:text-green-400';
    case 'operator':
      return 'text-rose-500 dark:text-rose-400';
    case 'number':
      return 'text-violet-600 dark:text-violet-400';
    case 'string':
      return 'text-green-500 dark:text-green-400';
    case 'identifier':
      return 'text-purple-500 dark:text-purple-400';
    case 'comment':
      return 'text-gray-500 dark:text-gray-400 italic';
    case 'punctuation':
      return 'text-slate-600 dark:text-slate-300';
    case 'error':
      return 'text-red-500 dark:text-red-400 underline';
    case 'whitespace':
      return '';
    case 'parenthesis':
      return 'text-amber-600 dark:text-amber-400';
    case 'comma':
      return 'text-slate-600 dark:text-slate-300';
    case 'semicolon':
      return 'text-violet-600 dark:text-violet-400';
    default:
      return 'text-slate-700 dark:text-slate-200';
  }
};

// Create a React component that uses the highlighter
interface SQLHighlighterProps {
  sql: string;
  className?: string;
}

const SQLHighlighter: React.FC<SQLHighlighterProps> = ({ sql, className = '' }) => {
  return (
    <pre className={`p-4 bg-muted rounded-md text-sm ${className}`} style={{ width: '100%' }}>
      <code className="whitespace-pre-wrap break-words">{highlightSQL(sql)}</code>
    </pre>
  );
};

export default SQLHighlighter;
