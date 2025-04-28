import {
  MapPinIcon,
  BriefcaseIcon,
  DollarSignIcon,
  ClockIcon,
  CalendarIcon,
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
  onClick: (job: JobCardProps["job"]) => void;
}

export const JobCard = ({ job, isSelected, onClick }: JobCardProps) => {
  return (
    <div
      className={`bg-white rounded-xl mb-3 cursor-pointer transition-all shadow-sm hover:shadow-md ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => onClick(job)}
    >
      <div className="p-4 grid grid-cols-12 gap-4">
        {/* Job Content */}
        <div className="col-span-9">
          {/* Company info and posted date */}
          <div className="flex items-center text-sm mb-1">
            <div className="w-10 h-10 rounded-lg mr-4 bg-green-100 flex items-center justify-center text-muted-foreground text-green-800">
              {job.company.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">{job.company}</span>
              <span className="text-sm text-muted-foreground">
                Posted {job.posted}
              </span>
            </div>
          </div>

          {/* Job title */}
          <h3 className="font-bold text-primary-blue text-lg">{job.title}</h3>

          {/* Job details */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
            <div className="flex items-center">
              <DollarSignIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <BriefcaseIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
              <span>5+ years exp</span>
            </div>
          </div>
        </div>

        {/* Match Score */}
        <div className="col-span-3 flex justify-center items-end flex-col">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-bold">94</div>
                <div className="text-xs text-muted-foreground">/ 100</div>
              </div>
            </div>
            {/* Blue circular progress ring */}
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 48 48"
            >
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#e5e5e5"
                strokeWidth="4"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#014EFE"
                strokeWidth="4"
                strokeDasharray="125.6"
                strokeDashoffset="7.54"
              />
            </svg>
          </div>
          <div className="text-center text-xs font-bold mt-2">
            <div>Perfect match</div>
          </div>
        </div>
      </div>
    </div>
  );
};
