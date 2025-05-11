import React from 'react';
import { useLocation } from 'wouter';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import { Briefcase } from 'lucide-react';

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
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-primary/10">
            <Briefcase className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4">Welcome to Your Career Platform</h3>
        <p className="text-gray-600 mb-6">
          Start your journey to professional success with our comprehensive career tools.
          We'll help you create outstanding CVs, find matching jobs, and advance your career.
        </p>
        <div className="bg-primary/5 p-4 rounded-lg">
          <p className="text-sm text-primary-foreground">
            Over 87% of users who complete the onboarding find a job within 3 months.
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep1;