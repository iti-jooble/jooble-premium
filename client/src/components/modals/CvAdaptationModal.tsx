import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { CvPreview } from "@/components/cv-builder/CvPreview";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { CV, CvUserInfo } from "@shared/schema";

// Step components
import StepOne from "@/components/modals/CvAdaptationSteps/StepOne";
import StepTwo from "@/components/modals/CvAdaptationSteps/StepTwo";

interface CvAdaptationModalProps {
  closeModal: () => void;
  cv?: CV;
  jobDetails?: any; // Replace with proper job type when available
}

const improvementPoints = [
  {
    title: "No ASO Mention",
    description:
      "ASO is one of the key requirements in the job posting. Your resume doesn't mention ASO or any work with the App Store/Google Play.",
  },
  {
    title: "No Deal Experience",
    description:
      "The job involves buying and selling apps. Your resume lacks any experience with negotiations or working with marketplaces (e.g., Flippa).",
  },
  {
    title: "No App Analytics",
    description:
      "App analytics expertise is required. Your resume doesn't showcase any analytics background specific to mobile applications.",
  },
];

const matchingCriteria = [
  { id: 0, label: "Job title & Summary match", value: 24, growth: 0 },
  { id: 1, label: "Uses role keywords", value: 18, growth: 0 },
  { id: 2, label: "Aligns with responsibilities", value: 34, growth: 0 },
  { id: 3, label: "Tailored to this company", value: 14, growth: 0 },
  { id: 4, label: "Has needed Degrees/Certs", value: 20, growth: 0 },
  { id: 5, label: "Speaks the job's language", value: 40, growth: 0 },
];

const matchingCriteriaWithGrowth = [
  { id: 0, label: "Job title & Summary match", value: 24, growth: 60 },
  { id: 1, label: "Uses role keywords", value: 18, growth: 65 },
  { id: 2, label: "Aligns with responsibilities", value: 34, growth: 50 },
  { id: 3, label: "Tailored to this company", value: 14, growth: 74 },
  { id: 4, label: "Has needed Degrees/Certs", value: 20, growth: 45 },
  { id: 5, label: "Speaks the job's language", value: 40, growth: 31 },
];

const matching = {
  score: 31,
  growth: 0,
  criteria: matchingCriteria,
};

const matchingWithGrowth = {
  score: 31,
  growth: 64,
  criteria: matchingCriteriaWithGrowth,
};

const CvAdaptationModal: React.FC<CvAdaptationModalProps> = ({
  closeModal,
  cv,
  jobDetails,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [adaptedCv, setAdaptedCv] = useState<CvUserInfo | undefined>(
    cv?.userInfo,
  );

  // Handler for navigating between steps
  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  // Handler for continuing to next step
  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step, implement the final action here
      closeModal();
    }
  };

  // Handler for updating CV data from step components
  const handleCvUpdate = (updatedCvData: Partial<CvUserInfo>) => {
    setAdaptedCv(
      (prev) =>
        ({
          ...(prev || {}),
          ...updatedCvData,
        }) as CvUserInfo,
    );
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne improvementPoints={improvementPoints} matching={matching} />
        );
      case 2:
        return (
          <StepTwo
            jobDetails={jobDetails}
            cv={adaptedCv}
            onCvUpdate={handleCvUpdate}
          />
        );
      case 3:
        return <StepOne matching={matchingWithGrowth} />;
      default:
        return null;
    }
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <Dialog open={true} onOpenChange={() => closeModal()}>
      <DialogContent className="max-w-[1440px] h-[90vh] p-0 overflow-hidden">
        <div className="flex h-full max-h-[90vh]">
          {/* Left column with stepper and current step content */}
          <div className="w-[42%] border-r border-gray-200 overflow-y-auto relative">
            {/* Stepper component */}
            <div className="flex justify-center items-center px-12 py-6">
              <Progress value={progressPercentage} className="h-2 w-1/5" />
            </div>

            {/* Current step content */}
            <div className="px-12 py-6 min-h-[calc(100%-152px)]">
              {renderStep()}
            </div>

            {/* Navigation buttons */}
            <div className="sticky bottom-0 flex flex-col gap-4 mt-auto w-full px-12 py-6 bg-white/60 backdrop-blur-sm">
              {currentStep === 3 && (
                <Button
                  onClick={handleContinue}
                  variant="ghost"
                  className="w-full text-blue-600"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit resume
                </Button>
              )}
              <Button onClick={handleContinue} className="w-full">
                {currentStep < 3 ? "Continue" : "Download & Apply"}
              </Button>
            </div>
          </div>

          {/* Right column with CV preview */}
          <div className="w-[58%] bg-primary-gradient flex justify-center items-center">
            {adaptedCv && (
              <CvPreview
                withHeading={false}
                data={adaptedCv}
                templateId={cv?.templateId || 1}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CvAdaptationModal;
