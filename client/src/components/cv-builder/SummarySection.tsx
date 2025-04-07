import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AiAssistantButton } from "./AiAssistantButton";
import { Wand2, SparkleIcon } from "lucide-react";

const summarySchema = z.object({
  summary: z.string().min(10, { message: "Summary should be at least 10 characters" }).max(1000, { message: "Summary should not exceed 1000 characters" }),
});

export type SummaryValues = z.infer<typeof summarySchema>;

interface SummarySectionProps {
  defaultValues?: Partial<SummaryValues>;
  onSave: (values: SummaryValues) => void;
}

export function SummarySection({ defaultValues, onSave }: SummarySectionProps) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: defaultValues?.summary || "",
    },
  });

  const handleSave = async (values: SummaryValues) => {
    setIsSaving(true);
    
    try {
      onSave(values);
      toast({
        title: "Saved",
        description: "Your professional summary has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save summary.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-sm">Professional Summary</FormLabel>
                <AiAssistantButton 
                  variant="link" 
                  type="summary"
                  defaultSummary={field.value}
                  onImprovedContent={(content) => {
                    form.setValue("summary", content);
                    toast({
                      title: "Summary improved",
                      description: "Your professional summary has been enhanced by AI.",
                    });
                  }}
                />
              </div>
              <FormControl>
                <Textarea 
                  placeholder="Write a brief overview of your professional background, key skills, and career goals..."
                  className="min-h-[120px] resize-y"
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
            <p className="text-blue-800 font-medium">Pro Tip</p>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            A great professional summary highlights your key achievements, skills, and career goals in a concise way.
          </p>
          <div className="flex justify-center">
            <AiAssistantButton 
              variant="button" 
              type="summary"
              defaultSummary={form.getValues("summary")}
              onImprovedContent={(content) => {
                form.setValue("summary", content);
                toast({
                  title: "Summary created",
                  description: "Your professional summary has been enhanced by AI.",
                });
              }}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button 
            type="submit"
            size="sm"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}