import React from "react";
import PromptOptimizer from "./PromptOptimizer";
import { Sparkles } from "lucide-react";

const Home = () => {
  // Mock function to simulate backend processing
  const handleOptimizePrompt = async (prompt: string) => {
    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Randomly decide if we need more information or return optimized prompt
    const random = Math.random();

    if (random > 0.7) {
      return {
        needsMoreInfo: [
          "What is the specific context where you'll use this prompt?",
          "What kind of response are you hoping to get?",
          "Are there any specific details or constraints we should consider?",
        ],
      };
    } else {
      // Return optimized prompt
      return {
        optimized: `# Enhanced Prompt\n\n${prompt}\n\nI've refined your prompt to be more specific, adding clear instructions and proper context. This optimization helps AI systems better understand your intent and provide more relevant responses.\n\nKey improvements:\n- Added clear objective statement\n- Structured the request with proper formatting\n- Included specific parameters for the response\n- Removed ambiguous language`,
      };
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
              <span className="font-bold text-xl text-gray-900">
                Prompt Optimizer
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Examples
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Enhance Your AI Prompts
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">
              Get better results from AI systems with our prompt optimization
              tool. Simply enter your prompt and we'll help refine it for
              clarity and effectiveness.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full flex justify-center px-4 sm:px-6 lg:px-8 pt-4">
        <PromptOptimizer onOptimizePrompt={handleOptimizePrompt} />
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Privacy</span>
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Terms</span>
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Contact</span>
                Contact
              </a>
            </div>
            <p className="mt-8 text-center text-base text-gray-400 md:mt-0 md:text-right">
              &copy; 2023 Prompt Optimizer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
