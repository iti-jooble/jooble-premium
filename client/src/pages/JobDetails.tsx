import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

// In a real app, this would be fetched from an API
// For now we're using the same job data that's defined in JobSearch.tsx
type JobWithDescription = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  isNew: boolean;
  description: string;
};

const JobDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [, setLocation] = useLocation();
  const [job, setJob] = useState<JobWithDescription | null>(null);
  const [loading, setLoading] = useState(true);

  const jobId = params.jobId;

  // Mock job data - this would come from an API in a real app
  const mockJobs: JobWithDescription[] = [
    {
      id: "1",
      title: "Sr. Product Designer",
      company: "Duolingo",
      location: "New York, NY",
      type: "Full-time",
      salary: "$59 per hour",
      posted: "5 days ago",
      isNew: true,
      description: "We are looking for a proactive team player who can make a difference in his/her role within our community as we have an immediate opening for a full-time/part-time Data Entry Operator."
    },
    {
      id: "2",
      title: "Python developer",
      company: "Duolingo",
      location: "New York, NY",
      type: "Full-time",
      salary: "$59 per hour",
      posted: "5 days ago",
      isNew: true,
      description: "We're looking for skilled Python developers to join our backend team. You'll be responsible for developing and maintaining our API services and core application logic."
    },
    {
      id: "3",
      title: "Frontend developer",
      company: "Duolingo",
      location: "New York, NY",
      type: "Full-time",
      salary: "$59 per hour",
      posted: "5 days ago",
      isNew: false,
      description: "We're looking for frontend developers with React experience to join our web team. You'll be responsible for building engaging user interfaces for our learning platform."
    },
    {
      id: "4",
      title: "Engineering manager",
      company: "Duolingo",
      location: "New York, NY",
      type: "Full-time",
      salary: "$59 per hour",
      posted: "5 days ago",
      isNew: false,
      description: "We're looking for an engineering manager to lead our core platform team. You'll be responsible for guiding a team of engineers, setting technical direction, and ensuring successful project delivery."
    },
    {
      id: "5",
      title: "UX/UI Designer",
      company: "Duolingo",
      location: "New York, NY",
      type: "Full-time",
      salary: "$59 per hour",
      posted: "5 days ago",
      isNew: false,
      description: "We're looking for a skilled UX/UI designer to join our product team. You'll be responsible for creating beautiful interfaces and user flows for our language learning app."
    }
  ];

  useEffect(() => {
    // In a real app, this would be an API call
    if (jobId) {
      const foundJob = mockJobs.find((job) => job.id === jobId);
      setJob(foundJob || null);
    }
    setLoading(false);
  }, [jobId]);

  if (loading) {
    return <div className="p-8 flex justify-center">Loading...</div>;
  }

  if (!job) {
    return (
      <div className="p-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <p className="mb-6">Sorry, we couldn't find the job you're looking for.</p>
          <Button onClick={() => setLocation("/jobs")}>Back to Job Search</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="md:col-span-2 space-y-6">
          {/* Job Header Card */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              {/* Company logo - green owl */}
              <div className="flex-shrink-0">
                <img 
                  src="https://www.duolingo.com/images/facebook/duo-200.png" 
                  alt="Duolingo" 
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="%2358CC02"><rect width="64" height="64" rx="16" /><text x="50%" y="50%" font-family="Arial" font-size="28" text-anchor="middle" fill="white" dominant-baseline="middle">D</text></svg>';
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                  {job.company} is looking for
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  {job.title}
                </h1>
                <div className="text-sm text-muted-foreground">
                  Posted {job.posted} · 153 people clicked apply
                </div>
              </div>
            </div>
          </Card>

          {/* Resume Match Card */}
          <Card className="p-6 relative overflow-hidden">
            <div className="flex items-start gap-6">
              {/* A4 icon */}
              <div className="flex-shrink-0 relative">
                <div className="bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded-md absolute -top-1 -left-1 z-10">
                  A4 - 3
                </div>
                <div className="w-24 h-28 bg-white border border-gray-300 rounded shadow-sm flex items-center justify-center relative overflow-hidden">
                  <div className="w-20 h-24 bg-white border border-gray-200 p-1 transform -rotate-3">
                    <div className="w-full h-1 bg-blue-200 mb-1"></div>
                    <div className="w-full h-1 bg-blue-200 mb-1"></div>
                    <div className="w-1/2 h-1 bg-blue-200"></div>
                  </div>
                  <div className="w-20 h-24 bg-white border border-gray-200 p-1 absolute top-1 left-2 transform rotate-3">
                    <div className="w-full h-1 bg-blue-200 mb-1"></div>
                    <div className="w-full h-1 bg-blue-200 mb-1"></div>
                    <div className="w-1/2 h-1 bg-blue-200"></div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-gray-800">
                  Response chance without Fitly
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your resume doesn't highlight your strengths well enough for this job.
                </p>
              </div>

              {/* Score Circle */}
              <div className="flex-shrink-0">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-2xl font-bold">34</div>
                  </div>
                  {/* Red circular progress ring */}
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 48 48"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="#e5e5e5"
                      strokeWidth="4"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="4"
                      strokeDasharray="125.6"
                      strokeDashoffset="82.9"
                    />
                  </svg>
                </div>
                <div className="flex items-center text-xs text-red-500 font-medium mt-1 justify-center">
                  <XCircle size={14} className="mr-1" /> Need improve
                </div>
              </div>
            </div>

            <Button 
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Fit my docs
            </Button>
          </Card>

          {/* Summary Section */}
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Summary</h2>
            <p className="text-muted-foreground">
              We are looking for a proactive team player who can make a difference in his/her 
              role within our community as we have an immediate opening for a full-time/part-time 
              Data Entry Operator.
            </p>
          </Card>

          {/* Toolstack Section */}
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Toolstack</h2>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">F</span>
                </div>
                Figma
              </Badge>
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">P</span>
                </div>
                Adobe Photoshop
              </Badge>
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">I</span>
                </div>
                Adobe Illustrator
              </Badge>
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">S</span>
                </div>
                Sketch
              </Badge>
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">X</span>
                </div>
                Adobe XD
              </Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">I</span>
                </div>
                InVision
              </Badge>
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">M</span>
                </div>
                Miro
              </Badge>
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">N</span>
                </div>
                Notion
              </Badge>
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-purple-400 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">F</span>
                </div>
                FigJam
              </Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">L</span>
                </div>
                Loom
              </Badge>
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">G</span>
                </div>
                Google Analytics
              </Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">G</span>
                </div>
                Google Forms
              </Badge>
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">C</span>
                </div>
                ChatGPT
              </Badge>
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">T</span>
                </div>
                Typeform
              </Badge>
              <Badge className="bg-gray-100 border-none text-gray-800 font-normal px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center overflow-hidden">
                  <span className="text-xs text-white">U</span>
                </div>
                UserTesting
              </Badge>
            </div>
          </Card>

          {/* Responsibilities Section */}
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Solve complex design challenges through wireframing, crafting high-fidelity 
                user interfaces, and creating sophisticated functional prototypes using Figma 
                or similar UX/UI tools while collaborating with cross-functional teams 
                and maintain consistency across the entire product portfolio while setting 
                standards for design excellence
              </li>
              <li>Drive the evolution of Petvisor's design systems, ensuring they scale effectively
                and maintain consistency across the entire product portfolio while setting
                standards for design excellence
              </li>
              <li>Lead user research initiatives and usability testing to uncover deep insights, 
                shaping and validating high-impact design strategies and decisions
              </li>
              <li>Thrive in a fast-paced Agile environment</li>
              <li>Stay at the forefront of industry trends, emerging technologies, and advanced 
                design methodologies, leveraging this expertise to drive innovation and elevate 
                design practices
              </li>
            </ul>
          </Card>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="md:col-span-1 space-y-6">
          {/* Match Score Card */}
          <Card className="p-6 flex flex-col items-center">
            <div className="relative w-24 h-24 mb-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">94</div>
                  <div className="text-xs text-muted-foreground">/100</div>
                </div>
              </div>
              {/* Blue circular progress ring */}
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 48 48"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="4"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#1c64f2"
                  strokeWidth="4"
                  strokeDasharray="125.6"
                  strokeDashoffset="7.54"
                />
              </svg>
            </div>
            <h3 className="font-bold text-center">Perfect match</h3>
            <p className="text-sm text-muted-foreground text-center mt-1">
              This job perfectly fit your preferences
            </p>
          </Card>

          {/* Job Requirements Card */}
          <div className="space-y-3">
            {/* Salary */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">$59 per hour</div>
                <div className="text-xs text-muted-foreground">Your expected rate: $55-$60</div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">New York, NY</div>
                <div className="text-xs text-muted-foreground">You're open to NYC & hybrid roles</div>
              </div>
            </div>

            {/* Job Type */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Full-time</div>
                <div className="text-xs text-muted-foreground">Your preference: Full-time</div>
              </div>
            </div>

            {/* Work Format */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Hybrid work format</div>
                <div className="text-xs text-muted-foreground">You prefer: Hybrid or Remote</div>
              </div>
            </div>

            {/* Level */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Senior level</div>
                <div className="text-xs text-muted-foreground">Your level: Senior</div>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Requires 5+ years of experience</div>
                <div className="text-xs text-muted-foreground">Your experience: 4 years</div>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Apply now
          </Button>

          {/* Fit Docs Button */}
          <Button 
            variant="outline"
            className="w-full border-gray-300 text-gray-700 font-medium"
          >
            Fit my docs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;