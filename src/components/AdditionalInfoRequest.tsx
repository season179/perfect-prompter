import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { HelpCircle, Send } from "lucide-react";

interface AdditionalInfoRequestProps {
  questions?: string[];
  onSubmit?: (answers: string[]) => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

const AdditionalInfoRequest = ({
  questions = [
    "Could you provide more context about your use case?",
    "What specific outcome are you looking to achieve with this prompt?",
    "Are there any particular constraints or requirements we should know about?",
  ],
  onSubmit = () => {},
  onCancel = () => {},
  title = "Additional Information Needed",
  description = "To create the best optimized prompt, we need a few more details from you:",
}: AdditionalInfoRequestProps) => {
  const [answers, setAnswers] = useState<string[]>(questions.map(() => ""));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const isSubmitDisabled = answers.some((answer) => answer.trim() === "");

  return (
    <Card className="w-full max-w-[700px] bg-white">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-500" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <p className="text-sm font-medium">{question}</p>
            <Textarea
              placeholder="Your answer here..."
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Skip
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          Submit Additional Info
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdditionalInfoRequest;
