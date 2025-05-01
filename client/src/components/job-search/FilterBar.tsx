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
    <div className="md:col-span-1">
      <h2 className="text-xl font-semibold mb-4">{t("Filters")}</h2>
      <Accordion type="multiple" defaultValue={[]}>
        {/* Location Filter */}
        <AccordionItem
          value="location"
          className="bg-white rounded-xl shadow-sm mb-2 border-none hover:shadow-md"
        >
          <AccordionTrigger
            withChevron={false}
            className="px-4 py-4 rounded-xl hover:no-underline"
          >
            <h3 className="text-md font-bold">{t("Location")}</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <Input placeholder={t("Enter location")} className="mb-3" />
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="location-remote" />
                <Label
                  htmlFor="location-remote"
                  className="text-sm font-normal"
                >
                  Remote
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience Level */}
        <AccordionItem
          value="experience"
          className="bg-white rounded-xl shadow-sm mb-2 border-none hover:shadow-md"
        >
          <AccordionTrigger
            withChevron={false}
            className="px-4 py-4 rounded-xl hover:no-underline"
          >
            <h3 className="text-md font-bold">{t("Experience Level")}</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-2">
              {[
                "Entry Level",
                "Mid Level",
                "Senior Level",
                "Manager",
                "Executive",
              ].map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox id={`level-${level}`} />
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

        {/* Job Type */}
        <AccordionItem
          value="job-type"
          className="bg-white rounded-xl shadow-sm mb-2 border-none hover:shadow-md"
        >
          <AccordionTrigger
            withChevron={false}
            className="px-4 py-4 rounded-xl hover:no-underline"
          >
            <h3 className="text-md font-bold">{t("Job Type")}</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-2">
              {[
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
                "Hybrid",
                "Remote",
              ].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`type-${type}`} />
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
      </Accordion>
    </div>
  );
};
