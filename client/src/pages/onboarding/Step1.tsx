import React from 'react';
import { useLocation } from 'wouter';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';

const OnboardingStep1: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation('/onboarding/step2');
  };

  return (
    <OnboardingLayout
      step={1}
      totalSteps={4}
      onContinue={handleContinue}
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">1st step</h3>
        <p className="text-gray-600">
          Welcome to our application! This is the first step of our onboarding process.
        </p>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep1;