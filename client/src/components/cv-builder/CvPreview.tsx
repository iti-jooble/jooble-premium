import { Button } from "@/components/ui/button";
// import loadable, { LoadableClassComponent } from "@loadable/component";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  FileText,
  DownloadIcon,
  LayoutTemplateIcon,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { CV, CvUserInfo } from "@shared/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect, ComponentClass } from "react";

interface CvPreviewProps {
  data: CvUserInfo;
  templateId: number;
  onChangeTemplate: () => void;
}

export interface ITemplateComponentProps {
  t: (i18nKey: string, options?: any) => string;
  data: CvUserInfo;
}

// const getTemplate = (
//   templateId: number,
// ): LoadableClassComponent<ComponentClass> =>
//   loadable(
//     () =>
//       import(
//         `../Templates/${templateId <= 9 ? "0" : ""}${templateId}/TemplateComponent`
//       ),
//     {
//       fallback: <Loader2 />,
//     },
//   );

export function CvPreview({
  data,
  templateId,
  onChangeTemplate,
}: CvPreviewProps) {
  const { t } = useTranslation();
  const [Template, setTemplate] =
    useState<React.FC<ITemplateComponentProps> | null>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      const NewTemplate = () => null;
      // await getTemplate(data.templateId);

      setTemplate(NewTemplate as React.FC<ITemplateComponentProps>);
    })();
  }, [templateId]);

  return (
    <div className="w-full lg:w-1/2 flex-shrink-0 rounded-lg flex flex-col items-center h-[calc(100vh-150px)]">
      <div className="flex justify-between items-center mb-4 flex-shrink-0 w-full max-w-[492px]">
        <h2 className="text-xl font-medium text-foreground flex items-center">
          <span className="mr-2 p-1 rounded-full bg-primary/10">
            <FileText className="h-4 w-4 text-primary" />
          </span>
          {t("cvPreview.preview")}
        </h2>
        <div className="flex gap-2">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {}}
                  className="h-9 w-9 p-0 transition-all hover:shadow-sm hover:bg-primary/5"
                >
                  <DownloadIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={5}>
                <p>{t("common.buttons.download")} CV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onChangeTemplate}
                  className="bg-card hover:bg-card/80 shadow-sm transition-all"
                >
                  <LayoutTemplateIcon className="h-4 w-4" />
                  {t("Template")}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={5}>
                <p>{t("cvPreview.changeTemplate")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-md overflow-auto flex-grow w-full max-w-[492px] max-h-[696px] border border-border/40">
        <div
          className="flex flex-col md:flex-row"
          style={{ minHeight: "100%" }}
        >
          {/* Left sidebar in preview */}
          <div className="w-full md:w-1/3 bg-blue-50 p-4">
            <div className="mb-6">
              <h3 className="text-blue-800 font-medium mb-2">
                {t("cvPreview.contact")}
              </h3>
              <div className="text-xs space-y-1.5">
                <div className="flex items-center text-xs text-gray-600">
                  <MailIcon className="h-3.5 w-3.5 mr-2 min-w-3.5" />
                  <span>
                    {data.personalInfo?.email || "john.doe@example.com"}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <PhoneIcon className="h-3.5 w-3.5 mr-2" />
                  <span>{data.personalInfo?.phone || "+1 (555) 123-4567"}</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <MapPinIcon className="h-3.5 w-3.5 mr-2" />
                  <span>
                    {data.personalInfo?.city || "New York"},{" "}
                    {data.personalInfo?.country || "USA"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-blue-800 font-medium mb-2">
                {t("cvPreview.about")}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {data.summary ||
                  "Experienced driver with excellent navigation skills. Committed to providing safe and efficient transportation services. Strong attention to detail and ability to handle various driving conditions."}
              </p>
            </div>

            <div>
              <h3 className="text-blue-800 font-medium mb-2">
                {t("cvPreview.skills")}
              </h3>
              <ul className="text-xs text-gray-600 space-y-1">
                {data.skills && data.skills.length > 0 ? (
                  data.skills.map((skill) => (
                    <li key={skill.name}>{skill.name}</li>
                  ))
                ) : (
                  <>
                    <li>{t("cvPreview.defaultSkills.navigation")}</li>
                    <li>{t("cvPreview.defaultSkills.timeManagement")}</li>
                    <li>{t("cvPreview.defaultSkills.customerService")}</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Right content in preview */}
          <div className="w-full md:w-2/3 p-6">
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-gray-800">
                {data.personalInfo?.firstName || "Alyson"}{" "}
                {data.personalInfo?.lastName || "Lawrence"}
              </h1>
            </div>

            <div className="mb-6">
              <h2 className="text-blue-700 font-medium mb-2">
                {t("cvPreview.experience")}
              </h2>

              {data.experience && data.experience.length > 0 ? (
                data.experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">{exp.company}</h3>
                        <h4 className="text-xs">{exp.position}</h4>
                      </div>
                      <div className="text-xs text-gray-500">
                        {exp.startYear} -{" "}
                        {exp.isCurrent ? t("cvPreview.present") : exp.endYear}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">
                          {t("cvPreview.defaultExperience.company1")}
                        </h3>
                        <h4 className="text-xs">
                          {t("cvPreview.defaultExperience.position")}
                        </h4>
                      </div>
                      <div className="text-xs text-gray-500">
                        2018 - {t("cvPreview.present")}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {t("cvPreview.defaultExperience.description1")}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">
                          {t("cvPreview.defaultExperience.company2")}
                        </h3>
                        <h4 className="text-xs">
                          {t("cvPreview.defaultExperience.position")}
                        </h4>
                      </div>
                      <div className="text-xs text-gray-500">2016 - 2017</div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {t("cvPreview.defaultExperience.description2")}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div>
              <h2 className="text-blue-700 font-medium mb-2">
                {t("cvPreview.education")}
              </h2>

              {data.education && data.education.length > 0 ? (
                data.education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">{edu.degree}</h3>
                        <h4 className="text-xs">{edu.field}</h4>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">{edu.school}</h3>
                      </div>
                      <div className="text-xs text-gray-500">
                        {edu.startYear} - {edu.endYear}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">
                          {t("cvPreview.defaultEducation.driving")}
                        </h3>
                        <h4 className="text-xs">
                          {t("cvPreview.defaultEducation.driversLicense")}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">
                          {t("cvPreview.defaultEducation.dmv")}
                        </h3>
                      </div>
                      <div className="text-xs text-gray-500">2009 - 2009</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">
                          {t("cvPreview.defaultEducation.generalEducation")}
                        </h3>
                        <h4 className="text-xs">
                          {t("cvPreview.defaultEducation.highSchoolDiploma")}
                        </h4>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">
                          {t("cvPreview.defaultEducation.highSchool")}
                        </h3>
                      </div>
                      <div className="text-xs text-gray-500">2005 - 2009</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* #tempDiv needed for creating a CV html */}
      <div id="tempDiv" className="absolute t-0 l-0" />
    </div>
  );
}
