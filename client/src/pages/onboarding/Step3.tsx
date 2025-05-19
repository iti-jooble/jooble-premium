import React, { useState, useRef, DragEvent } from "react";
import { useLocation } from "wouter";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { FileText, X, CheckCircle, AlertCircle, Loader } from "lucide-react";

// Define file size limit in bytes (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['.pdf', '.doc', '.docx', '.txt'];

const OnboardingStep3: React.FC = () => {
  const [_, setLocation] = useLocation();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const handleContinue = () => {
    setLocation("/onboarding/4");
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File size exceeds the limit. Please upload a file smaller than 5MB.`);
      return false;
    }

    // Check file type by extension
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
    
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      setError(`Invalid file type. Please upload a PDF, DOC, DOCX, or TXT file.`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      } else {
        // Reset file input if validation fails
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleNoResume = () => {
    // Handle no resume option
    handleContinue();
  };

  const handleFileRemove = () => {
    setFile(null);
    setError(null);
    setIsAnalyzed(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    // Simulate file analysis with a 2-second delay
    setTimeout(() => {
      console.log("Analyzing file:", file.name);
      console.log("File type:", file.type);
      console.log("File size:", file.size, "bytes");
      console.log("File would be sent to the server for further processing");
      
      setIsAnalyzing(false);
      setIsAnalyzed(true);
      
      // Continue to next step after successful analysis
      setTimeout(() => {
        handleContinue();
      }, 1000);
    }, 2000);
  };

  return (
    <OnboardingLayout step={3}>
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let's start with your resume
        </h2>

        <p className="text-lg text-gray-700 mb-10">
          We'll analyze it to better understand your preferences — so
          <br />
          we can match you with the jobs you'll truly love.
        </p>

        {!file ? (
          <div 
            ref={dropAreaRef}
            className={`bg-primary-background p-20 rounded-lg border-2 ${isDragging ? 'border-primary border-solid' : 'border-gray-300 border-dashed'} mb-6 flex flex-col items-center justify-center transition-colors cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="mb-4">
              <FileText className="h-16 w-16 text-gray-400" />
            </div>

            <p className="text-gray-500 mb-6">
              Choose file or drag and drop here (PDF, DOC,
              <br />
              DOCX, TXT up to 5MB)
            </p>

            <label htmlFor="resume-upload">
              <Button className="text-white font-semibold rounded-xl py-3 px-6 h-14">
                Choose a file
              </Button>
              <input
                type="file"
                id="resume-upload"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        ) : (
          <div className="bg-primary-background p-8 rounded-lg border border-gray-300 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-primary mr-3" />
                <span className="text-lg font-medium">{file.name}</span>
              </div>
              {!isAnalyzing && !isAnalyzed && (
                <button 
                  onClick={handleFileRemove}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {!isAnalyzing && !isAnalyzed ? (
              <Button 
                onClick={handleAnalyze} 
                className="w-full text-white font-semibold rounded-xl py-3 px-6 h-12"
              >
                Analyze Resume
              </Button>
            ) : isAnalyzing ? (
              <div className="flex items-center justify-center space-x-2 text-primary">
                <Loader className="h-5 w-5 animate-spin" />
                <span>Analyzing your resume...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>Analysis complete! Taking you to the next step...</span>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center space-x-2 text-red-500 mb-4">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {!file && (
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              onClick={handleNoResume}
              className="rounded-xl py-2 px-6 h-12"
            >
              Don't have a resume
            </Button>
          </div>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep3;
