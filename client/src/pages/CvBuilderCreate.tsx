import { useTranslation } from "react-i18next";
import {
  GraduationCap,
  BriefcaseBusiness,
  Sparkles,
  FileText,
} from "lucide-react";
import { User } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonalInfoSection } from "@/components/cv-builder/PersonalInfoSection";
import { WorkExperienceSection } from "@/components/cv-builder/WorkExperienceSection";
import { EducationSection } from "@/components/cv-builder/EducationSection";
import { SkillsSection } from "@/components/cv-builder/SkillsSection";
import { SummarySection } from "@/components/cv-builder/SummarySection";
import { CvPreview } from "@/components/cv-builder/CvPreview";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateCv } from "@/redux/thunks";
import { getCurrentCvSelector } from "@/redux/slices/cvBuilderSlice";
import {
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  CV,
} from "@shared/schema";

const CvBuilderCreate = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const currentCv = useAppSelector(getCurrentCvSelector)!;

  const handleUpdateCv = async (partialCv: Partial<CV>) => {
    try {
      await dispatch(
        updateCv({
          partialCv,
          html: '<div class="cv-container">Generated CV HTML</div>',
          css: ".cv-container { font-family: Arial; }",
        }),
      ).unwrap();

      toast({
        title: t("cvBuilder.saveSuccess"),
        description: t("cvBuilder.saveSuccessDescription"),
      });
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("cvBuilder.saveError"),
        variant: "destructive",
      });
    }
  };

  const handlePersonalInfoSave = (values: PersonalInfo) => {
    handleUpdateCv({ personalInfo: values });
  };

  const handleWorkExperienceSave = (experiences: WorkExperience[]) => {
    handleUpdateCv({ workExperience: experiences });
  };

  const handleEducationSave = (educations: Education[]) => {
    handleUpdateCv({ education: educations });
  };

  const handleSkillsSave = (skills: Skill[]) => {
    handleUpdateCv({ skills });
  };

  const handleSummarySave = (values: { summary: string }) => {
    handleUpdateCv({ summary: values.summary });
  };

  const handleChangeTemplate = () => {
    toast({
      title: t("common.labels.comingSoon"),
      description: "Template selection will be available in a future update.",
    });
  };

  if (!currentCv) {
    return redirect("/cv-builder");
  }

  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300 bg-gradient-to-b from-background to-muted/20">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("cvBuilderCreate.title")}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t("cvBuilderCreate.subtitle")}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side with accordion form */}
        <div className="w-full lg:w-1/2 min-w-[380px]">
          <Accordion
            type="single"
            collapsible
            defaultValue="personal"
            className="w-full"
          >
            {/* Personal Information Section */}
            <AccordionItem
              value="personal"
              className="bg-card rounded-lg shadow-sm border border-border/50 mb-4 overflow-hidden transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">
                      {t("cvBuilderCreate.sections.personalInfo")}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Contact details, name, location
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-5 pt-2 border-t border-border/40">
                <PersonalInfoSection
                  defaultValues={currentCv.personalInfo}
                  onSave={handlePersonalInfoSave}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Work Experience Section */}
            <AccordionItem
              value="experience"
              className="bg-card rounded-lg shadow-sm border border-border/50 mb-4 overflow-hidden transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <BriefcaseBusiness className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">
                      {t("cvBuilderCreate.sections.experience")}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Work history, internships
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-5 pt-2 border-t border-border/40">
                <WorkExperienceSection
                  experiences={currentCv.workExperience}
                  onSave={handleWorkExperienceSave}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Education Section */}
            <AccordionItem
              value="education"
              className="bg-card rounded-lg shadow-sm border border-border/50 mb-4 overflow-hidden transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">
                      {t("cvBuilderCreate.sections.education")}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Academic background, courses
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-5 pt-2 border-t border-border/40">
                <EducationSection
                  educations={currentCv.education}
                  onSave={handleEducationSave}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Skills Section */}
            <AccordionItem
              value="skills"
              className="bg-card rounded-lg shadow-sm border border-border/50 mb-4 overflow-hidden transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">
                      {t("cvBuilderCreate.sections.skills")}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Technical and soft skills
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-5 pt-2 border-t border-border/40">
                <SkillsSection
                  skills={currentCv.skills}
                  onSave={handleSkillsSave}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Summary Section */}
            <AccordionItem
              value="summary"
              className="bg-card rounded-lg shadow-sm border border-border/50 mb-4 overflow-hidden transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">
                      {t("cvBuilderCreate.sections.summary")}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Brief description about you
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-5 pt-2 border-t border-border/40">
                <SummarySection
                  defaultValues={{ summary: currentCv.summary || "" }}
                  onSave={handleSummarySave}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right side - Preview */}
        <CvPreview data={currentCv} onChangeTemplate={handleChangeTemplate} />
      </div>
    </div>
  );
};

export default CvBuilderCreate;
