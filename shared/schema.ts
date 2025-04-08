import { z } from "zod";

// User types
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email().optional(),
  fullName: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

// CV types
export const personalInfoSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  linkedin: z.string().url().optional(),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  field: z.string().optional(),
  startYear: z.string(),
  endYear: z.string().nullable(),
  description: z.string(),
  isCurrent: z.boolean(),
});

export const workExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  startYear: z.string(),
  endYear: z.string().nullable(),
  description: z.string(),
  isCurrent: z.boolean(),
});

export const cvSchema = z.object({
  id: z.string(),
  title: z.string(),
  score: z.number(),
  dateCreated: z.string(),
  personalInfo: personalInfoSchema.partial(),
  summary: z.string().optional(),
  skills: z.array(skillSchema).optional(),
  education: z.array(educationSchema).optional(),
  workExperience: z.array(workExperienceSchema).optional(),
});

export type CV = z.infer<typeof cvSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Education = z.infer<typeof educationSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
