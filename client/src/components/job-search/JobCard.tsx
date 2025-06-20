import React from "react";
import { Job } from "@shared/schema";
import {
  MapPinIcon,
  BriefcaseIcon,
  Building2Icon,
  CalendarIcon,
  WalletIcon,
  TrophyIcon,
} from "lucide-react";
import getColorByName from "@/utils/getColorByName";
import getAcronym from "@/utils/getAcronym";
import { getJobMatchingScore } from "@/utils/getJobMatching";
import {
  getWorkFormatInText,
  getLocationTypeInText,
  getSeniorityLevelInText,
} from "@/utils/jobDataTranformers";

export interface JobCardProps {
  job: Job;
  isSelected?: boolean;
  onClick: (job: Job) => void;
}

const colorMap = {
  red: "bg-red/20",
  blue: "bg-blue-100",
  green: "bg-green/20",
  yellow: "bg-yellow-100",
  purple: "bg-purple-100",
  pink: "bg-pink-100",
  orange: "bg-orange/20",
  gray: "bg-gray/20",
};

export const JobCard = React.memo(
  ({ job, isSelected, onClick }: JobCardProps) => {
    const matchingScore = job.matching
      ? getJobMatchingScore(job.matching)
      : null;

    const isSalaryEstimated =
      !job.salary && (job.estimatedSalary || job.matching?.salary.actual);

    return (
      <div
        className={`bg-white rounded-xl mb-3 cursor-pointer transition-all shadow-sm hover:shadow-md ${
          isSelected ? "ring-2 ring-primary" : ""
        }`}
        onClick={() => onClick(job)}
      >
        <div className="grid grid-cols-12 gap-4">
          {/* Job Content */}
          <div className="col-span-9 p-6">
            {/* Company info and posted date */}
            <div className="flex items-center text-sm mb-2">
              <div
                className={`w-10 h-10 rounded-lg mr-4 flex items-center justify-center text-muted-foreground ${colorMap[getColorByName(job.company?.name)]} font-bold`}
              >
                {getAcronym(job.company?.name)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{job.company?.name}</span>
                <span className="text-sm text-muted-foreground">
                  Posted {job.dateCaption}
                </span>
              </div>
            </div>

            {/* Job title */}
            <h3 className="font-bold text-lg">{job.position}</h3>

            {/* Job details */}
            <div className="grid grid-cols-7 gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
              <div className="flex items-center col-span-3 pr-2">
                <WalletIcon className="h-4 w-4 mr-1 min-w-4 text-muted-foreground/70" />
                <span className={`${isSalaryEstimated && "italic"}`}>
                  {job.salary ||
                    job.estimatedSalary ||
                    job.matching?.salary.actual ||
                    "Unknown"}
                  {isSalaryEstimated ? " (est.)" : ""}
                </span>
              </div>
              <div className="flex items-center col-span-2 pr-2">
                <BriefcaseIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                <span>
                  {getWorkFormatInText(
                    job.fitlyJobCard?.basicInfo?.workFormat,
                  ) || "Unknown"}
                </span>
              </div>
              <div className="flex items-center col-span-2">
                <TrophyIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                <span>
                  {getSeniorityLevelInText(
                    job.fitlyJobCard?.basicInfo?.seniorityLevel,
                  ) || "Unknown"}
                </span>
              </div>
              <div className="flex items-center col-span-3 pr-2">
                <MapPinIcon className="h-4 w-4 mr-1 min-w-4 text-muted-foreground/70" />
                <span>{job.location.name}</span>
              </div>
              <div className="flex items-center col-span-2 pr-2">
                <Building2Icon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                <span>
                  {getLocationTypeInText(
                    job.fitlyJobCard?.basicInfo?.locationType,
                  ) ?? "Unknown"}
                </span>
              </div>
              <div className="flex items-center col-span-2">
                <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                <span>
                  {job.fitlyJobCard?.basicInfo?.yearsOfExperience
                    ? `${job.fitlyJobCard?.basicInfo.yearsOfExperience}+ years exp`
                    : "Unknown"}
                </span>
              </div>
            </div>
          </div>

          {/* Match Score */}
          <div className="col-span-3 flex justify-center items-center flex-col p-6 border-l border-gray-200">
            {matchingScore && (
              <>
                <div
                  className={`w-14 h-14 flex items-center justify-center text-2xl font-bold text-white rounded-xl ${matchingScore.styles}`}
                >
                  {matchingScore.score}
                </div>
                <div className="text-center text-xs font-bold mt-4">
                  {matchingScore.title}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  },
  (oldProps, newProps) => {
    return (
      oldProps.job.uid === newProps.job.uid &&
      oldProps.isSelected === newProps.isSelected &&
      oldProps.job.matching?.originalMatchingScore ===
        newProps.job.matching?.originalMatchingScore
    );
  },
);
