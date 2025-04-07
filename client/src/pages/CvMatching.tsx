import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkIcon, UploadIcon, CheckIcon, AlertCircleIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CvMatching = () => {
  return (
    <div className="p-8 animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">CV Matching</h1>
        <p className="text-neutral-600 mt-1">Match your CV against job descriptions to identify strengths and gaps</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
              <UploadIcon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Upload Your CV</h2>
            <p className="text-neutral-600 text-sm mb-4">
              Upload your CV to start the matching process. We support PDF, DOCX, and TXT formats.
            </p>
            <Button>Select File</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
              <LinkIcon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Paste Job Description</h2>
            <p className="text-neutral-600 text-sm mb-4">
              Copy and paste the job description you want to match against your CV.
            </p>
            <Button>Enter Job Description</Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">How It Works</h2>
      <Card className="shadow-sm mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Upload CV",
                description: "Upload your current CV or resume in any common format"
              },
              {
                step: "2",
                title: "Add Job Description",
                description: "Paste the job description or requirements for the role"
              },
              {
                step: "3",
                title: "Get Insights",
                description: "Receive detailed analysis showing match rate and improvement areas"
              }
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium mb-4">
                  {item.step}
                </div>
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Match Example</h2>
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Software Engineer Position - Match Analysis</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Match</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Strong Matches</h3>
                      <ul className="text-sm space-y-1">
                        <li>• React.js development experience</li>
                        <li>• TypeScript proficiency</li>
                        <li>• Front-end architecture</li>
                        <li>• Responsive design</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-amber-200 bg-amber-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircleIcon className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Improvement Areas</h3>
                      <ul className="text-sm space-y-1">
                        <li>• GraphQL experience</li>
                        <li>• Testing frameworks</li>
                        <li>• CI/CD pipeline knowledge</li>
                        <li>• Performance optimization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button>View Detailed Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CvMatching;
