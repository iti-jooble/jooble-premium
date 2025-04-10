import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  initCvBuilder,
  createCv,
  getAiSuggestion,
  updatePersonalInfo,
  updateWorkExperience,
  updateEducation,
  updateSkills,
  updateSummary,
  setTemplateId,
  setSuggestingSection,
} from "../redux/slices/cvBuilderSlice";
import {
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
} from "../types/state/cvBuilder.types";
import { useToast } from "../hooks/use-toast";

// UI components
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { PersonalInfoSection } from "../components/cv-builder/PersonalInfoSection";
import { WorkExperienceSection } from "../components/cv-builder/WorkExperienceSection";
import { EducationSection } from "../components/cv-builder/EducationSection";
import { SkillsSection } from "../components/cv-builder/SkillsSection";
import { SummarySection } from "../components/cv-builder/SummarySection";
import { CvPreview } from "../components/cv-builder/CvPreview";

export default function CvBuilderNew() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  // Get CV builder state from Redux
  const { 
    personalInfo,
    summary,
    skills,
    education,
    workExperience,
    isLoading, 
    error, 
    initialized, 
    suggestingSection 
  } = useAppSelector((state) => state.cvBuilder);

  // Local UI state
  const [activeTab, setActiveTab] = useState("edit");
  const [activeSection, setActiveSection] = useState<string>("personal-info");

  // Initialize CV builder
  useEffect(() => {
    if (!initialized && !isLoading) {
      dispatch(initCvBuilder());
    }
  }, [dispatch, initialized, isLoading]);

  // Handle form submissions
  const handlePersonalInfoSave = (values: PersonalInfo) => {
    dispatch(updatePersonalInfo(values));
  };

  const handleWorkExperienceSave = (experiences: WorkExperience[]) => {
    dispatch(updateWorkExperience(experiences));
  };

  const handleEducationSave = (educations: Education[]) => {
    dispatch(updateEducation(educations));
  };

  const handleSkillsSave = (updatedSkills: Skill[]) => {
    dispatch(updateSkills(updatedSkills));
  };

  const handleSummarySave = (values: { summary: string }) => {
    dispatch(updateSummary(values.summary));
  };

  const handleTemplateChange = (id: number) => {
    dispatch(setTemplateId(id));
  };

  const handleSaveCV = async () => {
    try {
      // For now, we'll just use placeholder HTML/CSS
      // In a real app, you would generate this based on the template and CV data
      await dispatch(
        createCv({
          html: '<div class="cv-container">Generated CV HTML</div>',
          css: ".cv-container { font-family: Arial; }",
        }),
      ).unwrap();

      toast({
        title: t("cvBuilder.saveSuccess"),
        description: t("cvBuilder.saveSuccessDescription"),
      });

      // Redirect to CV list page or show success message
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("cvBuilder.saveError"),
        variant: "destructive",
      });
    }
  };

  const handleGenerateSummary = async () => {
    if (workExperience.length === 0 || skills.length === 0) {
      toast({
        title: t("common.warning"),
        description: t("cvBuilder.needExperienceAndSkills"),
        variant: "destructive",
      });
      return;
    }

    // Mark that we're generating a summary
    dispatch(setSuggestingSection("summary"));

    const experienceContent = workExperience
      .map(
        (exp) =>
          `Position: ${exp.position} at ${exp.company} (${exp.startYear} - ${exp.endYear || "Present"})
      Responsibilities: ${exp.description}`,
      )
      .join("\n\n");

    const skillsContent = skills.map((s) => s.name).join(", ");

    const content = `Generate a professional summary based on my experience and skills:
      
    Experience:
    ${experienceContent}
    
    Skills:
    ${skillsContent}
    
    Current job title: ${personalInfo.title || "Not specified"}`;

    try {
      const result = await dispatch(
        getAiSuggestion({
          type: "summary",
          userContent: content,
        }),
      ).unwrap();

      if (result.content) {
        dispatch(updateSummary(result.content));

        toast({
          title: t("cvBuilder.summaryGenerated"),
          description: t("cvBuilder.summaryGeneratedDescription"),
        });
      }
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("cvBuilder.aiSuggestionError"),
        variant: "destructive",
      });
    } finally {
      dispatch(setSuggestingSection(null));
    }
  };

  // Loading state
  if (isLoading && !initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p>{t("cvBuilder.loading")}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t("common.error")}</CardTitle>
            <CardDescription>{t("cvBuilder.initError")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => dispatch(initCvBuilder())}>
              {t("common.retry")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Not initialized but not loading or error
  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t("cvBuilder.notInitialized")}</CardTitle>
            <CardDescription>{t("cvBuilder.clickToStart")}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => dispatch(initCvBuilder())}>
              {t("cvBuilder.start")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // The data model in the store is initialized now

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("cvBuilder.title")}
            </h1>
            <p className="text-muted-foreground">{t("cvBuilder.subtitle")}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setActiveTab(activeTab === "edit" ? "preview" : "edit")
              }
            >
              {activeTab === "edit"
                ? t("cvBuilder.preview")
                : t("cvBuilder.edit")}
            </Button>
            <Button onClick={handleSaveCV} disabled={isLoading}>
              {isLoading ? t("common.saving") : t("common.save")}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-[200px]">
            <TabsTrigger value="edit">{t("cvBuilder.edit")}</TabsTrigger>
            <TabsTrigger value="preview">{t("cvBuilder.preview")}</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form section */}
              <div className="flex flex-col gap-6">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="personal-info"
                  value={activeSection}
                  onValueChange={setActiveSection}
                >
                  <AccordionItem value="personal-info">
                    <AccordionTrigger className="text-lg font-semibold">
                      {t("cvBuilder.sections.personalInfo")}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <PersonalInfoSection
                        defaultValues={currentCV.personalInfo}
                        onSave={handlePersonalInfoSave}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="work-experience">
                    <AccordionTrigger className="text-lg font-semibold">
                      {t("cvBuilder.sections.workExperience")}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <WorkExperienceSection
                        experiences={currentCV.workExperience}
                        onSave={handleWorkExperienceSave}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="education">
                    <AccordionTrigger className="text-lg font-semibold">
                      {t("cvBuilder.sections.education")}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <EducationSection
                        educations={currentCV.education}
                        onSave={handleEducationSave}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="skills">
                    <AccordionTrigger className="text-lg font-semibold">
                      {t("cvBuilder.sections.skills")}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <SkillsSection
                        skills={currentCV.skills}
                        onSave={handleSkillsSave}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="summary">
                    <AccordionTrigger className="text-lg font-semibold">
                      {t("cvBuilder.sections.summary")}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="flex flex-col gap-4">
                        <Button
                          variant="outline"
                          className="w-full md:w-auto"
                          onClick={handleGenerateSummary}
                          disabled={
                            isLoading || suggestingSection === "summary"
                          }
                        >
                          {suggestingSection === "summary"
                            ? t("common.generating")
                            : t("cvBuilder.generateSummary")}
                        </Button>
                        <SummarySection
                          defaultValues={{ summary: currentCV.summary || "" }}
                          onSave={handleSummarySave}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Preview section */}
              <div className="sticky top-6 self-start">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("cvBuilder.livePreview")}</CardTitle>
                    <CardDescription>
                      {t("cvBuilder.previewDescription")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CvPreview
                      data={{
                        personalInfo,
                        summary,
                        skills,
                        education,
                        workExperience
                      }}
                      onChangeTemplate={handleTemplateChange}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("cvBuilder.fullPreview")}</CardTitle>
                <div className="flex justify-between items-center">
                  <CardDescription>
                    {t("cvBuilder.previewDescription")}
                  </CardDescription>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("edit")}
                  >
                    {t("cvBuilder.edit")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full max-w-4xl mx-auto">
                  <CvPreview
                    data={currentCV}
                    onChangeTemplate={handleTemplateChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveCV} disabled={isLoading}>
                  {isLoading ? t("common.saving") : t("common.save")}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
