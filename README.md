# Perfect Prompter

A modern web application designed to help users optimize their AI prompts for better results when interacting with AI systems.

## Overview

Perfect Prompter analyzes your original prompts and rewrites them in a structured format that works best for AI interactions. It transforms basic prompts into well-organized queries with clear sections that AI models can easily understand and respond to accurately.

## Prompt Structure

Perfect Prompter rewrites your prompts with the following optimized structure:

1. **Goal** (at the top)
   - Clearly states what you want to achieve
   - Sets the primary objective for the AI
   - Example: "Goal: Create a comprehensive marketing plan for a new eco-friendly product launch"

2. **Return Format**
   - Specifies exactly how you want the information presented
   - Establishes the structure of the response
   - Example: "Return Format: Provide a step-by-step plan with timeline, budget estimates, and key performance indicators"

3. **Warnings**
   - Highlights potential pitfalls to avoid
   - Sets boundaries for the response
   - Example: "Warnings: Avoid generic marketing advice. Focus specifically on eco-friendly product positioning"

4. **Context Dump**
   - Provides all relevant background information
   - Gives the AI the context it needs to generate accurate responses
   - Example: "Context: Our target audience is environmentally conscious millennials. The product is made from recycled materials and has carbon-neutral manufacturing"

This structured approach significantly improves AI responses by providing clear guidance, explicit expectations, and comprehensive context.

## Features

- **Prompt Optimization**: Transform basic prompts into the effective structure outlined above
- **Interactive Feedback**: Receive suggestions when additional context is needed
- **Clean, Modern UI**: User-friendly interface built with React and Tailwind CSS
- **Copy-to-Clipboard**: Easily copy your optimized prompts with one click

## Technical Requirements

- **OpenRouter API Key**: This application requires an OpenRouter API key to access language model services for prompt optimization
- **Modern Browser**: Works best with the latest versions of Chrome, Firefox, Safari, or Edge

## Installation

1. Clone the repository
```bash
git clone https://github.com/season179/perfect-prompter.git
cd perfect-prompter
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## API Key Setup

Perfect Prompter requires an OpenRouter API key to function:

- When you first open the application, you'll be prompted to enter your OpenRouter API key
- The API key is securely stored in your browser's localStorage 
- The app will remember your key for future sessions
- You can update or change your API key anytime through the application interface
- To get an OpenRouter API key, visit [OpenRouter](https://openrouter.ai)

## How It Works

1. Enter your original prompt in the input area
2. Click "Optimize Prompt" to send it for processing
3. If needed, provide additional context when prompted
4. Receive your optimized prompt, restructured with Goal, Return Format, Warnings, and Context Dump
5. Copy and use your enhanced prompt with any AI system for improved results

## Privacy & Security

- Your OpenRouter API key is stored only in your browser's localStorage and never sent to our servers
- API requests are made directly from your browser to OpenRouter's servers
- Your prompts are processed securely and not retained after optimization

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Lucide React icons
- **Build Tools**: Vite, SWC

## License

[MIT License](LICENSE)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/season179/perfect-prompter/issues).
