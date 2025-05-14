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
  const progressPercentage = (step / (totalSteps + 1)) * 100;

  return (
    <div className="min-h-screen bg-primary-gradient flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <div className="flex items-start justify-center">
          <img
            src="/images/logo.svg"
            alt="Fitly Logo"
            className="relative top-[2px] mr-2"
          />
          <img src="/images/logo-name.svg" alt="Fitly" />
        </div>
      </div>
      <div className="mb-4 w-full max-w-[640px]">
        <Progress value={progressPercentage} className="h-2" />
      </div>
      <Card className="w-full max-w-[640px] p-10 bg-white rounded-2xl shadow-sm">
        {children}
      </Card>
    </div>
  );
};

export default OnboardingLayout;
