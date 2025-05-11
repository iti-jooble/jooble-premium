import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const OnboardingStep1: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation("/onboarding/step2");
  };

  const handleHowItWorks = () => {
    // Can be connected to a modal or navigation to an info page
    console.log("How it works clicked");
  };

  return (
    <OnboardingLayout step={1}>
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Want more responses?<br />
          Find your fit!
        </h2>
        
        <p className="text-lg text-gray-700 mb-10">
          75% of applications don't get any response because<br />
          the resumes don't fit the jobs.
        </p>
        
        <div className="bg-slate-50 p-8 rounded-lg mb-10">
          <div className="flex justify-around items-end">
            {/* First column - 8% */}
            <div className="text-center w-5/12">
              <div className="flex justify-center">
                <div className="h-[120px] w-[100px] bg-[#14213D] flex items-end mb-4"></div>
              </div>
              <h3 className="text-4xl font-bold mb-2">8%</h3>
              <p className="text-gray-700 font-medium">
                Response rate<br />
                with generic<br />
                resumes
              </p>
            </div>
            
            {/* Second column - 32% */}
            <div className="text-center w-5/12">
              <div className="flex justify-center">
                <div className="h-[220px] w-[100px] bg-[#0066FF] flex items-end mb-4"></div>
              </div>
              <h3 className="text-4xl font-bold mb-2">32%</h3>
              <p className="text-gray-700 font-medium">
                Response<br />
                rate with<br />
                <span className="text-[#0066FF] font-bold">fitly</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <Button 
            onClick={handleHowItWorks}
            className="bg-[#0066FF] hover:bg-[#0055DD] text-white font-semibold rounded-full py-6 px-10 text-lg"
          >
            How it works?
          </Button>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleContinue} 
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep1;
