import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { FileText, Search, Share2 } from "lucide-react";

const OnboardingStep2: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation("/onboarding/step3");
  };

  return (
    <OnboardingLayout step={2}>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-6">Key Features</h3>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold">CV Builder</h4>
              <p className="text-sm text-gray-600">
                Create professional CVs with our easy-to-use templates
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold">Job Search</h4>
              <p className="text-sm text-gray-600">
                Find jobs that match your skills and experience
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold">CV Matching</h4>
              <p className="text-sm text-gray-600">
                See how well your CV matches job requirements
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button onClick={handleContinue} className="px-8">
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep2;
