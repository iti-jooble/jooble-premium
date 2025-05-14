import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const OnboardingStep1: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation("/onboarding/2");
  };

  return (
    <OnboardingLayout step={1}>
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Want more responses?
          <br />
          Find your fit!
        </h2>

        <p className="text-lg text-gray-700 mb-10">
          75% of applications don't get any response because
          <br />
          the resumes don't fit the jobs.
        </p>

        <div className="rounded-lg mb-10">
          <div className="flex justify-center items-end">
            {/* First column - 8% */}
            <div className="text-center px-9 py-6">
              <h3 className="text-4xl font-bold mb-2">8%</h3>
              <div className="flex justify-center">
                <div className="h-[61px] w-[124px] bg-[#14213D] flex items-end mb-4"></div>
              </div>
              <p className="text-gray-700 font-medium">
                Response rate
                <br />
                with generic
                <br />
                resumes
              </p>
            </div>

            {/* Second column - 32% */}
            <div className="text-center px-9 bg-primary-background py-6">
              <h3 className="text-4xl font-bold mb-2">32%</h3>
              <div className="flex justify-center">
                <div className="h-[180px] w-[124px] bg-primary-blue flex items-end mb-4"></div>
              </div>
              <p className="text-gray-700 font-medium flex flex-col items-center">
                Response
                <br />
                rate with
                <br />
                <div className="flex items-start justify-center">
                  <img
                    src="/images/logo.svg"
                    alt="Fitly Logo"
                    className="relative top-[1px] mr-1 w-[14px]"
                  />
                  <img
                    src="/images/logo-name.svg"
                    alt="Fitly"
                    className="w-[40px]"
                  />
                </div>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={handleContinue}
            className="text-white font-semibold rounded-xl py-6 px-10 text-lg h-14"
          >
            How it works?
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep1;
