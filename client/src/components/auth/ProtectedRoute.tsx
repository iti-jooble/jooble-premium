import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useAppSelector } from "@/redux/store";
import { GlobalLoadingScreen } from "@/components/loading/GlobalLoadingScreen";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [, setLocation] = useLocation();
  const { isAuthorized } = useAppSelector((state) => state.user);

  console.log("ProtectedRoute isAuthorized:", isAuthorized);

  useEffect(() => {
    if (!isAuthorized) {
      setLocation("/auth/login");
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return <GlobalLoadingScreen />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
