import { useState } from "react";
import { useLocation } from "wouter";
import { PlusCircle, GraduationCap, BriefcaseBusiness, Sparkles, FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonalInfoSection, PersonalInfoValues } from "@/components/cv-builder/PersonalInfoSection";
import { WorkExperienceSection } from "@/components/cv-builder/WorkExperienceSection";
import { EducationSection } from "@/components/cv-builder/EducationSection";
import { SkillsSection } from "@/components/cv-builder/SkillsSection";
import { SummarySection, SummaryValues } from "@/components/cv-builder/SummarySection";
import { CvPreview } from "@/components/cv-builder/CvPreview";
import { toast } from "@/hooks/use-toast";

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  isCurrent: boolean;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  description: string;
  isCurrent: boolean;
}

interface Skill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

interface CvData {
  personalInfo: Partial<PersonalInfoValues>;
  summary?: string;
  skills: Skill[];
  education: Education[];
  workExperience: WorkExperience[];
}

const CvBuilderCreate = () => {
  const [, navigate] = useLocation();
  
  // State to track CV data
  const [cvData, setCvData] = useState<CvData>({
    personalInfo: {},
    summary: "",
    skills: [],
    education: [],
    workExperience: []
  });

  // Handlers for each section
  const handlePersonalInfoSave = (values: PersonalInfoValues) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: values
    }));
  };

  const handleSummarySave = (values: SummaryValues) => {
    setCvData(prev => ({
      ...prev,
      summary: values.summary
    }));
  };

  const handleWorkExperienceSave = (experiences: WorkExperience[]) => {
    setCvData(prev => ({
      ...prev,
      workExperience: experiences
    }));
  };

  const handleEducationSave = (educations: Education[]) => {
    setCvData(prev => ({
      ...prev,
      education: educations
    }));
  };

  const handleSkillsSave = (skills: Skill[]) => {
    setCvData(prev => ({
      ...prev,
      skills: skills
    }));
  };

  const handleChangeTemplate = () => {
    toast({
      title: "Coming Soon",
      description: "Template selection will be available in a future update.",
    });
  };

  return (
    <div className="p-6 animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Create New CV</h1>
        <p className="text-neutral-600 mt-1">Build your professional CV</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side with accordion form */}
        <div className="w-full lg:w-2/5">
          <Accordion type="single" collapsible defaultValue="personal" className="w-full">
            {/* Personal Information Section */}
            <AccordionItem value="personal" className="bg-white rounded-md shadow-sm border mb-3">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center text-left">
                  <PlusCircle className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <h3 className="text-base font-medium">Informations personnelles</h3>
                    <p className="text-xs text-gray-500">Contact details, name, location</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <PersonalInfoSection 
                  defaultValues={cvData.personalInfo}
                  onSave={handlePersonalInfoSave}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Work Experience Section */}
            <AccordionItem value="experience" className="bg-white rounded-md shadow-sm border mb-3">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center text-left">
                  <BriefcaseBusiness className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <h3 className="text-base font-medium">Expérience professionnelle</h3>
                    <p className="text-xs text-gray-500">Work history, internships</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <WorkExperienceSection 
                  experiences={cvData.workExperience}
                  onSave={handleWorkExperienceSave}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Education Section */}
            <AccordionItem value="education" className="bg-white rounded-md shadow-sm border mb-3">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center text-left">
                  <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <h3 className="text-base font-medium">Éducation</h3>
                    <p className="text-xs text-gray-500">Academic background, courses</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <EducationSection 
                  educations={cvData.education}
                  onSave={handleEducationSave}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Skills Section */}
            <AccordionItem value="skills" className="bg-white rounded-md shadow-sm border mb-3">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center text-left">
                  <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <h3 className="text-base font-medium">Compétences</h3>
                    <p className="text-xs text-gray-500">Technical and soft skills</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <SkillsSection 
                  skills={cvData.skills}
                  onSave={handleSkillsSave}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Summary Section */}
            <AccordionItem value="summary" className="bg-white rounded-md shadow-sm border mb-3">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center text-left">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <h3 className="text-base font-medium">Résumé professionnel</h3>
                    <p className="text-xs text-gray-500">Brief description about you</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <SummarySection 
                  defaultValues={{ summary: cvData.summary || "" }}
                  onSave={handleSummarySave}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right side - Preview */}
        <CvPreview 
          data={cvData}
          onChangeTemplate={handleChangeTemplate}
        />
      </div>
    </div>
  );
};

export default CvBuilderCreate;