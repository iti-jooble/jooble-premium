export const FEATURES = [
  { text: "Jobs from <strong>all over the web</strong> in 1 place" },
  { text: "<strong>Unlimited</strong> AI-tailored resumes" },
  { text: "<strong>Unlimited</strong> AI-tailored cover letters" },
  { text: "Smart <strong>Match Score</strong> for every job" },
  { text: "Resume <strong>Fit Score</strong> for every job" },
  { text: "Instant PDF downloads" },
  { text: "AI Resume Builder" },
  { text: "Advanced job filters" },
];

export const INTERVAL_MAP: {
  [key: number]: {
    text: string;
    days: number;
  };
} = {
  0: { text: "per week", days: 7 },
  1: { text: "per month", days: 30 },
  2: { text: "per 3 months", days: 90 },
  3: { text: "per year", days: 365 },
};
