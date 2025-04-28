import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const FilterBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="w-80 bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-medium mb-4">Filters</h2>
      
      <Accordion type="multiple" defaultValue={["location", "experience", "job-type"]}>
        {/* Location Filter */}
        <AccordionItem value="location">
          <AccordionTrigger className="py-3">Location</AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <Input placeholder="Enter location" className="mb-2" />
              <div className="space-y-2 mt-3">
                {["Remote", "New York", "San Francisco", "London", "Berlin"].map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox id={`location-${location}`} />
                    <Label htmlFor={`location-${location}`} className="text-sm font-normal">
                      {location}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Experience Level */}
        <AccordionItem value="experience">
          <AccordionTrigger className="py-3">Experience Level</AccordionTrigger>
          <AccordionContent>
            <div className="py-2 space-y-2">
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
        <AccordionItem value="job-type">
          <AccordionTrigger className="py-3">Job Type</AccordionTrigger>
          <AccordionContent>
            <div className="py-2 space-y-2">
              {["Full-time", "Part-time", "Contract", "Internship", "Temporary"].map((type) => (
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