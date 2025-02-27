import React, { useState } from "react";
import PromptInput from "./PromptInput";
import PromptOutput from "./PromptOutput";
import AdditionalInfoRequest from "./AdditionalInfoRequest";
import { Sparkles, RefreshCw } from "lucide-react";

interface PromptOptimizerProps {
  onOptimizePrompt?: (
    prompt: string,
  ) => Promise<{ optimized: string } | { needsMoreInfo: string[] }>;
  initialPrompt?: string;
}

type OptimizerState = "input" | "processing" | "needsMoreInfo" | "output";

const PromptOptimizer: React.FC<PromptOptimizerProps> = ({
  onOptimizePrompt = async (prompt) => {
    // Mock implementation that randomly decides if more info is needed
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const random = Math.random();
    if (random > 0.7) {
      return {
        needsMoreInfo: [
          "Could you provide more context about your use case?",
          "What specific outcome are you looking to achieve with this prompt?",
          "Are there any particular constraints or requirements we should know about?",
        ],
      };
    } else {
      return {
        optimized: `Optimized version of: "${prompt}"\n\nThis enhanced prompt includes more specific details, clearer instructions, and better formatting to help the AI understand your request more effectively.`,
      };
    }
  },
  initialPrompt = "",
}) => {
  const [state, setState] = useState<OptimizerState>("input");
  const [originalPrompt, setOriginalPrompt] = useState<string>(initialPrompt);
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>("");
  const [additionalQuestions, setAdditionalQuestions] = useState<string[]>([]);
  const [additionalContext, setAdditionalContext] = useState<string[]>([]);

  const handlePromptSubmit = async (prompt: string) => {
    setOriginalPrompt(prompt);
    setState("processing");

    try {
      const result = await onOptimizePrompt(prompt);

      if ("optimized" in result) {
        setOptimizedPrompt(result.optimized);
        setState("output");
      } else if ("needsMoreInfo" in result) {
        setAdditionalQuestions(result.needsMoreInfo);
        setState("needsMoreInfo");
      }
    } catch (error) {
      console.error("Error optimizing prompt:", error);
      // Handle error state here if needed
      setState("input");
    }
  };

  const handleAdditionalInfoSubmit = async (answers: string[]) => {
    setAdditionalContext(answers);
    setState("processing");

    try {
      // Combine original prompt with additional context
      const enhancedPrompt = `${originalPrompt}\n\nAdditional context:\n${answers.join("\n")}`;
      const result = await onOptimizePrompt(enhancedPrompt);

      if ("optimized" in result) {
        setOptimizedPrompt(result.optimized);
        setState("output");
      } else if ("needsMoreInfo" in result) {
        // In a real implementation, you might want to handle this case differently
        // For now, we'll just update the questions and stay in the needsMoreInfo state
        setAdditionalQuestions(result.needsMoreInfo);
      }
    } catch (error) {
      console.error("Error processing additional info:", error);
      setState("needsMoreInfo"); // Stay on the additional info screen
    }
  };

  const handleEditOriginal = () => {
    setState("input");
  };

  const handleNewPrompt = () => {
    setOriginalPrompt("");
    setOptimizedPrompt("");
    setAdditionalQuestions([]);
    setAdditionalContext([]);
    setState("input");
  };

  const handleSkipAdditionalInfo = () => {
    // Process the prompt without additional info
    setState("processing");

    // Use the original prompt without additional context
    onOptimizePrompt(originalPrompt)
      .then((result) => {
        if ("optimized" in result) {
          setOptimizedPrompt(result.optimized);
          setState("output");
        } else {
          // If it still needs more info but user skipped, provide a generic optimization
          setOptimizedPrompt(
            `Enhanced version of: "${originalPrompt}"\n\nThis is a basic optimization of your prompt. For better results, consider providing additional context when requested.`,
          );
          setState("output");
        }
      })
      .catch((error) => {
        console.error("Error after skipping additional info:", error);
        setState("input");
      });
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center space-y-4">
      <header className="w-full text-center mb-2">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-blue-500" />
          Prompt Optimizer
        </h1>
        <p className="text-gray-600 mt-1">
          Refine your prompts for better AI responses
        </p>
      </header>

      {state === "input" && (
        <PromptInput
          onSubmit={handlePromptSubmit}
          isLoading={false}
          placeholder="Enter your prompt here. Be as specific as possible about what you want to achieve..."
          title="Enter Your Prompt"
        />
      )}

      {state === "processing" && (
        <div className="flex flex-col items-center justify-center p-12">
          <RefreshCw className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <p className="text-lg text-gray-700">Optimizing your prompt...</p>
        </div>
      )}

      {state === "needsMoreInfo" && (
        <AdditionalInfoRequest
          questions={additionalQuestions}
          onSubmit={handleAdditionalInfoSubmit}
          onCancel={handleSkipAdditionalInfo}
          title="We Need More Information"
          description="To create the best optimized prompt, please provide the following details:"
        />
      )}

      {state === "output" && (
        <PromptOutput
          optimizedPrompt={optimizedPrompt}
          isLoading={false}
          onEditOriginal={handleEditOriginal}
          onSubmitNew={handleNewPrompt}
        />
      )}
    </div>
  );
};

export default PromptOptimizer;
