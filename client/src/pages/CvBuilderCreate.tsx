import { useTranslation } from "react-i18next";
import { useSearch, useLocation } from "wouter";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  GraduationCap,
  BriefcaseBusiness,
  Sparkles,
  FileText,
  Check,
  X,
} from "lucide-react";
import { User } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonalInfoSection } from "@/components/cv-builder/PersonalInfoSection";
import { ExperienceSection } from "@/components/cv-builder/WorkExperienceSection";
import { EducationSection } from "@/components/cv-builder/EducationSection";
import { SkillsSection } from "@/components/cv-builder/SkillsSection";
import { SummarySection } from "@/components/cv-builder/SummarySection";
import { CvPreview } from "@/components/cv-builder/CvPreview";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createOrUpdateCv, downloadCv } from "@/redux/thunks";
import cvData from "@/components/cv-builder/Templates/cvData.json";
import { CvSource } from "@/types/enums/cv.enums";
import { cvSelectors } from "@/redux/selectors";
import {
  PersonalInfo,
  Experience,
  Education,
  Skill,
  CV,
  CvUserInfo,
} from "@shared/schema";
import isNumber from "lodash/isNumber";

const getNewCv = (): CV => ({
  id: 0,
  dateCreated: new Date().toISOString(),
  source: CvSource.MANUAL,
  score: 0,
  title: "New CV",
  templateId: 2,
  userInfo: {
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
    },
    summary: "",
    skills: [],
    experience: [],
    education: [],
  },
});

