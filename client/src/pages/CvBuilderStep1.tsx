import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ChevronRightIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(50),
});

type FormValues = z.infer<typeof formSchema>;

const CvBuilderStep1 = () => {
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form values:", values);
      // In a real application, we would save the data and navigate to the next step
      navigate("/cv-builder/step-2");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="p-8 animate-in fade-in duration-300">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={() => navigate("/cv-builder")}
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Create New CV</h1>
          <p className="text-neutral-600 mt-1">Step 1: Basic Information</p>
        </div>
      </div>

      <div className="flex mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">1</div>
          <div className="mx-2 text-primary font-medium">Basic Info</div>
        </div>
        <div className="w-16 h-1 bg-gray-200 mx-2 mt-4"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-semibold">2</div>
          <div className="mx-2 text-gray-500">Experience</div>
        </div>
        <div className="w-16 h-1 bg-gray-200 mx-2 mt-4"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-semibold">3</div>
          <div className="mx-2 text-gray-500">Education</div>
        </div>
        <div className="w-16 h-1 bg-gray-200 mx-2 mt-4"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-semibold">4</div>
          <div className="mx-2 text-gray-500">Skills</div>
        </div>
        <div className="w-16 h-1 bg-gray-200 mx-2 mt-4"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-semibold">5</div>
          <div className="mx-2 text-gray-500">Summary</div>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Let's start with some basic information about your CV
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CV Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Software Engineer CV, Marketing Professional Resume" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">💡 Tips for a great CV title:</h3>
                  <ul className="text-sm text-blue-700 pl-6 list-disc">
                    <li>Include the position you're targeting</li>
                    <li>Be specific rather than generic</li>
                    <li>Keep it professional and concise</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Continue to Next Step"}
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <p className="text-sm text-gray-500">
            Your progress is automatically saved
          </p>
        </CardFooter>
      </Card>

      <div className="mt-8 max-w-2xl mx-auto">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64 bg-gray-50 border-2 border-dashed border-gray-200 rounded-md">
            <p className="text-gray-500">
              Your CV preview will appear here as you fill in more information
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CvBuilderStep1;