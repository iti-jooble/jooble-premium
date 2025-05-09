import { z } from "zod";

// CV types
export const personalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  website: z.string().url().optional(),
  linkedin: z.string().url().optional(),
});

export const skillSchema = z.object({
  name: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  field: z.string().optional(),
  startYear: z.string(),
  endYear: z.string().optional().nullable(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  startYear: z.string(),
  endYear: z.string().nullable(),
  description: z.string(),
  isCurrent: z.boolean(),
});

export const cvUserInfoSchema = z.object({
  personalInfo: personalInfoSchema.partial(),
  summary: z.string().optional(),
  skills: z.array(skillSchema),
  education: z.array(educationSchema),
  experience: z.array(experienceSchema),
});

export const cvSchema = z.object({
  id: z.number(),
  title: z.string(),
  score: z.number(),
  source: z.number(),
  dateCreated: z.string(),
  userInfo: cvUserInfoSchema,
  templateId: z.number(),
});

export type CV = z.infer<typeof cvSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type CvUserInfo = z.infer<typeof cvUserInfoSchema>;
