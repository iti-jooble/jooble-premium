import React from "react";
import { Loader2 } from "lucide-react";

export const PageLoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-10 h-10 animate-spin text-primary-blue" />
    </div>
  );
};

interface GlobalLoadingScreenProps {
  isLoading: boolean;
}

export const GlobalLoadingScreen: React.FC<GlobalLoadingScreenProps> = ({
  isLoading,
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-10 h-10 animate-spin text-primary-blue" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};
