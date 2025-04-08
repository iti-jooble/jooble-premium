import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPinIcon, 
  BriefcaseIcon, 
  DollarSignIcon, 
  ClockIcon 
} from "lucide-react";

export interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    isNew?: boolean;
  };
  isSelected: boolean;
  onClick: (job: JobCardProps['job']) => void;
}

export const JobCard = ({ job, isSelected, onClick }: JobCardProps) => {
  return (
    <Card 
      className={`shadow-sm border hover:border-primary/40 cursor-pointer transition-all ${
        isSelected ? 'border-primary' : 'border-border/40'
      }`}
      onClick={() => onClick(job)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <div className="text-muted-foreground text-sm">{job.company}</div>
          </div>
          {job.isNew && (
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
              New
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-3">
          <div className="flex items-center">
            <MapPinIcon className="h-3 w-3 mr-1" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <BriefcaseIcon className="h-3 w-3 mr-1" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center">
            <DollarSignIcon className="h-3 w-3 mr-1" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center ml-auto">
            <ClockIcon className="h-3 w-3 mr-1" />
            <span>{job.posted}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};