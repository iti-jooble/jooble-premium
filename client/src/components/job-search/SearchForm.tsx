import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, Loader2, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchForm } from "./hooks/useSearchForm";
import { Badge } from "@/components/ui/badge";

interface SearchFormProps {
  onSearch?: (data: { keywords: string; location: string }) => void;
  initialKeywords?: string;
  initialLocation?: string;
}

export const SearchForm = ({ 
  onSearch,
  initialKeywords = "",
  initialLocation = "" 
}: SearchFormProps) => {
  const { t } = useTranslation();
  
  const { 
    formState,
    setKeywords,
    setLocation,
    handleSearch,
    resetForm,
    isSearching
  } = useSearchForm({
    onSearch,
    initialKeywords,
    initialLocation
  });
  
  const handleSubmit = (e: FormEvent) => {
    handleSearch(e);
  };

  const handleKeywordRemove = (keyword: string) => {
    // For simplicity, just clear keywords for now
    setKeywords("");
  };
  
  return (
    <div className="bg-white rounded-full shadow-sm mb-6 p-2 flex items-center">
      <form onSubmit={handleSubmit} className="flex-1 flex items-center">
        <div className="flex-1 flex items-center px-3">
          <SearchIcon className="h-5 w-5 text-muted-foreground mr-2" />
          <div className="flex flex-wrap gap-2 items-center">
            {formState.keywords ? (
              <Badge 
                variant="outline" 
                className="flex items-center gap-1 bg-background"
              >
                {formState.keywords}
                <XIcon 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleKeywordRemove(formState.keywords)}
                />
              </Badge>
            ) : null}
            <Input 
              placeholder="Add job title" 
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
              value={formState.keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
        </div>
        <Button 
          type="submit" 
          disabled={isSearching}
          size="icon"
          className="rounded-full h-12 w-12"
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