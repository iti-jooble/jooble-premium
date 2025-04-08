import { useState } from "react";
import { CV } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon, FileTextIcon, BarChart3Icon, CalendarIcon } from "lucide-react";
import ConfirmationModal from "@/components/cv-builder/ConfirmationModal";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface CvTableProps {
  cvs: CV[];
  onEdit: (cv: CV) => void;
  onDelete: (id: string) => void;
}

export const CvTable = ({ cvs, onEdit, onDelete }: CvTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCvId, setSelectedCvId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDeleteClick = (id: string) => {
    setSelectedCvId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCvId) {
      onDelete(selectedCvId);
      setIsModalOpen(false);
      toast({
        title: "CV deleted",
        description: "Your CV has been deleted successfully.",
      });
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedCvId(null);
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
    return new Intl.DateTimeFormat("en-US", {
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
                  Title
                </div>
              </TableHead>
              <TableHead className="py-4 text-sm font-semibold">
                <div className="flex items-center">
                  <BarChart3Icon className="h-4 w-4 mr-2 text-muted-foreground" />
                  Score
                </div>
              </TableHead>
              <TableHead className="py-4 text-sm font-semibold">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  Date Created
                </div>
              </TableHead>
              <TableHead className="text-right py-4 text-sm font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cvs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <FileTextIcon className="h-10 w-10 mb-2 text-muted-foreground/50" />
                    No CVs found. Create a new one to get started.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              cvs.map((cv) => (
                <TableRow 
                  key={cv.id} 
                  className="hover:bg-muted/30 transition-colors group cursor-pointer border-b border-dashed"
                  onClick={() => onEdit(cv)}
                >
                  <TableCell className="font-medium py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                        <FileTextIcon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="group-hover:text-primary transition-colors">{cv.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
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
                          style={{ width: `${cv.score}%`, backgroundColor: 'currentColor' }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {formatDate(cv.dateCreated)}
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(cv);
                        }}
                        className="h-9 px-3 font-medium transition-all hover:shadow-sm"
                      >
                        <Edit2Icon className="h-4 w-4 mr-1.5" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(cv.id);
                        }}
                        className="h-9 px-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 transition-all hover:shadow-sm"
                      >
                        <Trash2Icon className="h-4 w-4 mr-1.5" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete CV"
        message="Are you sure you want to delete this CV? This action cannot be undone."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
    </>
  );
};