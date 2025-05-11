import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { hasCompletedOnboarding } from '@/utils/localStorage';
import { PageLoadingIndicator } from '@/components/loading/GlobalLoadingScreen';

/**
 * This component checks if the user has completed onboarding
 * and redirects them accordingly
 */
const OnboardingCheck: React.FC = () => {
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Check if onboarding has been completed
    if (hasCompletedOnboarding()) {
      // If completed, redirect to main app
      setLocation('/');
    } else {
      // If not completed, redirect to first onboarding step
      setLocation('/onboarding/step1');
    }
  }, [setLocation]);

  // Show loading indicator while checking
  return <PageLoadingIndicator />;
};

export default OnboardingCheck;