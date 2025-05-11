import React from "react";
import { useLocation } from "wouter";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const OnboardingStep3: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation("/onboarding/step4");
  };

  return (
    <OnboardingLayout step={3}>
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Getting Started Tips</h3>

        <ul className="space-y-3 text-left mb-6">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>
              Create your CV first to maximize your job search success
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Use keyword-rich descriptions that match job postings</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>
              Update your skills regularly to improve matching accuracy
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Save jobs you're interested in to track applications</span>
          </li>
        </ul>
        <div className="flex justify-center">
          <Button onClick={handleContinue} className="px-8">
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep3;
