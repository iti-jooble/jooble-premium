import React from 'react';
import { Loader2 } from 'lucide-react';
import { useAppLoading } from '@/context/AppLoadingContext';
import { Button } from '@/components/ui/button';

interface GlobalLoadingScreenProps {
  fullPage?: boolean;
}

export const GlobalLoadingScreen: React.FC<GlobalLoadingScreenProps> = ({ 
  fullPage = true 
}) => {
  const { initialRequestError, retryInitialRequest } = useAppLoading();

  // If there's an error, show a retry button
  if (initialRequestError) {
    return (
      <div className={`flex flex-col items-center justify-center ${fullPage ? 'min-h-screen' : 'min-h-[50vh]'} bg-background`}>
        <div className="max-w-md text-center p-6 bg-card rounded-lg shadow-lg border border-border">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Failed to Load Application</h2>
          <p className="text-sm text-muted-foreground mb-4">
            There was a problem connecting to the server. Please check your internet connection and try again.
          </p>
          <Button 
            onClick={() => retryInitialRequest()} 
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex flex-col items-center justify-center ${fullPage ? 'min-h-screen' : 'min-h-[50vh]'} bg-background`}>
      <div className="text-center">
        <div className="relative mb-4">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary to-primary/60 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <Loader2 className="h-10 w-10 text-primary animate-spin relative" />
        </div>
        <h2 className="text-lg font-medium">Loading</h2>
        <p className="text-sm text-muted-foreground mt-1">Please wait while we set up your experience</p>
      </div>
    </div>
  );
};

// For code-splitting loading fallback
export const PageLoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="h-6 w-6 text-primary animate-spin" />
    </div>
  );
};