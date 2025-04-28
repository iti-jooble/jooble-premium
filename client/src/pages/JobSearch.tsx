import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { SearchForm, JobListings, FilterBar } from "@/components/job-search";
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

// Mock job data - using Duolingo for all entries as shown in the image
const jobListings = [
  {
    id: "1",
    title: "Certified English Tutor (remote working)",
    company: "Duolingo",
    location: "New York, NY",
    type: "Hybrid",
    salary: "$59 per hour",
    posted: "5 days ago",
    isNew: true,
    description: `
      <h4 class="text-lg font-semibold mb-3">About The Role</h4>
      <p class="mb-3">We're looking for certified English tutors to join our remote teaching team. You'll be working with students from around the world, helping them improve their English language skills through our innovative platform.</p>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Requirements</h4>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li>5+ years of English teaching experience</li>
        <li>TEFL, CELTA, or equivalent certification</li>
        <li>Excellent communication skills</li>
        <li>Experience with online teaching platforms</li>
        <li>Bachelor's degree in Education, English, or related field</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Benefits</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Competitive hourly rate</li>
        <li>Flexible schedule</li>
        <li>Professional development opportunities</li>
        <li>Access to teaching resources</li>
        <li>Supportive teaching community</li>
      </ul>
    `,
  },
  {
    id: "2",
    title: "Certified English Tutor (remote working)",
    company: "Duolingo",
    location: "New York, NY",
    type: "Hybrid",
    salary: "$59 per hour",
    posted: "5 days ago",
    isNew: true,
    description: `
      <h4 class="text-lg font-semibold mb-3">About The Role</h4>
      <p class="mb-3">We're looking for certified English tutors to join our remote teaching team. You'll be working with students from around the world, helping them improve their English language skills through our innovative platform.</p>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Requirements</h4>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li>5+ years of English teaching experience</li>
        <li>TEFL, CELTA, or equivalent certification</li>
        <li>Excellent communication skills</li>
        <li>Experience with online teaching platforms</li>
        <li>Bachelor's degree in Education, English, or related field</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Benefits</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Competitive hourly rate</li>
        <li>Flexible schedule</li>
        <li>Professional development opportunities</li>
        <li>Access to teaching resources</li>
        <li>Supportive teaching community</li>
      </ul>
    `,
  },
  {
    id: "3",
    title: "Certified English Tutor (remote working)",
    company: "Duolingo",
    location: "New York, NY",
    type: "Hybrid",
    salary: "$59 per hour",
    posted: "5 days ago",
    isNew: false,
    description: `
      <h4 class="text-lg font-semibold mb-3">About The Role</h4>
      <p class="mb-3">We're looking for certified English tutors to join our remote teaching team. You'll be working with students from around the world, helping them improve their English language skills through our innovative platform.</p>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Requirements</h4>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li>5+ years of English teaching experience</li>
        <li>TEFL, CELTA, or equivalent certification</li>
        <li>Excellent communication skills</li>
        <li>Experience with online teaching platforms</li>
        <li>Bachelor's degree in Education, English, or related field</li>
      </ul>
      
      <h4 class="text-lg font-semibold mb-3 mt-5">Benefits</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Competitive hourly rate</li>
        <li>Flexible schedule</li>
        <li>Professional development opportunities</li>
        <li>Access to teaching resources</li>
        <li>Supportive teaching community</li>
      </ul>
    `,
  },
  {
    id: "4",
    title: "Certified English Tutor (remote working)",
    company: "Duolingo",
    location: "New York, NY",
    type: "Hybrid",
    salary: "$59 per hour",
    posted: "5 days ago",
    isNew: false,
    description: `
      <h4 class="text-lg font-semibold mb-3">About The Role</h4>
      <p class="mb-3">We're looking for certified English tutors to join our remote teaching team. You'll be working with students from around the world, helping them improve their English language skills through our innovative platform.</p>

      <h4 class="text-lg font-semibold mb-3 mt-5">Requirements</h4>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li>5+ years of English teaching experience</li>
        <li>TEFL, CELTA, or equivalent certification</li>
        <li>Excellent communication skills</li>
        <li>Experience with online teaching platforms</li>
        <li>Bachelor's degree in Education, English, or related field</li>
      </ul>

      <h4 class="text-lg font-semibold mb-3 mt-5">Benefits</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Competitive hourly rate</li>
        <li>Flexible schedule</li>
        <li>Professional development opportunities</li>
        <li>Access to teaching resources</li>
        <li>Supportive teaching community</li>
      </ul>
    `,
  },
  {
    id: "5",
    title: "Certified English Tutor (remote working)",
    company: "Duolingo",
    location: "New York, NY",
    type: "Hybrid",
    salary: "$59 per hour",
    posted: "5 days ago",
    isNew: false,
    description: `
      <h4 class="text-lg font-semibold mb-3">About The Role</h4>
      <p class="mb-3">We're looking for certified English tutors to join our remote teaching team. You'll be working with students from around the world, helping them improve their English language skills through our innovative platform.</p>

      <h4 class="text-lg font-semibold mb-3 mt-5">Requirements</h4>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li>5+ years of English teaching experience</li>
        <li>TEFL, CELTA, or equivalent certification</li>
        <li>Excellent communication skills</li>
        <li>Experience with online teaching platforms</li>
        <li>Bachelor's degree in Education, English, or related field</li>
      </ul>

      <h4 class="text-lg font-semibold mb-3 mt-5">Benefits</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li>Competitive hourly rate</li>
        <li>Flexible schedule</li>
        <li>Professional development opportunities</li>
        <li>Access to teaching resources</li>
        <li>Supportive teaching community</li>
      </ul>
    `,
  }
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
            1512 {t("jobSearch.subtitle")}
          </p>
        </div>
      </div>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} />

      {/* Main Content with Job Listings and Filters */}
      <div className="flex">
        <JobListings
          jobs={stripDescriptions(filteredJobs)}
          selectedJobId={selectedJob?.id || null}
          onSelectJob={handleJobSelect}
        />
        <FilterBar />
      </div>
    </div>
  );
};

export default JobSearch;
