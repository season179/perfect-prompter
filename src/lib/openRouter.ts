import { toast } from "sonner";
import OpenAI from "openai";

// Interface for the prompt rewriting request
export interface PromptRewriteRequest {
    originalPrompt: string;
}

// Interface for the prompt rewriting response
export interface PromptRewriteResponse {
    optimized?: string;
    needsMoreInfo?: string[];
    error?: string;
}

// Pydantic-like schema for the response structure
const PROMPT_REWRITE_SYSTEM_PROMPT = `
You are an expert prompt engineer specializing in transforming basic prompts into well-structured ones.
You'll rewrite prompts using a specific format with these sections:

1. **Goal** (at the top)
   - Clearly state what the user wants to achieve
   - Set the primary objective

2. **Return Format**
   - Specify exactly how the information should be presented
   - Establish the structure of the response

3. **Warnings**
   - Highlight potential pitfalls to avoid
   - Set boundaries for the response

4. **Context Dump**
   - Provide all relevant background information from the original prompt
   - Give the AI the context it needs to generate accurate responses

When I send you a prompt, rewrite it using this structure. If the prompt is missing important context, identify what's missing.
`;

/**
 * Function to get the OpenRouter API key from localStorage
 */
export const getOpenRouterApiKey = (): string | null => {
    return localStorage.getItem("openRouterApiKey");
};

/**
 * Function to save the OpenRouter API key to localStorage
 */
export const saveOpenRouterApiKey = (apiKey: string): void => {
    localStorage.setItem("openRouterApiKey", apiKey);
    toast.success("API key saved successfully");
};

/**
 * Function to check if the OpenRouter API key exists
 */
export const hasOpenRouterApiKey = (): boolean => {
    const key = getOpenRouterApiKey();
    return !!key && key.trim() !== "";
};

/**
 * Create an OpenAI client configured to use OpenRouter
 */
const createOpenAIClient = (apiKey: string): OpenAI => {
    return new OpenAI({
        apiKey,
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
            "HTTP-Referer": window.location.origin,
            "X-Title": "Perfect Prompter",
        },
        dangerouslyAllowBrowser: true, // Enable browser usage
    });
};

/**
 * Function to rewrite a prompt using the OpenRouter API via OpenAI SDK
 */
export const rewritePrompt = async (
    request: PromptRewriteRequest
): Promise<PromptRewriteResponse> => {
    const apiKey = getOpenRouterApiKey();

    if (!apiKey) {
        return {
            error: "No API key found. Please add your OpenRouter API key in settings.",
        };
    }

    try {
        // Create an OpenAI client configured to use OpenRouter
        const openai = createOpenAIClient(apiKey);

        // Call the OpenRouter API using the OpenAI SDK
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-001", // Using Google's Gemini 2.0 Flash model
            messages: [
                {
                    role: "system",
                    content: PROMPT_REWRITE_SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: request.originalPrompt,
                },
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content;

        if (!content) {
            return { error: "Empty response from API" };
        }

        // First, check if this is a properly formatted optimized prompt
        // A well-formed response typically has bold section headings like **Goal**, **Return Format**, etc.
        const hasProperSections =
            (content.includes("**Goal**") || content.includes("## Goal")) &&
            (content.includes("**Return Format**") ||
                content.includes("**Context Dump**"));

        // Check for explicit request formatting - UI elements like buttons, forms, or direct questions
        const explicitlyRequestsMoreInfo =
            content.toLowerCase().includes("we need more information") ||
            (content.toLowerCase().includes("please provide") &&
                content.toLowerCase().includes("following")) ||
            content
                .toLowerCase()
                .includes("please answer the following questions");

        // Check for a missing context section that is a primary section (not just a mention within text)
        const hasMissingContextSection =
            content.match(
                /\*\*Missing Context\*\*|\*\*Additional Information Needed\*\*/i
            ) !== null;

        // If we have a well-formed response with sections AND it's not explicitly requesting more info,
        // treat it as an optimized prompt regardless of any "missing context" mentions
        if (hasProperSections && !explicitlyRequestsMoreInfo) {
            return { optimized: content };
        }

        // If the response explicitly requests more information or has a dedicated missing context section
        if (explicitlyRequestsMoreInfo || hasMissingContextSection) {
            // Extract the missing information points
            let needsMoreInfo: string[] = [];

            // Try to find a missing context or additional info section
            const missingContextSection = content.match(
                /\*\*Missing Context\*\*|\*\*Additional Information Needed\*\*:?([\s\S]*?)(?:\*\*|$)/i
            );

            if (missingContextSection && missingContextSection[1]) {
                // Extract bullet points from the section
                needsMoreInfo = missingContextSection[1]
                    .split(/\n\s*[•*-]\s*|\n\s*\d+\.\s*/)
                    .filter((item) => item.trim())
                    .map((item) => item.trim());
            } else {
                // Fall back to general pattern matching
                const missingInfoPattern =
                    /(?:need|missing|lacks|requires)(?:\s*\w+)*\s*(?:information|context|details)[:\s]*(.*?)(?:\n\n|\n(?=\d\.)|$)/is;
                const missingInfoMatch = content.match(missingInfoPattern);

                needsMoreInfo = missingInfoMatch
                    ? missingInfoMatch[1]
                          .split(/\n(?:-|\d+\.|\*)\s*/)
                          .filter((item) => item.trim())
                          .map((item) => item.trim())
                    : ["Please provide more context about your request"];
            }

            // If we extracted some meaningful questions
            if (needsMoreInfo.length > 0 && needsMoreInfo[0] !== "") {
                return { needsMoreInfo };
            }
        }

        // By default, treat as an optimized prompt
        return { optimized: content };
    } catch (error) {
        console.error("Error making OpenRouter API request:", error);
        let errorMessage = "Unknown error";

        if (error instanceof Error) {
            errorMessage = error.message;

            // Handle OpenAI API specific errors
            if (error instanceof OpenAI.APIError) {
                errorMessage =
                    error.message || error.type || `API error: ${error.status}`;

                console.log(`Request ID: ${error.request_id}`);
                console.log(`Status: ${error.status}`);
                console.log(`Name: ${error.name}`);
            }
        } else {
            errorMessage = String(error);
        }

        return {
            error: `Error connecting to API: ${errorMessage}`,
        };
    }
};
