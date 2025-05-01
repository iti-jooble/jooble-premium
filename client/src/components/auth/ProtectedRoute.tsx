import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAppSelector } from '@/redux/store';
import { GlobalLoadingScreen } from '@/components/loading/GlobalLoadingScreen';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * A component that protects routes by checking if the user is authenticated.
 * If the user is not authenticated, they are redirected to the login page.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [, setLocation] = useLocation();
  const { isAuthenticated, token } = useAppSelector((state) => state.user);
  
  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!isAuthenticated && !token) {
      setLocation('/auth/login');
    }
  }, [isAuthenticated, token, setLocation]);

  // Show loading while checking authentication status
  if (!isAuthenticated && !token) {
    return <GlobalLoadingScreen fullPage={true} />;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;