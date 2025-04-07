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
import { Edit2Icon, TrashIcon } from "lucide-react";
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
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cvs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-neutral-500">
                  No CVs found. Create a new one to get started.
                </TableCell>
              </TableRow>
            ) : (
              cvs.map((cv) => (
                <TableRow key={cv.id}>
                  <TableCell className="font-medium">{cv.title}</TableCell>
                  <TableCell>
                    <Badge className={getScoreColor(cv.score)}>
                      {cv.score}%
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(cv.dateCreated)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(cv)}
                        className="h-8 px-2"
                      >
                        <Edit2Icon className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(cv.id)}
                        className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
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