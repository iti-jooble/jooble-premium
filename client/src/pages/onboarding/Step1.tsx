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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 px-8">
          Want more responses? Find your fit!
        </h2>

        <p className="text-xl mb-10 px-8">
          75% of applications don't get any response because the resumes don't
          fit the jobs.
        </p>

        <div className="rounded-lg mb-10">
          <div className="flex justify-center items-end">
            {/* First column - 8% */}
            <div className="text-center px-9 py-6">
              <h3 className="text-4xl font-bold mb-2">8%</h3>
              <div className="flex justify-center">
                <div className="h-[61px] w-[124px] bg-[#F6F7F8] flex items-end rounded-b-[2px] rounded-t-3xl mb-4 shadow-[0px_-10px_21px_0px_#F2F2F2_inset,_-8px_0px_12px_0px_#F3F3F3_inset,_6px_6px_16px_0px_rgba(142,152,168,0.50)_inset]"></div>
              </div>
              <p className="text-gray font-medium">
                Response rate with
                <br />
                generic resumes
              </p>
            </div>

            {/* Second column - 32% */}
            <div className="text-center px-9 py-6">
              <h3 className="text-4xl font-bold mb-2">32%</h3>
              <div className="flex justify-center">
                <div className="h-[180px] w-[124px] bg-primary-blue flex items-end mb-4 rounded-b-[2px] rounded-t-3xl shadow-[0px_-10px_21px_0px_#7D77FB_inset,_4px_4px_24px_0px_rgba(93,85,250,0.20),_-8px_0px_16px_0px_#928DFC_inset,_8px_8px_24px_0px_#272469_inset]"></div>
              </div>
              <p className="text-gray font-medium flex flex-col items-center">
                Response rate with
                <br />
                Fitly
                <br />
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
