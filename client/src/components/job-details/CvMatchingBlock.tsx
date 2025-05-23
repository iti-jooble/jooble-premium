import React from "react";
import { Button } from "@/components/ui/button";
import { ScoreCircle } from "@/components/ui/score-circle";
import { Card } from "@/components/ui/card";

const CvMatchingBlock: React.FC<{ onApply: () => void }> = ({ onApply }) => {
  return (
    <Card className="p-6 flex flex-col items-center">
      <ScoreCircle score={31} />

      {/* Heading */}
      <h3 className="font-bold text-center mb-1">Response Chance</h3>
      <h2 className="font-bold text-2xl text-center mb-4">Without Fitly</h2>

      {/* Description */}
      <p className="text-gray-600 text-sm text-center mb-8">
        You've got potential, but your resume isn't selling it. Let's refine it
        to really match what this job needs.
      </p>

      {/* Fix Categories */}
      <div className="grid grid-cols-3 w-full gap-2 mb-8">
        {/* Must Fix */}
        <div className="col-span-1 bg-red/10 rounded-t-xl rounded-b-sm py-3 px-2 relative">
          <div className="text-center text-[10px] font-bold">MUST FIX</div>
          <div className="text-center text-lg font-bold mt-1">3</div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-red rounded-b-sm"></div>
        </div>

        {/* Should Fix */}
        <div className="col-span-1 bg-orange/10 rounded-t-xl rounded-b-sm py-3 px-2 relative">
          <div className="text-center text-[10px] font-bold">SHOULD FIX</div>
          <div className="text-center text-lg font-bold mt-1">4</div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange rounded-b-sm"></div>
        </div>

        {/* Minor Fix */}
        <div className="col-span-1 bg-gray/10 rounded-t-xl rounded-b-sm py-3 px-2 relative">
          <div className="text-center text-[10px] font-bold">MINOR FIX</div>
          <div className="text-center text-lg font-bold mt-1">2</div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray rounded-b-sm"></div>
        </div>
      </div>

      {/* Fix Resume Button */}
      <Button className="w-full mb-4" onClick={onApply}>
        Fix resume & Apply
      </Button>

      {/* Show Issues Button */}
      <Button variant="outline" className="w-full font-bold" onClick={onApply}>
        Show issues
      </Button>

      {/* Footer Text */}
      <p className="text-muted-foreground text-sm text-center mt-6">
        We'll tailor your resume before applying and increase your chances.
      </p>
    </Card>
  );
};

export default CvMatchingBlock;
