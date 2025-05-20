import React from 'react';
import { CvUserInfo } from '@shared/schema';
import { Progress } from '@/components/ui/progress';

interface StepOneProps {
  jobDetails?: any; // Replace with proper job type when available
  cv?: CvUserInfo;
  onCvUpdate: (updatedData: Partial<CvUserInfo>) => void;
}

const StepOne: React.FC<StepOneProps> = ({ jobDetails, cv }) => {
  // Mock data for the response chance visualization
  const responseChance = 47;
  
  // Mock data for matching criteria
  const matchingCriteria = [
    { label: 'Job title & Summary match', value: 34 },
    { label: 'Uses role keywords', value: 34 },
    { label: 'Aligns with responsibilities', value: 34 },
    { label: 'Tailored to this company', value: 34 },
    { label: 'Has needed Degrees/Certs', value: 34 },
    { label: 'Speaks the job\'s language', value: 34 },
  ];

  // Mock data for improvement suggestions
  const improvementPoints = [
    {
      title: 'No ASO Mention',
      description: 'ASO is one of the key requirements in the job posting. Your resume doesn\'t mention ASO or any work with the App Store/Google Play.'
    },
    {
      title: 'No Deal Experience',
      description: 'The job involves buying and selling apps. Your resume lacks any experience with negotiations or working with marketplaces (e.g., Flippa).'
    },
    {
      title: 'No App Analytics',
      description: 'App analytics expertise is required. Your resume doesn\'t showcase any analytics background specific to mobile applications.'
    }
  ];

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Response Chance</h3>
        <h4 className="text-2xl font-bold mb-4">Without Fitly</h4>
        
        {/* Response chance circle */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{responseChance}%</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#E8E8E8" 
              strokeWidth="10" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#DC2626" 
              strokeWidth="10" 
              strokeDasharray={`${2 * Math.PI * 45 * responseChance / 100} ${2 * Math.PI * 45 * (100 - responseChance) / 100}`}
              strokeDashoffset={`${2 * Math.PI * 45 * 0.25}`}
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
      </div>
      
      {/* Matching criteria */}
      <div className="mb-8">
        {matchingCriteria.map((criterion, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{criterion.label}</span>
              <span className="text-sm font-medium">{criterion.value}%</span>
            </div>
            <div className="h-[18px] bg-gray-100 rounded-md overflow-hidden">
              <div 
                className="h-full bg-[#0F172A] rounded-md"
                style={{ width: `${criterion.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Improvement points */}
      <div>
        <h3 className="text-xl font-bold mb-3">Must Fix</h3>
        {improvementPoints.map((point, index) => (
          <div key={index} className="mb-4 p-4 bg-red-50 rounded-md border-l-4 border-red-500">
            <h4 className="font-bold text-md mb-1">{point.title}</h4>
            <p className="text-sm text-gray-700">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepOne;