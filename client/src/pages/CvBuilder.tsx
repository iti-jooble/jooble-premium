import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEditIcon, LinkedinIcon, PlusIcon, ChevronRightIcon } from "lucide-react";
import { CvTable } from "@/components/cv-builder/CvTable";
import { CV } from "@/components/cv-builder/types";
import { useToast } from "@/hooks/use-toast";

// Mock data for CVs
const mockCvs: CV[] = [
  {
    id: "1",
    title: "Software Developer CV",
    score: 85,
    dateCreated: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Product Manager Resume",
    score: 72,
    dateCreated: "2023-10-05T14:20:00Z",
  },
  {
    id: "3",
    title: "UX Designer Portfolio",
    score: 94,
    dateCreated: "2024-01-20T09:15:00Z",
  },
  {
    id: "4",
    title: "Marketing Specialist CV",
    score: 63,
    dateCreated: "2023-12-12T16:45:00Z",
  },
];

const CvBuilder = () => {
  const [cvs, setCvs] = useState<CV[]>(mockCvs);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleEdit = (cv: CV) => {
    // In a real application, we would navigate to the edit page with the CV ID
    toast({
      title: "Editing CV",
      description: `Editing CV: ${cv.title}`,
    });
    console.log("Edit CV:", cv);
    // For now, we'll just redirect to step 1
    navigate("/cv-builder/create");
  };

  const handleDelete = (id: string) => {
    setCvs(cvs.filter((cv) => cv.id !== id));
  };

  const handleCreateNew = () => {
    navigate("/cv-builder/create");
  };

  const handleCreateFromLinkedIn = () => {
    toast({
      title: "LinkedIn Import",
      description: "This feature is coming soon. Stay tuned!",
    });
  };

  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CV Builder</h1>
          <p className="text-muted-foreground mt-2">Create and manage your professional CVs</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleCreateNew} 
            className="flex-1 sm:flex-auto transition-all hover:scale-105"
            size="lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New CV
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCreateFromLinkedIn}
            className="flex-1 sm:flex-auto transition-all hover:border-primary/70"
            size="lg"
          >
            <LinkedinIcon className="h-5 w-5 mr-2" />
            Import from LinkedIn
          </Button>
        </div>
      </div>

      {cvs.length === 0 ? (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/50">
          <CardContent className="p-10 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-4 ring-primary/5">
              <FileEditIcon className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Start Building Your CV</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Create a professional CV with our easy-to-use builder. Choose from multiple templates and customize to match your style.
            </p>
            <Button 
              onClick={handleCreateNew} 
              size="lg" 
              className="px-8 transition-all hover:shadow-md hover:scale-105"
            >
              Create New CV
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md border overflow-hidden">
          <CardHeader className="bg-muted/40 pb-4">
            <CardTitle className="text-xl flex items-center">
              <FileEditIcon className="mr-2 h-5 w-5 text-primary" />
              Your CVs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CvTable cvs={cvs} onEdit={handleEdit} onDelete={handleDelete} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CvBuilder;
