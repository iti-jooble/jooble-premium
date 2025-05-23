import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Rocket, CircleCheck, WatchIcon, ShieldCheckIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { useCreateCheckoutSessionMutation } from "@/redux/api/paymentApiSlice";
import { useToast } from "@/hooks/use-toast";
import { bootstrapSelectors } from "@/redux/selectors";
import { FEATURES, INTERVAL_MAP } from "./constants";

interface PaywallModalProps {
  closeModal: () => void;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ closeModal }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const payWallConfig = useAppSelector(
    bootstrapSelectors.getPayWallConfigsSelector,
  );

  useEffect(() => {
    if (!payWallConfig || !payWallConfig.prices) {
      return;
    }

    const defaultOption =
      payWallConfig.prices.find((option) => option.isDefault) ||
      payWallConfig.prices[0];

    if (defaultOption) {
      setSelectedOption(defaultOption.priceId);
    }
  }, [payWallConfig]);

  const [createCheckoutSession, { isLoading: isCreatingSession }] =
    useCreateCheckoutSessionMutation();

  const handleContinue = async () => {
    try {
      const successUrl = `${window.location.origin}`;
      const cancelUrl = `${window.location.origin}`;

      const response = await createCheckoutSession({
        priceId: selectedOption,
        successUrl,
        cancelUrl,
      }).unwrap();

      window.location.href = response.redirectUrl;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create payment session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <Dialog open={true} onOpenChange={handleCloseModal}>
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
            <div className="bg-primary-gradient px-[56px] py-[72px] md:w-[50%] relative">
              <div className="mt-8">
                <h2 className="text-4xl font-bold text-[#1a2137] mb-2">
                  Get 4x more interviews. Pay less than for coffee
                </h2>

                <div className="space-y-3 mt-6">
                  {FEATURES.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CircleCheck
                        className="h-7 w-7 text-primary-blue mr-2 flex-shrink-0 text-white"
                        fill="#5D55FA"
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
                        ? "border-primary-blue shadow-border-inset"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedOption(option.priceId)}
                  >
                    {option.isDefault && (
                      <div className="absolute top-0 right-0 bg-primary-blue text-white px-3 py-1 rounded-tr-lg rounded-bl-lg text-sm font-bold">
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
                          {t(INTERVAL_MAP[option.interval].text)}
                        </span>
                        <div className="text-gray-500 text-sm">
                          Only €
                          {(
                            option.amount / INTERVAL_MAP[option.interval].days
                          ).toFixed(2)}{" "}
                          per day
                        </div>
                      </div>
                      <div
                        className={`h-5 w-5 rounded-full border ${
                          selectedOption === option.priceId
                            ? "border-primary-blue bg-primary-blue"
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

              <Button
                isLoading={isCreatingSession}
                onClick={handleContinue}
                className="w-full mt-10"
              >
                Continue
              </Button>

              <div className="flex justify-center mt-6 gap-6">
                <div className="flex items-center">
                  <Rocket className="h-5 w-5 mr-2 text-primary-blue" />
                  <span>Instant access</span>
                </div>
                <div className="flex items-center">
                  <WatchIcon className="h-5 w-5 mr-2 text-primary-blue" />
                  <span>Cancel anytime</span>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 mr-2 text-primary-blue" />
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
