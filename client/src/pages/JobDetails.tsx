import { useState, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import getAcronym from "@/utils/getAcronym";
import getColorByName from "@/utils/getColorByName";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setSelectedJob } from "@/redux/slices/jobSearchSlice";
import { jobsSelectors } from "@/redux/selectors";
import { openModal } from "@/redux/slices/uiSlice";
import { ModalType } from "@/constants/modals";
import CvMatchingBlock from "@/components/job-details/CvMatchingBlock";
import JobMatchingBlock from "@/components/job-details/JobMatchingBlock";
import JobDescription from "@/components/job-details/JobDescription";

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
      summary:
        "Exceptional problem-solving skills and a proven track record of meeting project deadlines and exceeding performance targets on a global scale. Committed to driving operational excellence.",
    },
    skills: [
      { id: "1", name: "Regulatory Compliance" },
      { id: "2", name: "Risk Mitigation" },
      { id: "3", name: "Cross-Functional Team Leadership" },
      { id: "4", name: "Process Optimization" },
      { id: "5", name: "Budget Planning" },
    ],
    educations: [
      {
        id: "1",
        institution: "Global University",
        degree: "Supply Chain Management",
        location: "Madrid, Spain",
        startDate: "2015-09",
        endDate: "2018-03",
        description: "Bachelor",
      },
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
          "Managed analytics and reporting, tracking campaign performance.",
        ],
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
          "Implemented a robust supplier evaluation process, driving improved vendor performance",
        ],
      },
    ],
    languages: [
      { id: "1", name: "Spanish", level: "Native" },
      { id: "2", name: "English", level: "Upper Intermediate" },
    ],
    certificates: [
      {
        id: "1",
        name: "Certified Supply Chain Professional",
        issuer: "Coursera",
        issueDate: "2020-12",
        expiryDate: "2021-05",
        credentialUrl: "",
      },
      {
        id: "2",
        name: "Meta Social Media Marketing Professional Certificate",
        issuer: "Coursera",
        issueDate: "2019-10",
        expiryDate: "2020-01",
        credentialUrl: "",
      },
    ],
    additional:
      "Adept at problem-solving in high-pressure situations and consistently exceeding global project objectives. Committed to driving operational excellence and supporting the growth of multinational organizations.",
  },
};

const colorMap = {
  red: "bg-red/20",
  blue: "bg-blue-100",
  green: "bg-green/20",
  yellow: "bg-yellow-100",
  purple: "bg-purple-100",
  pink: "bg-pink-100",
  orange: "bg-orange/20",
  gray: "bg-gray/20",
};

const JobDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const job = useAppSelector(jobsSelectors.getSelectedJobSelector);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (params.jobId) {
      dispatch(setSelectedJob(params.jobId));
    }

    setLoading(false);
  }, [params.jobId]);

  const handleApply = () => {
    dispatch(
      openModal({
        type: ModalType.CV_ADAPTATION,
        props: {
          cv: sampleCv,
        },
      }),
    );
  };

  if (loading) {
    return <div className="p-8 flex justify-center">Loading...</div>;
  }

  if (!job) {
    return <Redirect to="/" />;
  }

  return (
    <div className="p-6 max-w-[1032px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="md:col-span-2 space-y-6">
          {/* Job Header Card */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              {/* Company logo - green owl */}
              <div
                className={`w-20 h-20 rounded-lg flex text-3xl font-bold items-center justify-center text-muted-foreground ${colorMap[getColorByName(job.company?.name)]}`}
              >
                {getAcronym(job.company?.name)}
              </div>
              <div className="flex-1">
                <div className="text-sm">
                  <strong>{job.company?.name || "Company"}</strong>{" "}
                  <span className="text-muted-foreground">is looking for</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {job.position}
                </h1>
                <div className="text-xs text-muted-foreground">
                  Posted {job.dateCaption}
                </div>
              </div>
            </div>

            {/* Job Info Matching Block */}
            {job?.matching && <JobMatchingBlock matching={job.matching} />}

            {/* Job Description */}
            {job.fitlyJobCard?.description ? (
              <JobDescription description={job.fitlyJobCard.description} />
            ) : (
              <div
                className="my-8"
                dangerouslySetInnerHTML={{ __html: job.fullContent ?? "" }}
              />
            )}

            {/* Apply Button */}
            <Button className="w-full my-4" onClick={handleApply}>
              Fit & Apply
            </Button>
          </Card>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="md:col-span-1 space-y-6">
          {/* Resume Matching Card */}
          <CvMatchingBlock onApply={handleApply} />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
