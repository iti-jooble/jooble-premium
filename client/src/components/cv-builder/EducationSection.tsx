import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  description: string;
  isCurrent: boolean;
}

interface EducationSectionProps {
  educations?: Education[];
  onSave: (educations: Education[]) => void;
}

export function EducationSection({ educations = [], onSave }: EducationSectionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddEducation = () => {
    // In a full implementation, this would show a form modal to add education
    setShowAddForm(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // This is just a placeholder; in a real app, you'd collect and save actual form data
    try {
      onSave(educations);
      toast({
        title: "Saved",
        description: "Your education has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save education.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {educations.length === 0 ? (
        <p className="text-sm text-gray-600">Add your educational background to highlight your qualifications.</p>
      ) : (
        <div className="space-y-3">
          {/* Map through educations and display them */}
          {educations.map((edu) => (
            <div key={edu.id} className="border p-3 rounded-md">
              <p>Education item (placeholder)</p>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAddEducation}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Ajouter une formation
        </Button>
        
        {educations.length > 0 && (
          <Button 
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        )}
      </div>
    </div>
  );
}