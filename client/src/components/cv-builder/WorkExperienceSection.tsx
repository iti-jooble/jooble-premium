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
  FormMessage,
} from "@/components/ui/form";
import { useTranslation, Trans } from "react-i18next";
import { useState, useMemo } from "react";
import {
  PlusCircle,
  Pencil,
  Check,
  Sparkles,
  FileText,
  Wand2,
  Trash2,
  Loader2,
} from "lucide-react";
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
import { Experience } from "@shared/schema";
import { getCurrentYear, getYearsArray } from "@shared/dateUtils";
import { Namespaces, States } from "./AIAssistance/enums";
import useAIAssistance from "./AIAssistance/hooks/useAIAssistance";
import { getAIAssistanceConfigByNamespace } from "./AIAssistance/helpers";

interface WorkExperienceSectionProps {
  experiences?: Experience[];
  onSave: (experiences: Experience[]) => void;
}

const enhancedSchema = z.object({
  position: z.string().min(1, { message: "Position is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  startYear: z.string().min(4, { message: "Start year is required" }),
  endYear: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z
    .string()
    .min(10, { message: "Description should be at least 10 characters" })
    .max(1000, { message: "Description should not exceed 1000 characters" }),
});

export function ExperienceSection({
  experiences = [],
  onSave,
}: WorkExperienceSectionProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const years = useMemo(() => {
    return getYearsArray();
  }, []);

  const form = useForm<Experience>({
    resolver: zodResolver(enhancedSchema),
    defaultValues: {
      position: "",
      company: "",
      startYear: getCurrentYear().toString(),
      endYear: "",
      isCurrent: false,
      description: "",
    },
  });

  const aiConfig = getAIAssistanceConfigByNamespace(Namespaces.experience, {
    experience: form.getValues(),
    languageCode: "en",
    t,
  });

  const handleAddSuggestion = (description: string) => {
    form.setValue("description", description);
  };

  const {
    state,
    response,
    handleInsertResponseClick,
    handleGenerateClick,
    handleFixSpellingClick,
    handleClearResponseClick,
    handleRetryClick,
    handleRephraseClick,
  } = useAIAssistance({
    insertResponse: handleAddSuggestion,
    config: aiConfig,
  });

  const handleAddExperience = () => {
    setIsAddingNew(true);
    form.reset({
      position: "",
      company: "",
      startYear: getCurrentYear().toString(),
      endYear: "",
      isCurrent: false,
      description: "",
    });
  };

  const handleEditExperience = (exp: Experience) => {
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

  const handleDeleteExperience = (id: string) => {
    setIsLoading(true);
    const updatedExperiences = experiences.filter((exp) => exp.id !== id);
    onSave(updatedExperiences);
    setIsLoading(false);
  };

  const handleSaveForm = (values: Experience) => {
    setIsLoading(true);

    const newExperiencePartial: Omit<Experience, "id"> = {
      position: values.position,
      company: values.company,
      startYear: values.startYear,
      endYear: values.isCurrent ? null : values.endYear || null,
      isCurrent: values.isCurrent,
      description: values.description,
    };

    var updatedExperiences: Experience[];

    try {
      if (editingId) {
        updatedExperiences = experiences.map((exp) =>
          exp.id === editingId
            ? {
                ...exp,
                ...newExperiencePartial,
              }
            : exp,
        );
      } else {
        const newExperience: Experience = {
          id: uuidv4(),
          ...newExperiencePartial,
        };

        updatedExperiences = [...experiences, newExperience];
      }

      onSave(updatedExperiences);

      setEditingId(null);
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
          {experiences.length === 0 ? (
            <p className="text-sm text-gray-600">
              Add your work experience here to showcase your professional
              journey.
            </p>
          ) : (
            <div className="space-y-3">
              {/* Map through experiences and display them */}
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="border p-3 rounded-md hover:border-gray-400 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-500">
                        {exp.startYear} -{" "}
                        {exp.isCurrent ? "Present" : exp.endYear}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        isLoading={isLoading}
                        onClick={() => handleEditExperience(exp)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteExperience(exp.id)}
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
              className="-ml-4"
              onClick={handleAddExperience}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add another experience
            </Button>
          </div>
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
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select year" />
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
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select year" />
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
                  name="isCurrent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0 mt-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        I currently work here
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormItem className="space-y-0">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsibilities and achievements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what you did, your daily tasks, and mention the results you helped to achieve."
                        className="min-h-[120px] rounded-b-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-primary-gradient from-blue-100 to-violet-200 p-4 rounded-b-xl">
                <div className="flex items-center mb-2">
                  {state === States.Loading ? (
                    <Loader2 className="text-primary-blue h-5 w-5 mr-2 shrink-0 animate-spin" />
                  ) : (
                    <Sparkles className="text-primary-blue shrink-0 h-5 w-5 mr-2" />
                  )}
                  <p>
                    <Trans
                      i18nKey={aiConfig.texts[state]?.title ?? ""}
                      components={{ strong: <strong /> }}
                    />
                  </p>
                </div>

                {state === States.Initial && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-primary-blue/30"
                      onClick={handleGenerateClick}
                    >
                      <FileText className="h-4 w-4 mr-1 text-primary-blue" />
                      Get a draft
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-primary-blue/30"
                      onClick={handleRephraseClick}
                    >
                      <Wand2 className="h-4 w-4 mr-1 text-primary-blue" />
                      Make more professional
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-primary-blue/30"
                      onClick={handleFixSpellingClick}
                    >
                      <Check className="h-4 w-4 mr-1 text-primary-blue" />
                      Check spelling
                    </Button>
                  </div>
                )}

                {state === States.Loading && (
                  <div className="py-3 animate-pulse">
                    <div className="h-5 my-1 w-24 bg-gray/40 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray/30 rounded"></div>
                      <div className="h-4 w-3/4 bg-gray/30 rounded"></div>
                      <div className="h-4 w-2/3 bg-gray/30 rounded"></div>
                    </div>
                  </div>
                )}

                {state === States.Response && (
                  <>
                    <p
                      className=""
                      dangerouslySetInnerHTML={{ __html: response as string }}
                    />
                    <div className="flex justify-between flex-wrap gap-2 mt-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-primary-blue/30"
                        onClick={() => handleClearResponseClick()}
                      >
                        <FileText className="h-4 w-4 mr-1 text-primary-blue" />
                        Clear
                      </Button>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-primary-blue/30"
                          onClick={handleRetryClick}
                        >
                          <Wand2 className="h-4 w-4 mr-1 text-primary-blue" />
                          Retry
                        </Button>

                        <Button
                          type="button"
                          size="sm"
                          onClick={() => {
                            handleInsertResponseClick(response as string);
                          }}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Add to CV
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </FormItem>

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
              <Button type="submit" isLoading={isLoading}>
                {editingId !== null ? "Update" : "Add"} Experience
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
