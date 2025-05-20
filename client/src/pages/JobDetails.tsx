import { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useLocation, Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import getAcronym from "@/utils/getAcronym";
import {
  getJobMatchingScore,
  getJobDataMatching,
} from "@/utils/getJobMatching";
import getColorByName from "@/utils/getColorByName";
import { XCircle, CircleCheck, CircleHelp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setSelectedJob } from "@/redux/slices/jobSearchSlice";
import { jobsSelectors } from "@/redux/selectors";

const colorMap = {
  red: "bg-red-100",
  blue: "bg-blue-100",
  green: "bg-green-100",
  yellow: "bg-yellow-100",
  purple: "bg-purple-100",
  pink: "bg-pink-100",
  orange: "bg-orange-100",
  gray: "bg-gray-100",
};

const JobDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [, setLocation] = useLocation();
  const job = useAppSelector(jobsSelectors.getSelectedJobSelector);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (params.jobId) {
      dispatch(setSelectedJob(params.jobId));
    }

    setLoading(false);
  }, [params.jobId]);

  const skills = [
    "Figma",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Sketch",
    "Adobe XD",
    "InVision",
    "Miro",
    "Notion",
    "FigJam",
    "Loom",
  ];

  const matching = useMemo(() => {
    return getJobDataMatching(job?.matching);
  }, [job?.uid]);

  if (loading) {
    return <div className="p-8 flex justify-center">Loading...</div>;
  }

  if (!job) {
    return <Redirect to="/" />;
  }

  const matchingScore = getJobMatchingScore(job?.matching);

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
            {matchingScore && (
              <div className="mb-3 mt-9 p-6 bg-primary-background rounded-lg overflow-hidden rounded-xl">
                <div className="flex flex-col">
                  {/* Score and Title */}
                  <div className="flex items-center mb-5">
                    {/* Score Block */}
                    <div
                      className={`${matchingScore.color} text-white text-2xl font-bold p-4 rounded-lg w-14 h-14 flex items-center justify-center mr-4`}
                    >
                      {matchingScore.score}
                    </div>

                    {/* Title and Subtitle */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {matchingScore.title}
                      </h3>
                      <p className="text-gray-500">
                        {matchingScore.description}
                      </p>
                    </div>
                  </div>

                  {/* Criteria Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1].map((columnIndex) => (
                      <div key={columnIndex} className="space-y-4">
                        {matching
                          ?.filter((_, index) => index % 2 === columnIndex)
                          .map(({ key, value }) => (
                            <div className="flex items-start" key={key}>
                              <div className="flex-shrink-0 mr-3 mt-1">
                                {!value.expected ? (
                                  <CircleHelp className="h-6 w-6 text-[#7A899E] mr-2 flex-shrink-0" />
                                ) : value.score < 1 ? (
                                  <XCircle className="h-6 w-6 text-[#CC2714] mr-2 flex-shrink-0" />
                                ) : (
                                  <CircleCheck className="h-6 w-6 text-[#5D55FA] mr-2 flex-shrink-0" />
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">
                                  {value.actual}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Preferred: {value.expected || "Unspecified"}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Summary Section */}
            <div className="py-3">
              <h2 className="text-lg font-bold mb-4">Summary</h2>
              <p className="text-muted-foreground">
                We are looking for a proactive team player who can make a
                difference in his/her role within our community as we have an
                immediate opening for a full-time/part-time Data Entry Operator.
              </p>
            </div>

            {/* Toolstack Section */}
            <div className="py-3">
              <h2 className="text-lg font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <div
                    key={`${skill}-${i}`}
                    className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2"
                  >
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsibilities Section */}
            <div className="py-3">
              <h2 className="text-lg font-bold mb-4">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>
                  Solve complex design challenges through wireframing, crafting
                  high-fidelity user interfaces, and creating sophisticated
                  functional prototypes using Figma or similar UX/UI tools while
                  collaborating with cross-functional teams and maintain
                  consistency across the entire product portfolio while setting
                  standards for design excellence
                </li>
                <li>
                  Drive the evolution of Petvisor's design systems, ensuring
                  they scale effectively and maintain consistency across the
                  entire product portfolio while setting standards for design
                  excellence
                </li>
                <li>
                  Lead user research initiatives and usability testing to
                  uncover deep insights, shaping and validating high-impact
                  design strategies and decisions
                </li>
                <li>Thrive in a fast-paced Agile environment</li>
                <li>
                  Stay at the forefront of industry trends, emerging
                  technologies, and advanced design methodologies, leveraging
                  this expertise to drive innovation and elevate design
                  practices
                </li>
              </ul>
            </div>
            {/* Apply Button */}
            <Button className="w-full my-4">Fit & Apply</Button>
          </Card>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="md:col-span-1 space-y-6">
          {/* Resume Matching Card */}
          <Card className="p-6 flex flex-col items-center">
            {/* Progress Circle */}
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#111827]">
                    47<span className="text-2xl">%</span>
                  </div>
                </div>
              </div>
              {/* Semi-circular progress ring */}
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#EEEEEE"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E41B17"
                  strokeWidth="10"
                  strokeDasharray="282.7"
                  strokeDashoffset="150"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Heading */}
            <h3 className="font-bold text-center mb-1">Response Chance</h3>
            <h2 className="font-bold text-2xl text-center mb-4">
              Without Fitly
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm text-center mb-8">
              You've got potential, but your resume isn't selling it. Let's
              refine it to really match what this job needs.
            </p>

            {/* Fix Categories */}
            <div className="grid grid-cols-3 w-full gap-2 mb-8">
              {/* Must Fix */}
              <div className="col-span-1 bg-red-50 rounded-lg py-3 px-2 relative">
                <div className="text-center text-[10px] font-bold">
                  MUST FIX
                </div>
                <div className="text-center text-lg font-bold mt-1">3</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-b-lg"></div>
              </div>

              {/* Should Fix */}
              <div className="col-span-1 bg-amber-50 rounded-lg py-3 px-2 relative">
                <div className="text-center text-[10px] font-bold">
                  SHOULD FIX
                </div>
                <div className="text-center text-lg font-bold mt-1">4</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-b-lg"></div>
              </div>

              {/* Minor Fix */}
              <div className="col-span-1 bg-blue-50 rounded-lg py-3 px-2 relative">
                <div className="text-center text-[10px] font-bold">
                  MINOR FIX
                </div>
                <div className="text-center text-lg font-bold mt-1">2</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-b-lg"></div>
              </div>
            </div>

            {/* Fix Resume Button */}
            <Button className="w-full mb-4">Fix resume & Apply</Button>

            {/* Show Issues Button */}
            <Button variant="outline" className="w-full font-bold">
              Show issues
            </Button>

            {/* Footer Text */}
            <p className="text-gray-500 text-sm text-center mt-6">
              We'll tailor your resume before applying and increase your
              chances.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
