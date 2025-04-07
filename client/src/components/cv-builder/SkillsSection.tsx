import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent } from "react";
import { PlusCircle, Trash2, Sparkles, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

interface Skill {
  id: string;
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

interface SkillsSectionProps {
  skills?: Skill[];
  onSave: (skills: Skill[]) => void;
}

// Front-end developer skill suggestions
const frontendSkillSuggestions = [
  "Front-end Developer",
  "HTML CSS JavaScript",
  "Responsive Design",
  "Code Debugging",
  "Performance Optimization",
  "Front-end Framework",
  "User Experience",
  "Team Work",
  "Web Development Training",
  "HTML CSS JavaScript Certification"
];

export function SkillsSection({ skills = [], onSave }: SkillsSectionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [localSkills, setLocalSkills] = useState<Skill[]>(skills);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() === "") return;
    
    const skill: Skill = {
      id: uuidv4(),
      name: newSkill.trim()
    };
    
    setLocalSkills([...localSkills, skill]);
    setNewSkill("");
    
    // Auto-save as we add skills
    handleSaveSkills([...localSkills, skill]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (id: string) => {
    const updatedSkills = localSkills.filter(skill => skill.id !== id);
    setLocalSkills(updatedSkills);
    
    // Auto-save as we remove skills
    handleSaveSkills(updatedSkills);
  };

  const handleAddSuggestion = (suggestion: string) => {
    const skill: Skill = {
      id: uuidv4(),
      name: suggestion
    };
    
    // Check if the skill already exists
    if (localSkills.some(s => s.name.toLowerCase() === suggestion.toLowerCase())) {
      toast({
        title: "Skill already added",
        description: `The skill '${suggestion}' is already in your list.`,
        variant: "default",
      });
      return;
    }
    
    setLocalSkills([...localSkills, skill]);
    
    // Auto-save as we add skills
    handleSaveSkills([...localSkills, skill]);
    
    toast({
      title: "Skill added",
      description: `The skill '${suggestion}' has been added.`,
    });
  };

  const handleSaveSkills = async (skillsToSave: Skill[]) => {
    setIsSaving(true);
    
    try {
      onSave(skillsToSave);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving skills.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Skills list */}
      <div className="flex flex-wrap gap-2">
        {localSkills.map((skill) => (
          <div 
            key={skill.id}
            className="relative group"
          >
            <Button
              variant="outline"
              size="sm"
              className="bg-white pr-7 text-gray-700 hover:bg-gray-50"
            >
              {skill.name}
              <span 
                className="absolute right-2 hover:text-red-500 cursor-pointer"
                onClick={() => handleRemoveSkill(skill.id)}
              >
                <X className="h-3.5 w-3.5 ml-1" />
              </span>
            </Button>
          </div>
        ))}
      </div>
      
      {/* Add new skill */}
      <Button 
        variant="ghost" 
        className="text-blue-600 pl-0" 
        onClick={() => setNewSkill("New skill")}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add another skill
      </Button>
      
      {/* AI suggestion box */}
      <div className="bg-blue-50 rounded-lg p-5 mt-6">
        <div className="flex items-center mb-3">
          <Sparkles className="text-blue-500 h-5 w-5 mr-2" />
          <h3 className="text-blue-800 font-medium">Skills index for Front-end Developer</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {frontendSkillSuggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-50 text-gray-700"
              onClick={() => handleAddSuggestion(suggestion)}
            >
              <PlusCircle className="h-4 w-4 mr-1 text-blue-500" />
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Hidden save button - now auto-saves */}
      <div className="hidden">
        <Button 
          size="sm"
          onClick={() => handleSaveSkills(localSkills)}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}