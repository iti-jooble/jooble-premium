import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSearchIcon, CheckCircleIcon, UploadIcon } from "lucide-react";

const CvReview = () => {
  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300 bg-gradient-to-b from-background to-muted/20">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">CV Review</h1>
        <p className="text-muted-foreground mt-2">
          Get instant feedback on your CV with our AI-powered review system
        </p>
      </div>

      <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden bg-card">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-4 ring-primary/5">
            <FileSearchIcon className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">
            Upload Your CV for Review
          </h2>
          <p className="text-muted-foreground max-w-md mb-8">
            Our AI will analyze your CV and provide feedback on content,
            formatting, and ATS compatibility.
          </p>
          <Button
            size="lg"
            className="px-6 transition-all hover:shadow-md hover:scale-105"
          >
            <UploadIcon className="h-5 w-5 mr-2" />
            Upload CV
          </Button>
        </CardContent>
      </Card>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">What We Check</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "ATS Compatibility",
              description:
                "Ensure your CV can be properly parsed by Applicant Tracking Systems",
            },
            {
              title: "Content Quality",
              description:
                "Get feedback on your content's relevance and impact",
            },
            {
              title: "Formatting Issues",
              description:
                "Identify inconsistent formatting or layout problems",
            },
            {
              title: "Keyword Optimization",
              description:
                "Suggest industry-specific keywords to increase visibility",
            },
          ].map((check, index) => (
            <Card
              key={index}
              className="shadow-md border-border/30 border rounded-xl overflow-hidden transition-all hover:shadow-lg"
            >
              <CardContent className="p-5 flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">{check.title}</h3>
                  <p className="text-muted-foreground">{check.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CvReview;
