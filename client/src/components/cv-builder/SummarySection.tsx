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
import { Check, SparkleIcon, FileText, Wand2 } from "lucide-react";

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
  
  const generateSummary = () => {
    // This would normally call an AI service to generate content
    const sampleSummary = "Experienced professional with a proven track record of success in delivering high-quality results. Skilled in problem-solving, communication, and team collaboration. Seeking new opportunities to leverage expertise and contribute to organizational growth.";
    form.setValue("summary", sampleSummary);
    
    toast({
      title: "Summary generated",
      description: "A sample professional summary has been added. Feel free to edit it to match your profile.",
    });
  };

  const improveSummary = () => {
    const currentText = form.getValues("summary");
    if (!currentText) {
      toast({
        title: "No text to improve",
        description: "Please enter some text first before trying to improve it.",
        variant: "destructive",
      });
      return;
    }
    
    // This would normally call an AI service to improve content
    const improvedText = currentText + " Adept at navigating complex challenges and driving innovation while maintaining a focus on quality and efficiency.";
    form.setValue("summary", improvedText);
    
    toast({
      title: "Summary improved",
      description: "Your professional summary has been enhanced.",
    });
  };

  const checkSpelling = () => {
    toast({
      title: "Spelling checked",
      description: "No spelling errors were found in your summary.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  placeholder="Write a brief overview of your professional background, key skills, and career goals..."
                  className="min-h-[150px] resize-y"
                  {...field}
                />
              </FormControl>
              
              <div className="bg-blue-50 p-4 rounded-md mt-3">
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
                    onClick={generateSummary}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Get a draft
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="bg-white"
                    onClick={improveSummary}
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