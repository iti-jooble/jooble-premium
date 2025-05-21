import { cn } from "@/lib/utils";

const ScoreCircle = ({
  score,
  className,
}: {
  score: number;
  className?: string;
}) => (
  <div className={cn("relative w-32 h-32 mx-auto mb-6", className)}>
    {/* <div className="absolute inset-0 flex items-center justify-center bg-primary-gradient z-[1] rounded-full"></div> */}
    <div className="absolute inset-0 flex items-center justify-center z-[3]">
      <span className="text-2xl font-bold">{score}%</span>
    </div>
    <svg className="w-full h-full z-[2]" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#E8E8E8"
        strokeWidth="10"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={score > 80 ? "#554DE4" : score > 60 ? "#DE7F36" : "#BB374B"}
        strokeWidth="10"
        strokeDasharray={`${(2 * Math.PI * 45 * score) / 100} ${(2 * Math.PI * 45 * (100 - score)) / 100}`}
        strokeDashoffset={`${2 * Math.PI * 45 * 0.25}`}
      />
    </svg>
  </div>
);

export { ScoreCircle };
