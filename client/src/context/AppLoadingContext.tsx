import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';

// Define the context type
interface AppLoadingContextType {
  isInitialLoading: boolean;
  isInitialRequestComplete: boolean;
  setLoading: (isLoading: boolean) => void;
  initialRequestError: Error | null;
  retryInitialRequest: () => Promise<void>;
}

// Create context with default values
const AppLoadingContext = createContext<AppLoadingContextType>({
  isInitialLoading: true,
  isInitialRequestComplete: false,
  setLoading: () => {},
  initialRequestError: null,
  retryInitialRequest: async () => {},
});

// Custom hook for using the context
export const useAppLoading = () => useContext(AppLoadingContext);

interface InitialRequestProviderProps {
  children: React.ReactNode;
}

export const InitialRequestProvider: React.FC<InitialRequestProviderProps> = ({ children }) => {
  const [isInitialLoading, setIsLoading] = useState(true);
  const [isInitialRequestComplete, setIsInitialRequestComplete] = useState(false);
  const [initialRequestError, setInitialRequestError] = useState<Error | null>(null);

  const loadInitialData = async () => {
    setIsLoading(true);
    setInitialRequestError(null);
    
    try {
      // Make the initial API request to get essential application data
      // This could be user data, app configuration, etc.
      const response = await apiRequest('GET', '/api/init');
      
      // Process the response if needed
      console.log('Initial application data loaded', response);
      
      // Mark the initial request as complete
      setIsInitialRequestComplete(true);
    } catch (error) {
      console.error('Failed to load initial application data', error);
      setInitialRequestError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load the initial data when the component mounts
  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <AppLoadingContext.Provider
      value={{
        isInitialLoading,
        isInitialRequestComplete,
        setLoading: setIsLoading,
        initialRequestError,
        retryInitialRequest: loadInitialData,
      }}
    >
      {children}
    </AppLoadingContext.Provider>
  );
};

export default AppLoadingContext;