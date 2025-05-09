import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Rocket, CircleCheck, WatchIcon, ShieldCheckIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { bootstrapSelectors } from "@/redux/selectors";
import { closeModal } from "@/redux/slices/uiSlice";

interface PaywallModalProps {
  modalId: string;
  preSelectedPlan?: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  modalId,
  preSelectedPlan,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string>("monthly");
  const payWallConfig = useAppSelector(
    bootstrapSelectors.getPayWallConfigsSelector,
  );

  useEffect(() => {
    if (!payWallConfig || !payWallConfig.prices) {
      return;
    }

    // Use preSelectedPlan if provided, otherwise use default option
    if (preSelectedPlan) {
      setSelectedOption(preSelectedPlan);
    } else {
      const defaultOption =
        payWallConfig.prices.find((option) => option.isDefault) ||
        payWallConfig.prices[0];

      if (defaultOption) {
        setSelectedOption(defaultOption.priceId);
      }
    }
  }, [preSelectedPlan, payWallConfig]);

  const features = [
    { text: "Jobs from <strong>all over the web</strong> in 1 place" },
    { text: "<strong>Unlimited</strong> AI-tailored resumes" },
    { text: "<strong>Unlimited</strong> AI-tailored cover letters" },
    { text: "Smart <strong>Match Score</strong> for every job" },
    { text: "Resume <strong>Fit Score</strong> for every job" },
    { text: "Instant PDF downloads" },
    { text: "AI Resume Builder" },
    { text: "Advanced job filters" },
  ];

  const intervalMap: {
    [key: number]: {
      text: string;
      days: number;
    };
  } = {
    0: { text: "per week", days: 7 },
    1: { text: "per month", days: 30 },
    2: { text: "per 3 months", days: 90 },
    3: { text: "per year", days: 365 },
  };

  const handleContinue = () => {
    // Handle payment process - to be implemented
    console.log("Proceeding with option:", selectedOption);
    // Here would integrate with a payment processor like Stripe
    
    // Close the modal after handling payment
    dispatch(closeModal(modalId));
  };
  
  // Handle closing the modal with the closeModal action
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeModal(modalId));
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[984px] p-0 overflow-hidden border-none rounded-2xl sm:rounded-2xl">
        {!payWallConfig || !payWallConfig.prices ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-lg text-center font-semibold w-[80%]">
              Something went wrong. Please try again later.
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row h-full">
            {/* Left part - features */}
            <div className="bg-[#F7F6F2] px-[56px] py-[72px] md:w-[50%] relative">
              <div className="mt-8">
                <h2 className="text-4xl font-bold text-[#1a2137] mb-2">
                  Get 4x more interviews. Pay less than for coffee
                </h2>

                <div className="space-y-3 mt-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CircleCheck
                        className="h-7 w-7 text-blue-600 mr-2 flex-shrink-0"
                        fill="#014EFE"
                        color="white"
                      />
                      <div>
                        <Trans
                          i18nKey={feature.text}
                          components={{ strong: <strong /> }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right part - pricing options */}
            <div className="px-[56px] py-[72px] md:w-[50%] flex flex-col">
              <h3 className="text-center text-[#1a2137] text-lg mb-8">
                Select your option and proceed to checkout
              </h3>

              <div className="space-y-2 flex-grow">
                {payWallConfig.prices.map((option) => (
                  <div
                    key={option.priceId}
                    className={`border rounded-lg p-6 relative cursor-pointer ${
                      selectedOption === option.priceId
                        ? "border-blue-600"
                        : "border-gray-200"
                    } ${option.isDefault ? "border-blue-600" : ""}`}
                    onClick={() => setSelectedOption(option.priceId)}
                  >
                    {option.isDefault && (
                      <div className="absolute -top-px -right-px bg-blue-600 text-white px-3 py-1 rounded-tr-lg rounded-bl-lg text-sm font-bold">
                        🔥 Best value
                      </div>
                    )}
                    <div className="flex justify-between items-center ">
                      <div>
                        <span className="text-2xl font-bold">
                          €{option.amount.toString().split(".")[0]}
                        </span>
                        <span>
                          .{option.amount.toString().split(".")[1]} / per{" "}
                          {t(intervalMap[option.interval].text)}
                        </span>
                        <div className="text-gray-500 text-sm">
                          Only €
                          {(
                            option.amount / intervalMap[option.interval].days
                          ).toFixed(2)}{" "}
                          per day
                        </div>
                      </div>
                      <div
                        className={`h-5 w-5 rounded-full border ${
                          selectedOption === option.priceId
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300"
                        } flex items-center justify-center`}
                      >
                        {selectedOption === option.priceId && (
                          <div className="h-2 w-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg mt-10 text-center"
              >
                Continue
              </button>

              <div className="flex justify-center mt-6 gap-6">
                <div className="flex items-center">
                  <Rocket className="h-5 w-5 mr-2 text-blue-600" />
                  <span>Instant access</span>
                </div>
                <div className="flex items-center">
                  <WatchIcon className="h-5 w-5 mr-2 text-blue-600" />
                  <span>Cancel anytime</span>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 mr-2 text-blue-600" />
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaywallModal;
