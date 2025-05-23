import React from "react";
import { JobInferredDescription } from "@shared/schema";

const JobDescription: React.FC<{
  description: JobInferredDescription;
}> = ({ description }) => {
  return (
    <div>
      {/* Summary Section */}
      <div className="py-3">
        <h2 className="text-lg font-bold mb-4">Summary</h2>
        <p>{description.summary}</p>
      </div>

      {/* Toolstack Section */}
      <div className="py-3">
        <h2 className="text-lg font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {description.qualifications?.skills?.map((skill, i) => (
            <div
              key={`${skill}-${i}`}
              className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2"
            >
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Responsibilities Section */}
      <div className="py-3">
        <h2 className="text-lg font-bold mb-4">Responsibilities</h2>
        <ul className="list-disc pl-5 space-y-2">
          {description.responsibilities?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Qualification */}
      <div className="py-3">
        <h2 className="text-lg font-bold mb-4">Qualification</h2>
        <ul className="list-disc pl-5 space-y-2">
          {[
            ...(description.qualifications.requiredQualifications ?? []),
            ...(description.qualifications.preferredQualifications ?? []),
          ].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Benefits */}
      <div className="py-3">
        <h2 className="text-lg font-bold mb-4">We offer</h2>
        <p>{description.companyOffers}</p>
      </div>
    </div>
  );
};

export default JobDescription;
