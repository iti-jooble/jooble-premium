import React, { useEffect, useState } from "react";
import { ScoreCircle } from "@/components/ui/score-circle";

interface StepOneProps {
  improvementPoints?: { title: string; description: string }[];
  matching: {
    score: number;
    growth: number;
    criteria: { id: number; label: string; value: number; growth: number }[];
  };
}

const StepOne: React.FC<StepOneProps> = ({ improvementPoints, matching }) => {
  const [matchingState, setMatchingState] = useState<
    StepOneProps["matching"] | null
  >(null);

  useEffect(() => {
    setTimeout(() => {
      setMatchingState(matching);
    }, 0);
  }, []);

  const displayedMatching = matchingState ?? matching;

  return (
    <div className="flex flex-col">
      <div className="mb-8 flex flex-col items-center">
        {/* Response chance circle */}
        <ScoreCircle
          score={
            matchingState
              ? displayedMatching.score + displayedMatching.growth
              : displayedMatching.score
          }
        />

        <h3 className="text-lg font-bold">
          {displayedMatching.growth ? "New Response Chanse" : "Response Chance"}
        </h3>
        <h4 className="text-3xl font-bold mb-4">
          {displayedMatching.growth ? "With Fitly" : "Without Fitly"}
        </h4>
      </div>

      {/* Matching criteria */}
      <div className="mb-8 flex flex-wrap justify-between">
        {displayedMatching.criteria.map((criterion, index) => (
          <div key={index} className="mb-4 w-[45%]">
            <div className="flex justify-between mb-1">
              <span className="text-sm">{criterion.label}</span>
              <span className="text-sm font-bold">
                {matchingState
                  ? criterion.value + criterion.growth
                  : criterion.value}
                %
              </span>
            </div>
            <div className="h-[24px] bg-primary-background rounded-lg overflow-hidden flex relative">
              <div
                className="h-full bg-primary-button shadow-primary-box-inset rounded-lg z-10"
                style={{ width: `${criterion.value}%` }}
              />
              <div
                className="absolute h-full bg-primary-blue/60 shadow-primary-box-inset rounded-lg left-0 transition-all duration-500 ease-in]"
                style={{
                  width: `${matchingState ? criterion.value + criterion.growth : criterion.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {!improvementPoints ? (
        <div className="flex flex-col items-center mt-8">
          <h3 className="text-lg font-bold mb-1">Nothing left to fix</h3>
          <p className="text-gray-700">All issues burned 🔥</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3">Must Fix</h3>
            {improvementPoints.map((point, index) => (
              <div
                key={index}
                className="mb-4 px-4 py-3 bg-red/10 rounded-2xl flex gap-4"
              >
                <div className="w-1 rounded-full bg-[#CC2714]/50"></div>
                <div>
                  <h4 className="font-bold text-md mb-1">{point.title}</h4>
                  <p className="text-sm text-gray-700">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3">Should Fix</h3>
            {improvementPoints.map((point, index) => (
              <div
                key={index}
                className="mb-4 px-4 py-3 bg-orange/10 rounded-2xl flex gap-4"
              >
                <div className="w-1 rounded-full bg-[#DB650B]/50"></div>
                <div>
                  <h4 className="font-bold text-md mb-1">{point.title}</h4>
                  <p className="text-sm text-gray-700">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Minor Fix</h3>
            {improvementPoints.map((point, index) => (
              <div
                key={index}
                className="mb-4 px-4 py-3 bg-blue-50 rounded-2xl flex gap-4"
              >
                <div className="w-1 rounded-full bg-[#014EFE]/50"></div>
                <div>
                  <h4 className="font-bold text-md mb-1">{point.title}</h4>
                  <p className="text-sm text-gray-700">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StepOne;
