import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  SearchIcon,
  MapPinIcon,
  BriefcaseIcon,
  DollarSignIcon,
  FilterIcon,
  StarIcon,
  ChevronDownIcon,
  CalendarIcon,
  ClockIcon,
  BuildingIcon,
  CheckCircleIcon,
  XIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock job data
const jobListings = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    isNew: true,
    description: `
      <h4 class="text-lg font-semibold mb-3">About The Role</h4>
      <p class="mb-3">Join our team to build cutting-edge web applications using React, TypeScript, and modern frontend technologies. You'll be working alongside talented engineers and designers to create exceptional user experiences.</p>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Requirements</h4>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li>5+ years of experience with JavaScript and modern frameworks</li>
        <li>Strong knowledge of React, TypeScript, and state management</li>
        <li>Experience with responsive design and cross-browser compatibility</li>
        <li>Familiarity with RESTful APIs and GraphQL</li>
        <li>Bachelor's degree in Computer Science or related field</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Benefits</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Competitive salary and equity package</li>
        <li>Comprehensive health, dental, and vision coverage</li>
        <li>Flexible remote work policy</li>
        <li>Professional development budget</li>
        <li>Unlimited PTO policy</li>
      </ul>
    `,
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Design Studio Ltd.",
    location: "London, UK (Hybrid)",
    type: "Full-time",
    salary: "£50,000 - £65,000",
    posted: "5 days ago",
    isNew: false,
    description: `
      <h4 class="text-lg font-semibold mb-3">About The Role</h4>
      <p class="mb-3">We're looking for a passionate UX/UI Designer to create beautiful, intuitive interfaces for our clients. You'll lead design projects from concept to implementation, working closely with our product and development teams.</p>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Requirements</h4>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li>3+ years of experience in UX/UI design</li>
        <li>Proficiency with design tools like Figma, Sketch, and Adobe Creative Suite</li>
        <li>Strong portfolio demonstrating user-centered design process</li>
        <li>Experience conducting user research and usability testing</li>
        <li>Excellent communication and presentation skills</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Benefits</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Competitive salary</li>
        <li>Private healthcare</li>
        <li>Flexible working arrangements</li>
        <li>25 days annual leave</li>
        <li>Professional development opportunities</li>
      </ul>
    `,
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "Cloud Solutions Co.",
    location: "Austin, TX (On-site)",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    posted: "1 week ago",
    isNew: false,
    description: `
      <h4 class="text-lg font-semibold mb-3">About The Role</h4>
      <p class="mb-3">We're seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. You'll be responsible for automating deployments, monitoring systems, and ensuring high availability of our services.</p>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Requirements</h4>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li>3+ years of experience in a DevOps role</li>
        <li>Strong knowledge of AWS or Azure cloud services</li>
        <li>Experience with containerization (Docker, Kubernetes)</li>
        <li>Proficiency with CI/CD pipelines</li>
        <li>Scripting skills (Python, Bash)</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Benefits</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Competitive salary</li>
        <li>Health, dental, and vision insurance</li>
        <li>401(k) matching</li>
        <li>Quarterly bonuses</li>
        <li>Regular team events</li>
      </ul>
    `,
  }
];

const JobSearch = () => {
  const [selectedJob, setSelectedJob] = useState<(typeof jobListings)[0] | null>(null);

  const handleJobSelect = (job: typeof jobListings[0]) => {
    setSelectedJob(job);
  };

  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300 bg-gradient-to-b from-background to-muted/20 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Job Search</h1>
        <p className="text-muted-foreground mt-2">Search thousands of job listings from multiple sources in one place</p>
      </div>

      {/* Search Form */}
      <Card className="shadow-sm mb-6 border-border/40">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-2">
              <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input placeholder="Job title, keywords, or company" className="pl-10" />
            </div>
            <div className="relative">
              <MapPinIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input placeholder="Location" className="pl-10" />
            </div>
            <Button>Search Jobs</Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              Job Type
              <ChevronDownIcon className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((type) => (
                <DropdownMenuItem key={type} className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id={`type-${type}`} className="rounded" />
                    <label htmlFor={`type-${type}`}>{type}</label>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              <BuildingIcon className="h-4 w-4 mr-2" />
              Experience Level
              <ChevronDownIcon className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {["Entry Level", "Mid Level", "Senior Level", "Manager", "Executive"].map((level) => (
                <DropdownMenuItem key={level} className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id={`level-${level}`} className="rounded" />
                    <label htmlFor={`level-${level}`}>{level}</label>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              <DollarSignIcon className="h-4 w-4 mr-2" />
              Salary Range
              <ChevronDownIcon className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Salary Range</h4>
              <Slider defaultValue={[100000]} max={200000} step={10000} className="my-6" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$100,000</span>
                <span>$200,000+</span>
              </div>
              <div className="pt-2 flex justify-end">
                <Button size="sm">Apply</Button>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Date Posted
          <ChevronDownIcon className="h-4 w-4 ml-2" />
        </Button>

        <Button variant="outline" size="sm" className="ml-auto flex items-center">
          Clear All
          <XIcon className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Job Listings and Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Job Listings */}
        <div className="lg:col-span-5">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <span>Job Listings</span>
            <Badge variant="outline" className="ml-2">
              {jobListings.length} results
            </Badge>
          </h2>

          <div className="space-y-4">
            {jobListings.map((job) => (
              <Card 
                key={job.id} 
                className={`shadow-sm border hover:border-primary/40 cursor-pointer transition-all ${
                  selectedJob?.id === job.id ? 'border-primary' : 'border-border/40'
                }`}
                onClick={() => handleJobSelect(job)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <div className="text-muted-foreground text-sm">{job.company}</div>
                    </div>
                    {job.isNew && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-3">
                    <div className="flex items-center">
                      <MapPinIcon className="h-3 w-3 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <BriefcaseIcon className="h-3 w-3 mr-1" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSignIcon className="h-3 w-3 mr-1" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                        {selectedJob?.id === job.id ? 'Selected' : 'View Details'}
                      </Button>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Detail */}
        <div className="lg:col-span-7">
          {selectedJob ? (
            <Card className="shadow-sm sticky top-4 border-border/40">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
                    <div className="text-muted-foreground">{selectedJob.company}</div>
                  </div>
                  <Button size="sm" variant="outline" className="flex items-center">
                    <StarIcon className="h-4 w-4 mr-2" />
                    Save Job
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground my-4">
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-4 w-4 mr-1" />
                    <span>{selectedJob.type}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSignIcon className="h-4 w-4 mr-1" />
                    <span>{selectedJob.salary}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>Posted {selectedJob.posted}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <StarIcon className="h-4 w-4 mr-2" />
                    Save Job
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-sm sticky top-4 flex flex-col items-center justify-center p-12 text-center border-border/40">
              <div className="text-muted-foreground mb-4">
                <SearchIcon className="h-12 w-12 mx-auto opacity-20" />
              </div>
              <h3 className="text-xl font-medium mb-2">Select a job listing</h3>
              <p className="text-muted-foreground">
                Click on a job from the list to view its details here
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
