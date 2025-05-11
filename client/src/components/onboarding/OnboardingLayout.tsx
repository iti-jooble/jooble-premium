import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface OnboardingLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps: number;
  onContinue: () => void;
  buttonText?: string;
}

/**
 * A shared layout component for onboarding steps
 */
export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  step,
  totalSteps,
  onContinue,
  buttonText = 'Continue'
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Onboarding
          </h2>
          <div className="text-sm text-gray-500">
            Step {step} of {totalSteps}
          </div>
        </div>
        
        <div className="mb-8">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-8">
          {children}
        </div>
        
        <Button 
          className="w-full" 
          onClick={onContinue}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingLayout;