import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Edit2Icon,
  Trash2Icon,
  FileTextIcon,
  BarChart3Icon,
  CalendarIcon,
  DownloadIcon,
  CopyIcon,
  MenuIcon,
  PlusIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import ConfirmationModal from "@/components/cv-builder/ConfirmationModal";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CV } from "@shared/schema";
import { useLocation } from "wouter";

interface CvTableProps {
  cvs: CV[];
  onEdit: (cv: CV) => void;
  onDelete: (id: number) => void;
  onDuplicate?: (id: number) => void;
  onDownload?: (cv: CV) => void;
}

export const CvTable = ({
  cvs,
  onEdit,
  onDelete,
  onDuplicate = () => {},
  onDownload = () => {},
}: CvTableProps) => {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCvId, setSelectedCvId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedCvId(id);
    setIsModalOpen(true);
  };

  const filteredCvs = cvs.filter((cv) => !!cv.id);

  const confirmDelete = async () => {
    if (selectedCvId) {
      setIsLoading(true);
      await onDelete(selectedCvId);
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedCvId(null);
  };

  const handleDuplicate = (cv: CV, e: React.MouseEvent) => {
    e.stopPropagation();

    onDuplicate(cv.id);
  };

  const handleDownload = (cv: CV, e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload(cv);
  };

  const handleCreateNew = async () => {
    navigate("/pick-template");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getScoreClass = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-UK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <>
      <div>
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-muted">
              <TableHead className="py-4 text-sm font-semibold">
                <div className="flex items-center">
                  <FileTextIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  {t("cvBuilder.table.title")}
                </div>
              </TableHead>
              {/* <TableHead className="py-4 text-sm font-semibold">
                <div className="flex items-center">
                  <BarChart3Icon className="h-4 w-4 mr-2 text-muted-foreground" />
                  {t("cvBuilder.table.score")}
                </div>
              </TableHead> */}
              <TableHead className="py-4 text-sm font-semibold">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  {t("cvBuilder.table.created")}
                </div>
              </TableHead>
              <TableHead className="text-right py-4 text-sm font-semibold">
                <div className="flex items-center justify-end">
                  <MenuIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  {t("cvBuilder.table.actions")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCvs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-muted-foreground"
                >
                  <div className="flex flex-col items-center">
                    <FileTextIcon className="h-10 w-10 mb-2 text-muted-foreground/50" />
                    No CVs found. Create a new one to get started.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCvs.map((cv) => (
                <TableRow
                  key={cv.id}
                  className="hover:bg-muted/30 transition-colors group cursor-pointer border-b border-dashed"
                  onClick={() => onEdit(cv)}
                >
                  <TableCell className="font-medium py-4">
                    <div className="flex items-center">
                      {/* <div className="w-10 h-10 bg-primary-gradient rounded-md flex items-center justify-center mr-3 group-hover:bg-primary-gradient/20 transition-colors">
                        <FileTextIcon className="h-5 w-5 text-primary-blue" />
                      </div> */}
                      <h3 className="text-primary-blue group-hover:underline transition-all font-bold">
                        {cv.title}
                      </h3>
                    </div>
                  </TableCell>
                  {/* <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`${getScoreColor(cv.score)} px-2.5 py-1 rounded-full font-medium border`}
                      >
                        {cv.score}%
                      </Badge>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getScoreClass(cv.score)}`}
                          style={{
                            width: `${cv.score}%`,
                            backgroundColor: "currentColor",
                          }}
                        />
                      </div>
                    </div>
                  </TableCell> */}
                  <TableCell className="py-4 text-muted-foreground">
                    {formatDate(cv.dateCreated)}
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {/* Small screens: Show only the most important button and dropdown */}
                      <div className="sm:hidden flex gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                              className="h-9 w-9 p-0"
                            >
                              <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(cv);
                              }}
                              className="cursor-pointer"
                            >
                              <Edit2Icon className="h-4 w-4 mr-2" />
                              <span>{t("common.buttons.edit")}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) =>
                                handleDownload(
                                  cv,
                                  e as unknown as React.MouseEvent,
                                )
                              }
                              className="cursor-pointer"
                            >
                              <DownloadIcon className="h-4 w-4 mr-2" />
                              <span>{t("common.buttons.download")}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) =>
                                handleDuplicate(
                                  cv,
                                  e as unknown as React.MouseEvent,
                                )
                              }
                              className="cursor-pointer"
                            >
                              <CopyIcon className="h-4 w-4 mr-2" />
                              <span>{t("common.buttons.duplicate")}</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(cv.id);
                              }}
                              className="cursor-pointer text-red-600 focus:text-red-600"
                            >
                              <Trash2Icon className="h-4 w-4 mr-2" />
                              <span>{t("common.buttons.delete")}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Medium/large screens: Show all action buttons */}
                      <div className="hidden sm:flex gap-2">
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => handleDownload(cv, e)}
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
                                onClick={(e) => handleDuplicate(cv, e)}
                                className="h-9 w-9 p-0 transition-all hover:shadow-sm hover:bg-primary/5"
                              >
                                <CopyIcon className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={5}>
                              <p>{t("common.buttons.duplicate")} CV</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEdit(cv);
                                }}
                                className="h-9 w-9 p-0 transition-all hover:shadow-sm hover:bg-primary/5"
                              >
                                <Edit2Icon className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={5}>
                              <p>{t("common.buttons.edit")} CV</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick(cv.id);
                                }}
                                className="h-9 w-9 p-0 text-red border-red hover:bg-red/10 hover:text-red transition-all hover:shadow-sm"
                              >
                                <Trash2Icon className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={5}>
                              <p>{t("common.buttons.delete")} CV</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
            <TableRow
              className="hover:bg-muted/30 transition-colors group cursor-pointer border-b border-dashed"
              onClick={handleCreateNew}
            >
              <TableCell className="font-medium py-4">
                <div className="flex items-center">
                  <h3 className="text-primary-blue group-hover:underline transition-all font-bold">
                    + {t("cvBuilder.createNew")}
                  </h3>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        isLoading={isLoading}
        onConfirm={confirmDelete}
        title={t("common.buttons.delete") + " CV"}
        message="Are you sure you want to delete this CV? This action cannot be undone."
        confirmButtonText={t("common.buttons.delete")}
        cancelButtonText={t("common.buttons.cancel")}
      />
    </>
  );
};
