import { v4 as uuidv4 } from "uuid";

// Import our application types
import {
  PersonalInfo,
  Education,
  Skill,
  WorkExperience,
} from "../types/state/cvBuilder.types";

// Import external API types
import {
  ICvJsonModelApi,
  IPersonalInfoApi,
  IWorkPlaceApi,
  IEducationPlaceApi,
  CvSource,
  IExperienceApi,
  IEducationApi,
  ICareerObjectiveApi,
} from "../types/api/cvBuilder.types";

/**
 * Converts our app's PersonalInfo type to the external API's IPersonalInfoApi type
 */
export function convertPersonalInfoToApi(
  personalInfo: Partial<PersonalInfo>,
): IPersonalInfoApi {
  return {
    fullName: personalInfo.fullName,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    phone: personalInfo.phone,
    email: personalInfo.email,
    city: personalInfo.city,
    country: personalInfo.country,
    countryIso: personalInfo.countryCode,
    yearOfBirth: personalInfo.birthYear,
  };
}

/**
 * Converts our app's WorkExperience type to the external API's IWorkPlaceApi type
 */
export function convertWorkExperienceToApi(
  experience: WorkExperience,
): IWorkPlaceApi {
  return {
    id: experience.id || uuidv4(),
    position: experience.position,
    company: experience.company,
    period: `${experience.startYear} - ${experience.endYear || "Present"}`,
    startYear: experience.startYear,
    endYear: experience.endYear || "Present",
    responsibilities: experience.description,
    isStillWorking: experience.isCurrent,
  };
}

/**
 * Converts our app's Education type to the external API's IEducationPlaceApi type
 */
export function convertEducationToApi(
  education: Education,
): IEducationPlaceApi {
  return {
    id: education.id || uuidv4(),
    educationLevel: education.degree,
    admissionYear: education.startYear,
    nameOfInstitution: education.school,
    specialty: education.field,
    graduationYear: education.endYear || "Present",
  };
}

/**
 * Converts our app's Skill type to a string for the external API
 */
export function convertSkillsToApi(skills: Skill[]): string {
  return skills.map((skill) => skill.name).join(", ");
}

/**
 * Converts our app's Skill array to a skill set array for the external API
 */
export function convertSkillsToSkillSet(skills: Skill[]): string[] {
  return skills.map((skill) => skill.name);
}

/**
 * Converts our app's data model to the external API's ICvJsonModelApi
 */
export function convertToCvJsonModel(data: {
  personalInfo: Partial<PersonalInfo>;
  summary?: string;
  skills?: Skill[];
  education?: Education[];
  workExperience?: WorkExperience[];
  buildCvId: string;
  templateId?: number;
}): ICvJsonModelApi {
  const {
    personalInfo,
    summary,
    skills = [],
    education = [],
    workExperience = [],
    buildCvId,
    templateId = 1,
  } = data;

  const skillsString = convertSkillsToApi(skills);
  const skillSet = convertSkillsToSkillSet(skills);

  const careerObjective: ICareerObjectiveApi = {
    position: personalInfo.title || null,
    skills: skillsString || null,
    skillSet: skillSet,
  };

  const experienceApi: IExperienceApi = {
    workPlaces: workExperience.map(convertWorkExperienceToApi),
    hasExperience: workExperience.length > 0,
    professionalSkills: skillsString,
    careerObjective: careerObjective,
  };

  const educationApi: IEducationApi = {
    educationPlaces: education.map(convertEducationToApi),
    hasEducation: education.length > 0,
  };

  return {
    jdpId: null,
    buildCvId,
    step: 4, // Assuming 4 is the "complete" step
    source: CvSource.MANUAL,
    referrer: window.location.href,
    personalInfo: convertPersonalInfoToApi(personalInfo),
    careerObjective,
    experience: experienceApi,
    education: educationApi,
    languages: [],
    templateId,
    summary: summary || null,
    recommendJobsByCVConsent: true,
    sendCVImprovementTipsConsent: true,
  };
}

/**
 * Converts the external API's IWorkPlaceApi to our app's WorkExperience type
 */
export function convertApiToWorkExperience(
  workPlace: IWorkPlaceApi,
): WorkExperience {
  return {
    id: workPlace.id || uuidv4(),
    company: workPlace.company,
    position: workPlace.position,
    startYear: workPlace.startYear,
    endYear: workPlace.isStillWorking ? null : workPlace.endYear,
    description: workPlace.responsibilities,
    isCurrent: workPlace.isStillWorking,
  };
}

/**
 * Converts the external API's IEducationPlaceApi to our app's Education type
 */
export function convertApiToEducation(
  educationPlace: IEducationPlaceApi,
): Education {
  return {
    id: educationPlace.id || uuidv4(),
    school: educationPlace.nameOfInstitution || "",
    degree: educationPlace.educationLevel || "",
    field: educationPlace.specialty,
    startYear: educationPlace.admissionYear || "",
    endYear:
      educationPlace.graduationYear === "Present"
        ? null
        : educationPlace.graduationYear,
    description: "",
    isCurrent: educationPlace.graduationYear === "Present",
  };
}

/**
 * Converts the external API's skill string to our app's Skill array
 */
export function convertApiToSkills(skillsString: string | null): Skill[] {
  if (!skillsString) return [];

  return skillsString
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0)
    .map((skill) => ({
      id: uuidv4(),
      name: skill,
      level: "intermediate",
    }));
}

/**
 * Converts the external API's ICvJsonModelApi to our app's data model
 */
export function convertFromCvJsonModel(apiModel: ICvJsonModelApi) {
  const workExperience = apiModel.experience.workPlaces.map(
    convertApiToWorkExperience,
  );
  const education = apiModel.education.educationPlaces.map(
    convertApiToEducation,
  );

  let skills: Skill[] = [];
  if (
    apiModel.careerObjective.skillSet &&
    apiModel.careerObjective.skillSet.length > 0
  ) {
    skills = apiModel.careerObjective.skillSet.map((skill) => ({
      id: uuidv4(),
      name: skill,
      level: "intermediate",
    }));
  } else if (apiModel.careerObjective.skills) {
    skills = convertApiToSkills(apiModel.careerObjective.skills);
  }

  const personalInfo: Partial<PersonalInfo> = {
    fullName: apiModel.personalInfo.fullName,
    firstName: apiModel.personalInfo.firstName,
    lastName: apiModel.personalInfo.lastName,
    phone: apiModel.personalInfo.phone,
    email: apiModel.personalInfo.email,
    city: apiModel.personalInfo.city,
    country: apiModel.personalInfo.country,
    countryCode: apiModel.personalInfo.countryIso,
    birthYear: apiModel.personalInfo.yearOfBirth,
    title: apiModel.careerObjective.position || undefined,
  };

  return {
    personalInfo,
    summary: apiModel.summary,
    skills,
    education,
    workExperience,
    templateId: apiModel.templateId,
  };
}
