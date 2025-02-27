import React, { createContext, useContext, useState, useEffect } from "react";

interface ApiKeyContextType {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
  isKeySet: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load API key from localStorage on component mount
    const storedKey = localStorage.getItem("openrouter_api_key");
    if (storedKey) {
      setApiKeyState(storedKey);
    }
    setIsLoading(false);
  }, []);

  const setApiKey = (key: string) => {
    localStorage.setItem("openrouter_api_key", key);
    setApiKeyState(key);
  };

  const clearApiKey = () => {
    localStorage.removeItem("openrouter_api_key");
    setApiKeyState(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ApiKeyContext.Provider
      value={{
        apiKey,
        setApiKey,
        clearApiKey,
        isKeySet: !!apiKey,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = (): ApiKeyContextType => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
};
