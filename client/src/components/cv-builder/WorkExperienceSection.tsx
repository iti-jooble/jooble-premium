import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  isCurrent: boolean;
}

interface WorkExperienceSectionProps {
  experiences?: WorkExperience[];
  onSave: (experiences: WorkExperience[]) => void;
}

export function WorkExperienceSection({ experiences = [], onSave }: WorkExperienceSectionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddExperience = () => {
    // In a full implementation, this would show a form modal to add experience
    setShowAddForm(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // This is just a placeholder; in a real app, you'd collect and save actual form data
    try {
      onSave(experiences);
      toast({
        title: "Saved",
        description: "Your work experience has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save work experience.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {experiences.length === 0 ? (
        <p className="text-sm text-gray-600">Add your work experience here to showcase your professional journey.</p>
      ) : (
        <div className="space-y-3">
          {/* Map through experiences and display them */}
          {experiences.map((exp) => (
            <div key={exp.id} className="border p-3 rounded-md">
              <p>Experience item (placeholder)</p>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAddExperience}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Ajouter une expérience
        </Button>
        
        {experiences.length > 0 && (
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