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
              <FormLabel className="text-sm">Résumé professionnel</FormLabel>
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