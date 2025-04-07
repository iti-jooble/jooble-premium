import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AIAssistantOptions {
  onSuccess?: (data: any) => void;
}

interface ImproveWorkExperienceParams {
  position: string;
  company: string;
  description: string;
}

export function useAIAssistant(options?: AIAssistantOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Mutation for improving work experience description
  const improveWorkExperience = useMutation({
    mutationFn: async ({ position, company, description }: ImproveWorkExperienceParams) => {
      const response = await apiRequest(
        "POST",
        "/api/cv/improve", 
        { position, company, description }
      );
      return await response.json();
    },
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to improve work experience. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation for improving summary
  const improveSummary = useMutation({
    mutationFn: async (summary: string) => {
      const response = await apiRequest(
        "POST",
        "/api/cv/improve", 
        { summary }
      );
      return await response.json();
    },
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to improve summary. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation for suggesting related skills
  const suggestRelatedSkills = useMutation({
    mutationFn: async (skill: string) => {
      const response = await apiRequest(
        "POST",
        "/api/cv/improve", 
        { skill }
      );
      return await response.json();
    },
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to suggest related skills. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation for suggesting skills based on job title
  const suggestSkillsForJobTitle = useMutation({
    mutationFn: async (jobTitle: string) => {
      const response = await apiRequest(
        "POST",
        "/api/cv/suggest-skills", 
        { jobTitle }
      );
      return await response.json();
    },
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to suggest skills for this job title. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    isLoading: isLoading || 
      improveWorkExperience.isPending || 
      improveSummary.isPending || 
      suggestRelatedSkills.isPending ||
      suggestSkillsForJobTitle.isPending,
    improveWorkExperience: (data: ImproveWorkExperienceParams) => {
      setIsLoading(true);
      improveWorkExperience.mutate(data, {
        onSettled: () => setIsLoading(false),
      });
    },
    improveSummary: (summary: string) => {
      setIsLoading(true);
      improveSummary.mutate(summary, {
        onSettled: () => setIsLoading(false),
      });
    },
    suggestRelatedSkills: (skill: string) => {
      setIsLoading(true);
      suggestRelatedSkills.mutate(skill, {
        onSettled: () => setIsLoading(false),
      });
    },
    suggestSkillsForJobTitle: (jobTitle: string) => {
      setIsLoading(true);
      suggestSkillsForJobTitle.mutate(jobTitle, {
        onSettled: () => setIsLoading(false),
      });
    },
  };
}