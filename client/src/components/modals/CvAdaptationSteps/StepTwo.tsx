import React, { useState } from "react";
import { CvUserInfo } from "@shared/schema";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  text: string;
  note?: string;
  answer?: boolean | null;
}

interface StepTwoProps {
  jobDetails?: any; // Replace with proper job type when available
  cv?: CvUserInfo;
  onCvUpdate: (updatedData: Partial<CvUserInfo>) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ jobDetails, cv, onCvUpdate }) => {
  // Mock questions based on the job details
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      text: "Do you have experience with platforms like ServiceNow, Workday, Zendesk, ITSM, or HR systems?",
      note: "This is mentioned as a plus in the job description.",
      answer: null,
    },
    {
      id: "2",
      text: "Have you worked on projects where you needed to create or optimize service catalogs, request/fulfillment systems, or self-service platforms?",
      note: "For example, any project where users could order, learn about, or track something.",
      answer: null,
    },
    {
      id: "3",
      text: "Have you worked in cross-functional teams with people from HR, IT, Finance, or Facilities?",
      note: "This is mentioned as a plus in the job description, and we can highlight it.",
      answer: null,
    },
    {
      id: "4",
      text: "Are you open to working in a hybrid format?",
      note: "This is stated as a mandatory requirement, so it's good to briefly include it in the resume or cover letter.",
      answer: null,
    },
  ]);

  const handleAnswer = (questionId: string, answer: boolean) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, answer } : q)),
    );
  };

  const allQuestionsAnswered = questions.every((q) => q.answer !== null);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-2">
          A few questions to adapt your resume for this job
        </h2>
        <p className="text-gray-600">
          It'll help highlight what makes you the right match.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-primary-background rounded-2xl py-4 px-6 flex items-center justify-between"
          >
            <div className="mb-2">
              <p className="font-semibold text-gray-900 mb-1">
                {question.text}
              </p>
              {question.note && (
                <p className="text-sm text-gray-500 italic">{question.note}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2 ml-6">
              <div className="flex flex-col items-center">
                <Button
                  variant={question.answer === true ? "default" : "outline"}
                  size="sm"
                  className={`mb-1 rounded-full [&_svg]:size-6 w-14 h-14 p-0 ${question.answer !== true ? "bg-white text-gray-800 hover:bg-gray-100" : ""}`}
                  onClick={() => handleAnswer(question.id, true)}
                >
                  <ThumbsUp absoluteStrokeWidth />
                </Button>
                <span
                  className={
                    question.answer === true
                      ? `text-primary-blue font-bold`
                      : ""
                  }
                >
                  Yes
                </span>
              </div>

              <div className="flex flex-col items-center">
                <Button
                  variant={question.answer === false ? "default" : "outline"}
                  size="sm"
                  className={`mb-1 rounded-full [&_svg]:size-6 w-14 h-14 p-0 ${question.answer !== false ? "bg-white text-gray-800 hover:bg-gray-100" : ""}`}
                  onClick={() => handleAnswer(question.id, false)}
                >
                  <ThumbsDown absoluteStrokeWidth />
                </Button>
                <span
                  className={
                    question.answer === false
                      ? `text-primary-blue font-bold`
                      : ""
                  }
                >
                  No
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTwo;
