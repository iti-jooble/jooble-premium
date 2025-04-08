import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchIcon, MapPinIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SearchForm = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="shadow-sm mb-6 border-border/40">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative col-span-2">
            <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input placeholder={t("jobSearch.search.keywords")} className="pl-10" />
          </div>
          <div className="relative">
            <MapPinIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input placeholder={t("jobSearch.search.location")} className="pl-10" />
          </div>
          <Button>{t("jobSearch.search.searchButton")}</Button>
        </div>
      </CardContent>
    </Card>
  );
};