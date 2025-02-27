import React from "react";
import PromptOptimizer from "./PromptOptimizer";
import { Sparkles } from "lucide-react";
import ApiKeyManager from "./ApiKeyManager";
import { rewritePrompt } from "../lib/openRouter";
import { toast } from "sonner";

const Home = () => {
    // Use the real function to process prompts via OpenRouter API
    const handleOptimizePrompt = async (prompt: string) => {
        try {
            const result = await rewritePrompt({ originalPrompt: prompt });

            if (result.error) {
                toast.error(result.error);
                return {
                    optimized: `Error: ${result.error}\n\nPlease check your API key and try again.`,
                };
            }

            if (result.needsMoreInfo) {
                return { needsMoreInfo: result.needsMoreInfo };
            }

            return { optimized: result.optimized || "" };
        } catch (error) {
            console.error("Error optimizing prompt:", error);
            toast.error(
                "An unexpected error occurred while processing your prompt."
            );
            return {
                optimized:
                    "Sorry, there was an error processing your request. Please try again later.",
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
                        <div className="flex items-center">
                            <ApiKeyManager />
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
                            Get better results from AI systems with our prompt
                            optimization tool. Simply enter your prompt and
                            we'll help refine it for clarity and effectiveness.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
                <div className="max-w-4xl w-full mx-auto px-4 py-8 bg-white rounded-lg shadow-sm my-8">
                    <PromptOptimizer onOptimizePrompt={handleOptimizePrompt} />
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Prompt Optimizer. All
                        rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
