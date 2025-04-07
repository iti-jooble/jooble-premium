import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEditIcon } from "lucide-react";

const CvBuilder = () => {
  return (
    <div className="p-8 animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">CV Builder</h1>
        <p className="text-neutral-600 mt-1">Create professional CVs with customizable templates</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
            <FileEditIcon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Start Building Your CV</h2>
          <p className="text-neutral-600 max-w-md mb-6">
            Create a professional CV with our easy-to-use builder. Choose from multiple templates and customize to match your style.
          </p>
          <Button>Create New CV</Button>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Professional Templates",
              description: "Choose from various professionally designed templates"
            },
            {
              title: "Easy Customization",
              description: "Customize fonts, colors, and sections to make your CV stand out"
            },
            {
              title: "ATS Friendly",
              description: "Our templates are optimized for Applicant Tracking Systems"
            }
          ].map((feature, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CvBuilder;
