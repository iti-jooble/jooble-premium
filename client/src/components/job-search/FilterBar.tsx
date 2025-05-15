import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";
import {
  MAX_SALARY,
  MAX_YEARS_OF_EXPERIENCE,
  preferencesConfig,
} from "./constants";
import { useAutocomplete, AUTOCOMPLETE_MODE } from "@/hooks/useAutocomplete";
import usePreferences from "./hooks/usePreferences";
import { User } from "@/types/state/user.types";

export const FilterBar = () => {
  const { t } = useTranslation();
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [salaryRange, setSalaryRange] = useState([0, MAX_SALARY]);

  const { preferences, isSelected, togglePreference, updatePreferences } =
    usePreferences();

  const [autocomplete, getAutocomplete, clearAutocomplete] = useAutocomplete({
    mode: AUTOCOMPLETE_MODE.REGION,
  });

  useEffect(() => {
    const experienceYears = preferences.find(
      ({ category }) => category === "experienceYears",
    )?.value as number;

    const salaryRange = preferences.find(
      ({ category }) => category === "salaryRange",
    )?.value as User["preferences"]["salaryRange"];

    if (experienceYears) {
      setYearsOfExperience(experienceYears);
    }

    if (salaryRange) {
      setSalaryRange([salaryRange.min || 0, salaryRange.max || MAX_SALARY]);
    }
  }, []);

  // Location search states
  const [locationInput, setLocationInput] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const locationSuggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (locationInput.length > 0) {
      getAutocomplete({ query: locationInput });
    }
  }, [locationInput]);

  const handleLocationSelect = (location: string) => {
    updatePreferences({ location });

    setShowLocationSuggestions(false);
    clearAutocomplete();
    setLocationInput("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationSuggestionsRef.current &&
        !locationSuggestionsRef.current.contains(event.target as Node) &&
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target as Node)
      ) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangeSalaryRange = (value: number[]) => {
    setSalaryRange(value);
    updatePreferences({
      salaryRange: {
        min: value[0],
        max: value[1],
      },
    });
  };

  const handleChangeYearsOfExperience = (value: number[]) => {
    setYearsOfExperience(value[0]);
    updatePreferences({ experienceYears: value[0] });
  };

  return (
    <div className="md:col-span-1">
      <h2 className="text-2xl font-semibold mb-4">{t("Preferences")}</h2>

      {/* Selected Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {preferences
          .filter((p) => p.category !== "keywords")
          .map((item, index) => (
            <div
              key={`${item.category}-${item.value}-${index}`}
              className="flex items-center bg-white border border-primary-blue rounded-xl px-4 py-2"
            >
              <span className="mr-2">{item.label}</span>
              <button
                onClick={() =>
                  togglePreference({ key: item.category, value: item.value })
                }
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
      </div>

      <Accordion type="multiple" defaultValue={[]}>
        {/* Location Filter */}
        <AccordionItem
          value="location"
          className="bg-white rounded-xl shadow-sm mb-2 border-none hover:shadow-md"
        >
          <AccordionTrigger className="px-4 py-4 rounded-xl hover:no-underline">
            <h3 className="text-md font-bold">{t("Location")}</h3>
          </AccordionTrigger>
          <AccordionContent
            innerClassName="px-4 pb-4 pt-2"
            className="data-[state=open]:overflow-visible"
          >
            <div className="relative">
              <div className="relative">
                <Input
                  ref={locationInputRef}
                  placeholder={t("Search for a location")}
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onFocus={() => setShowLocationSuggestions(true)}
                />
              </div>

              {/* Location suggestions dropdown */}
              {showLocationSuggestions && autocomplete.length > 0 && (
                <div
                  ref={locationSuggestionsRef}
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
                >
                  <ul className="py-1">
                    {autocomplete.map((suggestion, index) => (
                      <li
                        key={`${suggestion}-${index}`}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleLocationSelect(suggestion.value)}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: suggestion.label,
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {Object.entries(preferencesConfig).map(([key, config]) => (
          <AccordionItem
            value={key}
            key={key}
            className="bg-white rounded-xl shadow-sm mb-2 border-none hover:shadow-md"
          >
            <AccordionTrigger className="px-4 py-4 rounded-xl hover:no-underline">
              <h3 className="text-md font-bold">{t(config.label)}</h3>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-2">
                {config.options.map(({ value, label }) => (
                  <div
                    key={`${key}-${value}`}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`${key}-${value}`}
                      checked={isSelected({
                        key: key as keyof User["preferences"],
                        value,
                      })}
                      onCheckedChange={() =>
                        togglePreference({
                          key: key as keyof User["preferences"],
                          value,
                        })
                      }
                    />
                    <Label
                      htmlFor={`${key}-${value}`}
                      className="text-sm font-normal"
                    >
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* Years of Experience */}
        <AccordionItem
          value="years-of-experience"
          className="bg-white rounded-xl shadow-sm mb-2 border-none hover:shadow-md"
        >
          <AccordionTrigger className="px-4 py-4 rounded-xl hover:no-underline">
            <h3 className="text-md font-bold">{t("Years of Experience")}</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div>
              <div className="text-md">
                {yearsOfExperience
                  ? `${yearsOfExperience} years`
                  : "Any experience"}
              </div>
              <Slider
                defaultValue={[1]}
                max={MAX_YEARS_OF_EXPERIENCE}
                step={1}
                value={[yearsOfExperience]}
                onValueChange={handleChangeYearsOfExperience}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0</span>
                <span>{MAX_YEARS_OF_EXPERIENCE}+ years</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Salary Range */}
        <AccordionItem
          value="salary-range"
          className="bg-white rounded-xl shadow-sm mb-2 border-none hover:shadow-md"
        >
          <AccordionTrigger className="px-4 py-4 rounded-xl hover:no-underline">
            <h3 className="text-md font-bold">{t("Salary Range")}</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div>
              <div className="text-md">
                ${salaryRange[0].toLocaleString()} – $
                {salaryRange[1].toLocaleString()}/monthly
              </div>
              <Slider
                defaultValue={[0, MAX_SALARY]}
                max={MAX_SALARY}
                min={0}
                step={1000}
                value={salaryRange}
                onValueChange={handleChangeSalaryRange}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$0</span>
                <span>${MAX_SALARY.toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
