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

const getTemplate = (
  templateId: number,
): LoadableClassComponent<ComponentClass> =>
  loadable(
    () =>
      import(
        `../Templates/${templateId <= 9 ? "0" : ""}${templateId}/TemplateComponent`
      ),
    {
      fallback: <Loader2 />,
    },
  );

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
    (async (): Promise<void> => {
      const NewTemplate = await getTemplate(data.templateId);

      setTemplate(NewTemplate as FC<ITemplateComponentProps>);
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
						id="previewInner"
						className="flex flex-col md:flex-row"
						style={{
							transform: `scale(${previewSize.scale})`,
							WebkitFontSmoothing: 'antialiased',
              minHeight: "100%"
						}}
					>
            {Template && (
						  <Template component={Template} cvData={data} t={t} />
					  )}
					</div>
      </div>
      {/* #tempDiv needed for creating a CV html */}
      <div id="tempDiv" className="absolute t-0 l-0" />
    </div>
  );
}
