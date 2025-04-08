import { Badge } from "@/components/ui/badge";
import { JobCard, JobCardProps } from "./JobCard";

interface JobListingsProps {
  jobs: JobCardProps['job'][];
  selectedJobId: string | null;
  onSelectJob: (job: JobCardProps['job']) => void;
}

export const JobListings = ({ jobs, selectedJobId, onSelectJob }: JobListingsProps) => {
  return (
    <div className="lg:col-span-5">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <span>Job Listings</span>
        <Badge variant="outline" className="ml-2">
          {jobs.length} results
        </Badge>
      </h2>

      <div className="space-y-2">
        {jobs.map((job) => (
          <JobCard 
            key={job.id} 
            job={job}
            isSelected={selectedJobId === job.id}
            onClick={onSelectJob}
          />
        ))}
      </div>
    </div>
  );
};