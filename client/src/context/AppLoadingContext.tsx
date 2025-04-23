import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';

// Define interface for initialization data
export interface AppInitData {
  appConfig: {
    version: string;
    features: {
      jobSearch: boolean;
      cvBuilder: boolean;
      coverLetterGenerator: boolean;
      cvMatching: boolean;
    };
    maintenance: boolean;
  };
  // Add any other initialization data needed
}

// Define the context type
interface AppLoadingContextType {
  isInitialLoading: boolean;
  isInitialRequestComplete: boolean;
  setLoading: (isLoading: boolean) => void;
  initialRequestError: Error | null;
  retryInitialRequest: () => Promise<void>;
  initData: AppInitData | null;
}

// Create context with default values
const AppLoadingContext = createContext<AppLoadingContextType>({
  isInitialLoading: true,
  isInitialRequestComplete: false,
  setLoading: () => {},
  initialRequestError: null,
  retryInitialRequest: async () => {},
  initData: null,
});

// Custom hook for using the context
export const useAppLoading = () => useContext(AppLoadingContext);

// Custom hook to access only the init data
export const useAppInitData = () => {
  const { initData } = useContext(AppLoadingContext);
  if (!initData) {
    throw new Error('useAppInitData must be used within InitialRequestProvider after data has loaded');
  }
  return initData;
};

interface InitialRequestProviderProps {
  children: React.ReactNode;
}

export const InitialRequestProvider: React.FC<InitialRequestProviderProps> = ({ children }) => {
  const [isInitialLoading, setIsLoading] = useState(true);
  const [isInitialRequestComplete, setIsInitialRequestComplete] = useState(false);
  const [initialRequestError, setInitialRequestError] = useState<Error | null>(null);
  const [initData, setInitData] = useState<AppInitData | null>(null);

  const loadInitialData = async () => {
    setIsLoading(true);
    setInitialRequestError(null);
    
    try {
      // Make the initial API request to get essential application data
      // apiRequest already throws if response is not ok
      const response = await apiRequest('GET', '/api/init');
      const data = await response.json() as AppInitData;
      
      // Store the initialization data
      setInitData(data);
      
      // Mark the initial request as complete
      setIsInitialRequestComplete(true);
      
      // Add the data to sessionStorage for resilience on page reloads
      sessionStorage.setItem('app_init_data', JSON.stringify(data));
      
      console.log('Initial application data loaded', data);
    } catch (error) {
      console.error('Failed to load initial application data', error);
      setInitialRequestError(error as Error);
      
      // Try to load from session storage as a fallback
      const cachedData = sessionStorage.getItem('app_init_data');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData) as AppInitData;
          setInitData(parsedData);
          setIsInitialRequestComplete(true);
          console.log('Loaded initial data from cache');
        } catch (parseError) {
          console.error('Failed to parse cached data', parseError);
        }
      }
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
        initData,
      }}
    >
      {children}
    </AppLoadingContext.Provider>
  );
};

export default AppLoadingContext;