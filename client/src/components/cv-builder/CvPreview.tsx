import { Button } from "@/components/ui/button";
import { MapPinIcon, PhoneIcon, MailIcon, FileText } from "lucide-react";
import { PersonalInfoValues } from "./PersonalInfoSection";

interface Skill {
  id: string;
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startYear: string;
  endYear: string | null;
  description: string;
  isCurrent: boolean;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startYear: string;
  endYear: string | null;
  description: string;
  isCurrent: boolean;
}

interface CvData {
  personalInfo: Partial<PersonalInfoValues>;
  summary?: string;
  skills?: Skill[];
  education?: Education[];
  workExperience?: WorkExperience[];
}

interface CvPreviewProps {
  data: CvData;
  onChangeTemplate: () => void;
}

export function CvPreview({ data, onChangeTemplate }: CvPreviewProps) {
  return (
    <div className="w-full lg:w-1/2 flex-shrink-0 bg-muted/30 rounded-lg p-5 flex flex-col items-center h-[calc(100vh-150px)]">
      <div className="flex justify-between items-center mb-4 flex-shrink-0 w-full max-w-[492px]">
        <h2 className="text-xl font-medium text-foreground flex items-center">
          <span className="mr-2 p-1 rounded-full bg-primary/10">
            <FileText className="h-4 w-4 text-primary" />
          </span>
          Preview
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onChangeTemplate}
          className="bg-card hover:bg-card/80 shadow-sm transition-all"
        >
          Change Template
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow-md overflow-auto flex-grow w-full max-w-[492px] border border-border/40">
        <div className="flex flex-col md:flex-row">
          {/* Left sidebar in preview */}
          <div className="w-full md:w-1/3 bg-blue-50 p-4">
            <div className="mb-6">
              <h3 className="text-blue-800 font-medium mb-2">Contact</h3>
              <div className="text-sm space-y-1.5">
                <div className="flex items-center text-gray-600">
                  <MailIcon className="h-3.5 w-3.5 mr-2" />
                  <span>
                    {data.personalInfo?.email || "john.doe@example.com"}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="h-3.5 w-3.5 mr-2" />
                  <span>{data.personalInfo?.phone || "+1 (555) 123-4567"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-3.5 w-3.5 mr-2" />
                  <span>
                    {data.personalInfo?.city || "New York"},{" "}
                    {data.personalInfo?.country || "USA"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-blue-800 font-medium mb-2">About</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {data.summary ||
                  "Experienced driver with excellent navigation skills. Committed to providing safe and efficient transportation services. Strong attention to detail and ability to handle various driving conditions."}
              </p>
            </div>

            <div>
              <h3 className="text-blue-800 font-medium mb-2">Skills</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                {data.skills && data.skills.length > 0 ? (
                  data.skills.map((skill) => (
                    <li key={skill.id}>{skill.name}</li>
                  ))
                ) : (
                  <>
                    <li>Navigation</li>
                    <li>Time Management</li>
                    <li>Customer Service</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Right content in preview */}
          <div className="w-full md:w-2/3 p-6">
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-gray-800">
                {data.personalInfo?.firstName || "Alyson"}{" "}
                {data.personalInfo?.lastName || "Lawrence"}
              </h1>
            </div>

            <div className="mb-6">
              <h2 className="text-blue-700 font-medium mb-2">Experience</h2>

              {data.workExperience && data.workExperience.length > 0 ? (
                data.workExperience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">{exp.company}</h3>
                        <h4 className="text-xs">{exp.position}</h4>
                      </div>
                      <div className="text-xs text-gray-500">
                        {exp.startYear} -{" "}
                        {exp.isCurrent ? "Present" : exp.endYear}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">ABC Company</h3>
                        <h4 className="text-xs">Driver</h4>
                      </div>
                      <div className="text-xs text-gray-500">
                        2018 - Present
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Driving vehicles and managing safe transportation.
                      Following traffic laws and ensuring on-time deliveries.
                      Maintaining client communication and vehicle maintenance.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">XYZ Corporation</h3>
                        <h4 className="text-xs">Driver</h4>
                      </div>
                      <div className="text-xs text-gray-500">2016 - 2017</div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Driving vehicles and delivering goods.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div>
              <h2 className="text-blue-700 font-medium mb-2">Education</h2>

              {data.education && data.education.length > 0 ? (
                data.education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">{edu.degree}</h3>
                        <h4 className="text-xs">{edu.field}</h4>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">{edu.school}</h3>
                      </div>
                      <div className="text-xs text-gray-500">
                        {edu.startYear} -{" "}
                        {edu.isCurrent ? "Present" : edu.endYear}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">Driving</h3>
                        <h4 className="text-xs">Driver's License</h4>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">
                          Department of Motor Vehicles
                        </h3>
                      </div>
                      <div className="text-xs text-gray-500">2009 - 2009</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">
                          General Education
                        </h3>
                        <h4 className="text-xs">High School Diploma</h4>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">ABC High School</h3>
                      </div>
                      <div className="text-xs text-gray-500">2005 - 2009</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
