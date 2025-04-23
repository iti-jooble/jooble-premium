import {
  CvUserInfo,
  PersonalInfo,
  experience,
  Education,
  Skill,
} from "@shared/schema";

interface SectionScores {
  personalInfo: number;
  experience: number;
  education: number;
  skills: number;
  summary: number;
}

/**
 * Calculate the fullness score of a CV based on completeness of different sections
 * @param cv The CV object to calculate score for
 * @returns A number between 0 and 100 representing completeness percentage
 */
export function calculateCvScore(cv: CvUserInfo): number {
  if (!cv) return 0;

  const sectionWeights: SectionScores = {
    personalInfo: 30, // Most important section
    experience: 30, // Equally important
    education: 15,
    skills: 15,
    summary: 10,
  };

  // Calculate personal info score (30%)
  const personalInfoScore =
    calculatePersonalInfoScore(cv.personalInfo) * sectionWeights.personalInfo;

  // Calculate work experience score (30%)
  const experienceScore =
    calculateexperienceScore(cv.experience) *
    sectionWeights.experience;

  // Calculate education score (15%)
  const educationScore =
    calculateEducationScore(cv.education) * sectionWeights.education;

  // Calculate skills score (15%)
  const skillsScore = calculateSkillsScore(cv.skills) * sectionWeights.skills;

  // Calculate summary score (10%)
  const summaryScore =
    calculateSummaryScore(cv.summary) * sectionWeights.summary;

  // Calculate total score (0-100)
  const totalScore = Math.round(
    personalInfoScore +
      experienceScore +
      educationScore +
      skillsScore +
      summaryScore,
  );

  return Math.min(100, Math.max(0, totalScore));
}

/**
 * Calculate completeness of personal info section (0-1)
 */
function calculatePersonalInfoScore(
  personalInfo: CvUserInfo["personalInfo"],
): number {
  if (!personalInfo) return 0;

  const requiredFields = ["firstName", "lastName", "email"];

  const optionalFields = ["phone", "city", "country", "website", "linkedin"];

  let score = 0;
  let fieldsCount = 0;

  // Required fields count more toward the score
  requiredFields.forEach((field) => {
    if (personalInfo[field as keyof PersonalInfo]) {
      score += 0.2;
      fieldsCount++;
    }
  });

  // Optional fields add bonus points
  optionalFields.forEach((field) => {
    if (personalInfo[field as keyof PersonalInfo]) {
      score += 0.05;
      fieldsCount++;
    }
  });

  // Bonus for having all required fields filled
  if (fieldsCount === requiredFields.length + optionalFields.length) {
    score += 0.15; // Bonus for completeness
  }

  return Math.min(1, score);
}

/**
 * Calculate completeness of work experience section (0-1)
 */
function calculateexperienceScore(
  experiences: CvUserInfo["experience"],
): number {
  if (!experiences || experiences.length === 0) return 0;

  // Base score for having any work experience
  let score = 0.2;

  // Additional score based on number of experiences (max 3)
  score += Math.min(experiences.length, 3) * 0.15;

  // Check completeness of each experience
  const completenessSum = experiences.slice(0, 3).reduce((sum, exp) => {
    let expScore = 0;

    // Check if key fields are filled
    if (exp.company) expScore += 0.2;
    if (exp.position) expScore += 0.2;
    if (exp.startYear) expScore += 0.2;
    if (exp.description && exp.description.length >= 20) expScore += 0.4;

    return sum + expScore;
  }, 0);

  // Average completeness of experiences
  const avgCompleteness =
    experiences.length > 0
      ? completenessSum / Math.min(experiences.length, 3)
      : 0;

  // Add completeness score
  score += avgCompleteness * 0.35;

  return Math.min(1, score);
}

/**
 * Calculate completeness of education section (0-1)
 */
function calculateEducationScore(educations?: Education[]): number {
  if (!educations || educations.length === 0) return 0;

  // Base score for having any education
  let score = 0.4;

  // Additional score based on number of educations (max 2)
  score += Math.min(educations.length, 2) * 0.15;

  // Check completeness of each education entry
  const completenessSum = educations.slice(0, 2).reduce((sum, edu) => {
    let eduScore = 0;

    // Check if key fields are filled
    if (edu.school) eduScore += 0.25;
    if (edu.degree) eduScore += 0.25;
    if (edu.startYear) eduScore += 0.25;
    if (edu.field) eduScore += 0.25;

    return sum + eduScore;
  }, 0);

  // Average completeness of education entries
  const avgCompleteness =
    educations.length > 0
      ? completenessSum / Math.min(educations.length, 2)
      : 0;

  // Add completeness score
  score += avgCompleteness * 0.3;

  return Math.min(1, score);
}

/**
 * Calculate completeness of skills section (0-1)
 */
function calculateSkillsScore(skills?: Skill[]): number {
  if (!skills || skills.length === 0) return 0;

  // Minimum threshold for a decent skills section
  const minSkills = 3;
  const optimalSkills = 8;

  // Calculate score based on number of skills
  let score = Math.min(skills.length / optimalSkills, 1) * 0.7;

  // Bonus for having ratings
  const hasRatings = skills.some((skill) => skill.level);
  if (hasRatings) {
    score += 0.3;
  }

  // Minimum threshold
  if (skills.length >= minSkills) {
    score = Math.max(score, 0.5);
  }

  return Math.min(1, score);
}

/**
 * Calculate completeness of summary section (0-1)
 */
function calculateSummaryScore(summary?: string): number {
  if (!summary) return 0;

  const minLength = 50;
  const optimalLength = 300;

  // No summary
  if (summary.length === 0) return 0;

  // Very short summary
  if (summary.length < minLength) return 0.3;

  // Calculate score based on length up to optimal
  const lengthScore = Math.min(summary.length / optimalLength, 1) * 0.7;

  // Base score for having any summary
  const baseScore = 0.3;

  return Math.min(1, baseScore + lengthScore);
}

/**
 * Get a textual description of the CV score
 */
export function getCvScoreDescription(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 50) return "Average";
  if (score >= 30) return "Basic";
  return "Incomplete";
}
