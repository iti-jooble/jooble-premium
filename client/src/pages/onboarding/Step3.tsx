import React, { useState, useRef, DragEvent } from "react";
import { useLocation } from "wouter";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch } from "@/redux/store";
import { parseCv } from "@/redux/thunks";
import { X, AlertCircle, Loader2 } from "lucide-react";

// Define file size limit in bytes (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [".pdf"];

const OnboardingStep3: React.FC = () => {
  const [_, setLocation] = useLocation();
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const handleContinue = () => {
    setLocation("/onboarding/4");
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(
        `File size exceeds the limit. Please upload a file smaller than 5MB.`,
      );
      return false;
    }

    // Check file type by extension
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.substring(fileName.lastIndexOf("."));

    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      setError(
        `Invalid file type. Please upload a PDF, DOC, DOCX, or TXT file.`,
      );
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
          fileInputRef.current.value = "";
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
    handleContinue();
  };

  const handleFileRemove = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();

    formData.append("file", file);

    try {
      await dispatch(parseCv(formData));
      handleContinue();
    } catch (error) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <OnboardingLayout step={3}>
        <div className="text-center flex flex-col items-center p-20">
          <Loader2 className="w-20 h-20 animate-spin text-primary-blue mb-8" />
          <p className="text-xl font-bold mb-4">Analyzing your resume...</p>
        </div>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout step={3}>
      <Card className="w-full max-w-[640px] p-10 bg-white rounded-2xl shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 px-8">
            Let's start with your resume
          </h2>

          <p className="text-lg text-gray-700 mb-10 px-8">
            We'll analyze it to better understand your preferences — so
            <br />
            we can match you with the jobs you'll truly love.
          </p>

          <div
            ref={dropAreaRef}
            className={`bg-primary-background shadow-secondary-box p-20 rounded-lg border-2 ${isDragging ? "border-primary border-solid" : "border-gray/60 border-dashed"} mb-6 flex flex-col items-center justify-center transition-colors cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="mb-4">
              <img src="/images/cv.svg" />
            </div>

            {file ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center mr-4">
                    <span className="text-lg font-medium">{file.name}</span>
                  </div>
                  <button
                    onClick={handleFileRemove}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <Button
                  onClick={handleAnalyze}
                  className="text-white font-semibold rounded-xl py-3 px-6 h-12"
                >
                  Analyze Resume
                </Button>
              </>
            ) : (
              <>
                <p className="text-gray mb-6 px-16">
                  Choose file or drag and drop here (PDF up to 5MB)
                </p>

                <label htmlFor="resume-upload">
                  <Button className="py-5 px-8 min-w-[214px] h-14">
                    Choose a file
                  </Button>
                  <input
                    type="file"
                    id="resume-upload"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileUpload}
                  />
                </label>
              </>
            )}
          </div>

          {error && (
            <div className="flex items-center justify-center space-x-2 text-red-500 mb-4">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {!file && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={handleNoResume}
                className="py-5 px-8 h-14"
              >
                Don't have a resume
              </Button>
            </div>
          )}
        </div>
      </Card>
    </OnboardingLayout>
  );
};

export default OnboardingStep3;
