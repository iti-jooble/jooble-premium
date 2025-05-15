import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent } from "react";
import { PlusCircle, Sparkles, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Skill } from "@shared/schema";

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
  "HTML CSS JavaScript Certification",
];

export function SkillsSection({ skills = [], onSave }: SkillsSectionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [localSkills, setLocalSkills] = useState<Skill[]>(skills);
  const [newSkill, setNewSkill] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() === "") {
      setIsAddingSkill(false);
      return;
    }

    const skill: Skill = {
      name: newSkill.trim(),
    };

    setLocalSkills([...localSkills, skill]);
    setNewSkill("");
    setIsAddingSkill(false);

    // Auto-save as we add skills
    handleSaveSkills([...localSkills, skill]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsAddingSkill(false);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (id: number) => {
    const updatedSkills = localSkills.filter((_, index) => index !== id);
    setLocalSkills(updatedSkills);

    // Auto-save as we remove skills
    handleSaveSkills(updatedSkills);
  };

  const handleAddSuggestion = (suggestion: string) => {
    const skill: Skill = {
      name: suggestion,
    };

    if (
      localSkills.some((s) => s.name.toLowerCase() === suggestion.toLowerCase())
    ) {
      toast({
        title: "Skill already added",
        description: `The skill '${suggestion}' is already in your list.`,
        variant: "default",
      });
      return;
    }

    setLocalSkills([...localSkills, skill]);

    handleSaveSkills([...localSkills, skill]);
  };

  const handleSaveSkills = async (skillsToSave: Skill[]) => {
    setIsSaving(true);

    await onSave(skillsToSave);

    setIsSaving(false);
  };

  return (
    <div className="space-y-4">
      {/* Skills list */}
      <div className="flex flex-wrap gap-2">
        {localSkills.map((skill, index) => (
          <div key={skill.name} className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="bg-white pr-7 text-gray-700 hover:bg-gray-50"
            >
              {skill.name}
              <span
                className="absolute right-2 hover:text-red-500 cursor-pointer"
                onClick={() => handleRemoveSkill(index)}
              >
                <X className="h-3.5 w-3.5 ml-1" />
              </span>
            </Button>
          </div>
        ))}
      </div>

      {/* Add new skill */}
      {isAddingSkill ? (
        <div className="flex gap-2 items-center mt-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter"
            className="max-w-xs"
            autoFocus
          />
          <Button variant="secondary" size="sm" onClick={handleAddSkill}>
            Add
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsAddingSkill(false);
              setNewSkill("");
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          className="text-primary-blue pl-0"
          onClick={() => {
            setIsAddingSkill(true);
            setNewSkill("");
          }}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add another skill
        </Button>
      )}

      {/* AI suggestion box */}
      <div className="bg-gradient-to-r from-blue-100 to-violet-200 rounded-md p-5 mt-6">
        <div className="flex items-center mb-3">
          <Sparkles className="text-primary-blue h-5 w-5 mr-2" />
          <h3 className="font-medium">Skills index for Front-end Developer</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {frontendSkillSuggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-50 text-gray-700 border-primary-blue"
              onClick={() => handleAddSuggestion(suggestion)}
            >
              <PlusCircle className="h-4 w-4 mr-1 text-primary-blue" />
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
