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
import { Search, X } from "lucide-react";

// Define filter types
type FilterCategory = 
  | 'location'
  | 'jobType'
  | 'locationType'
  | 'experienceLevel'
  | 'yearsOfExperience'
  | 'salaryRange';

type Filter = {
  category: FilterCategory;
  value: string;
};

export const FilterBar = () => {
  const { t } = useTranslation();
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([
    { category: 'location', value: 'New York' },
    { category: 'jobType', value: 'Full-time' },
    { category: 'jobType', value: 'Part-time' },
    { category: 'locationType', value: 'Onsite' },
    { category: 'experienceLevel', value: 'Junior' },
    { category: 'yearsOfExperience', value: '3 years' },
    { category: 'salaryRange', value: '$0 – $23,000+/year' },
  ]);

  // Location search states
  const [locationInput, setLocationInput] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const locationSuggestionsRef = useRef<HTMLDivElement>(null);

  // Mock location suggestions function - would be replaced with API call
  const getLocationSuggestions = (input: string): string[] => {
    if (!input.trim()) return [];
    
    // Sample locations - would come from API
    const locations = [
      'New York, NY, USA',
      'New Orleans, LA, USA',
      'Newark, NJ, USA',
      'Newcastle, UK',
      'London, UK',
      'Los Angeles, CA, USA',
      'San Francisco, CA, USA',
      'Seattle, WA, USA',
      'Berlin, Germany',
      'Tokyo, Japan',
      'Sydney, Australia',
      'Toronto, Canada',
      'Paris, France',
      'Amsterdam, Netherlands',
      'Singapore'
    ];
    
    const filteredLocations = locations.filter(location => 
      location.toLowerCase().includes(input.toLowerCase())
    );
    
    // Add user input as the last suggestion if it's not in the list
    if (input.trim() && !filteredLocations.includes(input)) {
      return [...filteredLocations, input];
    }
    
    return filteredLocations;
  };

  // Update suggestions when input changes
  useEffect(() => {
    setLocationSuggestions(getLocationSuggestions(locationInput));
  }, [locationInput]);

  // Handle selecting a location
  const handleLocationSelect = (location: string) => {
    // First remove any existing location filters
    const filtersWithoutLocation = selectedFilters.filter(
      f => f.category !== 'location'
    );
    
    // Add the new location filter
    setSelectedFilters([
      ...filtersWithoutLocation,
      { category: 'location', value: location }
    ]);
    
    // Reset input and hide suggestions
    setLocationInput('');
    setShowLocationSuggestions(false);
  };

  // Slider states
  const [yearsOfExperience, setYearsOfExperience] = useState([0, 3]);
  const [salaryRange, setSalaryRange] = useState([0, 23000]);
  const maxSalary = 200000;
  const maxYears = 15;
  
  // Close suggestions when clicking outside
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update selected filters when sliders change
  useEffect(() => {
    // Remove any existing salary range filters
    const filtersWithoutSalary = selectedFilters.filter(
      f => f.category !== 'salaryRange'
    );
    
    // Format the salary range filter value
    const formattedSalaryRange = `$${salaryRange[0].toLocaleString()} – $${salaryRange[1].toLocaleString()}+/year`;
    
    // Add the new salary range filter
    setSelectedFilters([
      ...filtersWithoutSalary,
      { category: 'salaryRange', value: formattedSalaryRange }
    ]);
  }, [salaryRange]);

  useEffect(() => {
    // Remove any existing years of experience filters
    const filtersWithoutYears = selectedFilters.filter(
      f => f.category !== 'yearsOfExperience'
    );
    
    // Format the years of experience filter value
    const formattedYears = `${yearsOfExperience[0]} – ${yearsOfExperience[1]} years`;
    
    // Add the new years of experience filter
    setSelectedFilters([
      ...filtersWithoutYears,
      { category: 'yearsOfExperience', value: formattedYears }
    ]);
  }, [yearsOfExperience]);

  // Function to toggle a filter
  const toggleFilter = (filter: Filter) => {
    // Don't toggle slider-based filters this way
    if (filter.category === 'salaryRange' || filter.category === 'yearsOfExperience') {
      return;
    }

    const exists = selectedFilters.some(
      (f) => f.category === filter.category && f.value === filter.value
    );

    if (exists) {
      setSelectedFilters(
        selectedFilters.filter(
          (f) => !(f.category === filter.category && f.value === filter.value)
        )
      );
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  // Function to check if a filter is selected
  const isFilterSelected = (filter: Filter) => {
    return selectedFilters.some(
      (f) => f.category === filter.category && f.value === filter.value
    );
  };

  return (
    <div className="md:col-span-1">
      <h2 className="text-2xl font-semibold mb-4">{t("Filters")}</h2>
      
      {/* Selected Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedFilters.map((filter, index) => (
          <div 
            key={`${filter.category}-${filter.value}-${index}`}
            className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2"
          >
            <span className="mr-2">{filter.value}</span>
            <button
              onClick={() => toggleFilter(filter)}
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
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={locationInputRef}
                  placeholder={t("Search for a location")}
                  className="pl-8"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onFocus={() => setShowLocationSuggestions(true)}
                />
              </div>
              
              {/* Location suggestions dropdown */}
              {showLocationSuggestions && locationSuggestions.length > 0 && (
                <div 
                  ref={locationSuggestionsRef}
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
                >
                  <ul className="py-1">
                    {locationSuggestions.map((suggestion, index) => (
                      <li 
                        key={`${suggestion}-${index}`}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleLocationSelect(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Job Type */}
        <AccordionItem
          value="job-type"
          className="bg-white rounded-xl shadow-sm mb-2 border-none hover:shadow-md"
        >
          <AccordionTrigger className="px-4 py-4 rounded-xl hover:no-underline">
            <h3 className="text-md font-bold">{t("Job Type")}</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-2">
              {[
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
                "Temporary",
              ].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`type-${type}`}
                    checked={isFilterSelected({ category: 'jobType', value: type })}
                    onCheckedChange={() => toggleFilter({ category: 'jobType', value: type })}
                  />
                  <Label
                    htmlFor={`type-${type}`}
                    className="text-sm font-normal"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Location Type */}
        <AccordionItem
          value="location-type"
          className="bg-white rounded-xl shadow-sm mb-2 border-none hover:shadow-md"
        >
          <AccordionTrigger className="px-4 py-4 rounded-xl hover:no-underline">
            <h3 className="text-md font-bold">{t("Location Type")}</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-2">
              {[
                "Onsite",
                "Remote",
                "Hybrid",
              ].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`location-type-${type}`} 
                    checked={isFilterSelected({ category: 'locationType', value: type })}
                    onCheckedChange={() => toggleFilter({ category: 'locationType', value: type })}
                  />
                  <Label
                    htmlFor={`location-type-${type}`}
                    className="text-sm font-normal"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience Level */}
        <AccordionItem
          value="experience"
          className="bg-white rounded-xl shadow-sm mb-2 border-none hover:shadow-md"
        >
          <AccordionTrigger className="px-4 py-4 rounded-xl hover:no-underline">
            <h3 className="text-md font-bold">{t("Experience Level")}</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-2">
              {[
                "Junior",
                "Mid Level",
                "Senior Level",
                "Manager",
                "Executive",
              ].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`level-${level}`} 
                    checked={isFilterSelected({ category: 'experienceLevel', value: level })}
                    onCheckedChange={() => toggleFilter({ category: 'experienceLevel', value: level })}
                  />
                  <Label
                    htmlFor={`level-${level}`}
                    className="text-sm font-normal"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Years of Experience */}
        <AccordionItem
          value="years-of-experience"
          className="bg-white rounded-xl shadow-sm mb-2 border-none hover:shadow-md"
        >
          <AccordionTrigger className="px-4 py-4 rounded-xl hover:no-underline">
            <h3 className="text-md font-bold">{t("Years of Experience")}</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-4">
              <div className="text-md">
                {yearsOfExperience[0]} – {yearsOfExperience[1]} years
              </div>
              <Slider
                defaultValue={[0, 3]}
                max={maxYears}
                min={0}
                step={1}
                value={yearsOfExperience}
                onValueChange={setYearsOfExperience}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0</span>
                <span>{maxYears}+ years</span>
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
            <div className="space-y-4">
              <div className="text-md">
                Salary Range: ${salaryRange[0].toLocaleString()} – ${salaryRange[1].toLocaleString()}+/year
              </div>
              <Slider
                defaultValue={[0, 23000]}
                max={maxSalary}
                min={0}
                step={1000}
                value={salaryRange}
                onValueChange={setSalaryRange}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$0</span>
                <span>${maxSalary.toLocaleString()}+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
