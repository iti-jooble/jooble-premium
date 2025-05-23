import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const OnboardingStep2: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation("/onboarding/3");
  };

  return (
    <OnboardingLayout step={2}>
      <div className="py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1196px]">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Upload Resume Card */}
            <Card className="bg-white rounded-xl p-12 shadow-sm">
              <h3 className="text-2xl font-bold mb-2">Upload resume</h3>
              <p className="text-gray-700 mb-8">
                Or answer a few quick questions about your job preferences —
                we'll do the rest.
              </p>
              <div className="flex justify-center mt-20">
                <div className="relative w-[90%] h-32">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-primary-background shadow-secondary-box rounded-xl border-2 border-dashed border-gray/30 flex items-end justify-center">
                    <img src="/images/onboarding_cv.svg" alt="CV" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Get Jobs Card */}
            <Card className="p-12 shadow-sm">
              <h3 className="text-2xl font-bold mb-2">Get jobs that fit you</h3>
              <p className="text-gray-700 mb-6">
                We scan the internet and show you roles that fit your skills,
                experience, and goals.
              </p>

              <div className="flex justify-between mt-8 space-x-4">
                {/* Job Match Card 1 */}
                <div className="bg-white rounded-lg border border-gray/10 shadow-secondary-box p-3 flex-1 flex flex-col items-center">
                  <p className="text-xs text-gray font-medium">UX Designer</p>
                  <p className="text-xs text-gray mb-1">in Mirror Lab</p>
                  <img src="/images/percent_50.svg" alt="50% matching score" />
                  <p className="text-[10px] text-gray text-center mt-2">
                    matching score
                  </p>
                </div>

                {/* Job Match Card 2 */}
                <div className="bg-white border border-gray/10 rounded-lg shadow-secondary-box p-3 flex-1 flex flex-col items-center">
                  <p className="text-xs text-gray font-medium">
                    UX/UI Specialist
                  </p>
                  <p className="text-xs text-gray mb-1">in Market X</p>
                  <img src="/images/percent_65.svg" alt="65% matching score" />
                  <p className="text-[10px] text-gray text-center mt-2">
                    matching score
                  </p>
                </div>

                {/* Job Match Card 3 */}
                <div className="bg-white rounded-lg border border-gray/10 shadow-secondary-box p-3 flex-1 flex flex-col items-center">
                  <p className="text-xs text-gray font-medium">
                    Product Designer
                  </p>
                  <p className="text-xs text-gray mb-1">in LO Marketing</p>
                  <img src="/images/percent_87.svg" alt="87% matching score" />
                  <p className="text-[10px] text-gray text-center mt-2">
                    matching score
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Boost Response Rate Card */}
          <Card className="bg-white rounded-xl p-12 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold mb-2">
              Boost your response rate by 4x
            </h3>
            <p className="text-gray-700 mb-8">
              Fitly adapts your resume and cover letter for each role to
              highlight why you are the perfect fit.
            </p>

            <div className="flex justify-center">
              <img
                width={491}
                height={552}
                src="/images/onboarding_cv_boost.png"
                alt="CV boost"
              />
            </div>
          </Card>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            onClick={handleContinue}
            className="text-white font-semibold rounded-xl py-6 px-10 text-lg h-14 bg-indigo-950"
          >
            Let's start
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep2;
