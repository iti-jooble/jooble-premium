import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useMemo } from "react";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
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
import { Education } from "@shared/schema";
import { getCurrentYear, getYearsArray } from "@shared/dateUtils";

interface EducationSectionProps {
  educations?: Education[];
  onSave: (educations: Education[]) => void;
}

const enhancedSchema = z.object({
  school: z.string().min(1, { message: "School name is required" }),
  degree: z.string().min(1, { message: "Degree is required" }),
  field: z.string().optional(),
  startYear: z.string().min(4, { message: "Start year is required" }),
  endYear: z.string().optional().nullable(),
});

export function EducationSection({
  educations = [],
  onSave,
}: EducationSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const years = useMemo(() => {
    return getYearsArray();
  }, []);

  const form = useForm<Education>({
    resolver: zodResolver(enhancedSchema),
    defaultValues: {
      school: "",
      degree: "",
      field: "",
      startYear: getCurrentYear().toString(),
      endYear: "",
    },
  });

  const handleAddEducation = () => {
    setIsAddingNew(true);
    form.reset({
      school: "",
      degree: "",
      field: "",
      startYear: getCurrentYear().toString(),
      endYear: "",
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
    });
  };

  const handleDeleteEducation = async (id: string) => {
    setIsLoading(true);
    const updatedEducations = educations.filter((edu) => edu.id !== id);
    await onSave(updatedEducations);
    setIsLoading(false);
  };

  const handleSaveForm = async (values: Education) => {
    setIsLoading(true);

    try {
      if (editingId) {
        const updatedEducations = educations.map((edu) =>
          edu.id === editingId
            ? {
                ...edu,
                school: values.school,
                degree: values.degree,
                field: values.field,
                startYear: values.startYear,
                endYear: values.endYear || null,
              }
            : edu,
        );
        await onSave(updatedEducations);
        setEditingId(null);
      } else {
        const newEducation: Education = {
          id: uuidv4(),
          school: values.school,
          degree: values.degree,
          field: values.field,
          startYear: values.startYear,
          endYear: values.endYear || null,
        };
        await onSave([...educations, newEducation]);
      }

      setIsAddingNew(false);
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!isAddingNew && editingId === null && (
        <>
          {educations.length === 0 ? (
            <p className="text-sm text-gray-600">
              Add your educational background here.
            </p>
          ) : (
            <div className="space-y-3">
              {/* Map through educations and display them */}
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="border p-3 rounded-md hover:border-gray-400 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.field}</p>
                      <p className="text-sm text-gray-600">{edu.school}</p>
                      <p className="text-xs text-gray-500">
                        {edu.startYear} - {edu.endYear}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditEducation(edu)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                        isLoading={isLoading}
                        onClick={() => handleDeleteEducation(edu.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            variant="ghost"
            className="mt-4 text-primary-blue pl-0"
            onClick={handleAddEducation}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add another education
          </Button>
        </>
      )}

      {(isAddingNew || editingId !== null) && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSaveForm)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Degree</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Bachelor, Master, PhD..."
                      {...field}
                    />
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
                  <FormLabel className="font-medium">Field of Study</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Computer Science, Business, Law..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">School Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Harvard University, MIT..."
                      {...field}
                    />
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
                    <FormLabel className="font-medium">Start Year</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      End Year (or Expected)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
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
              <Button type="submit" isLoading={isLoading}>
                {editingId !== null ? "Update" : "Add"} Education
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
