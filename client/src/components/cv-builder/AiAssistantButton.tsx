import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAIAssistant } from "@/hooks/use-ai-assistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface AiAssistantButtonProps {
  variant?: "button" | "link";
  size?: "default" | "sm" | "lg" | "icon" | null;
  onImprovedContent?: (content: string) => void;
  type: "work-experience" | "summary" | "skills";
  defaultPosition?: string;
  defaultCompany?: string;
  defaultDescription?: string;
  defaultSummary?: string;
}

export function AiAssistantButton({
  variant = "button",
  size = "default",
  onImprovedContent,
  type,
  defaultPosition = "",
  defaultCompany = "",
  defaultDescription = "",
  defaultSummary = "",
}: AiAssistantButtonProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [company, setCompany] = useState(defaultCompany);
  const [description, setDescription] = useState(defaultDescription);
  const [summary, setSummary] = useState(defaultSummary);
  const [jobTitle, setJobTitle] = useState("");
  const [skill, setSkill] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [improvedContent, setImprovedContent] = useState("");
  const [activeTab, setActiveTab] = useState<string>("improve");
  
  const { isLoading, improveWorkExperience, improveSummary, suggestRelatedSkills, suggestSkillsForJobTitle } = useAIAssistant({
    onSuccess: (data) => {
      if (data.improved) {
        setImprovedContent(data.improved);
      } else if (data.skills) {
        setSuggestedSkills(data.skills);
      }
    },
  });

  const handleImprove = () => {
    if (type === "work-experience") {
      improveWorkExperience({ position, company, description });
    } else if (type === "summary") {
      improveSummary(summary);
    } else if (type === "skills" && skill) {
      suggestRelatedSkills(skill);
    }
  };

  const handleSuggestSkills = () => {
    if (jobTitle.trim()) {
      suggestSkillsForJobTitle(jobTitle);
    }
  };

  const handleUseImprovedContent = () => {
    if (onImprovedContent && improvedContent) {
      onImprovedContent(improvedContent);
      setOpen(false);
    }
  };

  const handleSkillClick = (skill: string) => {
    if (onImprovedContent) {
      onImprovedContent(skill);
    }
  };

  const renderContent = () => {
    if (type === "work-experience") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Inc."
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Current Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              rows={4}
            />
          </div>
        </div>
      );
    } else if (type === "summary") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="summary">Current Summary</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Enter your current resume summary..."
              rows={4}
            />
          </div>
        </div>
      );
    } else if (type === "skills") {
      return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="improve">Suggest Related Skills</TabsTrigger>
            <TabsTrigger value="job">Skills by Job Title</TabsTrigger>
          </TabsList>
          <TabsContent value="improve" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="skill">Skill</Label>
              <Input
                id="skill"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="e.g. React"
              />
            </div>
          </TabsContent>
          <TabsContent value="job" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Front-end Developer"
              />
            </div>
          </TabsContent>
        </Tabs>
      );
    }
    
    return null;
  };

  const renderImprovedContent = () => {
    if ((type === "work-experience" || type === "summary") && improvedContent) {
      return (
        <div className="mt-4 p-4 bg-muted rounded-md">
          <Label>Improved Content</Label>
          <div className="mt-2 text-sm whitespace-pre-line">{improvedContent}</div>
        </div>
      );
    } else if (type === "skills" && suggestedSkills.length > 0) {
      return (
        <div className="mt-4 p-4 bg-muted rounded-md">
          <Label>Suggested Skills</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestedSkills.map((skill, index) => (
              <Badge 
                key={index} 
                className="cursor-pointer hover:bg-primary" 
                onClick={() => handleSkillClick(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <>
      {variant === "button" ? (
        <Button
          variant="outline"
          size={size}
          onClick={() => setOpen(true)}
          className="flex items-center gap-2"
        >
          <Wand2 className="h-4 w-4" />
          AI Assistant
        </Button>
      ) : (
        <span
          onClick={() => setOpen(true)}
          className="text-blue-500 hover:text-blue-700 cursor-pointer flex items-center gap-1"
        >
          <Wand2 className="h-3 w-3" />
          <span className="text-xs">AI Improve</span>
        </span>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>AI Assistant</DialogTitle>
            <DialogDescription>
              Let AI help you improve your CV content
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {renderContent()}

            <div className="mt-6 flex justify-center">
              <Button 
                onClick={activeTab === "job" ? handleSuggestSkills : handleImprove} 
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Generate Improvements"}
              </Button>
            </div>

            {renderImprovedContent()}
          </div>

          <DialogFooter className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {type !== "skills" && improvedContent && (
              <Button onClick={handleUseImprovedContent}>
                Use Improved Content
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}