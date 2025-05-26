import { Namespaces } from "./enums";
import { ICvBuilderAIAssistanceConfig } from "./types";

export const AI_ASSISTANCE_CONFIG: {
  [K in Namespaces]: ICvBuilderAIAssistanceConfig<K>;
} = {
  experience: {
    requestOnMount: false,
    responseType: "string",
    texts: {
      Initial: {
        title: "cvBuilder.suggestHint",
      },
      Loading: {
        title: "cvBuilder.suggestLoading",
      },
      Response: {
        title: "cvBuilder.suggestReady",
      },
    },
    prompts: {
      generate: {
        type: "generateExperience",
        userReplacements: {
          "{language}": "",
          "{jobTitle}": "",
        },
        systemReplacements: {
          "{jobTitle}": "",
        },
      },
      rephrase: {
        type: "rephraseExperience",
        userReplacements: {
          "{language}": "",
          "{text}": "",
        },
        systemReplacements: {
          "{jobTitle}": "",
        },
      },
      fixSpelling: {
        type: "fixSpelling",
        userReplacements: {
          "{language}": "",
          "{text}": "",
        },
        systemReplacements: {
          "{jobTitle}": "",
        },
      },
    },
  },
  skills: {
    requestOnMount: true,
    responseType: "array",
    texts: {
      Initial: {
        title: "cvBuilder.skillsHint",
      },
      Loading: {
        title: "cvBuilder.skillsHint",
      },
      Response: {
        title: "cvBuilder.skillsHint",
      },
    },
    prompts: {
      generate: {
        type: "generateSkills",
        userReplacements: {
          "{language}": "",
          "{skillsData}": "",
        },
        systemReplacements: {},
      },
    },
  },
  summary: {
    requestOnMount: false,
    responseType: "string",
    texts: {
      Initial: {
        title: "cvBuilder.suggestHint",
      },
      Loading: {
        title: "cvBuilder.suggestLoading",
      },
      Response: {
        title: "cvBuilder.suggestReady",
      },
    },
    prompts: {
      generate: {
        type: "generateSummary",
        userReplacements: {
          "{language}": "",
          "{summaryData}": "",
        },
        systemReplacements: {},
      },
      rephrase: {
        type: "rephraseSummary",
        userReplacements: {
          "{language}": "",
          "{text}": "",
        },
        systemReplacements: {},
      },
      fixSpelling: {
        type: "fixSpelling",
        userReplacements: {
          "{language}": "",
          "{text}": "",
        },
        systemReplacements: {},
      },
    },
  },
};
