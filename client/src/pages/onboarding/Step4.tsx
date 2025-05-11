import React from 'react';
import { useLocation } from 'wouter';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import { saveUserPreferences } from '@/utils/localStorage';

const OnboardingStep4: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleSubmit = () => {
    // Save to localStorage to mark onboarding as completed
    saveUserPreferences({
      onboardingCompleted: true,
    });
    
    // Redirect to main app
    setLocation('/');
  };

  return (
    <OnboardingLayout
      step={4}
      totalSteps={4}
      onContinue={handleSubmit}
      buttonText="Submit"
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">4th step</h3>
        <p className="text-gray-600">
          Congratulations! You've reached the final step of our onboarding process.
          Click submit to start using the application.
        </p>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep4;