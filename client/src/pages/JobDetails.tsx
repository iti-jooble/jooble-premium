import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon, 
  BriefcaseIcon, 
  DollarSignIcon,
  CheckIcon,
  FileTextIcon,
  DownloadIcon
} from "lucide-react";

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

interface ResumeMatchScore {
  category: string;
  score: number;
}

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
      title: "Certified English Tutor (remote working)",
      company: "Duolingo",
      location: "New York, NY",
      type: "Hybrid",
      salary: "$59 per hour",
      posted: "5 days ago",
      isNew: true,
      description: `We're looking for certified English tutors to join our remote teaching team. You'll be working with students from around the world, helping them improve their English language skills through our innovative platform.`
    },
    {
      id: "2",
      title: "Python developer",
      company: "Duolingo",
      location: "New York, NY",
      type: "Hybrid",
      salary: "$59 per hour",
      posted: "5 days ago",
      isNew: true,
      description: `We're looking for skilled Python developers to join our backend team. You'll be responsible for developing and maintaining our API services and core application logic.`
    },
    {
      id: "3",
      title: "Frontend developer",
      company: "Duolingo",
      location: "New York, NY",
      type: "Hybrid",
      salary: "$59 per hour",
      posted: "5 days ago",
      isNew: false,
      description: `We're looking for frontend developers with React experience to join our web team. You'll be responsible for building engaging user interfaces for our learning platform.`
    },
    {
      id: "4",
      title: "Engineering manager",
      company: "Duolingo",
      location: "New York, NY",
      type: "Hybrid",
      salary: "$59 per hour",
      posted: "5 days ago",
      isNew: false,
      description: `We're looking for an engineering manager to lead our core platform team. You'll be responsible for guiding a team of engineers, setting technical direction, and ensuring successful project delivery.`
    },
    {
      id: "5",
      title: "UX/UI Designer",
      company: "Duolingo",
      location: "New York, NY",
      type: "Hybrid",
      salary: "$59 per hour",
      posted: "5 days ago",
      isNew: false,
      description: `We're looking for a skilled UX/UI designer to join our product team. You'll be responsible for creating beautiful interfaces and user flows for our language learning app.`
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

  // Match score data for display
  const matchScores: ResumeMatchScore[] = [
    { category: "Response chance", score: 78 },
    { category: "Overall match", score: 94 },
  ];

  return (
    <div className="p-6 bg-[#f7f6f2] min-h-screen animate-in fade-in duration-300">
      {/* Header section with job title and company */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          {/* Company logo */}
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-800 flex-shrink-0">
            {job.company.charAt(0)}
          </div>
          
          <div className="flex-1">
            {/* Company and job title */}
            <div className="text-sm text-muted-foreground mb-1">
              {job.company} is looking for
            </div>
            <h1 className="text-2xl font-bold text-blue-600 mb-2">
              {job.title}
            </h1>
            
            {/* Job details */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <DollarSignIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center">
                <BriefcaseIcon className="h-4 w-4 mr-1 text-muted-foreground/70" />
                <span>{job.type}</span>
              </div>
            </div>
          </div>
          
          {/* Match score */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold">94</div>
                  <div className="text-xs text-muted-foreground">/ 100</div>
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
                  stroke="#014EFE"
                  strokeWidth="4"
                  strokeDasharray="125.6"
                  strokeDashoffset="7.54"
                />
              </svg>
            </div>
            <div className="text-center text-xs font-bold mt-1">
              Perfect match
            </div>
            <div className="text-center text-xs text-muted-foreground">
              Your job probability score
            </div>
          </div>
        </div>
      </div>
      
      {/* Response chance card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex-shrink-0">
                <img 
                  src="/cv-icon.png" 
                  alt="CV" 
                  className="w-20 h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>';
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold mb-1">Response chance with Fitly</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  We can generate a cover letter for this job
                </p>
                
                <div className="flex items-center mt-3">
                  <div className="relative w-10 h-10 mr-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-bold">78</div>
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
                        stroke="#014EFE"
                        strokeWidth="4"
                        strokeDasharray="125.6"
                        strokeDashoffset="31.4"
                      />
                    </svg>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Fit my docs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-6 h-full">
            <Card className="p-4 flex flex-col">
              <div className="mb-2">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                <span className="text-sm font-medium">$59 per hour</span>
              </div>
              <div className="text-xs text-muted-foreground">Salary range: $50-$80</div>
            </Card>
            <Card className="p-4 flex flex-col">
              <div className="mb-2">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                <span className="text-sm font-medium">New York, NY</span>
              </div>
              <div className="text-xs text-muted-foreground">Within range to NYC metro area</div>
            </Card>
            <Card className="p-4 flex flex-col">
              <div className="mb-2">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                <span className="text-sm font-medium">Full-time</span>
              </div>
              <div className="text-xs text-muted-foreground">Standard 40h/week</div>
            </Card>
            <Card className="p-4 flex flex-col">
              <div className="mb-2">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                <span className="text-sm font-medium">Hybrid work format</span>
              </div>
              <div className="text-xs text-muted-foreground">2-3 days in office</div>
            </Card>
            <Card className="p-4 flex flex-col">
              <div className="mb-2">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                <span className="text-sm font-medium">Senior level</span>
              </div>
              <div className="text-xs text-muted-foreground">Your level: Senior</div>
            </Card>
            <Card className="p-4 flex flex-col">
              <div className="mb-2">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                <span className="text-sm font-medium">Requires 5+ years of experience</span>
              </div>
              <div className="text-xs text-muted-foreground">You have experience: 6 yrs</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button 
          size="lg"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Apply now
        </Button>
        <Button variant="outline" size="lg">
          Fit my docs
        </Button>
      </div>
      
      {/* Job description */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <p className="text-muted-foreground mb-6">
          We are looking for a proactive team player who can make a difference in his/her 
          role within our community as we have an immediate opening for a full-time/part-time 
          Data Entry Operator.
        </p>
        
        <h2 className="text-xl font-bold mb-4">Tech stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Python</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Adobe Photoshop</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Sketch</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Zoom XD</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Figma</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Node.js</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">React.js</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Leaflet</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Miro</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Notion</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Google Analytics</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Google Forms</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">ChatGPT</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Canva</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">Typeform</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none">UserTesting</Badge>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Solve complex design challenges through wireframing, crafting high-fidelity 
            user interfaces, and creating sophisticated functional prototypes using Figma 
            or similar UX/UI tools while collaborating with cross-functional teams 
            and maintain consistency across the entire product portfolio while setting 
            standards for design excellence
          </li>
          <li>Lead design strategy for product by conducting research to uncover deep insights, 
            shaping and validating high-impact design strategies and decisions
          </li>
          <li>Thrive in a fast-paced Agile environment</li>
          <li>Stay at the forefront of industry trends, emerging technologies, and advanced 
            design methodologies, leveraging this expertise to drive innovation and elevate 
            design practices
          </li>
          <li>Contribute to a positive and collaborative team culture</li>
        </ul>
        
        <h2 className="text-xl font-bold mb-4">Qualification</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Minimum 5+ years of demonstrable success designing user interfaces for SaaS 
            products
          </li>
          <li>Excellent communication skills - able to clearly articulate design decisions and 
            work collaboratively with Product Management, Engineering, and Customer 
            Success
          </li>
          <li>Experience working with Agile/Scrum methodologies</li>
          <li>Expert working knowledge of Figma or a similar design tool</li>
          <li>Strong portfolio showcasing a range of design projects including research 
            artifacts, wireframes, and visual designs
          </li>
          <li>Familiar with front-end development technologies (HTML, CSS, JavaScript, 
            React.js)
          </li>
        </ul>
        
        <h2 className="text-xl font-bold mb-4">We offer</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Medical coverage for employees and dependents (80-90% covered by employer)</li>
          <li>Flexible hours with work from home option</li>
          <li>401(k) match up to 5.5%</li>
          <li>Dependent Care Flexible Spending Account (FSA)</li>
          <li>Dental & Vision coverage available</li>
          <li>Basic Life and AD&D Insurance</li>
          <li>Paid Maternity Leave</li>
          <li>Flexible Time Off & 11 Paid Annual Holidays</li>
          <li>Paid Parental Leave</li>
        </ul>
        
        <div className="bg-gray-50 rounded-lg p-6 my-6">
          <p className="text-muted-foreground text-sm italic mb-2">
            We are looking for a proactive team player who can make a difference in his/her 
            role within our community as we have an immediate opening for a full-time/part-time 
            Data Entry Operator.
          </p>
          <div className="flex justify-center">
            <Button variant="outline" size="sm">
              Show original description
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button 
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Apply now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;