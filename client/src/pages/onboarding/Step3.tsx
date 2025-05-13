import React from "react";
import { useLocation } from "wouter";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const OnboardingStep3: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation("/onboarding/4");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log("File selected:", e.target.files?.[0]);
    handleContinue();
  };

  const handleNoResume = () => {
    // Handle no resume option
    handleContinue();
  };

  return (
    <OnboardingLayout step={3}>
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let's start with your resume
        </h2>

        <p className="text-lg text-gray-700 mb-10">
          We'll analyze it to better understand your preferences — so
          <br />
          we can match you with the jobs you'll truly love.
        </p>

        <div className="bg-primary-background p-20 rounded-lg border border-gray-300 border-dashed mb-10 flex flex-col items-center justify-center">
          <div className="mb-4">
            <FileText className="h-16 w-16 text-gray-400" />
          </div>

          <p className="text-gray-500 mb-6">
            Choose file or drag and drop here (PDF, DOC,
            <br />
            DOCX up to 5MB)
          </p>

          <label htmlFor="resume-upload">
            <Button className="text-white font-semibold rounded-xl py-3 px-6 h-14">
              Choose a file
            </Button>
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleNoResume}
            className="rounded-xl py-2 px-6 h-12"
          >
            Don't have a resume
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep3;
