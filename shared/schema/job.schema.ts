import { z } from "zod";

export const getMatchingDetailsSchema = (
  expected: z.ZodArray<z.ZodString> | z.ZodString,
) =>
  z.object({
    actual: z.string(),
    expected,
    score: z.number(),
  });

export const matchingSchema = z.object({
  originalMatchingScore: z.number(),
  location: getMatchingDetailsSchema(z.string()),
  workFormat: getMatchingDetailsSchema(z.array(z.string())),
  salary: getMatchingDetailsSchema(z.string()),
  locationType: getMatchingDetailsSchema(z.array(z.string())),
  seniorityLevel: getMatchingDetailsSchema(z.array(z.string())),
  experienceYears: getMatchingDetailsSchema(z.string()),
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

export const jobDescriptionSchema = z.object({
  summary: z.string(),
  companyOffers: z.string(),
  qualifications: z.object({
    skills: z.array(z.string()),
    requiredQualifications: z.array(z.string()),
    preferredQualifications: z.array(z.string()),
  }),
  responsibilities: z.array(z.string()),
  companyDescription: z.string(),
});

export const jobBasicInfoSchema = z.object({
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
});

export const fitlyJobCardSchema = z.object({
  basicInfo: jobBasicInfoSchema.optional(),
  description: jobDescriptionSchema.optional(),
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
  matching: matchingSchema,
  fitlyJobCard: fitlyJobCardSchema.optional(),
});

export type Job = z.infer<typeof jobSchema>;

export type JobMatching = z.infer<typeof matchingSchema>;

export type JobInferredDescription = z.infer<typeof jobDescriptionSchema>;

export type JobInferredBasicInfo = z.infer<typeof jobBasicInfoSchema>;
