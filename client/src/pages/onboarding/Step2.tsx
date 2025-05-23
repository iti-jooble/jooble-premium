import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

const OnboardingStep2: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleContinue = () => {
    setLocation("/onboarding/3");
  };

  return (
    <OnboardingLayout step={2}>
      <div className="py-2">
        <h2 className="text-3xl font-bold mb-12 text-center">
          How Fitly works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Upload Resume Card */}
            <div className="bg-white rounded-xl p-8 h-full shadow-sm">
              <h3 className="text-2xl font-bold mb-2">Upload resume</h3>
              <p className="text-gray-700 mb-8">
                Or answer a few quick questions about your job preferences — we'll
                do the rest.
              </p>
              <div className="flex justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-48 bg-indigo-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="absolute transform rotate-12 -translate-y-4 translate-x-4">
                      <div className="w-32 h-40 bg-white shadow-md rounded-lg flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-indigo-300">CV</span>
                        <div className="absolute bottom-5 right-5 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Get Jobs Card */}
            <div className="bg-white rounded-xl p-8 h-full shadow-sm">
              <h3 className="text-2xl font-bold mb-2">Get jobs that fit you</h3>
              <p className="text-gray-700 mb-6">
                We scan the internet and show you roles that fit your skills, experience,
                and goals.
              </p>

              <div className="flex justify-between mt-8 space-x-4">
                {/* Job Match Card 1 */}
                <div className="bg-white rounded-lg shadow p-3 flex-1">
                  <p className="text-xs text-gray-600 font-medium">UX Designer</p>
                  <p className="text-xs text-gray-500 mb-1">in Mirror Lab</p>
                  <div className="relative h-16 w-16 mx-auto">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-200">
                      <div 
                        className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-indigo-400"
                        style={{ 
                          clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                          transform: 'rotate(90deg)'
                        }}
                      ></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
                      50%
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 text-center mt-1">matching score</p>
                </div>

                {/* Job Match Card 2 */}
                <div className="bg-white rounded-lg shadow p-3 flex-1">
                  <p className="text-xs text-gray-600 font-medium">UX/UI Specialist</p>
                  <p className="text-xs text-gray-500 mb-1">in Market X</p>
                  <div className="relative h-16 w-16 mx-auto">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-200">
                      <div 
                        className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-indigo-400"
                        style={{ 
                          clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 65%)',
                          transform: 'rotate(90deg)'
                        }}
                      ></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
                      65%
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 text-center mt-1">matching score</p>
                </div>

                {/* Job Match Card 3 */}
                <div className="bg-white rounded-lg shadow p-3 flex-1">
                  <p className="text-xs text-gray-600 font-medium">Product Designer</p>
                  <p className="text-xs text-gray-500 mb-1">in LO Marketing</p>
                  <div className="relative h-16 w-16 mx-auto">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-200">
                      <div 
                        className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-indigo-400"
                        style={{ 
                          clipPath: 'polygon(0 0, 100% 0, 100% 87%, 0 87%)',
                          transform: 'rotate(90deg)'
                        }}
                      ></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
                      87%
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 text-center mt-1">matching score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Boost Response Rate Card */}
          <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-2">Boost your response rate by 4x</h3>
            <p className="text-gray-700 mb-8">
              Fitly adapts your resume and cover letter for each role to highlight why
              you are the perfect fit.
            </p>

            <div className="flex-grow relative mt-4">
              <div className="relative flex justify-center">
                {/* Score Card */}
                <div className="absolute top-5 w-44 h-32 bg-white rounded-md shadow-md border border-gray-100 p-2 z-10">
                  <div className="relative h-16">
                    <div className="absolute top-1 right-1 w-3 h-3 bg-white border border-gray-200 rounded-sm"></div>
                    <div className="absolute top-1 left-1 w-3 h-3 bg-white border border-gray-200 rounded-sm"></div>
                    <div className="absolute bottom-1 right-1 w-3 h-3 bg-white border border-gray-200 rounded-sm"></div>
                    <div className="absolute bottom-1 left-1 w-3 h-3 bg-white border border-gray-200 rounded-sm"></div>
                    
                    {/* Score Gauge */}
                    <div className="flex justify-center mt-1">
                      <div className="relative w-24 h-12">
                        <div className="absolute top-0 left-0 w-full h-full">
                          <svg viewBox="0 0 100 50" className="w-full h-full">
                            <path d="M 10,50 A 40,40 0 0,1 90,50" fill="none" stroke="#E0E0E0" strokeWidth="8" />
                            <path d="M 10,50 A 40,40 0 0,1 90,50" fill="none" stroke="#4ADE80" strokeWidth="8" strokeDasharray="126" strokeDashoffset="50" />
                          </svg>
                          <div className="absolute top-0 right-8 transform translate-x-1/2 -translate-y-1/2">
                            <div className="bg-green-400 rounded-full w-3 h-3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-xs font-medium">
                      Score Boost: 47 → 87
                    </div>
                  </div>
                  
                  {/* Score Details */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px]">Relevance to the job</span>
                      <div className="flex items-center">
                        <div className="w-12 h-1.5 bg-indigo-500 rounded-full mr-1"></div>
                        <span className="text-[10px]">9.8</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px]">Keywords</span>
                      <div className="flex items-center">
                        <div className="w-10 h-1.5 bg-indigo-500 rounded-full mr-1"></div>
                        <span className="text-[10px]">9.5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px]">ATS-friendly</span>
                      <div className="flex items-center">
                        <div className="w-8 h-1.5 bg-indigo-500 rounded-full mr-1"></div>
                        <span className="text-[10px]">9.1</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Visual */}
                <div className="absolute top-32 w-full px-10">
                  <div className="bg-green-100 rounded-md p-4 pt-12 shadow-sm border border-green-200 mt-10">
                    {/* Document UI */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded-full w-3/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-1/2"></div>
                      </div>
                    </div>
                    
                    {/* Skills Tags */}
                    <div className="mt-8 flex flex-wrap gap-2 justify-center">
                      <div className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full mr-1"></span>
                        Agile frameworks
                      </div>
                      <div className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full mr-1"></span>
                        Problem-solving
                      </div>
                      <div className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full mr-1"></span>
                        Cross-functional teamwork
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            onClick={handleContinue}
            className="text-white font-semibold rounded-xl py-6 px-10 text-lg h-14 bg-indigo-950"
          >
            Let's start
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep2;
