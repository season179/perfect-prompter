import React, { useState } from "react";
import { useApiKey } from "../contexts/ApiKeyContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { KeyRound } from "lucide-react";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ open, onOpenChange }) => {
  const { setApiKey } = useApiKey();
  const [inputKey, setInputKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputKey.trim()) {
      setError("API key cannot be empty");
      return;
    }
    
    // Basic validation - OpenRouter API keys typically start with sk-or-
    if (!inputKey.trim().startsWith("sk-or-") || inputKey.length < 20) {
      setError("This doesn't look like a valid OpenRouter API key. It should start with 'sk-or-'");
      return;
    }
    
    setApiKey(inputKey.trim());
    setInputKey("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Enter your OpenRouter API Key
          </DialogTitle>
          <DialogDescription>
            Your API key is stored locally on your device and never sent to our servers.
            You can get a free API key from{" "}
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              OpenRouter.ai
            </a>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                id="apiKey"
                placeholder="sk-or-v1-..."
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setError("");
                }}
                className="w-full"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <p className="text-xs text-gray-500">
                This application uses OpenRouter to access AI models like Claude for prompt optimization.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save API Key</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
