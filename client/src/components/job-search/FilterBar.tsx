import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
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
    { category: 'location', value: 'London' },
    { category: 'jobType', value: 'Full-time' },
    { category: 'jobType', value: 'Part-time' },
    { category: 'locationType', value: 'Onsite' },
    { category: 'experienceLevel', value: 'Junior' },
    { category: 'yearsOfExperience', value: '3 years' },
    { category: 'salaryRange', value: '$0 – $23,000+/year' },
  ]);

  // Slider states
  const [yearsOfExperience, setYearsOfExperience] = useState([3]);
  const [salaryRange, setSalaryRange] = useState([23000]);
  const maxSalary = 200000;
  const maxYears = 15;

  // Update selected filters when sliders change
  useEffect(() => {
    // Remove any existing salary range filters
    const filtersWithoutSalary = selectedFilters.filter(
      f => f.category !== 'salaryRange'
    );
    
    // Format the salary range filter value
    const formattedSalaryRange = `$0 – $${salaryRange[0].toLocaleString()}+/year`;
    
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
    const formattedYears = `${yearsOfExperience[0]} years`;
    
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
            <Input placeholder={t("Enter location")} className="mb-3" />
            <div className="space-y-2">
              {["New York", "London", "San Francisco", "Remote", "Berlin"].map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`location-${location}`} 
                    checked={isFilterSelected({ category: 'location', value: location })}
                    onCheckedChange={() => toggleFilter({ category: 'location', value: location })}
                  />
                  <Label
                    htmlFor={`location-${location}`}
                    className="text-sm font-normal"
                  >
                    {location}
                  </Label>
                </div>
              ))}
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
                {yearsOfExperience[0]} years
              </div>
              <Slider
                defaultValue={[3]}
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
                Salary Range: ${0} – ${salaryRange[0].toLocaleString()}+/year
              </div>
              <Slider
                defaultValue={[23000]}
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
