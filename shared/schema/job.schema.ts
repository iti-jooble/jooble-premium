import { z } from "zod";

export const matchingSchema = z.object({
  originalMatchingScore: z.number(),
  title: z.boolean(),
  location: z.boolean(),
  jobType: z.boolean(),
  salary: z.boolean(),
  locationType: z.boolean(),
  seniorityLevel: z.boolean(),
  experienceYears: z.boolean(),
});

export const jobCompanySchema = z.object({
  link: z.string().optional(),
  name: z.string(),
  logoUrl: z.string().optional(),
  isVerified: z.boolean(),
});

export const jobLocationSchema = z.object({
  link: z.string().optional(),
  name: z.string(),
});

export const fitlyJobCardSchema = z.object({
  basicInfo: z.object({
    salaryLevel: z.object({
      max: z.number(),
      min: z.number(),
      period: z.string(),
      currency: z.string(),
      salarySource: z.string(),
    }),
    seniorityLevel: z.string(),
    workFormat: z.string(),
    locationType: z.string(),
    yearsOfExperience: z.number(),
  }),
});

export const jobSchema = z.object({
  uid: z.string(),
  url: z.string(),
  isNew: z.boolean(),
  position: z.string(),
  company: jobCompanySchema.optional(),
  location: jobLocationSchema,
  jobType: z.number().optional(),
  salary: z.string().optional(),
  estimatedSalary: z.string().optional(),
  dateCaption: z.string(),
  fullContent: z.string().optional(),
  originalDescription: z.string(),
  matching: matchingSchema.optional(),
  fitlyJobCard: fitlyJobCardSchema.optional(),
});

export type Job = z.infer<typeof jobSchema>;
