import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface OnboardingLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps?: number;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
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
      <Card className="w-full max-w-[640px] p-10 bg-white rounded-2xl shadow-sm">
        {children}
      </Card>
    </div>
  );
};

export default OnboardingLayout;
