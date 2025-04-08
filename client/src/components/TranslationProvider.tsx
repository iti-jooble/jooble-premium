import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "@/components/ui/loader";

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const { i18n } = useTranslation();
  const [isI18nInitialized, setIsI18nInitialized] = useState(i18n.isInitialized);
  const [isResourcesLoaded, setIsResourcesLoaded] = useState(
    Object.keys(i18n.options.resources || {}).length > 0
  );

  useEffect(() => {
    // Check if already initialized
    if (i18n.isInitialized) {
      setIsI18nInitialized(true);
    }

    // Listen for initialization change
    const handleInitialized = () => {
      setIsI18nInitialized(true);
    };

    // Listen for loaded translations
    const handleLoaded = () => {
      setIsResourcesLoaded(true);
    };

    i18n.on("initialized", handleInitialized);
    i18n.on("loaded", handleLoaded);

    return () => {
      i18n.off("initialized", handleInitialized);
      i18n.off("loaded", handleLoaded);
    };
  }, [i18n]);

  // Only render children when i18n is initialized AND resources are loaded
  if (!isI18nInitialized || !isResourcesLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}