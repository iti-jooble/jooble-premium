import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trans, useTranslation } from "react-i18next";
import { CV } from "@shared/schema";
import { Check, Sparkles, FileText, Wand2, Loader2 } from "lucide-react";
import { Namespaces, States } from "./AIAssistance/enums";
import useAIAssistance from "./AIAssistance/hooks/useAIAssistance";
import { getAIAssistanceConfigByNamespace } from "./AIAssistance/helpers";

const summarySchema = z.object({
  summary: z
    .string()
    .min(10, { message: "Summary should be at least 10 characters" })
    .max(1000, { message: "Summary should not exceed 1000 characters" }),
});

export type SummaryValues = z.infer<typeof summarySchema>;

interface SummarySectionProps {
  defaultValues?: Partial<SummaryValues>;
  onSave: (values: SummaryValues) => void;
  currentCv: CV;
}

export function SummarySection({
  defaultValues,
  onSave,
  currentCv,
}: SummarySectionProps) {
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: defaultValues?.summary || "",
    },
  });

  const aiConfig = getAIAssistanceConfigByNamespace(Namespaces.summary, {
    experience: currentCv.userInfo.experience,
    skills: currentCv.userInfo.skills.map((skill) => skill.name),
    education: currentCv.userInfo.education,
    summary: form.getValues().summary,
    languageCode: "en",
    t,
  });

  const handleAddSuggestion = (summanry: string) => {
    form.setValue("summary", summanry);
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

  const handleSave = async (values: SummaryValues) => {
    setIsSaving(true);

    await onSave(values);

    setIsSaving(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <Textarea
                  placeholder="Write a brief overview of your professional background, key skills, and career goals..."
                  className="min-h-[150px] resize-y rounded-b-none"
                  {...field}
                />
              </FormControl>

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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
