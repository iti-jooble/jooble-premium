import React from 'react';
import { useLocation } from 'wouter';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';

const OnboardingStep2: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation('/onboarding/step3');
  };

  return (
    <OnboardingLayout
      step={2}
      totalSteps={4}
      onContinue={handleContinue}
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">2nd step</h3>
        <p className="text-gray-600">
          You're making great progress! This is the second step of our onboarding process.
        </p>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep2;