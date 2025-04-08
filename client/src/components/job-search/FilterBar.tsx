import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from "react-i18next";
import {
  BriefcaseIcon,
  ChevronDownIcon,
  DollarSignIcon,
  CalendarIcon,
  BuildingIcon,
  XIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const FilterBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <BriefcaseIcon className="h-4 w-4 mr-2" />
            {t("jobSearch.filters.jobType")}
            <ChevronDownIcon className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((type) => (
              <DropdownMenuItem key={type} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id={`type-${type}`} className="rounded" />
                  <label htmlFor={`type-${type}`}>{type}</label>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <BuildingIcon className="h-4 w-4 mr-2" />
            {t("jobSearch.filters.experienceLevel")}
            <ChevronDownIcon className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {["Entry Level", "Mid Level", "Senior Level", "Manager", "Executive"].map((level) => (
              <DropdownMenuItem key={level} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id={`level-${level}`} className="rounded" />
                  <label htmlFor={`level-${level}`}>{level}</label>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <DollarSignIcon className="h-4 w-4 mr-2" />
            {t("jobSearch.filters.salary")}
            <ChevronDownIcon className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 p-4">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">{t("jobSearch.filters.salary")}</h4>
            <Slider defaultValue={[100000]} max={200000} step={10000} className="my-6" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>$100,000</span>
              <span>$200,000+</span>
            </div>
            <div className="pt-2 flex justify-end">
              <Button size="sm">{t("common.buttons.apply")}</Button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="sm" className="flex items-center">
        <CalendarIcon className="h-4 w-4 mr-2" />
        {t("jobSearch.filters.datePosted")}
        <ChevronDownIcon className="h-4 w-4 ml-2" />
      </Button>

      <Button variant="outline" size="sm" className="ml-auto flex items-center">
        {t("jobSearch.filters.clearButton")}
        <XIcon className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};