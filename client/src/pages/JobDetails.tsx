import { useState, useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useLocation, Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setSelectedJob } from "@/redux/slices/jobSearchSlice";
import { jobsSelectors } from "@/redux/selectors";

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

  if (loading) {
    return <div className="p-8 flex justify-center">Loading...</div>;
  }

  if (!job) {
    return <Redirect to="/" />;
  }

  return (
    <div className="p-6 max-w-[1012px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="md:col-span-2 space-y-6">
          {/* Job Header Card */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              {/* Company logo - green owl */}
              <div className="flex-shrink-0 mb-10">
                <img
                  src="https://www.duolingo.com/images/facebook/duo-200.png"
                  alt="Duolingo"
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="%2358CC02"><rect width="64" height="64" rx="16" /><text x="50%" y="50%" font-family="Arial" font-size="28" text-anchor="middle" fill="white" dominant-baseline="middle">D</text></svg>';
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                  {job.company?.name} is looking for
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  {job.position}
                </h1>
                <div className="text-sm text-muted-foreground">
                  Posted {job.dateCaption}
                </div>
              </div>
            </div>

            {/* Job Info Matching Block */}
            <div className="mb-3 p-6 bg-gray-50 rounded-lg overflow-hidden rounded-xl">
              <div className="flex flex-col">
                {/* Score and Title */}
                <div className="flex items-center mb-4">
                  {/* Score Block */}
                  <div className="bg-blue-600 text-white text-3xl font-bold p-4 rounded-lg w-24 h-24 flex items-center justify-center mr-4">
                    8.6
                  </div>
                  
                  {/* Title and Subtitle */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Fitly Perfect!
                    </h3>
                    <p className="text-gray-500">
                      Spot-on! This is your ideal fit — go for it.
                    </p>
                  </div>
                </div>
                
                {/* Criteria Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Salary */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="bg-blue-600 rounded-full p-1">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">£49k - £67k per annum</div>
                        <div className="text-sm text-gray-500">Expected: $55-$60</div>
                      </div>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="bg-blue-600 rounded-full p-1">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">New York, NY</div>
                        <div className="text-sm text-gray-500">Preferred: New York, NY</div>
                      </div>
                    </div>
                    
                    {/* Job Type */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="bg-blue-600 rounded-full p-1">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Full-time</div>
                        <div className="text-sm text-gray-500">Preferred: Full-time</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Work Format */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="bg-gray-400 rounded-full p-1">
                          <span className="h-4 w-4 text-white flex items-center justify-center text-sm">?</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Hybrid</div>
                        <div className="text-sm text-gray-500">Preferred: Hybrid or Remote</div>
                      </div>
                    </div>
                    
                    {/* Level */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="bg-amber-500 rounded-full p-1">
                          <span className="h-4 w-4 text-white flex items-center justify-center text-sm">!</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Senior level</div>
                        <div className="text-sm text-gray-500">Your level: Senior</div>
                      </div>
                    </div>
                    
                    {/* Experience */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="bg-red-500 rounded-full p-1">
                          <XCircle className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">5+ years exp</div>
                        <div className="text-sm text-gray-500">Your experience: 6 years</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                    className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-2"
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
            <Button className="w-full my-4 py-6 bg-primary-blue hover:bg-blue-700 text-white text-lg font-bold rounded-md">
              Apply now
            </Button>
          </Card>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="md:col-span-1 space-y-6">
          {/* Resume Matching Card */}
          <Card className="p-6 flex flex-col items-center">
            {/* Progress Circle */}
            <div className="relative w-44 h-44 mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#111827]">47<span className="text-2xl">%</span></div>
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
            <h3 className="font-bold text-xl text-center mb-1">Response Chance</h3>
            <h2 className="font-bold text-3xl text-center text-[#111827] mb-4">Without Fitly</h2>
            
            {/* Description */}
            <p className="text-gray-600 text-center mb-8">
              You've got potential, but your resume isn't selling it. Let's refine it to really match what this job needs.
            </p>
            
            {/* Fix Categories */}
            <div className="flex w-full gap-3 mb-8">
              {/* Must Fix */}
              <div className="flex-1 bg-red-50 rounded-lg p-4 relative">
                <div className="text-center font-bold">MUST FIX</div>
                <div className="text-center text-3xl font-bold mt-1">3</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-b-lg"></div>
              </div>
              
              {/* Should Fix */}
              <div className="flex-1 bg-amber-50 rounded-lg p-4 relative">
                <div className="text-center font-bold">SHOULD FIX</div>
                <div className="text-center text-3xl font-bold mt-1">4</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-b-lg"></div>
              </div>
              
              {/* Minor Fix */}
              <div className="flex-1 bg-blue-50 rounded-lg p-4 relative">
                <div className="text-center font-bold">MINOR FIX</div>
                <div className="text-center text-3xl font-bold mt-1">2</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-b-lg"></div>
              </div>
            </div>
            
            {/* Fix Resume Button */}
            <Button className="w-full mb-4 py-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-md">
              Fix resume & Apply
            </Button>
            
            {/* Show Issues Button */}
            <Button
              variant="outline"
              className="w-full py-6 border-gray-300 text-blue-600 font-bold"
            >
              Show issues
            </Button>
            
            {/* Footer Text */}
            <p className="text-gray-500 text-center mt-6">
              We'll tailor your resume before applying and increase your chances.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
