import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSearchIcon, CheckCircleIcon } from "lucide-react";

const CvReview = () => {
  return (
    <div className="p-8 animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">CV Review</h1>
        <p className="text-neutral-600 mt-1">Get instant feedback on your CV with our AI-powered review system</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <FileSearchIcon className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Upload Your CV for Review</h2>
          <p className="text-neutral-600 max-w-md mb-6">
            Our AI will analyze your CV and provide feedback on content, formatting, and ATS compatibility.
          </p>
          <Button>Upload CV</Button>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">What We Check</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "ATS Compatibility",
              description: "Ensure your CV can be properly parsed by Applicant Tracking Systems"
            },
            {
              title: "Content Quality",
              description: "Get feedback on your content's relevance and impact"
            },
            {
              title: "Formatting Issues",
              description: "Identify inconsistent formatting or layout problems"
            },
            {
              title: "Keyword Optimization",
              description: "Suggest industry-specific keywords to increase visibility"
            }
          ].map((check, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-4 flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">{check.title}</h3>
                  <p className="text-sm text-neutral-600">{check.description}</p>
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
