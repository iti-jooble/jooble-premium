import React from "react";
import { useLocation } from "wouter";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { saveUserPreferences } from "@/utils/localStorage";
import { Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const OnboardingStep4: React.FC = () => {
  const [_, setLocation] = useLocation();

  const handleSubmit = () => {
    // Save to localStorage to mark onboarding as completed
    saveUserPreferences({
      onboardingCompleted: true,
    });

    // Redirect to main app
    setLocation("/");
  };

  const features = [
    "Unlimited CV downloads",
    "Priority customer support",
    "AI-powered CV review",
    "Custom CV templates",
  ];

  return (
    <OnboardingLayout step={4}>
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-primary/10">
            <Award className="h-10 w-10 text-primary" />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">You're All Set!</h3>
        <p className="text-gray-600 mb-6">
          Congratulations on completing the onboarding process. You're now ready
          to start your job search journey with all our powerful tools at your
          disposal.
        </p>

        <div className="bg-muted p-4 rounded-lg mb-6">
          <div className="flex items-center justify-center mb-3">
            <Star className="h-5 w-5 text-primary mr-2 fill-primary" />
            <h4 className="font-semibold">Premium Features Available</h4>
          </div>

          <ul className="space-y-2 text-sm">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center justify-center">
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <Button onClick={handleSubmit} className="px-8">
              Go to jobs
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep4;
