import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Skill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

interface SkillsSectionProps {
  skills?: Skill[];
  onSave: (skills: Skill[]) => void;
}

export function SkillsSection({ skills = [], onSave }: SkillsSectionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSkill = () => {
    // In a full implementation, this would show a form modal to add skill
    setShowAddForm(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // This is just a placeholder; in a real app, you'd collect and save actual form data
    try {
      onSave(skills);
      toast({
        title: "Saved",
        description: "Your skills have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save skills.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {skills.length === 0 ? (
        <p className="text-sm text-gray-600">Add your skills to showcase your abilities to potential employers.</p>
      ) : (
        <div className="space-y-3">
          {/* Map through skills and display them */}
          {skills.map((skill) => (
            <div key={skill.id} className="border p-3 rounded-md">
              <p>Skill item (placeholder)</p>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAddSkill}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Ajouter une compétence
        </Button>
        
        {skills.length > 0 && (
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