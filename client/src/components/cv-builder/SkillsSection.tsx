import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent } from "react";
import { PlusCircle, Trash2, Sparkles } from "lucide-react";
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
  "Développeur Front-end",
  "HTML CSS JavaScript",
  "Conception Responsive",
  "Débogage Code",
  "Optimisation Performance",
  "Framework Front-end",
  "Expérience Utilisateur",
  "Travail d'Équipe",
  "Formation Développement Web",
  "Certification HTML CSS JavaScript"
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
        title: "Compétence déjà ajoutée",
        description: `La compétence '${suggestion}' est déjà dans votre liste.`,
        variant: "default",
      });
      return;
    }
    
    setLocalSkills([...localSkills, skill]);
    
    // Auto-save as we add skills
    handleSaveSkills([...localSkills, skill]);
    
    toast({
      title: "Compétence ajoutée",
      description: `La compétence '${suggestion}' a été ajoutée.`,
    });
  };

  const handleSaveSkills = async (skillsToSave: Skill[]) => {
    setIsSaving(true);
    
    try {
      onSave(skillsToSave);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des compétences.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Skills list */}
      <div className="space-y-3">
        {localSkills.map((skill, index) => (
          <div 
            key={skill.id} 
            className="relative flex items-center border border-gray-300 rounded-lg p-4"
          >
            <Input 
              value={skill.name || `Compétence ${index + 1}`} 
              disabled 
              className="bg-white border-none shadow-none focus-visible:ring-0 pr-12"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 text-gray-400 hover:text-gray-600"
              onClick={() => handleRemoveSkill(skill.id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
      
      {/* Add new skill */}
      <Button 
        variant="ghost" 
        className="text-blue-600 pl-0" 
        onClick={() => setNewSkill("Nouvelle compétence")}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Ajouter une autre compétence
      </Button>
      
      {/* AI suggestion box */}
      <div className="bg-blue-50 rounded-lg p-5 mt-6">
        <div className="flex items-center mb-3">
          <Sparkles className="text-blue-500 h-5 w-5 mr-2" />
          <h3 className="text-blue-800 font-medium">Indice de compétences pour Front end developer</h3>
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
          {isSaving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </div>
  );
}