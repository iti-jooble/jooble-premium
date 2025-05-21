import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { CvPreview } from "@/components/cv-builder/CvPreview";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CV, CvUserInfo } from "@shared/schema";

// Step components
import StepOne from "@/components/modals/CvAdaptationSteps/StepOne";
import StepTwo from "@/components/modals/CvAdaptationSteps/StepTwo";
import StepThree from "@/components/modals/CvAdaptationSteps/StepThree";

interface CvAdaptationModalProps {
  closeModal: () => void;
  cv?: CV;
  jobDetails?: any; // Replace with proper job type when available
}

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
          <StepOne
            jobDetails={jobDetails}
            cv={adaptedCv}
            onCvUpdate={handleCvUpdate}
          />
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
        return (
          <StepThree
            jobDetails={jobDetails}
            cv={adaptedCv}
            onCvUpdate={handleCvUpdate}
          />
        );
      default:
        return null;
    }
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <Dialog open={true} onOpenChange={() => closeModal()}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0 overflow-hidden">
        <div className="flex h-full max-h-[90vh]">
          {/* Left column with stepper and current step content */}
          <div className="w-[45%] border-r border-gray-200 overflow-y-auto relative">
            {/* Stepper component */}
            <div className="flex justify-center items-center px-12 py-6">
              <Progress value={progressPercentage} className="h-2 w-1/5" />
            </div>

            {/* Current step content */}
            <div className="px-12 py-6">{renderStep()}</div>

            {/* Navigation buttons */}
            <div className="sticky bottom-0 flex justify-between mt-auto w-full px-12 py-6 bg-white/60 backdrop-blur-sm">
              <Button onClick={handleContinue} className="w-full">
                {currentStep < 3 ? "Continue" : "Finish"}
              </Button>
            </div>
          </div>

          {/* Right column with CV preview */}
          <div className="w-[55%] bg-primary-gradient flex justify-center items-center">
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
