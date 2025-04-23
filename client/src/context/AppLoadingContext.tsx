import React, { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useDispatch } from "react-redux";
import { setPremiumStatus } from "@/redux/slices/userInfoSlice";

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
  userInfo?: {
    premium: {
      isSubscribed: boolean;
      expireDate: string | null;
    };
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

export const useAppLoading = () => useContext(AppLoadingContext);

interface InitialRequestProviderProps {
  children: React.ReactNode;
}

export const InitialRequestProvider: React.FC<InitialRequestProviderProps> = ({
  children,
}) => {
  const [isInitialLoading, setIsLoading] = useState(true);
  const [isInitialRequestComplete, setIsInitialRequestComplete] =
    useState(false);
  const [initialRequestError, setInitialRequestError] = useState<Error | null>(
    null,
  );
  const [initData, setInitData] = useState<AppInitData | null>(null);
  const dispatch = useDispatch();

  const loadInitialData = async () => {
    setIsLoading(true);
    setInitialRequestError(null);

    try {
      // Make the initial API request to get essential application data
      // apiRequest already throws if response is not ok
      const response = await apiRequest("GET", "/api/init");
      const data = (await response.json()) as AppInitData;

      // Store the initialization data
      setInitData(data);

      // Update userInfo in Redux store if available
      if (data.userInfo?.premium) {
        dispatch(setPremiumStatus(data.userInfo.premium));
      }

      // Mark the initial request as complete
      setIsInitialRequestComplete(true);
    } catch (error) {
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
        initData,
      }}
    >
      {children}
    </AppLoadingContext.Provider>
  );
};

export default AppLoadingContext;
