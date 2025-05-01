import { JobCard, JobCardProps } from "./JobCard";

interface JobListingsProps {
  jobs: JobCardProps["job"][];
  selectedJobId: string | null;
  onSelectJob: (job: JobCardProps["job"]) => void;
}

export const JobListings = ({
  jobs,
  selectedJobId,
  onSelectJob,
}: JobListingsProps) => {
  return (
    <div className="md:col-span-2">
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
