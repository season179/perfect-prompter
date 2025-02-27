import React, { useState, useEffect } from "react";
import { useApiKey } from "../contexts/ApiKeyContext";
import ApiKeyDialog from "./ApiKeyDialog";
import { Button } from "./ui/button";
import { KeyRound } from "lucide-react";

const ApiKeyManager: React.FC = () => {
  const { apiKey, clearApiKey, isKeySet } = useApiKey();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Open dialog automatically if API key is not set
  useEffect(() => {
    if (!isKeySet) {
      setDialogOpen(true);
    }
  }, [isKeySet]);

  return (
    <>
      <div className="flex items-center gap-2">
        {isKeySet ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-green-600 flex items-center">
              <KeyRound className="h-4 w-4 mr-1" />
              API Key Set
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setDialogOpen(true)}
            >
              Change
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearApiKey}
            >
              Clear
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setDialogOpen(true)}
          >
            Set API Key
          </Button>
        )}
      </div>
      <ApiKeyDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};

export default ApiKeyManager;
