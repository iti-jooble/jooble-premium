import { useState, useCallback, FormEvent } from "react";

interface SearchFormState {
  keywords: string[];
}

interface UseSearchFormProps {
  onSearch?: (data: SearchFormState) => void;
  initialKeywords?: string[];
}

interface UseSearchFormReturn {
  keywords: string[];
  setKeywords: (value: string[]) => void;
  handleSearch: () => void;
  resetForm: () => void;
  isSearching: boolean;
}

export const useSearchForm = ({
  onSearch,
  initialKeywords = [],
}: UseSearchFormProps = {}): UseSearchFormReturn => {
  // Form state
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Handler for form submission
  const handleSearch = useCallback(() => {
    setIsSearching(true);

    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch({ keywords });
    }

    // Reset loading state after search (in real app, this would be in the callback)
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  }, [keywords, onSearch]);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setKeywords(initialKeywords);
  }, [initialKeywords]);

  return {
    keywords,
    setKeywords,
    handleSearch,
    resetForm,
    isSearching,
  };
};
