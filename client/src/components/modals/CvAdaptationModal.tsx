import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CvPreview } from '@/components/cv-builder/CvPreview';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CV, CvUserInfo } from '@shared/schema';

// Step components
import StepOne from '@/components/modals/CvAdaptationSteps/StepOne';
import StepTwo from '@/components/modals/CvAdaptationSteps/StepTwo';
import StepThree from '@/components/modals/CvAdaptationSteps/StepThree';

interface CvAdaptationModalProps {
  closeModal: () => void;
  cv?: CV;
  jobDetails?: any; // Replace with proper job type when available
}

const CvAdaptationModal: React.FC<CvAdaptationModalProps> = ({
  closeModal,
  cv,
  jobDetails
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [adaptedCv, setAdaptedCv] = useState<CvUserInfo | undefined>(cv?.userInfo);

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
    setAdaptedCv(prev => ({
      ...(prev || {}),
      ...updatedCvData
    } as CvUserInfo));
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne 
          jobDetails={jobDetails}
          cv={adaptedCv}
          onCvUpdate={handleCvUpdate}
        />;
      case 2:
        return <StepTwo 
          jobDetails={jobDetails}
          cv={adaptedCv}
          onCvUpdate={handleCvUpdate}
        />;
      case 3:
        return <StepThree 
          jobDetails={jobDetails}
          cv={adaptedCv}
          onCvUpdate={handleCvUpdate}
        />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => closeModal()}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left column with stepper and current step content */}
          <div className="w-1/2 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">CV Adaptation</h2>
              <button 
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Stepper component */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div 
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                        ${currentStep >= step ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-400'} 
                        cursor-pointer`}
                      onClick={() => handleStepChange(step)}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div 
                        className={`flex-1 h-[2px] mx-2 ${currentStep > step ? 'bg-primary' : 'bg-gray-300'}`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Step {currentStep} of 3
              </div>
            </div>
            
            {/* Current step content */}
            <div className="mb-10">
              {renderStep()}
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-auto">
              <Button 
                variant="outline" 
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : closeModal()}
              >
                {currentStep > 1 ? 'Back' : 'Cancel'}
              </Button>
              <Button onClick={handleContinue}>
                {currentStep < 3 ? 'Continue' : 'Finish'}
              </Button>
            </div>
          </div>
          
          {/* Right column with CV preview */}
          <div className="w-1/2 bg-gray-50">
            {adaptedCv && (
              <CvPreview 
                data={adaptedCv} 
                templateId={cv?.templateId || 1}
                onDownload={() => {}} // Placeholder
                onChangeTemplate={() => {}} // Placeholder
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CvAdaptationModal;