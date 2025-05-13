import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const OnboardingStep2: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation("/onboarding/3");
  };

  return (
    <OnboardingLayout step={2}>
      <div>
        <h2 className="text-3xl font-bold mb-10 text-center">
          How Fitly works
        </h2>

        <div className="space-y-16">
          {/* Step 1 */}
          <div className="flex items-start">
            <div className="w-1/2 pr-4">
              <div className="mb-2">
                <span className="text-4xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Upload resume</h3>
              <p className="text-gray-700">
                Or answer a few quick questions about your job preferences —
                we'll do the rest.
              </p>
            </div>
            <div className="w-1/2">
              <div className="bg-slate-50 h-40 w-full"></div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start">
            <div className="w-1/2">
              <div className="bg-slate-50 h-40 w-full"></div>
            </div>
            <div className="w-1/2 pl-4">
              <div className="mb-2">
                <span className="text-4xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get jobs that fit you</h3>
              <p className="text-gray-700">
                We scan the internet and show you roles that fit your skills,
                experience, and goals.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start">
            <div className="w-1/2 pr-4">
              <div className="mb-2">
                <span className="text-4xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Boost your response rate by 4x
              </h3>
              <p className="text-gray-700">
                Fitly adapts your resume and cover letter for each role to
                highlight why you are the perfect fit.
              </p>
            </div>
            <div className="w-1/2">
              <div className="bg-slate-50 h-40 w-full"></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            onClick={handleContinue}
            className="text-white font-semibold rounded-xl py-6 px-10 text-lg h-14"
          >
            Let's start
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep2;
