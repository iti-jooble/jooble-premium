import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FilterBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="w-72 ml-6">
      <h2 className="text-xl font-semibold mb-5">Filters</h2>
      
      <Accordion type="multiple" defaultValue={[]}>
        {/* Location Filter */}
        <AccordionItem value="location" className="bg-white rounded-xl shadow-sm mb-4 border-none">
          <AccordionTrigger className="px-5 py-5 rounded-xl hover:no-underline">
            <h3 className="text-lg font-medium">Location</h3>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 pt-2">
            <Input placeholder="Enter location" className="mb-3" />
            <div className="space-y-2">
              {["Remote", "New York", "San Francisco", "Chicago", "Austin"].map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox id={`location-${location}`} />
                  <Label htmlFor={`location-${location}`} className="text-sm font-normal">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Experience Level */}
        <AccordionItem value="experience" className="bg-white rounded-xl shadow-sm mb-4 border-none">
          <AccordionTrigger className="px-5 py-5 rounded-xl hover:no-underline">
            <h3 className="text-lg font-medium">Experience Level</h3>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 pt-2">
            <div className="space-y-2">
              {["Entry Level", "Mid Level", "Senior Level", "Manager", "Executive"].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox id={`level-${level}`} />
                  <Label htmlFor={`level-${level}`} className="text-sm font-normal">
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Job Type */}
        <AccordionItem value="job-type" className="bg-white rounded-xl shadow-sm mb-4 border-none">
          <AccordionTrigger className="px-5 py-5 rounded-xl hover:no-underline">
            <h3 className="text-lg font-medium">Job Type</h3>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 pt-2">
            <div className="space-y-2">
              {["Full-time", "Part-time", "Contract", "Internship", "Hybrid", "Remote"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`type-${type}`} />
                  <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
