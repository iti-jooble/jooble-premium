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
            <Card className="mb-4 bg-muted/20 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <LineChartIcon className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">CV Match Score</h3>
                  </div>
                  <Badge variant="outline" className="bg-muted/70 text-muted-foreground">
                    Premium Feature
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  How well your CV matches this job
                </p>
                
                {/* Match percentage with blur effect */}
                <div className="relative mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">68%</span>
                    <div className="filter blur-sm">
                      <div className="flex space-x-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Skills</div>
                          <div className="text-sm font-medium">72%</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Experience</div>
                          <div className="text-sm font-medium">65%</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Keywords</div>
                          <div className="text-sm font-medium">59%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Progress bar with lock icon */}
                <div className="relative h-5 w-full bg-muted rounded-full overflow-hidden mb-2">
                  <div 
                    className="absolute h-full bg-primary/20 rounded-full" 
                    style={{ width: '68%' }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LockIcon className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                
                <Button variant="link" size="sm" className="mt-1 h-7 px-0 text-primary">
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