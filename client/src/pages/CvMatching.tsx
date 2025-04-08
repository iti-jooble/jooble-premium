import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkIcon, UploadIcon, CheckIcon, AlertCircleIcon, FileTextIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CvMatching = () => {
  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300 bg-gradient-to-b from-background to-muted/20">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">CV Matching</h1>
        <p className="text-muted-foreground mt-2">Match your CV against job descriptions to identify strengths and gaps</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 ring-4 ring-primary/5">
              <FileTextIcon className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-3">Upload Your CV</h2>
            <p className="text-muted-foreground mb-5">
              Upload your CV to start the matching process. We support PDF, DOCX, and TXT formats.
            </p>
            <Button size="lg" className="transition-all hover:shadow-md hover:scale-105">
              <UploadIcon className="h-5 w-5 mr-2" />
              Select File
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 ring-4 ring-primary/5">
              <LinkIcon className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-3">Paste Job Description</h2>
            <p className="text-muted-foreground mb-5">
              Copy and paste the job description you want to match against your CV.
            </p>
            <Button size="lg" className="transition-all hover:shadow-md hover:scale-105">
              Enter Job Description
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-primary-foreground/90">How It Works</h2>
      <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden mb-10 bg-card">
        <CardContent className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-medium mb-5 shadow-md">
                  {item.step}
                </div>
                <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-6 text-primary-foreground/90">Match Example</h2>
      <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden bg-card">
        <CardContent className="p-6 sm:p-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <div className="rounded-full bg-primary/10 p-2 mr-3">
              <FileTextIcon className="h-5 w-5 text-primary" />
            </div>
            Software Engineer Position - Match Analysis
          </h3>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-3">
                <span className="font-medium">Overall Match</span>
                <span className="font-medium text-primary">78%</span>
              </div>
              <Progress value={78} className="h-3 rounded-lg bg-primary/10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden transition-all hover:shadow-lg bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-emerald-500/10 p-2 flex-shrink-0">
                      <CheckIcon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-3">Strong Matches</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                          React.js development experience
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                          TypeScript proficiency
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                          Front-end architecture
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                          Responsive design
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden transition-all hover:shadow-lg bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-amber-500/10 p-2 flex-shrink-0">
                      <AlertCircleIcon className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-3">Improvement Areas</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>
                          GraphQL experience
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>
                          Testing frameworks
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>
                          CI/CD pipeline knowledge
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>
                          Performance optimization
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center">
              <Button size="lg" className="px-6 transition-all hover:shadow-md hover:scale-105">
                View Detailed Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CvMatching;
