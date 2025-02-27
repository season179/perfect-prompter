import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Send } from "lucide-react";

interface PromptInputProps {
  onSubmit?: (prompt: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  title?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({
  onSubmit = () => {},
  isLoading = false,
  placeholder = "Enter your prompt here...",
  title = "Enter Your Prompt",
}) => {
  const [prompt, setPrompt] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-center text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder={placeholder}
            className="min-h-32 p-4 text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="px-6"
          >
            {isLoading ? (
              <>
                <span className="mr-2">Processing</span>
                <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
              </>
            ) : (
              <>
                <span className="mr-2">Submit</span>
                <Send size={16} />
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PromptInput;
