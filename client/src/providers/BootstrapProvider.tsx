import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { runBootstrap } from "@/redux/thunks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GlobalLoadingScreen } from "@/components/loading/GlobalLoadingScreen";

const BootstrapProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.bootstrap);

  const initialize = () => {
    dispatch(runBootstrap());
  };

  useEffect(() => {
    initialize();
  }, []);

  if (isLoading) {
    return <GlobalLoadingScreen isLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-gradient flex flex-col items-center justify-center p-4">
        <Card className="max-w-md text-center p-6 rounded-lg">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-destructive"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">
            Failed to Load Application
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            There was a problem connecting to the server. Please try again
            later.
          </p>
          <Button onClick={initialize} className="mt-2 font-bold">
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  return children;
};

export default BootstrapProvider;
