import { FormEvent, useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, Loader2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchForm } from "./hooks/useSearchForm";
import { Badge } from "@/components/ui/badge";

interface SearchFormProps {
  onSearch?: (data: { keywords: string[] }) => Promise<void>;
  initialKeywords?: string[];
}

// Mock server suggestions based on input
// In a real app, this would come from an API call
const getServerSuggestions = (input: string): string[] => {
  if (!input.trim()) return [];

  const allSuggestions = [
    "Software Engineer",
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Product Manager",
    "Data Scientist",
    "DevOps Engineer",
    "React Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "Python Developer",
    "Java Developer",
    "Ruby Developer",
  ];

  return allSuggestions
    .filter((suggestion) =>
      suggestion.toLowerCase().includes(input.toLowerCase()),
    )
    .slice(0, 5); // Limit to 5 suggestions
};

export const SearchForm = ({
  onSearch,
  initialKeywords = [],
}: SearchFormProps) => {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedPhrases] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { setKeywords, handleSearch, isSearching, keywords } = useSearchForm({
    onSearch,
    initialKeywords,
  });

  // Update suggestions when input changes
  useEffect(() => {
    const serverSuggestions = getServerSuggestions(inputValue);

    // Create the full set of suggestions
    let allSuggestions = [...serverSuggestions];

    // Add the user's exact input if it's not already in the suggestions
    // and it's not empty
    if (inputValue.trim() && !serverSuggestions.includes(inputValue)) {
      allSuggestions.push(inputValue);
    }

    setSuggestions(allSuggestions);
  }, [inputValue]);

  // Close dropdown when clicking outside
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
    setInputValue("");
    setShowDropdown(false);

    // Focus back on the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeywordRemove = (phrase: string) => {
    setKeywords(keywords.filter((p) => p !== phrase));
  };

  return (
    <div className="bg-white rounded-full shadow-sm mb-6 p-2 flex items-center hover:shadow-md">
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
              {showDropdown && suggestions.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 mt-2 w-full left-0 bg-white border border-gray-200 rounded-md shadow-lg"
                >
                  <ul className="py-1">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={`${suggestion}-${index}`}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
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
          className="rounded-full h-12 w-12 bg-primary-blue hover:bg-blue-700"
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
