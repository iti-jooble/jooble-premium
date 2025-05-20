import React from 'react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/store';
import { openModal } from '@/redux/slices/uiSlice';
import { ModalType } from '@/constants/modals';

// Sample CV data for testing
const sampleCv = {
  id: "1",
  title: "My Professional CV",
  templateId: 1,
  userInfo: {
    personalInfo: {
      firstName: "Alejandro",
      lastName: "García",
      jobTitle: "Global Operations Coordinator",
      email: "alejandro.garcia@mail.com",
      phone: "+12-345-678",
      location: "Barcelona, Spain",
      summary: "Exceptional problem-solving skills and a proven track record of meeting project deadlines and exceeding performance targets on a global scale. Committed to driving operational excellence."
    },
    skills: [
      { id: "1", name: "Regulatory Compliance" },
      { id: "2", name: "Risk Mitigation" },
      { id: "3", name: "Cross-Functional Team Leadership" },
      { id: "4", name: "Process Optimization" },
      { id: "5", name: "Budget Planning" }
    ],
    educations: [
      {
        id: "1",
        institution: "Global University",
        degree: "Supply Chain Management",
        location: "Madrid, Spain",
        startDate: "2015-09",
        endDate: "2018-03",
        description: "Bachelor"
      }
    ],
    experiences: [
      {
        id: "1",
        company: "San Global",
        position: "Global Operations Manager",
        location: "Barcelona",
        startDate: "2017-09",
        endDate: "2020-11",
        current: false,
        description: [
          "Directed and harmonized global operations across 15 countries, resulting in a 20% increase in operational efficiency and a 15% reduction in costs.",
          "Managed analytics and reporting, tracking campaign performance."
        ]
      },
      {
        id: "2",
        company: "U2 Group",
        position: "International Logistics Coordinator",
        location: "Madrid",
        startDate: "2020-12",
        endDate: "2023-10",
        current: false,
        description: [
          "Managed complex international logistics, optimizing supplier and distributor networks across 10 countries, resulting in a 12% reduction in shipping delays.",
          "Leveraged data analytics to forecast demand accurately, leading to a 18% reduction in excess inventory and substantial cost savings.",
          "Implemented a robust supplier evaluation process, driving improved vendor performance"
        ]
      }
    ],
    languages: [
      { id: "1", name: "Spanish", level: "Native" },
      { id: "2", name: "English", level: "Upper Intermediate" }
    ],
    certificates: [
      {
        id: "1",
        name: "Certified Supply Chain Professional",
        issuer: "Coursera",
        issueDate: "2020-12",
        expiryDate: "2021-05",
        credentialUrl: ""
      },
      {
        id: "2",
        name: "Meta Social Media Marketing Professional Certificate",
        issuer: "Coursera",
        issueDate: "2019-10",
        expiryDate: "2020-01",
        credentialUrl: ""
      }
    ],
    additional: "Adept at problem-solving in high-pressure situations and consistently exceeding global project objectives. Committed to driving operational excellence and supporting the growth of multinational organizations."
  }
};

// Sample job details for testing
const sampleJobDetails = {
  id: "123",
  title: "App Marketing Manager",
  company: "TechCorp",
  description: "Looking for an experienced App Marketing Manager with ASO expertise and app analytics background. The role involves negotiating deals for app acquisitions and optimizing app store presence.",
  requirements: [
    "App Store Optimization (ASO) experience",
    "Experience with app analytics tools",
    "Deal-making experience in the app marketplace",
    "Strong analytical skills"
  ]
};

const CvAdaptationTest: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(
      openModal({
        type: ModalType.CV_ADAPTATION,
        props: {
          cv: sampleCv,
          jobDetails: sampleJobDetails
        }
      })
    );
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">CV Adaptation Modal Test</h1>
      <p className="mb-4">
        Click the button below to open the CV Adaptation modal. This demonstration shows 
        how your CV can be adapted to match specific job requirements.
      </p>
      <Button onClick={handleOpenModal}>
        Open CV Adaptation Modal
      </Button>
    </div>
  );
};

export default CvAdaptationTest;