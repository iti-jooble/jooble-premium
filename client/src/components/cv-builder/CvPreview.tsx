import { Button } from "@/components/ui/button";
import { debounce } from 'lodash';
import loadable, { LoadableClassComponent } from "@loadable/component";
import {
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
import { useState, useEffect, ComponentClass, FC, useRef } from "react";
import { A4_PAGE_SIZES_IN_PX } from './Templates/constants';

interface CvPreviewProps {
  data: CvUserInfo;
  templateId: number;
  onChangeTemplate: () => void;
}

export interface ITemplateComponentProps {
  t: (i18nKey: string, options?: any) => string;
  data: CvUserInfo;
}

// Use a more simple approach for now to focus on our loading state implementation
// This is a placeholder component for template rendering
const TemplatePlaceholder: FC<ITemplateComponentProps> = ({ t, data }) => {
  return (
    <div className="w-full h-full p-8 bg-white text-black">
      <h1 className="text-xl font-bold">{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
      <p className="text-gray-600 mb-4">{data.personalInfo.email} • {data.personalInfo.phone}</p>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h2>
        <p>{data.summary || t('cv.noSummary')}</p>
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2">Experience</h2>
        {data.experience && data.experience.length > 0 ? (
          data.experience.map((exp, idx) => (
            <div key={idx} className="mb-2">
              <div className="flex justify-between">
                <strong>{exp.position}</strong>
                <span>{exp.startYear} - {exp.endYear || 'Present'}</span>
              </div>
              <p>{exp.company}</p>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))
        ) : (
          <p>{t('cv.noExperience')}</p>
        )}
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h2>
        {data.skills && data.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, idx) => (
              <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-sm">
                {skill.name} {skill.level && `(${skill.level})`}
              </span>
            ))}
          </div>
        ) : (
          <p>{t('cv.noSkills')}</p>
        )}
      </div>
    </div>
  );
};

// Simplified template getter that doesn't rely on dynamic imports for now
const getTemplate = (templateId: number): FC<ITemplateComponentProps> => {
  // Just return our placeholder template for all template IDs
  return TemplatePlaceholder;
};

export function CvPreview({
  data,
  templateId,
  onChangeTemplate,
}: CvPreviewProps) {
  const { t } = useTranslation();
  const [Template, setTemplate] =
    useState<FC<ITemplateComponentProps> | null>(null);
    const previewWidthReference = useRef<HTMLDivElement>(null);
        const [previewSize, setPreviewSize] = useState({
                scale: 1,
                parentWidth: A4_PAGE_SIZES_IN_PX.WIDTH,
                parentHeight: A4_PAGE_SIZES_IN_PX.HEIGHT,
                calculated: false,
        });

        const resizePreviewHandler = (): void => {
                if (previewWidthReference.current) {
                        const { offsetWidth } = previewWidthReference.current;

                        if (offsetWidth) {
                                const scale = offsetWidth / A4_PAGE_SIZES_IN_PX.WIDTH;
                                setPreviewSize({
                                        scale,
                                        parentWidth: A4_PAGE_SIZES_IN_PX.WIDTH * scale,
                                        parentHeight: A4_PAGE_SIZES_IN_PX.HEIGHT * scale,
                                        calculated: true,
                                });
                        }
                }
        };

        const setCalculatedFalse = (): void => {
                setPreviewSize((prevSize) => ({ ...prevSize, calculated: false }));
        };

  useEffect(() => {
                resizePreviewHandler();

                const handleResize = debounce(resizePreviewHandler, 300);

                window.addEventListener('resize', handleResize);
                window.addEventListener('resize', setCalculatedFalse);

                return (): void => {
                        window.removeEventListener('resize', handleResize);
                        window.removeEventListener('resize', setCalculatedFalse);
                };
        }, []);

  useEffect(() => {
    // Use the templateId prop passed to the component instead of from data
    const NewTemplate = getTemplate(templateId);
    setTemplate(NewTemplate);
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
                                                id="previewInner"
                                                className="flex flex-col md:flex-row"
                                                style={{
                                                        transform: `scale(${previewSize.scale})`,
                                                        WebkitFontSmoothing: 'antialiased',
              minHeight: "100%"
                                                }}
                                        >
            {Template && (
              <Template t={t} data={data} />
            )}
                                        </div>
      </div>
      {/* #tempDiv needed for creating a CV html */}
      <div id="tempDiv" className="absolute t-0 l-0" />
    </div>
  );
}
