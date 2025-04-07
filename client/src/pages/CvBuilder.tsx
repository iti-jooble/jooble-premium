import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEditIcon, LinkedinIcon, PlusIcon } from "lucide-react";
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
    <div className="p-8 animate-in fade-in duration-300">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">CV Builder</h1>
          <p className="text-neutral-600 mt-1">Create and manage your professional CVs</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleCreateNew} className="flex-1 sm:flex-auto">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create New CV
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCreateFromLinkedIn}
            className="flex-1 sm:flex-auto"
          >
            <LinkedinIcon className="h-4 w-4 mr-2" />
            Import from LinkedIn
          </Button>
        </div>
      </div>

      {cvs.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <FileEditIcon className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Start Building Your CV</h2>
            <p className="text-neutral-600 max-w-md mb-6">
              Create a professional CV with our easy-to-use builder. Choose from multiple templates and customize to match your style.
            </p>
            <Button onClick={handleCreateNew}>Create New CV</Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Your CVs</CardTitle>
          </CardHeader>
          <CardContent>
            <CvTable cvs={cvs} onEdit={handleEdit} onDelete={handleDelete} />
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">CV Builder Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Professional Templates",
              description: "Choose from various professionally designed templates tailored for different industries"
            },
            {
              title: "ATS Optimization",
              description: "Our CVs are optimized for Applicant Tracking Systems to increase your interview chances"
            },
            {
              title: "Real-time Score",
              description: "Get instant feedback on your CV with our scoring system highlighting areas for improvement"
            }
          ].map((feature, index) => (
            <Card key={index} className="shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CvBuilder;
