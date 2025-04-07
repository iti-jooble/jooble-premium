import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, MapPinIcon, BriefcaseIcon, DollarSignIcon } from "lucide-react";

const JobSearch = () => {
  return (
    <div className="p-8 animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Job Search</h1>
        <p className="text-neutral-600 mt-1">Search thousands of job listings from multiple sources in one place</p>
      </div>

      <Card className="shadow-sm mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-2">
              <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-neutral-400" />
              <Input placeholder="Job title, keywords, or company" className="pl-10" />
            </div>
            <div className="relative">
              <MapPinIcon className="h-4 w-4 absolute left-3 top-3 text-neutral-400" />
              <Input placeholder="Location" className="pl-10" />
            </div>
            <Button className="h-10">Search Jobs</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Job Listings</h2>
          
          <Card className="shadow-sm mb-4">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Senior Frontend Developer</h3>
                  <div className="text-neutral-600">TechCorp Inc.</div>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                  New
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-4">
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>San Francisco, CA (Remote)</span>
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="h-4 w-4 mr-1" />
                  <span>Full-time</span>
                </div>
                <div className="flex items-center">
                  <DollarSignIcon className="h-4 w-4 mr-1" />
                  <span>$120,000 - $150,000</span>
                </div>
              </div>
              <p className="text-neutral-600 mb-4 text-sm">
                Join our team to build cutting-edge web applications using React, TypeScript, and modern frontend technologies...
              </p>
              <div className="flex justify-between items-center">
                <Button variant="outline">View Details</Button>
                <span className="text-xs text-neutral-500">Posted 2 days ago</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">UX/UI Designer</h3>
                  <div className="text-neutral-600">Design Studio Ltd.</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-4">
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>London, UK (Hybrid)</span>
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="h-4 w-4 mr-1" />
                  <span>Full-time</span>
                </div>
                <div className="flex items-center">
                  <DollarSignIcon className="h-4 w-4 mr-1" />
                  <span>£50,000 - £65,000</span>
                </div>
              </div>
              <p className="text-neutral-600 mb-4 text-sm">
                We're looking for a passionate UX/UI Designer to create beautiful, intuitive interfaces for our clients...
              </p>
              <div className="flex justify-between items-center">
                <Button variant="outline">View Details</Button>
                <span className="text-xs text-neutral-500">Posted 5 days ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <Card className="shadow-sm sticky top-4">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Job Type</h3>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((type) => (
                      <div key={type} className="flex items-center">
                        <input type="checkbox" id={type} className="mr-2" />
                        <label htmlFor={type} className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Experience Level</h3>
                  <div className="space-y-2">
                    {["Entry Level", "Mid Level", "Senior Level", "Manager", "Executive"].map((level) => (
                      <div key={level} className="flex items-center">
                        <input type="checkbox" id={level} className="mr-2" />
                        <label htmlFor={level} className="text-sm">{level}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Salary Range</h3>
                  <div className="space-y-2">
                    <Input type="range" min="0" max="200000" className="w-full" />
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>$0</span>
                      <span>$200,000+</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
