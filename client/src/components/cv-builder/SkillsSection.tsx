import { useTranslation } from "react-i18next";
import isArray from "lodash/isArray";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent } from "react";
import { PlusCircle, Sparkles, X, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CV, Skill } from "@shared/schema";
import useAIAssistance from "./AIAssistance/hooks/useAIAssistance";
import { getAIAssistanceConfigByNamespace } from "./AIAssistance/helpers";
import { Namespaces, States } from "./AIAssistance/enums";

interface SkillsSectionProps {
  skills?: Skill[];
  onSave: (skills: Skill[]) => void;
  currentCv?: CV;
}

export function SkillsSection({
  skills = [],
  onSave,
  currentCv,
}: SkillsSectionProps) {
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const [localSkills, setLocalSkills] = useState<Skill[]>(skills);
  const [newSkill, setNewSkill] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const config = getAIAssistanceConfigByNamespace(Namespaces.skills, {
    experience: currentCv?.userInfo.experience ?? [],
    education: currentCv?.userInfo.education ?? [],
    languageCode: "en",
    t,
  });

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

  const { state, response, handleInsertResponseClick } = useAIAssistance({
    insertResponse: handleAddSuggestion,
    config,
  });

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

    handleSaveSkills(updatedSkills);
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
          <div
            key={skill.name}
            className="flex items-center bg-white border border-primary-blue/30 rounded-xl px-4 py-2"
          >
            <span className="mr-2">{skill.name}</span>
            <button
              onClick={() => handleRemoveSkill(index)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
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
          className="-ml-4"
          onClick={() => {
            setIsAddingSkill(true);
            setNewSkill("");
          }}
        >
          <PlusCircle className="h-4 w-4" />
          Add another skill
        </Button>
      )}

      {config.prompts.generate && (
        <div className="bg-gradient-to-r from-blue-100 to-violet-200 rounded-xl p-5 mt-6">
          <div className="flex items-center mb-3">
            {state === States.Loading ? (
              <Loader2 className="text-primary-blue h-5 w-5 mr-2 shrink-0 animate-spin" />
            ) : (
              <Sparkles className="text-primary-blue shrink-0 h-5 w-5 mr-2" />
            )}

            <h3 className="font-medium">{config.texts[state]?.title}</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {isArray(response) &&
              response.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="border-primary-blue/30"
                  onClick={() => handleInsertResponseClick(suggestion)}
                >
                  <PlusCircle className="h-4 w-4 text-primary-blue" />
                  {suggestion}
                </Button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
