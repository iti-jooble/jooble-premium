import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  SearchIcon, 
  MapPinIcon, 
  BriefcaseIcon, 
  DollarSignIcon, 
  StarIcon, 
  ClockIcon,
  CheckCircleIcon 
} from "lucide-react";
import { JobCardProps } from "./JobCard";

interface JobDetailProps {
  selectedJob: (JobCardProps['job'] & { description: string }) | null;
}

export const JobDetail = ({ selectedJob }: JobDetailProps) => {
  return (
    <div className="lg:col-span-7">
      {selectedJob ? (
        <Card className="shadow-sm sticky top-4 border-border/40">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
                <div className="text-muted-foreground">{selectedJob.company}</div>
              </div>
              <Button size="sm" variant="outline" className="flex items-center">
                <StarIcon className="h-4 w-4 mr-2" />
                Save Job
              </Button>
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

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="flex items-center">
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Apply Now
              </Button>
              <Button variant="outline" className="flex items-center">
                <StarIcon className="h-4 w-4 mr-2" />
                Save Job
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