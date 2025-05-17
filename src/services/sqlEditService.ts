import { generateText } from "@/lib/geminiClient";
import { Project, SQLEditResult } from "@/types/types";
import { getApiKey } from "@/utils/apiKeyUtils";

/**
 * Edits SQL code using AI based on a user prompt
 * 
 * @param project - The current project or null to use global API key
 * @param sqlType - The type of SQL being edited ('create' or 'insert')
 * @param currentSQL - The current SQL content
 * @param userPrompt - The user's instruction for how to modify the SQL
 * @param databaseType - The database type (MySQL, PostgreSQL, etc.)
 * @returns Promise with the edited SQL content and list of modified lines
 */
export async function editSQLWithAI(
  project: Project | null,
  sqlType: 'create' | 'insert',
  currentSQL: string,
  userPrompt: string,
  databaseType: string
): Promise<SQLEditResult> {
  try {
    const apiKey = getApiKey(project);

    const prompt = createSQLEditPrompt(
      sqlType,
      currentSQL,
      userPrompt,
      databaseType
    );

    const responseSchema = {
      type: "OBJECT",
      properties: {
        updatedSQL: {
          type: "STRING",
          description: `The complete modified ${sqlType} SQL content for ${databaseType} database`
        }
      },
      required: ["updatedSQL"]
    };

    const result = await generateText(
      prompt,
      apiKey,
      true,
      responseSchema,
    );

    if (!result || typeof result !== "object" || !result.updatedSQL) {
      throw new Error("Invalid response format from AI model");
    }

    // Find modified lines by comparing original with updated SQL
    const modifiedLines = findModifiedLines(currentSQL, result.updatedSQL);

    return {
      updatedSQL: result.updatedSQL,
      modifiedLines
    };
  } catch (error) {
    console.error("Error editing SQL with AI:", error);
    throw error;
  }
}

function createSQLEditPrompt(
  sqlType: 'create' | 'insert',
  currentSQL: string,
  userPrompt: string,
  databaseType: string
): string {
  const sqlTypeDescription = sqlType === 'create' 
    ? 'CREATE TABLE statements and schema definition' 
    : 'INSERT statements and data values';

  return `I need you to modify the following ${databaseType} ${sqlTypeDescription} according to this instruction:

"${userPrompt}"

Here is the current SQL code:

\`\`\`sql
${currentSQL}
\`\`\`

Please return the complete modified SQL code that incorporates the requested changes. Return ONLY the SQL code without any explanations or markdown.`;
}

/**
 * Compares original and updated SQL to identify modified lines using a
 * more accurate diffing approach
 * 
 * @param originalSQL - The original SQL content
 * @param updatedSQL - The updated SQL content after AI editing
 * @returns Array of line numbers (0-indexed) that were modified
 */
function findModifiedLines(originalSQL: string, updatedSQL: string): number[] {
  const originalLines = originalSQL.split('\n');
  const updatedLines = updatedSQL.split('\n');
  const modifiedLines: number[] = [];
  
  // Create a mapping of line content to its index in the original file
  // This helps us identify moved lines vs. truly modified lines
  const originalLineMap = new Map<string, number[]>();
  originalLines.forEach((line, index) => {
    if (!originalLineMap.has(line)) {
      originalLineMap.set(line, []);
    }
    originalLineMap.get(line)?.push(index);
  });
  
  // Track which lines from the original have been matched
  const matchedOriginalLines = new Set<number>();

  // First pass: Identify exact matches between the files
  const matchedUpdatedLines = new Set<number>();
  
  // For each line in the updated file, try to match it with an unmatched line
  // from the original file that has the same content
  updatedLines.forEach((line, updatedIndex) => {
    const potentialMatches = originalLineMap.get(line) || [];
    
    // Find an unmatched original line with the same content
    const matchIndex = potentialMatches.find(
      origIndex => !matchedOriginalLines.has(origIndex)
    );
    
    if (matchIndex !== undefined) {
      matchedOriginalLines.add(matchIndex);
      matchedUpdatedLines.add(updatedIndex);
    }
  });

  // Now identify which lines in the updated file are new or modified
  // (those that couldn't be matched with original content)
  for (let i = 0; i < updatedLines.length; i++) {
    if (!matchedUpdatedLines.has(i)) {
      modifiedLines.push(i);
    }
  }

  // Find blocks of consecutive changed lines
  // This helps us identify coherent changes rather than scattered lines
  const modifiedBlocks: number[][] = [];
  let currentBlock: number[] = [];
  
  // Sort the modified lines for sequential processing
  const sortedModifiedLines = [...modifiedLines].sort((a, b) => a - b);
  
  for (let i = 0; i < sortedModifiedLines.length; i++) {
    const lineNum = sortedModifiedLines[i];
    
    if (currentBlock.length === 0 || lineNum === currentBlock[currentBlock.length - 1] + 1) {
      // This is part of the current block (consecutive)
      currentBlock.push(lineNum);
    } else {
      // Start a new block
      if (currentBlock.length > 0) {
        modifiedBlocks.push([...currentBlock]);
      }
      currentBlock = [lineNum];
    }
  }
  
  // Don't forget the last block
  if (currentBlock.length > 0) {
    modifiedBlocks.push(currentBlock);
  }
  
  // Return the sorted unique list of modified lines
  return [...new Set(modifiedLines)].sort((a, b) => a - b);
}