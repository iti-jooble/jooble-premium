import React, { useState } from "react";
import { useLocation } from "wouter";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { saveUserPreferences } from "@/utils/localStorage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { MAX_SALARY, MAX_YEARS_OF_EXPERIENCE } from "@/components/job-search/constants";
import { JobTypes, LocationTypes, ExperienceLevels } from "@/components/job-search/enums";

const OnboardingStep4: React.FC = () => {
  const [_, setLocation] = useLocation();
  const [jobTitles, setJobTitles] = useState<string[]>(["UX Designer", "Product Designer"]);
  const [locations, setLocations] = useState<string[]>(["New York", "London"]);
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(3);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 23000]);
  const [newJobTitle, setNewJobTitle] = useState<string>("");
  const [newLocation, setNewLocation] = useState<string>("");

  // Job type preferences
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobTypes[]>([JobTypes.FullTime]);

  // Location type preferences
  const [selectedLocationTypes, setSelectedLocationTypes] = useState<LocationTypes[]>([LocationTypes.OnSite]);

  // Experience level preferences
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<ExperienceLevels[]>([
    ExperienceLevels.Junior,
    ExperienceLevels.Intern
  ]);

  const addJobTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newJobTitle.trim()) {
      setJobTitles([...jobTitles, newJobTitle.trim()]);
      setNewJobTitle("");
      e.preventDefault();
    }
  };

  const removeJobTitle = (title: string) => {
    setJobTitles(jobTitles.filter(t => t !== title));
  };

  const addLocation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newLocation.trim()) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation("");
      e.preventDefault();
    }
  };

  const removeLocation = (location: string) => {
    setLocations(locations.filter(l => l !== location));
  };

  const toggleJobType = (jobType: JobTypes) => {
    if (selectedJobTypes.includes(jobType)) {
      setSelectedJobTypes(selectedJobTypes.filter(t => t !== jobType));
    } else {
      setSelectedJobTypes([...selectedJobTypes, jobType]);
    }
  };

  const toggleLocationType = (locationType: LocationTypes) => {
    if (selectedLocationTypes.includes(locationType)) {
      setSelectedLocationTypes(selectedLocationTypes.filter(t => t !== locationType));
    } else {
      setSelectedLocationTypes([...selectedLocationTypes, locationType]);
    }
  };

  const toggleExperienceLevel = (level: ExperienceLevels) => {
    if (selectedExperienceLevels.includes(level)) {
      setSelectedExperienceLevels(selectedExperienceLevels.filter(l => l !== level));
    } else {
      setSelectedExperienceLevels([...selectedExperienceLevels, level]);
    }
  };

  const handleSubmit = () => {
    // Save preferences to localStorage
    saveUserPreferences({
      onboardingCompleted: true,
      jobPreferences: {
        jobTitles,
        locations,
        jobTypes: selectedJobTypes,
        locationTypes: selectedLocationTypes,
        experienceLevels: selectedExperienceLevels,
        yearsOfExperience,
        salaryRange: {
          min: salaryRange[0],
          max: salaryRange[1]
        }
      }
    });

    // Redirect to main app
    setLocation("/");
  };

  return (
    <OnboardingLayout step={4}>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Review and confirm your preferences
        </h2>
        <p className="text-gray-600 text-center mb-6">
          It's important to find jobs that truly fit you.
        </p>

        {/* Job Title Section */}
        <div className="mb-6">
          <Label htmlFor="job-title" className="block text-sm font-medium mb-2">
            Job title
          </Label>
          <Input
            id="job-title"
            placeholder="Add job title"
            value={newJobTitle}
            onChange={(e) => setNewJobTitle(e.target.value)}
            onKeyDown={addJobTitle}
            className="mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {jobTitles.map((title) => (
              <div key={title} className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-1">
                <span className="mr-2">{title}</span>
                <button
                  onClick={() => removeJobTitle(title)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-6">
          <Label htmlFor="location" className="block text-sm font-medium mb-2">
            Location
          </Label>
          <Input
            id="location"
            placeholder="Add location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyDown={addLocation}
            className="mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-1">
                <span className="mr-2">{location}</span>
                <button
                  onClick={() => removeLocation(location)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Job Type Section */}
        <div className="mb-6">
          <Label className="block text-sm font-medium mb-2">
            Job Type
          </Label>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="full-time" 
                checked={selectedJobTypes.includes(JobTypes.FullTime)}
                onCheckedChange={() => toggleJobType(JobTypes.FullTime)}
              />
              <Label htmlFor="full-time">Full-time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="contract" 
                checked={selectedJobTypes.includes(JobTypes.Contract)}
                onCheckedChange={() => toggleJobType(JobTypes.Contract)}
              />
              <Label htmlFor="contract">Contract</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="internship" 
                checked={selectedJobTypes.includes(JobTypes.Internship)}
                onCheckedChange={() => toggleJobType(JobTypes.Internship)}
              />
              <Label htmlFor="internship">Internship</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="part-time" 
                checked={selectedJobTypes.includes(JobTypes.PartTime)}
                onCheckedChange={() => toggleJobType(JobTypes.PartTime)}
              />
              <Label htmlFor="part-time">Part-time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="freelance" 
                checked={selectedJobTypes.includes(JobTypes.Freelance)}
                onCheckedChange={() => toggleJobType(JobTypes.Freelance)}
              />
              <Label htmlFor="freelance">Freelance</Label>
            </div>
          </div>
        </div>

        {/* Location Type Section */}
        <div className="mb-6">
          <Label className="block text-sm font-medium mb-2">
            Location Type
          </Label>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="onsite" 
                checked={selectedLocationTypes.includes(LocationTypes.OnSite)}
                onCheckedChange={() => toggleLocationType(LocationTypes.OnSite)}
              />
              <Label htmlFor="onsite">Onsite</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remote" 
                checked={selectedLocationTypes.includes(LocationTypes.Remote)}
                onCheckedChange={() => toggleLocationType(LocationTypes.Remote)}
              />
              <Label htmlFor="remote">Remote</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hybrid" 
                checked={selectedLocationTypes.includes(LocationTypes.Hybrid)}
                onCheckedChange={() => toggleLocationType(LocationTypes.Hybrid)}
              />
              <Label htmlFor="hybrid">Hybrid</Label>
            </div>
          </div>
        </div>

        {/* Experience Level Section */}
        <div className="mb-6">
          <Label className="block text-sm font-medium mb-2">
            Experience Level
          </Label>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="entry-level" 
                checked={selectedExperienceLevels.includes(ExperienceLevels.Intern)}
                onCheckedChange={() => toggleExperienceLevel(ExperienceLevels.Intern)}
              />
              <Label htmlFor="entry-level">Entry-level</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="senior" 
                checked={selectedExperienceLevels.includes(ExperienceLevels.Senior)}
                onCheckedChange={() => toggleExperienceLevel(ExperienceLevels.Senior)}
              />
              <Label htmlFor="senior">Senior</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="director" 
                checked={selectedExperienceLevels.includes(ExperienceLevels.Director)}
                onCheckedChange={() => toggleExperienceLevel(ExperienceLevels.Director)}
              />
              <Label htmlFor="director">Director</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="junior" 
                checked={selectedExperienceLevels.includes(ExperienceLevels.Junior)}
                onCheckedChange={() => toggleExperienceLevel(ExperienceLevels.Junior)}
              />
              <Label htmlFor="junior">Junior</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="manager" 
                checked={selectedExperienceLevels.includes(ExperienceLevels.Manager)}
                onCheckedChange={() => toggleExperienceLevel(ExperienceLevels.Manager)}
              />
              <Label htmlFor="manager">Manager</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="executive" 
                checked={selectedExperienceLevels.includes(ExperienceLevels.CLevel)}
                onCheckedChange={() => toggleExperienceLevel(ExperienceLevels.CLevel)}
              />
              <Label htmlFor="executive">Executive</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mid-level" 
                checked={selectedExperienceLevels.includes(ExperienceLevels.MidLevel)}
                onCheckedChange={() => toggleExperienceLevel(ExperienceLevels.MidLevel)}
              />
              <Label htmlFor="mid-level">Mid-level</Label>
            </div>
          </div>
        </div>

        {/* Years of Experience Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium">Years of Experience:</Label>
            <span className="text-sm font-medium">{yearsOfExperience} years</span>
          </div>
          <Slider
            value={[yearsOfExperience]}
            onValueChange={(value) => setYearsOfExperience(value[0])}
            max={MAX_YEARS_OF_EXPERIENCE}
            step={1}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0 years</span>
            <span>10+ years</span>
          </div>
        </div>

        {/* Salary Range Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium">Salary Range:</Label>
            <span className="text-sm font-medium">${salaryRange[0]} – ${salaryRange[1]}/year</span>
          </div>
          <Slider
            value={salaryRange}
            onValueChange={(value) => setSalaryRange([value[0], value[1]])}
            min={0}
            max={MAX_SALARY}
            step={1000}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$200,000+</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <Button 
            onClick={handleSubmit} 
            className="bg-[#0066FF] hover:bg-[#0055DD] text-white font-semibold rounded-full py-3 px-10"
          >
            Show jobs
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep4;