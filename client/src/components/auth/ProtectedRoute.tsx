import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useAppSelector } from "@/redux/store";
import { bootstrapSelectors, userSelectors } from "@/redux/selectors";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [, setLocation] = useLocation();
  const { isLoading } = useAppSelector(
    bootstrapSelectors.getBootstrapStateSelector,
  );
  const isAuthorized = useAppSelector(userSelectors.isAuthorizedSelector);

  useEffect(() => {
    if (!isAuthorized && !isLoading) {
      setLocation("/auth/login");
    }
  }, [isAuthorized, isLoading]);

  return <>{children}</>;
};

export default ProtectedRoute;
