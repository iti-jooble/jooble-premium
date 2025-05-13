import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { useAppSelector } from "@/redux/store";
import { userSelectors } from "@/redux/selectors";
import { hasCompletedOnboarding } from "@/utils/localStorage";
import { PageLoadingIndicator } from "@/components/loading/GlobalLoadingScreen";

interface OnboardingGuardProps {
  children: ReactNode;
}

const OnboardingGuard: React.FC<OnboardingGuardProps> = ({ children }) => {
  const [, setLocation] = useLocation();
  const isAuthorized = useAppSelector(userSelectors.isAuthorizedSelector);

  useEffect(() => {
    if (!hasCompletedOnboarding() && !isAuthorized) {
      setLocation("/onboarding/1");
    }
  }, [isAuthorized, location]);

  return <>{children}</>;
};

export default OnboardingGuard;