const CvBuilderCreate = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const searchString = useSearch();
  const [, navigate] = useLocation();
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [localCv, setLocalCv] = useState<CV>({} as CV);

  const searchParams = new URLSearchParams(searchString);
  const templateIdFromSearch = searchParams.get("templateId");

  const currentCv = useAppSelector(cvSelectors.getCurrentCvSelector);

  const { title, userInfo, id, score = 0, templateId = 2 } = localCv || {};

  useEffect(() => {
    if (title) {
      setTitleValue(title);
    }
  }, [id, title]);

  useLayoutEffect(() => {
    const newCv = isNumber(currentCv?.id) ? currentCv : getNewCv();

    setLocalCv((prev) => ({
      ...(prev as CV),
      ...(newCv as CV),
    }));
  }, [currentCv]);

  useEffect(() => {
    if (!templateIdFromSearch) {
      return;
    }

    setLocalCv((prev) => ({
      ...(prev as CV),
      templateId: parseInt(templateIdFromSearch),
    }));
  }, [templateIdFromSearch]);

  const handleUpdateCv = async (cv: CV) => {
    try {
      await dispatch(createOrUpdateCv(cv)).unwrap();

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

  const handlePersonalInfoSave = async (values: PersonalInfo) => {
    const newCv: CV = {
      ...localCv,
      userInfo: {
        ...localCv.userInfo,
        personalInfo: values,
      },
    };

    setLocalCv(newCv);

    return handleUpdateCv(newCv);
  };

  const handleExperienceSave = (experiences: Experience[]) => {
    const newCv: CV = {
      ...localCv,
      userInfo: {
        ...(userInfo as CvUserInfo),
        experience: experiences,
      },
    };

    if (!userInfo?.experience?.length && title === "New CV") {
      newCv.title =
        `${userInfo?.personalInfo?.firstName ?? ""} ${userInfo?.personalInfo?.lastName ?? ""} - ${experiences[0].position}`
          .trim()
          .replace(/^-\s*/, "");
    }

    setLocalCv(newCv);

    return handleUpdateCv(newCv);
  };

  const handleEducationSave = (educations: Education[]) => {
    const newCv: CV = {
      ...localCv,
      userInfo: {
        ...(userInfo as CvUserInfo),
        education: educations,
      },
    };

    setLocalCv(newCv);
    return handleUpdateCv(newCv);
  };

  const handleSkillsSave = (skills: Skill[]) => {
    const newCv: CV = {
      ...localCv,
      userInfo: {
        ...(userInfo as CvUserInfo),
        skills,
      },
    };

    setLocalCv(newCv);
    return handleUpdateCv(newCv);
  };

  const handleSummarySave = (values: { summary: string }) => {
    const newCv: CV = {
      ...localCv,
      userInfo: {
        ...(userInfo as CvUserInfo),
        summary: values.summary,
      },
    };

    setLocalCv(newCv);
    return handleUpdateCv(newCv);
  };

  const handleSaveTitle = () => {
    setIsTitleFocused(false);

    if (titleValue == title) {
      return;
    }

    const newCv: CV = {
      ...localCv,
      title: titleValue,
    };

    setLocalCv(newCv);
    return handleUpdateCv(newCv);
  };

  const handleChangeTemplate = () => {
    navigate(`/pick-template?templateId=${templateId}`);
  };

  const handleDownload = async () => {
    if (!id || !title) {
      toast({
        title: t("cvBuilder.saveFirst", "Save your CV first"),
        description: t("cvBuilder.saveFirstDescription"),
      });
    }

    await dispatch(downloadCv({ id, title }));
  };

  if (!isNumber(id) || !userInfo) {
    return null;
  }

  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300 max-w-[1600px] m-auto">
      <div className="mb-8 max-w-xl min-w-[380px]">
        {/* Editable CV title */}
        <div className="group relative mb-2">
          <input
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onFocus={() => setIsTitleFocused(true)}
            onBlur={handleSaveTitle}
            className={`text-3xl font-bold tracking-tight bg-transparent border-b 
              ${isTitleFocused ? "border-primary/50" : "border-gray/30"} 
              outline-none w-full pr-16 group-hover:border-primary/50 transition-all`}
            aria-label={t("cvBuilderCreate.titleInputLabel", "CV Title")}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {isTitleFocused ? (
              <>
                <button
                  onClick={handleSaveTitle}
                  className="bg-primary/10 hover:bg-primary/20 text-primary p-1 rounded-full transition-colors"
                  aria-label={t(
                    "cvBuilderCreate.saveTitleButton",
                    "Save title",
                  )}
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setTitleValue(title || "");
                    setIsTitleFocused(false);
                  }}
                  className="bg-destructive/10 hover:bg-destructive/20 text-destructive p-1 rounded-full transition-colors"
                  aria-label={t(
                    "cvBuilderCreate.cancelEditButton",
                    "Cancel edit",
                  )}
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsTitleFocused(true)}
                className="group-hover:opacity-100 text-muted-foreground hover:text-primary"
                aria-label={t("cvBuilderCreate.editTitleButton", "Edit title")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="mt-2 space-y-3">
          <p className="text-muted-foreground">
            {t(
              "cvBuilderCreate.improveYourChances",
              "Fill in the sections below to build a professional CV that improves your chances of getting hired.",
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side with accordion form */}
        <div className="w-full lg:w-1/2 min-w-[380px]">
          {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 bg-white shadow-sm border border-border/50 rounded-lg">
            <div className="flex items-center gap-2">
              <div
                className={`w-16 h-12 rounded-full flex items-center justify-center ${
                  score >= 80
                    ? "bg-green-100 text-green-700"
                    : score >= 60
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                <span className="text-sm font-bold">{score}%</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold">
                  {t("cvBuilderCreate.cvScore", "CV Score")}:{" "}
                  {getCvScoreDescription(score)}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {score < 70
                    ? t(
                        "cvBuilderCreate.improveScore",
                        "Complete more sections to increase your score",
                      )
                    : t(
                        "cvBuilderCreate.goodScore",
                        "Your CV is looking great! Keep adding details to make it perfect.",
                      )}
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 flex items-center gap-2">
              <div className="relative w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                    score >= 80
                      ? "text-green-700"
                      : score >= 60
                        ? "text-yellow-500"
                        : "text-red-700"
                  }`}
                  style={{
                    width: `${score}%`,
                    backgroundColor: "currentColor",
                  }}
                />
              </div>
            </div>
          </div> */}

          <Accordion
            type="single"
            collapsible
            defaultValue="personal"
            className="w-full"
          >
            {/* Personal Information Section */}
            <AccordionItem
              value="personal"
              className="bg-card rounded-xl shadow-sm border border-border/50 mb-4 overflow-hidden transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <div className="rounded-full bg-primary-gradient p-2 mr-3">
                    <User className="h-5 w-5 text-primary-blue" />
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
                  defaultValues={userInfo.personalInfo}
                  onSave={handlePersonalInfoSave}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Work Experience Section */}
            <AccordionItem
              value="experience"
              className="bg-card rounded-xl shadow-sm border border-border/50 mb-4 overflow-hidden transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <div className="rounded-full bg-primary-gradient p-2 mr-3">
                    <BriefcaseBusiness className="h-5 w-5 text-primary-blue" />
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
                <ExperienceSection
                  experiences={userInfo.experience}
                  onSave={handleExperienceSave}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Education Section */}
            <AccordionItem
              value="education"
              className="bg-card rounded-xl shadow-sm border border-border/50 mb-4 overflow-hidden transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <div className="rounded-full bg-primary-gradient p-2 mr-3">
                    <GraduationCap className="h-5 w-5 text-primary-blue" />
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
                  educations={userInfo.education}
                  onSave={handleEducationSave}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Skills Section */}
            <AccordionItem
              value="skills"
              className="bg-card rounded-xl shadow-sm border border-border/50 mb-4 overflow-hidden transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <div className="rounded-full bg-primary-gradient p-2 mr-3">
                    <Sparkles className="h-5 w-5 text-primary-blue" />
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
                  skills={userInfo.skills}
                  onSave={handleSkillsSave}
                  currentCv={localCv}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Summary Section */}
            <AccordionItem
              value="summary"
              className="bg-card rounded-xl shadow-sm border border-border/50 mb-4 overflow-hidden transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <div className="rounded-full bg-primary-gradient p-2 mr-3">
                    <FileText className="h-5 w-5 text-primary-blue" />
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
                  defaultValues={{ summary: userInfo.summary || "" }}
                  onSave={handleSummarySave}
                  currentCv={localCv}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right side - Preview */}
        <div className="w-full lg:w-1/2 min-w-[380px] flex justify-center">
          <CvPreview
            data={
              userInfo.personalInfo.firstName || userInfo.personalInfo.lastName
                ? userInfo
                : (cvData as CvUserInfo)
            }
            onDownload={handleDownload}
            templateId={templateId}
            onChangeTemplate={handleChangeTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default CvBuilderCreate;
