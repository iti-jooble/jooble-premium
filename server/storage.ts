import { v4 as uuidv4 } from 'uuid';
import { CV, PersonalInfo, Education, Skill, WorkExperience } from '../shared/schema';

// In-memory CV storage
const cvs: CV[] = [
  {
    id: '1',
    title: 'Software Developer CV',
    score: 85,
    dateCreated: new Date().toISOString(),
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567'
    },
    skills: [
      { id: '1', name: 'JavaScript', level: 'expert' },
      { id: '2', name: 'React', level: 'advanced' },
      { id: '3', name: 'TypeScript', level: 'advanced' }
    ],
    education: [
      { 
        id: '1', 
        school: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startYear: '2014',
        endYear: '2018',
        isCurrent: false
      }
    ],
    workExperience: [
      {
        id: '1',
        company: 'Tech Solutions Inc.',
        position: 'Senior Developer',
        startYear: '2018',
        endYear: null,
        description: 'Leading front-end development team, implementing React applications.',
        isCurrent: true
      }
    ],
    templateId: 1,
    summary: 'Experienced software developer with 8+ years in web development.'
  },
  {
    id: '2', 
    title: 'UX Designer CV',
    score: 78,
    dateCreated: new Date().toISOString(),
    personalInfo: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '555-987-6543'
    },
    skills: [
      { id: '1', name: 'Figma', level: 'expert' },
      { id: '2', name: 'User Research', level: 'advanced' },
      { id: '3', name: 'Prototyping', level: 'advanced' }
    ],
    education: [
      { 
        id: '1', 
        school: 'Design Academy',
        degree: 'Master of Arts',
        field: 'User Experience Design',
        startYear: '2016',
        endYear: '2018',
        isCurrent: false
      }
    ],
    workExperience: [
      {
        id: '1',
        company: 'Creative Design Studio',
        position: 'Senior UX Designer',
        startYear: '2018',
        endYear: null,
        description: 'Leading design projects for major clients, conducting user research and creating prototypes.',
        isCurrent: true
      }
    ],
    templateId: 2,
    summary: 'Creative designer with a passion for user-centered solutions.'
  }
];

// Storage for CV content - this is used for when content is updated separately from the main CV
const cvContent: Record<string, {
  personalInfo?: PersonalInfo;
  workExperience?: WorkExperience[];
  education?: Education[];
  skills?: Skill[];
  summary?: string;
}> = {
  '1': {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567'
    },
    skills: [
      { id: '1', name: 'JavaScript', level: 'expert' },
      { id: '2', name: 'React', level: 'advanced' },
      { id: '3', name: 'TypeScript', level: 'advanced' }
    ],
    summary: 'Experienced software developer with 8+ years in web development.'
  },
  '2': {
    personalInfo: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '555-987-6543'
    },
    skills: [
      { id: '1', name: 'Figma', level: 'expert' },
      { id: '2', name: 'User Research', level: 'advanced' },
      { id: '3', name: 'Prototyping', level: 'advanced' }
    ],
    summary: 'Creative designer with a passion for user-centered solutions.'
  }
};

// Storage interface
export interface IStorage {
  // CV operations
  getAllCVs(): Promise<CV[]>;
  getCVById(id: string): Promise<CV | null>;
  createCV(data: Omit<CV, 'id' | 'dateCreated'>): Promise<CV>;
  updateCV(id: string, data: Partial<CV>): Promise<CV | null>;
  deleteCV(id: string): Promise<boolean>;
  duplicateCV(id: string, title?: string): Promise<CV | null>;
  
  // CV content operations
  getCVContent(id: string): Promise<any>;
  updateCVContent(id: string, section: string, data: any): Promise<any>;
  
  // AI suggestion operation
  getAISuggestion(section: string, additionalContext?: string): Promise<{ suggestion: string }>;
}

// Implementation
export const storage: IStorage = {
  getAllCVs: async () => {
    return [...cvs];
  },
  
  getCVById: async (id: string) => {
    const cv = cvs.find(cv => cv.id === id);
    return cv ? { ...cv } : null;
  },
  
  createCV: async (data) => {
    const newCV: CV = {
      ...data,
      id: uuidv4(),
      dateCreated: new Date().toISOString(),
    };
    cvs.push(newCV);
    
    // Initialize empty content for this CV
    cvContent[newCV.id] = {};
    
    return { ...newCV };
  },
  
  updateCV: async (id: string, data: Partial<CV>) => {
    const index = cvs.findIndex(cv => cv.id === id);
    if (index === -1) return null;
    
    cvs[index] = { ...cvs[index], ...data };
    return { ...cvs[index] };
  },
  
  deleteCV: async (id: string) => {
    const index = cvs.findIndex(cv => cv.id === id);
    if (index === -1) return false;
    
    cvs.splice(index, 1);
    
    // Also delete CV content
    if (cvContent[id]) {
      delete cvContent[id];
    }
    
    return true;
  },

  duplicateCV: async (id: string, title?: string) => {
    // Find the original CV
    const originalCV = cvs.find(cv => cv.id === id);
    if (!originalCV) return null;
    
    // Create a new CV with the same data but a new ID
    const newCV: CV = {
      ...originalCV,
      id: uuidv4(),
      title: title || `${originalCV.title} (Copy)`,
      dateCreated: new Date().toISOString(),
    };
    
    cvs.push(newCV);
    
    // Also duplicate the content
    if (cvContent[id]) {
      cvContent[newCV.id] = JSON.parse(JSON.stringify(cvContent[id]));
    } else {
      cvContent[newCV.id] = {};
    }
    
    return newCV;
  },
  
  getCVContent: async (id: string) => {
    return cvContent[id] || {};
  },
  
  updateCVContent: async (id: string, section: string, data: any) => {
    // Initialize if doesn't exist
    if (!cvContent[id]) {
      cvContent[id] = {};
    }
    
    // Handle the case where the summary is sent as {summary: "text"}
    if (section === 'summary' && data.summary) {
      data = data.summary;
    }
    
    // Update the specific section
    cvContent[id] = {
      ...cvContent[id],
      [section]: data
    };
    
    return cvContent[id];
  },
  
  getAISuggestion: async (section: string, additionalContext?: string) => {
    // Generate mock AI response based on section
    let suggestion = '';
    
    switch(section) {
      case 'summary':
        suggestion = 'Accomplished professional with a proven track record of delivering results in fast-paced environments. Strong analytical skills combined with a collaborative approach to problem-solving.';
        break;
      case 'workExperience':
        suggestion = 'Led cross-functional team in development of key product features, resulting in 30% increased user engagement and 25% reduction in customer support inquiries.';
        break;
      case 'skills':
        suggestion = 'Project Management, Strategic Planning, Team Leadership, Stakeholder Communication, Budget Oversight';
        break;
      default:
        suggestion = 'Expert in ' + section + ' with demonstrated ability to drive results.';
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return { suggestion };
  }
};