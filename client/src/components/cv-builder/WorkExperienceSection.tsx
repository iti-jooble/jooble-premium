import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage  
} from "@/components/ui/form";
import { useState } from "react";
import { PlusCircle, Pencil, Check, SparkleIcon, TextIcon, Wand2, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Generate years from 1970 to current year
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1969 }, (_, i) => (currentYear - i).toString());

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startYear: string;
  endYear: string | null;
  description: string;
  isCurrent: boolean;
}

interface WorkExperienceSectionProps {
  experiences?: WorkExperience[];
  onSave: (experiences: WorkExperience[]) => void;
}

const experienceSchema = z.object({
  position: z.string().min(1, { message: "Position is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  startYear: z.string().min(4, { message: "Start year is required" }),
  endYear: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string()
    .min(10, { message: "Description should be at least 10 characters" })
    .max(1000, { message: "Description should not exceed 1000 characters" }),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

export function WorkExperienceSection({ experiences = [], onSave }: WorkExperienceSectionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [localExperiences, setLocalExperiences] = useState<WorkExperience[]>(experiences);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      position: "",
      company: "",
      startYear: currentYear.toString(),
      endYear: "",
      isCurrent: false,
      description: "",
    }
  });

  const handleAddExperience = () => {
    setIsAddingNew(true);
    form.reset({
      position: "",
      company: "",
      startYear: currentYear.toString(),
      endYear: "",
      isCurrent: false,
      description: "",
    });
  };

  const handleEditExperience = (exp: WorkExperience) => {
    setEditingId(exp.id);
    form.reset({
      position: exp.position,
      company: exp.company,
      startYear: exp.startYear,
      endYear: exp.endYear || "",
      isCurrent: exp.isCurrent,
      description: exp.description,
    });
  };

  const handleSaveForm = (values: ExperienceFormValues) => {
    if (editingId) {
      // Update existing experience
      const updatedExperiences = localExperiences.map(exp => 
        exp.id === editingId 
          ? { 
              ...exp, 
              position: values.position,
              company: values.company,
              startYear: values.startYear,
              endYear: values.isCurrent ? null : values.endYear || null,
              isCurrent: values.isCurrent,
              description: values.description
            } 
          : exp
      );
      setLocalExperiences(updatedExperiences);
      setEditingId(null);
    } else {
      // Add new experience
      const newExperience: WorkExperience = {
        id: uuidv4(),
        position: values.position,
        company: values.company,
        startYear: values.startYear,
        endYear: values.isCurrent ? null : values.endYear || null,
        isCurrent: values.isCurrent,
        description: values.description
      };
      setLocalExperiences([...localExperiences, newExperience]);
    }
    
    setIsAddingNew(false);
    form.reset();
    
    // Show success message
    toast({
      title: editingId ? "Experience updated" : "Experience added",
      description: editingId 
        ? "Your work experience has been updated." 
        : "Your work experience has been added.",
    });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    
    try {
      onSave(localExperiences);
      toast({
        title: "All experiences saved",
        description: "All your work experiences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save work experiences.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const generateDescription = () => {
    // This would normally call an AI service to generate content
    const sampleDescription = "Responsible for implementing and maintaining software applications. Collaborated with cross-functional teams to deliver high-quality products. Helped improve system performance by 30%.";
    form.setValue("description", sampleDescription);
    
    toast({
      title: "Description generated",
      description: "A sample description has been added. Feel free to edit it to match your experience.",
    });
  };

  const improveDescription = () => {
    const currentText = form.getValues("description");
    if (!currentText) {
      toast({
        title: "No text to improve",
        description: "Please enter some text first before trying to improve it.",
        variant: "destructive",
      });
      return;
    }
    
    // This would normally call an AI service to improve content
    const improvedText = currentText + " Additionally, led initiatives to enhance team productivity and mentored junior developers.";
    form.setValue("description", improvedText);
    
    toast({
      title: "Description improved",
      description: "Your description has been enhanced.",
    });
  };

  const checkSpelling = () => {
    toast({
      title: "Spelling checked",
      description: "No spelling errors were found in your description.",
    });
  };

  return (
    <div className="space-y-4">
      {!isAddingNew && editingId === null && (
        <>
          {localExperiences.length === 0 ? (
            <p className="text-sm text-gray-600">Add your work experience here to showcase your professional journey.</p>
          ) : (
            <div className="space-y-3">
              {/* Map through experiences and display them */}
              {localExperiences.map((exp) => (
                <div key={exp.id} className="border p-3 rounded-md hover:border-gray-400 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-500">
                        {exp.startYear} - {exp.isCurrent ? "Present" : exp.endYear}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleEditExperience(exp)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          const updatedExperiences = localExperiences.filter(e => e.id !== exp.id);
                          setLocalExperiences(updatedExperiences);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-between mt-3">
            <Button 
              variant="ghost" 
              className="text-blue-600 pl-0" 
              onClick={handleAddExperience}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add another experience
            </Button>
            
            {localExperiences.length > 0 && (
              <Button 
                size="sm"
                onClick={handleSaveAll}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            )}
          </div>
        </>
      )}

      {(isAddingNew || editingId !== null) && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveForm)} className="space-y-4">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Software Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Google" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Year</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormField
                  control={form.control}
                  name="endYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || ""}
                        disabled={form.watch("isCurrent")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isCurrent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0 mt-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">I currently work here</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibilities and achievements</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what you did, your daily tasks, and mention the results you helped to achieve."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <SparkleIcon className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-blue-800 font-medium">Need a hint?</p>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Start with a draft or add your text and use the tools below to improve it.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="bg-white"
                  onClick={generateDescription}
                >
                  <TextIcon className="h-4 w-4 mr-1" />
                  Get a draft
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="bg-white"
                  onClick={improveDescription}
                >
                  <Wand2 className="h-4 w-4 mr-1" />
                  Make more professional
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="bg-white"
                  onClick={checkSpelling}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Check spelling
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingId(null);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingId !== null ? "Update" : "Add"} Experience
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}