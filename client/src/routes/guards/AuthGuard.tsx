import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useAppSelector } from "@/redux/store";
import { bootstrapSelectors, userSelectors } from "@/redux/selectors";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [, setLocation] = useLocation();
  const { isLoading } = useAppSelector(
    bootstrapSelectors.getBootstrapStateSelector,
  );
  const isAuthorized = useAppSelector(userSelectors.isAuthorizedSelector);

  useEffect(() => {
    if (!isAuthorized) {
      setLocation("/auth/login");
    }
  }, [isAuthorized]);

  return <>{children}</>;
};

export default AuthGuard;
