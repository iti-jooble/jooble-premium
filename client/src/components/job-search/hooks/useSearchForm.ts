import { useState, useCallback, FormEvent } from "react";

interface SearchFormState {
  keywords: string;
  location: string;
}

interface UseSearchFormProps {
  onSearch?: (data: SearchFormState) => void;
  initialKeywords?: string;
  initialLocation?: string;
}

interface UseSearchFormReturn {
  formState: SearchFormState;
  setKeywords: (value: string) => void;
  setLocation: (value: string) => void;
  handleSearch: (e: FormEvent) => void;
  resetForm: () => void;
  isSearching: boolean;
}

export const useSearchForm = ({
  onSearch,
  initialKeywords = "",
  initialLocation = "",
}: UseSearchFormProps = {}): UseSearchFormReturn => {
  // Form state
  const [keywords, setKeywords] = useState<string>(initialKeywords);
  const [location, setLocation] = useState<string>(initialLocation);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Handler for form submission
  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setIsSearching(true);

      // Create form data object
      const formData: SearchFormState = {
        keywords: keywords.trim(),
        location: location.trim(),
      };

      // Call the onSearch callback if provided
      if (onSearch) {
        onSearch(formData);
      }

      // Reset loading state after search (in real app, this would be in the callback)
      setTimeout(() => {
        setIsSearching(false);
      }, 500);
    },
    [keywords, location, onSearch]
  );

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setKeywords(initialKeywords);
    setLocation(initialLocation);
  }, [initialKeywords, initialLocation]);

  return {
    formState: { keywords, location },
    setKeywords,
    setLocation,
    handleSearch,
    resetForm,
    isSearching,
  };
};