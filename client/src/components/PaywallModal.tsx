import React, { useState } from 'react';
import { X, CheckCircle, Rocket, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

interface PriceOption {
  id: string;
  price: number;
  period: string;
  perDay: number;
  isBestValue?: boolean;
}

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ open, onOpenChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("monthly");
  
  const priceOptions: PriceOption[] = [
    {
      id: "weekly",
      price: 4.99,
      period: "week",
      perDay: 0.71,
    },
    {
      id: "monthly",
      price: 9.99,
      period: "month",
      perDay: 0.32,
      isBestValue: true,
    },
    {
      id: "quarterly",
      price: 22.99,
      period: "3 month",
      perDay: 0.24,
    },
  ];

  const features = [
    { text: "Jobs from all over the web in 1 place" },
    { text: "Unlimited AI-tailored resumes" },
    { text: "Unlimited AI-tailored cover letters" },
    { text: "Smart Match Score for every job" },
    { text: "Resume Fit Score for every job" },
    { text: "Instant PDF downloads" },
    { text: "AI Resume Builder" },
    { text: "Advanced job filters" },
  ];

  const handleContinue = () => {
    // Handle payment process - to be implemented
    console.log("Proceeding with option:", selectedOption);
    // Here would integrate with a payment processor like Stripe
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[950px] p-0 overflow-hidden border-none rounded-xl">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left part - features */}
          <div className="bg-[#f8f7f4] p-8 md:w-[45%] relative">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Close</span>
            </DialogClose>

            <div className="mt-8">
              <h2 className="text-3xl font-bold text-[#1a2137] mb-2">
                Get 4x more interviews. Pay less than for coffee
              </h2>

              <div className="space-y-3 mt-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="#0043ff" color="white" />
                    <div>
                      {feature.text.includes("all over the web") ? (
                        <span>
                          Jobs from <strong>all over the web</strong> in 1 place
                        </span>
                      ) : feature.text.includes("Match Score") ? (
                        <span>
                          Smart <strong>Match Score</strong> for every job
                        </span>
                      ) : feature.text.includes("Fit Score") ? (
                        <span>
                          Resume <strong>Fit Score</strong> for every job
                        </span>
                      ) : (
                        feature.text
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right part - pricing options */}
          <div className="p-8 md:w-[55%] flex flex-col">
            <h3 className="text-center text-[#1a2137] text-lg mb-6">
              Select your option and proceed to checkout
            </h3>

            <div className="space-y-4 flex-grow">
              {priceOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`border rounded-lg p-4 relative ${
                    selectedOption === option.id
                      ? "border-blue-600"
                      : "border-gray-200"
                  } ${option.isBestValue ? "border-blue-600" : ""}`}
                >
                  {option.isBestValue && (
                    <div className="absolute -top-3 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      🔥 Best value
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold">€{option.price}</span>
                      <span className="text-gray-600 ml-1">.99 / per {option.period}</span>
                      <div className="text-gray-400 text-sm">
                        Only €{option.perDay} per day
                      </div>
                    </div>
                    <div 
                      className={`h-5 w-5 rounded-full border ${
                        selectedOption === option.id
                          ? "border-blue-600 bg-blue-600" 
                          : "border-gray-300"
                      } flex items-center justify-center`}
                      onClick={() => setSelectedOption(option.id)}
                    >
                      {selectedOption === option.id && (
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleContinue}
              className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg mt-6 text-center"
            >
              Continue
            </button>

            <div className="flex justify-center mt-6 gap-6 text-sm">
              <div className="flex items-center">
                <Rocket className="h-4 w-4 mr-2 text-blue-600" />
                <span>Instant access.</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-blue-600" />
                <span>Cancel anytime.</span>
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-blue-600" fill="#0043ff" color="white" />
                <span>Money Back Guarantee.</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallModal;