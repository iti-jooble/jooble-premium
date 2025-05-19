export const cvParsingSchema = {
  type: "object",
  properties: {
    cv: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Job title or main role of the candidate",
        },
        userInfo: {
          type: "object",
          properties: {
            personalInfo: {
              type: "object",
              properties: {
                firstName: { type: "string", description: "First name" },
                lastName: { type: "string", description: "Last name" },
                email: { type: "string", description: "Email address" },
                phone: { type: "string", description: "Phone number" },
                city: { type: "string", description: "City of residence" },
                country: {
                  type: "string",
                  description: "Country of residence",
                },
                website: {
                  type: "string",
                  description: "Personal website URL",
                },
                linkedin: {
                  type: "string",
                  description: "LinkedIn profile URL",
                },
              },
              required: ["firstName", "lastName", "email"],
              additionalProperties: false,
            },
            summary: {
              type: "string",
              description: "Brief professional summary",
            },
            skills: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", description: "Skill name" },
                  level: {
                    type: "string",
                    description:
                      "Skill proficiency level (e.g., expert, advanced, intermediate, beginner)",
                  },
                },
                required: ["name"],
                additionalProperties: false,
              },
            },
            education: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  school: {
                    type: "string",
                    description: "Educational institution",
                  },
                  degree: {
                    type: "string",
                    description: "Degree obtained",
                  },
                  field: { type: "string", description: "Field of study" },
                  startYear: { type: "string", description: "Start year" },
                  endYear: {
                    type: "string",
                    description: "End year or expected graduation year",
                  },
                },
                required: ["school", "degree", "field", "startYear"],
                additionalProperties: false,
              },
            },
            experience: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  company: { type: "string", description: "Company name" },
                  position: {
                    type: "string",
                    description: "Job title or position",
                  },
                  startYear: { type: "string", description: "Start year" },
                  endYear: {
                    type: "string",
                    description: "End year or null if current",
                  },
                  description: {
                    type: "string",
                    description:
                      "Description of responsibilities and achievements",
                  },
                  isCurrent: {
                    type: "boolean",
                    description: "Whether this job is the current position",
                  },
                },
                required: ["company", "position", "startYear"],
                additionalProperties: false,
              },
            },
          },
          required: [
            "personalInfo",
            "summary",
            "skills",
            "education",
            "experience",
          ],
          additionalProperties: false,
        },
      },
      required: ["title", "userInfo"],
      additionalProperties: false,
    },
    preferences: {
      type: "object",
      required: [
        "seniorityLevel",
        "yearsOfExperience",
        "workFormat",
        "workLocationType",
        "keywords",
        "location",
      ],
      properties: {
        workFormats: {
          enum: [
            "FullTime",
            "PartTime",
            "Contract",
            "Freelance",
            "Temporary",
            "Internship",
            "Consulting",
          ],
          type: "array",
          description:
            "The expected work format for the candidate (such as FullTime, PartTime, etc.), as inferred from the CV.",
        },
        seniorityLevels: {
          enum: [
            "Intern",
            "Trainee",
            "Junior",
            "MidLevel",
            "Senior",
            "Lead",
            "Manager",
            "Director",
            "VicePresident",
            "CLevel",
          ],
          type: "array",
          description:
            "The expected or likely seniority level of the candidate based on their CV.",
        },
        locationTypes: {
          enum: [
            "Remote",
            "OnSite",
            "OfficeBased",
            "Hybrid",
            "FlexibleLocation",
            "FieldBased",
          ],
          type: "array",
          description:
            "The expected or preferred work location type for the candidate, as inferred from their CV.",
        },
        experienceYears: {
          type: "number",
          description:
            "The total years of professional experience the candidate likely has, as can be determined from the CV.",
        },
        keywords: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            "An array of relevant job titles/roles (keywords) for searching job opportunities for the candidate, as inferred from the CV.",
        },
        location: {
          type: "string",
          description: "City of residence, as determined from the CV.",
        },
        salaryRange: {
          type: "object",
          properties: {
            min: {
              type: "number",
              description:
                "The minimum monthly salary the candidate is likely looking for, as inferred from the CV based on the user location.",
            },
            max: {
              type: "number",
              description:
                "The maximum monthly salary the candidate is likely looking for, as inferred from the CV based on the user location",
            },
          },
          required: ["min", "max"],
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
  },
  required: ["CV", "Preferences"],
  additionalProperties: false,
};
