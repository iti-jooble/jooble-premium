import React from 'react';
import { useLocation } from 'wouter';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';

const OnboardingStep3: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation('/onboarding/step4');
  };

  return (
    <OnboardingLayout
      step={3}
      totalSteps={4}
      onContinue={handleContinue}
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">3rd step</h3>
        <p className="text-gray-600">
          Almost there! This is the third step of our onboarding process.
        </p>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep3;