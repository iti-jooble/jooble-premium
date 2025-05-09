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

export interface JobCardProps {
  job: Job;
  isSelected?: boolean;
  onClick: (job: Job) => void;
}

const colorMap = {
  red: "bg-red-100",
  blue: "bg-blue-100",
  green: "bg-green-100",
  yellow: "bg-yellow-100",
  purple: "bg-purple-100",
  pink: "bg-pink-100",
  orange: "bg-orange-100",
  gray: "bg-gray-100",
};

export const JobCard = React.memo(
  ({ job, isSelected, onClick }: JobCardProps) => {
    const score = job.matching?.score || Math.floor(Math.random() * 21) + 80;

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
            <div className="flex items-center text-sm mb-1">
              <div
                className={`w-10 h-10 rounded-lg mr-4 flex items-center justify-center text-muted-foreground ${colorMap[getColorByName(job.company?.name)]} text-green-800`}
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
            <h3 className="font-bold text-primary-blue text-lg">
              {job.position}
            </h3>

            {/* Job details */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
              {(job.salary || job.estimatedSalary) && (
                <div className="flex items-center">
                  <WalletIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                  <span>{job.salary ?? job.estimatedSalary}</span>
                </div>
              )}
              {(job.jobType || job.fitlyJobCard?.basicInfo.workFormat) && (
                <div className="flex items-center">
                  <BriefcaseIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                  <span>
                    {job.jobType ?? job.fitlyJobCard?.basicInfo.workFormat}
                  </span>
                </div>
              )}
              {!!job.fitlyJobCard?.basicInfo.seniorityLevel && (
                <div className="flex items-center">
                  <TrophyIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                  <span>{job.fitlyJobCard?.basicInfo.seniorityLevel}</span>
                </div>
              )}
              {!!job.location.name && (
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                  <span>{job.location.name}</span>
                </div>
              )}
              {!!job.fitlyJobCard?.basicInfo.workLocationType && (
                <div className="flex items-center">
                  <Building2Icon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                  <span>{job.fitlyJobCard?.basicInfo.workLocationType}</span>
                </div>
              )}
              {!!job.fitlyJobCard?.basicInfo.yearsOfExperience && (
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                  <span>
                    {job.fitlyJobCard?.basicInfo.yearsOfExperience}+ years exp
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Match Score */}
          <div className="col-span-3 flex justify-center items-center flex-col p-6 border-l border-gray-200">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold">{score}</div>
                  <div className="text-xs text-muted-foreground">/ 100</div>
                </div>
              </div>
              {/* Dynamic circular progress ring */}
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
                  strokeWidth="4"
                  strokeDasharray="125.6"
                  strokeDashoffset={`${125.6 - 125.6 * (score / 100)}`}
                  stroke={`${
                    score >= 90
                      ? "#014EFE"
                      : score >= 70
                        ? "#ADD8E6"
                        : score >= 50
                          ? "#FFD580"
                          : score >= 40
                            ? "#FF6347"
                            : "#808080"
                  }`}
                />
              </svg>
            </div>
            <div className="text-center text-xs font-bold mt-2">
              {(score >= 90 && <div>Perfect match</div>) ||
                (score >= 70 && <div>Good match</div>) ||
                (score >= 50 && <div>Average match</div>) ||
                (score >= 40 && <div>Below average match</div>) || (
                  <div>Poor match</div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  (oldProps, newProps) => {
    return (
      oldProps.job.uid === newProps.job.uid &&
      oldProps.isSelected === newProps.isSelected
    );
  },
);
