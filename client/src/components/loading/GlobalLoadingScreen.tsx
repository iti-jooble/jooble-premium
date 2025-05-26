import React from "react";
import { Loader } from "@/components/ui/loader";

export const PageLoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-primary-gradient min-h-screen">
      <Loader size="sm" />
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-gradient">
      <div className="flex flex-col items-center gap-2">
        <Loader />
      </div>
    </div>
  );
};
