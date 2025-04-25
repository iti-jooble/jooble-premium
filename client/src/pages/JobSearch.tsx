import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { SearchForm, JobListings, JobDetail } from "@/components/job-search";
import { JobCardProps } from "@/components/job-search/JobCard";

// Define job types for our page
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

// Function to get jobs without description for compatibility with JobListings
const stripDescriptions = (
  jobs: JobWithDescription[],
): JobCardProps["job"][] => {
  return jobs.map(({ description, ...rest }) => rest);
};

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
    isNew: true,
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
  },
  {
    id: "4",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    isNew: false,
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
    id: "5",
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
    id: "6",
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
  },
  {
    id: "7",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    isNew: false,
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
    id: "8",
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
    id: "9",
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
  },
];

interface JobSearchParams {
  keywords: string;
  location: string;
}

const JobSearch = () => {
  const { t } = useTranslation();
  const [selectedJob, setSelectedJob] = useState<
    (typeof jobListings)[0] | null
  >(null);
  const [filteredJobs, setFilteredJobs] = useState(jobListings);

  const handleJobSelect = (job: JobCardProps["job"]) => {
    // Find the full job data including description
    const fullJobData = jobListings.find((j) => j.id === job.id);
    if (fullJobData) {
      setSelectedJob(fullJobData);
    }
  };

  const handleSearch = (searchParams: JobSearchParams) => {
    // In a real app, this would call an API with the search parameters
    // For now, we'll just filter our mock data
    const { keywords, location } = searchParams;

    const filtered = jobListings.filter((job) => {
      const matchesKeywords =
        keywords === "" ||
        job.title.toLowerCase().includes(keywords.toLowerCase()) ||
        job.company.toLowerCase().includes(keywords.toLowerCase()) ||
        job.description.toLowerCase().includes(keywords.toLowerCase());

      const matchesLocation =
        location === "" ||
        job.location.toLowerCase().includes(location.toLowerCase());

      return matchesKeywords && matchesLocation;
    });

    setFilteredJobs(filtered);

    if (filtered.length === 0) {
      toast({
        title: t("jobSearch.noResults.title"),
        description: t("jobSearch.noResults.description"),
      });
    } else {
      toast({
        title: t("jobSearch.resultsFound.title", { count: filtered.length }),
        description: t("jobSearch.resultsFound.description", {
          count: filtered.length,
        }),
      });

      // Reset selected job when search results change
      setSelectedJob(null);
    }
  };

  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("jobSearch.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("jobSearch.subtitle")}
          </p>
        </div>
      </div>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} />

      {/* Filters */}
      {/* <FilterBar /> */}

      {/* Job Listings and Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <JobListings
          jobs={stripDescriptions(filteredJobs)}
          selectedJobId={selectedJob?.id || null}
          onSelectJob={handleJobSelect}
        />
        <JobDetail selectedJob={selectedJob} />
      </div>
    </div>
  );
};

export default JobSearch;
