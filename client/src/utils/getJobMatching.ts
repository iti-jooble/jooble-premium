import { Job } from "@shared/schema";
import {
  getWorkFormatInText,
  getLocationTypeInText,
  getSeniorityLevelInText,
} from "./jobDataTranformers";

const enum MatchingScore {
  Perfect,
  Great,
  Good,
  Average,
  BelowAverage,
  Poor,
}

const matchingScoreData = {
  [MatchingScore.Perfect]: {
    title: "Fitly Perfect!",
    description: "Spot-on! This is your ideal fit — go for it.",
    styles: "bg-primary-button shadow-primary-box",
  },
  [MatchingScore.Great]: {
    title: "Great fit!",
    description: "This role matches your preferences really well",
    styles: "bg-primary-button",
  },
  [MatchingScore.Good]: {
    title: "Good fit",
    description: "Pretty aligned! This could be a strong opportunity",
    styles: "bg-primary-button",
  },
  [MatchingScore.Average]: {
    title: "Decent fit",
    description: "There's a fair match. Worth checking out if you're flexible",
    styles: "bg-primary-button",
  },
  [MatchingScore.BelowAverage]: {
    title: "Weak fit",
    description: "Some things line up, but you'd need to compromise a lot",
    styles: "bg-primary-button",
  },
  [MatchingScore.Poor]: {
    title: "Poor fit",
    description: "A few overlaps, but mostly a missmatch",
    styles: "bg-primary-button",
  },
};

export const getJobMatchingScore = (matching?: Job["matching"]) => {
  if (!matching) {
    return null;
  }

  const score = matching.originalMatchingScore
    ? (matching.originalMatchingScore * 9.99).toFixed(1)
    : (Math.random() * 2 + 8).toFixed(1);

  const numericScore = Number(score);
  let matchingScore;

  if (numericScore >= 9) {
    matchingScore = MatchingScore.Perfect;
  } else if (numericScore >= 8) {
    matchingScore = MatchingScore.Great;
  } else if (numericScore >= 7) {
    matchingScore = MatchingScore.Good;
  } else if (numericScore >= 5) {
    matchingScore = MatchingScore.Average;
  } else if (numericScore >= 4) {
    matchingScore = MatchingScore.BelowAverage;
  } else {
    matchingScore = MatchingScore.Poor;
  }

  return {
    score: Number(score) >= 10 ? "10" : score,
    ...matchingScoreData[matchingScore],
  };
};

type MatchingValueMap = {
  [K in MatchingKeys]: Job["matching"][K];
};

type MatchingKeys = Exclude<keyof Job["matching"], "originalMatchingScore">;

const mathingOrder: MatchingKeys[] = [
  "salary",
  "locationType",
  "location",
  "seniorityLevel",
  "workFormat",
  "experienceYears",
];

export const getJobDataMatching = (matching?: Job["matching"]) => {
  if (!matching) {
    return null;
  }

  return Object.entries(matching)
    .filter(([key]) => mathingOrder.includes(key as MatchingKeys))
    .sort(
      (a, b) =>
        mathingOrder.indexOf(a[0] as MatchingKeys) -
        mathingOrder.indexOf(b[0] as MatchingKeys),
    )
    .map(([key, value]) => ({
      key,
      value: getJobDataMatchingValue(
        key as MatchingKeys,
        value as MatchingValueMap[MatchingKeys],
      ),
    }));
};

const getJobDataMatchingValue = (
  key: MatchingKeys,
  value: MatchingValueMap[MatchingKeys],
) => {
  if (key === "experienceYears") {
    return {
      actual: `${value.actual}+ years exp`,
      expected: `${value.expected} years exp`,
      score: value.score,
    };
  }

  if (key === "workFormat") {
    return {
      actual: getWorkFormatInText(value.actual),
      expected: getWorkFormatInText(value.expected),
      score: value.score,
    };
  }

  if (key === "locationType") {
    return {
      actual: getLocationTypeInText(value.actual),
      expected: getLocationTypeInText(value.expected),
      score: value.score,
    };
  }

  if (key === "seniorityLevel") {
    return {
      actual: getSeniorityLevelInText(value.actual),
      expected: getSeniorityLevelInText(value.expected),
      score: value.score,
    };
  }

  return value;
};
