import { Job } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { JobCard } from "./JobCard";
import { JobListingSkeleton } from "./Skeletons";

interface JobListingsProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onLoadMore?: () => void;
  isLoading?: boolean;
  isInitialized?: boolean;
}

export const JobListings = ({
  jobs,
  onSelectJob,
  onLoadMore,
  isLoading,
  isInitialized,
}: JobListingsProps) => {
  if (isLoading && !isInitialized) {
    return <JobListingSkeleton />;
  }

  return (
    <div className="md:col-span-2">
      <div className="space-y-2 min-h-[80%] relative">
        {isLoading && (
          <div className="absolute z-10 inset-0 bg-white bg-opacity-60 flex justify-center rounded-xl items-center" />
        )}
        {jobs.map((job) => (
          <JobCard key={job.uid} job={job} onClick={onSelectJob} />
        ))}
      </div>
      {onLoadMore && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={onLoadMore}
            isLoading={isLoading}
            className="px-4 py-2"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
