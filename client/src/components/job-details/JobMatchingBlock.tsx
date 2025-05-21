import React from "react";
import {
  getJobMatchingScore,
  getJobDataMatching,
} from "@/utils/getJobMatching";
import { XCircle, CircleCheck, CircleHelp } from "lucide-react";
import { JobMatching } from "@shared/schema";

const JobMatchingBlock: React.FC<{ matching: JobMatching }> = ({
  matching,
}) => {
  const matchingData = getJobDataMatching(matching);

  const matchingScore = getJobMatchingScore(matching);

  if (!matchingData || !matchingScore) {
    return null;
  }

  return (
    <div className="mb-3 mt-9 p-6 bg-primary-background rounded-lg overflow-hidden rounded-xl">
      <div className="flex flex-col">
        {/* Score and Title */}
        <div className="flex items-center mb-5">
          {/* Score Block */}
          <div
            className={`${matchingScore.styles} text-white text-2xl font-bold p-4 rounded-lg w-14 h-14 flex items-center justify-center mr-4`}
          >
            {matchingScore.score}
          </div>

          {/* Title and Subtitle */}
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {matchingScore.title}
            </h3>
            <p className="text-gray-500">{matchingScore.description}</p>
          </div>
        </div>

        {/* Criteria Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[0, 1].map((columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {matchingData
                ?.filter((_, index) => index % 2 === columnIndex)
                .map(({ key, value }) => (
                  <div className="flex items-start" key={key}>
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {!value.expected ? (
                        <CircleHelp className="h-6 w-6 text-[#7A899E] mr-2 flex-shrink-0" />
                      ) : value.score < 1 ? (
                        <XCircle className="h-6 w-6 text-[#BB374B] mr-2 flex-shrink-0" />
                      ) : (
                        <CircleCheck className="h-6 w-6 text-[#554DE4] mr-2 flex-shrink-0" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {value.actual}
                      </div>
                      <div className="text-sm text-gray-500">
                        Preferred: {value.expected || "Unspecified"}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobMatchingBlock;
