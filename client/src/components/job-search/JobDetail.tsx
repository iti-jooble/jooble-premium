import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  SearchIcon, 
  MapPinIcon, 
  BriefcaseIcon, 
  DollarSignIcon, 
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  FileTextIcon,
  LockIcon,
  LineChartIcon,
  ArrowRightIcon
} from "lucide-react";
import { JobCardProps } from "./JobCard";
import { useTranslation } from "react-i18next";

interface JobDetailProps {
  selectedJob: (JobCardProps['job'] & { description: string }) | null;
}

export const JobDetail = ({ selectedJob }: JobDetailProps) => {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-7">
      {selectedJob ? (
        <Card className="shadow-sm sticky top-4 border-border/40">
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
              <div className="text-muted-foreground">{selectedJob.company}</div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground my-4">
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <span>{selectedJob.location}</span>
              </div>
              <div className="flex items-center">
                <BriefcaseIcon className="h-4 w-4 mr-1" />
                <span>{selectedJob.type}</span>
              </div>
              <div className="flex items-center">
                <DollarSignIcon className="h-4 w-4 mr-1" />
                <span>{selectedJob.salary}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>Posted {selectedJob.posted}</span>
              </div>
            </div>

            <Separator className="my-4" />

            {/* CV Matching Score Premium Feature */}
            <Card className="mb-4 overflow-hidden border-primary/10 relative">
              {/* Premium badge in corner with gradient */}
              <div className="absolute top-0 right-0">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-bl-lg blur-[1px] opacity-60"></div>
                  <Badge className="relative rounded-bl-none rounded-tr-none bg-gradient-to-r from-amber-400 to-amber-500 text-black border-0 font-semibold px-3 py-1">
                    PREMIUM
                  </Badge>
                </div>
              </div>
              
              {/* Decorative gradient background */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400/10 to-amber-500/5 blur-lg"></div>
              
              <CardContent className="p-5">
                <div className="flex items-center mb-3">
                  <div className="relative mr-3">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-lg blur-[2px] opacity-70"></div>
                    <div className="relative bg-primary text-primary-foreground rounded-lg p-2">
                      <LineChartIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">CV Match Score</h3>
                    <p className="text-sm text-muted-foreground">
                      How well your CV matches this job
                    </p>
                  </div>
                </div>
                
                {/* Match percentage with analyzed info */}
                <div className="bg-muted/30 p-4 rounded-lg mb-4 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-3xl font-bold text-primary flex items-baseline">
                        68<span className="text-lg font-medium">%</span>
                      </div>
                      <div className="ml-2 text-xs py-1 px-2 rounded bg-primary/10 text-primary border border-primary/20">
                        Overall Match
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Skills</div>
                        <div className="text-sm font-semibold">72%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Experience</div>
                        <div className="text-sm font-semibold">65%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Keywords</div>
                        <div className="text-sm font-semibold">59%</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Analysis section (blurred) */}
                  <div className="mt-4 pt-4 border-t border-border/40 relative">
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="bg-background/60 rounded-full p-1.5">
                        <LockIcon className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    
                    <div className="filter blur-[4px]">
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Missing Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs py-0.5 px-2 rounded-full bg-amber-100 text-amber-800 border border-amber-200">Docker</span>
                          <span className="text-xs py-0.5 px-2 rounded-full bg-amber-100 text-amber-800 border border-amber-200">Kubernetes</span>
                          <span className="text-xs py-0.5 px-2 rounded-full bg-amber-100 text-amber-800 border border-amber-200">CI/CD</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Experience Gaps</h4>
                        <p className="text-xs text-muted-foreground">Need 2+ years experience with cloud infrastructure</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Improvement Suggestions</h4>
                        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                          <li>Emphasize your DevOps experience</li>
                          <li>Add certifications related to cloud platforms</li>
                          <li>Highlight team collaboration projects</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary">
                  <span>Upgrade for detailed analysis</span>
                  <ArrowRightIcon className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="flex items-center">
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Apply Now
              </Button>
              <Button variant="outline" className="flex items-center">
                <SparklesIcon className="h-4 w-4 mr-2" />
                Summarize with AI
              </Button>
              <Button variant="outline" className="flex items-center">
                <FileTextIcon className="h-4 w-4 mr-2" />
                Adapt CV for this Job
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-sm sticky top-4 flex flex-col items-center justify-center p-12 text-center border-border/40">
          <div className="text-muted-foreground mb-4">
            <SearchIcon className="h-12 w-12 mx-auto opacity-20" />
          </div>
          <h3 className="text-xl font-medium mb-2">Select a job listing</h3>
          <p className="text-muted-foreground">
            Click on a job from the list to view its details here
          </p>
        </Card>
      )}
    </div>
  );
};