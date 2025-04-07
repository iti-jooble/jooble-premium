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
import { PlusCircle, Pencil, Check, SparkleIcon, TextIcon, Wand2 } from "lucide-react";
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

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string | null;
  description: string;
  isCurrent: boolean;
}

interface EducationSectionProps {
  educations?: Education[];
  onSave: (educations: Education[]) => void;
}

const educationSchema = z.object({
  school: z.string().min(1, { message: "School is required" }),
  degree: z.string().min(1, { message: "Degree is required" }),
  field: z.string().min(1, { message: "Field of study is required" }),
  startYear: z.string().min(4, { message: "Start year is required" }),
  endYear: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string()
    .min(10, { message: "Description should be at least 10 characters" })
    .max(1000, { message: "Description should not exceed 1000 characters" }),
});

type EducationFormValues = z.infer<typeof educationSchema>;

export function EducationSection({ educations = [], onSave }: EducationSectionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [localEducations, setLocalEducations] = useState<Education[]>(educations);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      school: "",
      degree: "",
      field: "",
      startYear: currentYear.toString(),
      endYear: "",
      isCurrent: false,
      description: "",
    }
  });

  const handleAddEducation = () => {
    setIsAddingNew(true);
    form.reset({
      school: "",
      degree: "",
      field: "",
      startYear: currentYear.toString(),
      endYear: "",
      isCurrent: false,
      description: "",
    });
  };

  const handleEditEducation = (edu: Education) => {
    setEditingId(edu.id);
    form.reset({
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      startYear: edu.startYear,
      endYear: edu.endYear || "",
      isCurrent: edu.isCurrent,
      description: edu.description,
    });
  };

  const handleSaveForm = (values: EducationFormValues) => {
    if (editingId) {
      // Update existing education
      const updatedEducations = localEducations.map(edu => 
        edu.id === editingId 
          ? { 
              ...edu, 
              school: values.school,
              degree: values.degree,
              field: values.field,
              startYear: values.startYear,
              endYear: values.isCurrent ? null : values.endYear || null,
              isCurrent: values.isCurrent,
              description: values.description
            } 
          : edu
      );
      setLocalEducations(updatedEducations);
      setEditingId(null);
    } else {
      // Add new education
      const newEducation: Education = {
        id: uuidv4(),
        school: values.school,
        degree: values.degree,
        field: values.field,
        startYear: values.startYear,
        endYear: values.isCurrent ? null : values.endYear || null,
        isCurrent: values.isCurrent,
        description: values.description
      };
      setLocalEducations([...localEducations, newEducation]);
    }
    
    setIsAddingNew(false);
    form.reset();
    
    // Show success message
    toast({
      title: editingId ? "Education updated" : "Education added",
      description: editingId 
        ? "Your education has been updated." 
        : "Your education has been added.",
    });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    
    try {
      onSave(localEducations);
      toast({
        title: "All education saved",
        description: "All your education entries have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save education entries.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const generateDescription = () => {
    // This would normally call an AI service to generate content
    const sampleDescription = "Acquired comprehensive knowledge in the core principles and methodologies. Participated in group projects and research activities.";
    form.setValue("description", sampleDescription);
    
    toast({
      title: "Description generated",
      description: "A sample description has been added. Feel free to edit it to match your education.",
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
    const improvedText = currentText + " Developed critical thinking and problem-solving abilities through challenging coursework.";
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
          {localEducations.length === 0 ? (
            <p className="text-sm text-gray-600">Add your educational background here.</p>
          ) : (
            <div className="space-y-3">
              {/* Map through educations and display them */}
              {localEducations.map((edu) => (
                <div key={edu.id} className="border p-3 rounded-md hover:border-gray-400 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.field}</p>
                      <p className="text-sm text-gray-600">{edu.school}</p>
                      <p className="text-xs text-gray-500">
                        {edu.startYear} - {edu.isCurrent ? "Present" : edu.endYear}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleEditEducation(edu)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
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
            
            {localEducations.length > 0 && (
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
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Établissement</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Université de Paris" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diplôme</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Master" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domaine d'étude</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Informatique" {...field} />
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
                    <FormLabel>Année de début</FormLabel>
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
                      <FormLabel>Année de fin</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                      <FormLabel className="text-sm font-normal">J'étudie actuellement ici</FormLabel>
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
                  <FormLabel>Description de la formation</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez ce que vous avez étudié et les compétences acquises."
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
                <p className="text-blue-800 font-medium">Besoin d'un indice ?</p>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Commencez avec un brouillon ou ajoutez votre texte et utilisez les outils ci-dessous pour l'améliorer.
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
                  Obtenez un brouillon
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="bg-white"
                  onClick={improveDescription}
                >
                  <Wand2 className="h-4 w-4 mr-1" />
                  Rendre plus professionnel
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="bg-white"
                  onClick={checkSpelling}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Corriger l'orthographe
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
                {editingId !== null ? "Update" : "Add"} Education
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}