import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  LinkIcon,
  UploadIcon,
  CheckIcon,
  AlertCircleIcon,
  FileTextIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CvMatching = () => {
  const { t } = useTranslation();
  
  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300 bg-gradient-to-b from-background to-muted/20">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">{t("cvMatching.title")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("cvMatching.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 ring-4 ring-primary/5">
              <FileTextIcon className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-3">{t("cvMatching.selectCv")}</h2>
            <p className="text-muted-foreground mb-5">
              Upload your CV to start the matching process. We support PDF,
              DOCX, and TXT formats.
            </p>
            <Button
              size="lg"
              className="transition-all hover:shadow-md hover:scale-105"
            >
              <UploadIcon className="h-5 w-5 mr-2" />
              {t("common.buttons.upload")}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 ring-4 ring-primary/5">
              <LinkIcon className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-3">
              {t("cvMatching.selectJob")}
            </h2>
            <p className="text-muted-foreground mb-5">
              Copy and paste the job description you want to match against your
              CV.
            </p>
            <Button
              size="lg"
              className="transition-all hover:shadow-md hover:scale-105"
            >
              Enter Job Description
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
      <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden mb-10 bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload CV",
                description:
                  "Upload your current CV or resume in any common format",
              },
              {
                step: "2",
                title: "Add Job Description",
                description:
                  "Paste the job description or requirements for the role",
              },
              {
                step: "3",
                title: "Get Insights",
                description:
                  "Receive detailed analysis showing match rate and improvement areas",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-medium mb-5 shadow-md">
                  {item.step}
                </div>
                <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CvMatching;
