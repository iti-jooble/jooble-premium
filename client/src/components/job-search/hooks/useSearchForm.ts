import { useState, useCallback } from "react";

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
  handleSearch: () => Promise<void>;
  resetForm: () => void;
  isSearching: boolean;
}

export const useSearchForm = ({
  onSearch,
  initialKeywords = [],
}: UseSearchFormProps = {}): UseSearchFormReturn => {
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    setIsSearching(true);

    if (onSearch) {
      await onSearch({ keywords });
    }

    setIsSearching(false);
  }, [keywords, onSearch]);

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
