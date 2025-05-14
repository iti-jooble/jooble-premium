import { FormEvent, useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, Loader2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchForm } from "./hooks/useSearchForm";
import { Badge } from "@/components/ui/badge";
import { useAutocomplete, AUTOCOMPLETE_MODE } from "@/hooks/useAutocomplete";

interface SearchFormProps {
  onSearch?: (data: { keywords: string[] }) => Promise<void>;
  initialKeywords?: string[];
}

export const SearchForm = ({
  onSearch,
  initialKeywords = [],
}: SearchFormProps) => {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedPhrases] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { setKeywords, handleSearch, isSearching, keywords } = useSearchForm({
    onSearch,
    initialKeywords,
  });

  const [autocomplete, getAutocomplete, clearAutocomplete] = useAutocomplete({
    mode: AUTOCOMPLETE_MODE.KEYWORD,
  });

  useEffect(() => {
    if (inputValue) {
      getAutocomplete({ query: inputValue });
    }
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSearch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(true);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Add the suggestion to selected phrases if not already there
    if (!keywords.includes(suggestion)) {
      setKeywords([...keywords, suggestion]);
    }

    // Clear the input and hide dropdown
    setShowDropdown(false);
    setInputValue("");
    clearAutocomplete();

    // Focus back on the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeywordRemove = (phrase: string) => {
    setKeywords(keywords.filter((p) => p !== phrase));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-6 p-2 flex items-center hover:shadow-md">
      <form onSubmit={handleSubmit} className="flex-1 flex items-center">
        <div className="flex-1 flex items-center px-3 relative">
          <SearchIcon className="h-5 w-5 text-muted-foreground mr-2" />
          <div className="flex flex-wrap gap-2 items-center w-full relative">
            {keywords.map((keyword, index) => (
              <Badge
                key={`${keyword}-${index}`}
                variant="outline"
                className="flex items-center gap-1 bg-background"
              >
                {keyword}
                <button
                  onClick={() => handleKeywordRemove(keyword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </Badge>
            ))}
            <div className="flex-1 min-w-[180px]">
              <Input
                ref={inputRef}
                placeholder={
                  selectedPhrases.length
                    ? "Add another job title"
                    : "Add job title"
                }
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              {showDropdown && inputValue && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 mt-2 w-full left-0 bg-white border border-gray-200 rounded-md shadow-lg"
                >
                  <ul className="py-1">
                    {[...autocomplete, inputValue].map((suggestion, index) => (
                      <li
                        key={`${suggestion.value}-${index}`}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleSuggestionClick(suggestion?.value ?? suggestion)
                        }
                      >
                        {suggestion?.label ? (
                          <span
                            className="flex justify-between items-center"
                            dangerouslySetInnerHTML={{
                              __html: suggestion.label,
                            }}
                          />
                        ) : (
                          suggestion
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSearching}
          size="icon"
          className="rounded-xl h-12 w-12"
        >
          {isSearching ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SearchIcon className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
};
