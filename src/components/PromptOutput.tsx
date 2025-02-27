import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Copy, Check } from "lucide-react";

interface PromptOutputProps {
  optimizedPrompt: string;
  isLoading?: boolean;
  onEditOriginal?: () => void;
  onSubmitNew?: () => void;
}

const PromptOutput: React.FC<PromptOutputProps> = ({
  optimizedPrompt = "This is an example of an optimized prompt. It includes specific details, clear instructions, and proper formatting to get the best results from AI systems. The prompt has been enhanced to provide better context and clearer expectations.",
  isLoading = false,
  onEditOriginal = () => {},
  onSubmitNew = () => {},
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(optimizedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Optimized Prompt
      </h2>

      {isLoading ? (
        <Card className="p-6 bg-gray-50 min-h-[200px] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 bg-gray-50 min-h-[200px] relative">
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-gray-700">
              {optimizedPrompt}
            </p>
          </div>

          <div className="absolute top-4 right-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyToClipboard}
                    className="h-8 w-8 rounded-full"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      )}

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onEditOriginal} className="text-sm">
          Edit Original
        </Button>

        <Button variant="outline" onClick={onSubmitNew} className="text-sm">
          New Prompt
        </Button>
      </div>
    </div>
  );
};

export default PromptOutput;
