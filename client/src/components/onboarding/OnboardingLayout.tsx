import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface OnboardingLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps: number;
  onContinue: () => void;
  buttonText?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  step,
  totalSteps,
  onContinue,
  buttonText = 'Continue',
}) => {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md mx-auto p-6 space-y-6">
        <div className="mb-8">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-6 mb-6">
          {children}
        </div>

        <div className="flex justify-end">
          <Button onClick={onContinue} className="px-8">
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;