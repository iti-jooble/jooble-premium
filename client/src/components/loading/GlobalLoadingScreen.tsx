import React from "react";
import { Loader2 } from "lucide-react";

interface GlobalLoadingScreenProps {
  fullPage?: boolean;
}

export const GlobalLoadingScreen: React.FC<GlobalLoadingScreenProps> = ({
  fullPage = true,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${fullPage ? "min-h-screen" : "min-h-[50vh]"} bg-background`}
    >
      <div className="text-center">
        <div className="relative mb-4 flex justify-center">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary to-primary/60 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <Loader2 className="h-10 w-10 text-primary animate-spin relative" />
        </div>
        <h2 className="text-lg font-medium">Loading</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Please wait while we set up your experience
        </p>
      </div>
    </div>
  );
};

export const PageLoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="h-6 w-6 text-primary animate-spin" />
    </div>
  );
};
