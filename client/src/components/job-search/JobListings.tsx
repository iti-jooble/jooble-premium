import { Job } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { JobCard } from "./JobCard";

interface JobListingsProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onLoadMore?: () => void;
  isLoading?: boolean;
}

export const JobListings = ({
  jobs,
  onSelectJob,
  onLoadMore,
  isLoading,
}: JobListingsProps) => {
  return (
    <div className="md:col-span-2">
      <div className="space-y-2 min-h-[80%] relative">
        {isLoading && (
          <div className="absolute z-10 inset-0 bg-white bg-opacity-60 flex justify-center rounded-xl items-center">
            <div className="flex flex-col items-center justify-center text-lg text-center font-semibold w-[75%]">
              <Loader2 className="h-10 w-10 mb-2 text-primary animate-spin relative" />
              Our AI is hard at work preparing your personalized job listings...
            </div>
          </div>
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
