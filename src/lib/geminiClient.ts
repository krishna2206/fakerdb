import { GeminiRequestBody } from "@/types/types";

const BASE_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_MODEL = "gemini-2.0-flash-exp";

/**
 * Generates text using the Gemini API based on the provided prompt.
 *
 * @param prompt - The text prompt to send to the Gemini model
 * @param apiKey - The API key for authenticating with the Gemini API
 * @param useStructuredResponse - Whether to use the structured response feature (default: false)
 * @param responseSchema - Optional JSON schema for structured responses
 * @returns A Promise that resolves to the generated text string or structured JSON
 * @throws Will throw an error if the API request fails, including the status code and error message
 */
export async function generateText(
  prompt: string,
  apiKey: string,
  useStructuredResponse: boolean = false,
  responseSchema?: Record<string, unknown>
) {
  const url = `${BASE_API_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const requestBody: GeminiRequestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      topK: 32,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
  };

  // Add structured response configuration if requested
  if (useStructuredResponse && responseSchema) {
    requestBody.generationConfig.response_mime_type = "application/json";
    requestBody.generationConfig.response_schema = responseSchema;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  // Handle both structured and unstructured responses
  if (useStructuredResponse) {
    // For structured responses, the actual JSON is in the text field
    const structuredText = data.candidates[0]?.content?.parts[0]?.text || "[]";
    try {
      return JSON.parse(structuredText);
    } catch (error) {
      console.error("Error parsing structured response:", error);
      throw new Error("Failed to parse structured response from Gemini API");
    }
  } else {
    // For unstructured responses, return the text directly
    return data.candidates[0]?.content?.parts[0]?.text || "";
  }
}
