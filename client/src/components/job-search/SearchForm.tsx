import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchIcon, MapPinIcon, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchForm } from "./hooks/useSearchForm";

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
    isSearching
  } = useSearchForm({
    onSearch,
    initialKeywords,
    initialLocation
  });
  
  const handleSubmit = (e: FormEvent) => {
    handleSearch(e);
  };
  
  return (
    <Card className="shadow-sm mb-6 border-border/40">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-2">
              <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input 
                placeholder={t("jobSearch.search.keywords")} 
                className="pl-10"
                value={formState.keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div className="relative">
              <MapPinIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input 
                placeholder={t("jobSearch.search.location")} 
                className="pl-10"
                value={formState.location}
                onChange={(e) => setLocation(e.target.value)} 
              />
            </div>
            <Button type="submit" disabled={isSearching}>
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t("common.labels.searching")}
                </>
              ) : (
                t("jobSearch.search.searchButton")
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};