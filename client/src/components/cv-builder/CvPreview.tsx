import { Button } from "@/components/ui/button";
import { debounce } from "lodash";
import loadable, { LoadableClassComponent } from "@loadable/component";
import { DownloadIcon, LayoutTemplateIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CvUserInfo } from "@shared/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect, ComponentClass, FC, useRef } from "react";
import { A4_PAGE_SIZES_IN_PX } from "./Templates/constants";
import { ITemplateComponentProps } from "./Templates/types";
import { CvSkeleton } from "./Skeletons";

interface CvPreviewProps {
  withHeading: boolean;
  data: CvUserInfo;
  templateId: number;
  onDownload?: () => void;
  onChangeTemplate?: () => void;
}

const getTemplate = (
  templateId: number,
): LoadableClassComponent<ComponentClass> =>
  loadable(
    () =>
      import(
        `./Templates/${templateId <= 9 ? "0" : ""}${templateId}/TemplateComponent.tsx`
      ),
    {
      fallback: <CvSkeleton />,
    },
  );

export function CvPreview({
  data,
  withHeading = true,
  templateId,
  onDownload,
  onChangeTemplate,
}: CvPreviewProps) {
  const { t } = useTranslation();
  const [Template, setTemplate] = useState<FC<ITemplateComponentProps> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
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

  const handleDownload = async (): Promise<void> => {
    setIsLoading(true);
    await onDownload?.();
    setIsLoading(false);
  };

  const setCalculatedFalse = (): void => {
    setPreviewSize((prevSize) => ({ ...prevSize, calculated: false }));
  };

  useEffect(() => {
    resizePreviewHandler();

    const handleResize = debounce(resizePreviewHandler, 300);

    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", setCalculatedFalse);

    return (): void => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", setCalculatedFalse);
    };
  }, []);

  useEffect(() => {
    (async (): Promise<void> => {
      const NewTemplate = await getTemplate(templateId);

      setTemplate(NewTemplate as FC<ITemplateComponentProps>);
    })();
  }, [templateId]);

  return (
    <div className="w-[85%] flex-shrink-0 rounded-lg flex flex-col items-center">
      {withHeading && (
        <div className="flex justify-between items-center mb-4 flex-shrink-0 w-full max-w-[794px]">
          <h2 className="text-xl font-medium text-foreground flex items-center">
            {t("cvPreview.preview")}
          </h2>
          <div className="flex gap-2">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    isLoading={isLoading}
                    onClick={handleDownload}
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
      )}

      <div
        ref={previewWidthReference}
        className="bg-card shadow-sm overflow-auto flex-grow w-full max-w-[794px] max-h-[calc(100vh-150px)] border border-border/40"
      >
        {previewSize.calculated && (
          <div
            className=""
            style={{
              width: `${previewSize.parentWidth}px`,
              height: `${previewSize.parentHeight}px`,
            }}
          >
            <div
              id="previewInner"
              className="flex flex-col md:flex-row"
              style={{
                transform: `scale(${previewSize.scale})`,
                WebkitFontSmoothing: "antialiased",
                transformOrigin: "top left",
                minHeight: "100%",
              }}
            >
              {Template && <Template t={t} cvData={data} />}
            </div>
          </div>
        )}
      </div>
      {/* #tempDiv needed for creating a CV html */}
      <div id="tempDiv" className="absolute t-0 l-0" />
    </div>
  );
}
