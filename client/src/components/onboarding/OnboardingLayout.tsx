import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface OnboardingLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps?: number;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  step,
  totalSteps = 4,
}) => {
  const progressPercentage = ((step - 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <img src="/images/logo.svg" alt="Fitly" />
        </div>
      </div>
      <div className="mb-8 w-full max-w-md">
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-center mt-2 text-sm text-gray-500">
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
      </div>

      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm">
        {children}
      </Card>
    </div>
  );
};

export default OnboardingLayout;
