import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { jobsSelectors, userSelectors } from "@/redux/selectors";
import {
  refreshJobs,
  updatePreferences,
  initJobs,
  loadMore,
} from "@/redux/thunks";
import { JobCardProps } from "@/components/job-search/JobCard";
import { SearchForm, JobListings, FilterBar } from "@/components/job-search";
import { useLayoutEffect } from "react";

// Mock job data - using Duolingo for all entries as shown in the image
export const jobListings = [];

const JobSearch = () => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(jobsSelectors.getJobsSelector);
  const totalJobsCount = useAppSelector(
    jobsSelectors.getTotalJobsCountSelector,
  );
  const { isInitialized, isLoading, error } = useAppSelector(
    jobsSelectors.getJobSearchState,
  );
  const { keywords } = useAppSelector(userSelectors.getUserPreferencesSelector);

  const hasMoreJobs = jobs.length < totalJobsCount;

  const handleJobSelect = (job: JobCardProps["job"]) => {
    setLocation(`/job-details/${job.uid}`);
  };

  useLayoutEffect(() => {
    if (!isInitialized && !error) {
      dispatch(initJobs());
    }
  }, [isInitialized]);

  const handleSearch = async ({ keywords }: { keywords: string[] }) => {
    await dispatch(updatePreferences({ keywords }));

    await dispatch(refreshJobs());
  };

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  return (
    <div className="p-6 animate-in fade-in duration-300 min-h-screen max-w-[1012px] m-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("jobSearch.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {totalJobsCount} {t("jobSearch.subtitle")}
          </p>
        </div>
      </div>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} initialKeywords={keywords} />

      {/* Main Content with Job Listings and Filters */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListings
          jobs={jobs}
          isLoading={isLoading}
          onSelectJob={handleJobSelect}
          onLoadMore={hasMoreJobs ? handleLoadMore : undefined}
        />
        <FilterBar />
      </div>
    </div>
  );
};

export default JobSearch;
