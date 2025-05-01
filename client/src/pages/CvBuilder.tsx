import { useLayoutEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileEditIcon,
  LinkedinIcon,
  PlusIcon,
  ChevronRightIcon,
  Loader2,
} from "lucide-react";
import { initCvBuilder, downloadCv } from "@/redux/thunks";
import { CvTable } from "@/components/cv-builder/CvTable";
import { useToast } from "@/hooks/use-toast";
import { CV } from "@shared/schema";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteCv, duplicateCv } from "@/redux/thunks";
import { setCurrentCvId } from "@/redux/slices/cvBuilderSlice";

const CvBuilder = () => {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const { isLoading, isInitialized, cvList, error } = useAppSelector(
    (state) => state.cvBuilder,
  );

  useLayoutEffect(() => {
    console.log("Initializing CV builder...");
    if (!isInitialized && !isLoading && !error) {
      dispatch(initCvBuilder());
    }
  }, [dispatch, isInitialized, isLoading]);

  const handleEdit = (cv: CV) => {
    dispatch(setCurrentCvId(cv.id));

    navigate("/cv-builder");
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteCv(id));
  };

  const handleDuplicate = (id: number) => {
    dispatch(duplicateCv(id));
  };

  const handleDownload = async (cv: CV) => {
    dispatch(downloadCv({ id: cv.id, title: cv.title }));
  };

  const handleCreateNew = async () => {
    navigate("/pick-template");
  };

  const handleCreateFromLinkedIn = () => {
    toast({
      title: t("cvBuilder.linkedInImport.title"),
      description: t("cvBuilder.linkedInImport.description"),
    });
  };

  return (
    <div className="py-6 animate-in fade-in duration-300 max-w-[964px] m-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("cvBuilder.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("cvBuilder.subtitle")}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleCreateNew}
            className="flex-1 sm:flex-auto transition-all hover:scale-105"
            size="lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            {t("cvBuilder.createNew")}
          </Button>
          <Button
            variant="outline"
            onClick={handleCreateFromLinkedIn}
            className="flex-1 sm:flex-auto transition-all hover:border-primary/70"
            size="lg"
          >
            <LinkedinIcon className="h-5 w-5 mr-2" />
            {t("cvBuilder.importFromLinkedIn")}
          </Button>
        </div>
      </div>

      {(!isInitialized && isLoading) || error ? (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/50">
          <CardContent className="p-10 flex flex-col items-center justify-center text-center">
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <p className="text-red-600">
                {t("Something went wrong. Please try again later.")}
              </p>
            )}
          </CardContent>
        </Card>
      ) : cvList.length === 0 ? (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/50">
          <CardContent className="p-10 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-4 ring-primary/5">
              <FileEditIcon className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">
              {t("cvBuilder.noData.title")}
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
              {t("cvBuilder.noData.description")}
            </p>
            <Button
              onClick={handleCreateNew}
              size="lg"
              className="px-8 transition-all hover:shadow-md hover:scale-105"
            >
              {t("cvBuilder.noData.button")}
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md border-border/30 border overflow-hidden rounded-xl bg-card">
          <CardHeader className="bg-muted/40 pb-4">
            <CardTitle className="text-xl flex items-center">
              <div className="rounded-full bg-primary/10 p-1.5 mr-2">
                <FileEditIcon className="h-5 w-5 text-primary" />
              </div>
              {t("cvBuilder.yourCvs")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CvTable
              cvs={cvList}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onDownload={handleDownload}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CvBuilder;
