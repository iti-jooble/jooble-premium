import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { setHasCompletedOnboarding } from "@/utils/localStorage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/redux/store";
import { useAutocomplete, AUTOCOMPLETE_MODE } from "@/hooks/useAutocomplete";
import usePreferences from "@/components/job-search/hooks/usePreferences";
import {
  MAX_SALARY,
  MAX_YEARS_OF_EXPERIENCE,
  preferencesConfig,
} from "@/components/job-search/constants";
import {
  WorkFormats,
  LocationTypes,
  SeniorityLevels,
} from "@/components/job-search/enums";

const OnboardingStep4: React.FC = () => {
  const [_, setLocation] = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [salaryRange, setSalaryRange] = useState([0, MAX_SALARY]);

  const [locationInputValue, setLocationInputValue] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const locationSuggestionsRef = useRef<HTMLDivElement>(null);

  const [keywordInputValue, setKeywordInputValue] = useState("");
  const [showKeywordSuggestions, setShowKeywordSuggestions] = useState(false);
  const keywordInputRef = useRef<HTMLInputElement>(null);
  const keywordSuggestionsRef = useRef<HTMLDivElement>(null);

  const [
    keywordAutocomplete,
    getKeywordAutocomplete,
    clearKeywordAutocomplete,
  ] = useAutocomplete({
    mode: AUTOCOMPLETE_MODE.KEYWORD,
  });

  const [
    locationAutocomplete,
    getLocationAutocomplete,
    clearLocationAutocomplete,
  ] = useAutocomplete({
    mode: AUTOCOMPLETE_MODE.REGION,
  });

  const { preferences, isSelected, togglePreference, updatePreferences } =
    usePreferences();

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        keywordSuggestionsRef.current &&
        !keywordSuggestionsRef.current.contains(event.target as Node) &&
        keywordInputRef.current &&
        !keywordInputRef.current.contains(event.target as Node)
      ) {
        setShowLocationSuggestions(false);
        setShowKeywordSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (locationInputValue.length > 0) {
      getLocationAutocomplete({ query: locationInputValue });
    }
  }, [locationInputValue]);

  useEffect(() => {
    if (keywordInputValue) {
      getKeywordAutocomplete({ query: keywordInputValue });
    }
  }, [keywordInputValue]);

  const handleKeywordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeywordInputValue(value);
    setShowKeywordSuggestions(true);
  };

  const handleLocationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setLocationInputValue(value);
    setShowLocationSuggestions(true);
  };

  const handleKeywordInputFocus = () => {
    setShowKeywordSuggestions(true);
  };

  const handleLocationInputFocus = () => {
    setShowLocationSuggestions(true);
  };

  const handleKeywordSuggestionClick = (suggestion: string) => {
    const currentKeywords = preferences
      .filter((p) => p.category === "keywords")
      .map((k) => k.value) as string[];

    updatePreferences({ keywords: [...currentKeywords, suggestion] });

    // Clear the input and hide dropdown
    setShowKeywordSuggestions(false);
    setKeywordInputValue("");
    clearKeywordAutocomplete();

    // Focus back on the input
    if (keywordInputRef.current) {
      keywordInputRef.current.focus();
    }
  };

  const handleLocationSuggestionClick = (suggestion: string) => {
    updatePreferences({ location: suggestion });

    // Clear the input and hide dropdown
    setShowLocationSuggestions(false);
    setLocationInputValue("");
    clearLocationAutocomplete();

    // Focus back on the input
    if (locationInputRef.current) {
      locationInputRef.current.focus();
    }
  };

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

  const handleSubmit = () => {
    setHasCompletedOnboarding();
    setLocation("/");
  };

  return (
    <OnboardingLayout step={4}>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Review and confirm your preferences
        </h2>
        <p className="text-gray-600 text-center mb-6">
          It's important to find jobs that truly fit you.
        </p>

        {/* Job Title Section */}
        <div className="mb-6">
          <Label htmlFor="job-title" className="block text-sm font-medium mb-2">
            Job title
          </Label>
          <div className="relative">
            <Input
              id="job-title"
              ref={keywordInputRef}
              placeholder="Add job title"
              value={keywordInputValue}
              onChange={handleKeywordInputChange}
              className="mb-2"
            />
            {/* Location suggestions dropdown */}
            {showKeywordSuggestions && keywordAutocomplete.length > 0 && (
              <div
                ref={keywordSuggestionsRef}
                className="absolute z-10 -mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                <ul className="py-1">
                  {keywordAutocomplete.map((suggestion, index) => (
                    <li
                      key={`${suggestion}-${index}`}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        handleKeywordSuggestionClick(suggestion.value)
                      }
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
          <div className="flex flex-wrap gap-2">
            {preferences
              .filter((l) => l.category === "keywords")
              .map((item) => (
                <div
                  key={item.value}
                  className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-1"
                >
                  <span className="mr-2">{item.label}</span>
                  <button
                    onClick={() =>
                      togglePreference({
                        key: item.category,
                        value: item.value,
                      })
                    }
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-6">
          <Label htmlFor="location" className="block text-sm font-medium mb-2">
            Location
          </Label>
          <div className="relative">
            <Input
              id="location"
              ref={locationInputRef}
              placeholder="Add location"
              value={locationInputValue}
              onChange={handleLocationInputChange}
              className="mb-2"
            />
            {/* Location suggestions dropdown */}
            {showLocationSuggestions && locationAutocomplete.length > 0 && (
              <div
                ref={locationSuggestionsRef}
                className="absolute z-10 -mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                <ul className="py-1">
                  {locationAutocomplete.map((suggestion, index) => (
                    <li
                      key={`${suggestion}-${index}`}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        handleLocationSuggestionClick(suggestion.value)
                      }
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
          <div className="flex flex-wrap gap-2">
            {preferences
              .filter((l) => l.category === "location")
              .map((item) => (
                <div
                  key={item.value}
                  className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-1"
                >
                  <span className="mr-2">{item.label}</span>
                  <button
                    onClick={() =>
                      togglePreference({
                        key: item.category,
                        value: item.value,
                      })
                    }
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {Object.entries(preferencesConfig).map(([key, config]) => (
          <div className="mb-6" key={key}>
            <Label className="block text-sm font-medium mb-2">
              {t(config.label)}
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {config.options.map(({ value, label }) => (
                <div
                  className="flex items-center space-x-2"
                  key={`${key}-${value}`}
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
          </div>
        ))}

        {/* Years of Experience Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium">Years of Experience:</Label>
            <span className="text-sm font-medium">
              {yearsOfExperience} years
            </span>
          </div>
          <Slider
            value={[yearsOfExperience]}
            onValueChange={handleChangeYearsOfExperience}
            max={MAX_YEARS_OF_EXPERIENCE}
            step={1}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0 years</span>
            <span>15+ years</span>
          </div>
        </div>

        {/* Salary Range Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium">Salary Range:</Label>
            <span className="text-sm font-medium">
              ${salaryRange[0]} – ${salaryRange[1]}/monthly
            </span>
          </div>
          <Slider
            value={salaryRange}
            onValueChange={handleChangeSalaryRange}
            min={0}
            max={MAX_SALARY}
            step={1000}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$50,000+</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleSubmit}
            className="text-white font-semibold rounded-xl py-3 px-10 h-14"
          >
            Show jobs
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep4;
