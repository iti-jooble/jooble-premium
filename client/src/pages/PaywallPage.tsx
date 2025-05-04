import { useCreateCheckoutSessionMutation } from "../redux/api/paymentApiSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/redux/store";
import {
  CheckCircleIcon,
  SparklesIcon,
  FileTextIcon,
  Loader2,
} from "lucide-react";
import { PaywallPrice } from "@/types/state/bootstrap.types";
import { toast } from "sonner";

export default function PaywallPage() {
  const [createCheckoutSession, { isLoading: isCreatingSession }] =
    useCreateCheckoutSessionMutation();
  const { paywall } = useAppSelector((state) => state.bootstrap.configs) || {};

  const handleChoosePlan = async (priceId: string) => {
    try {
      const successUrl = `${window.location.origin}`;
      const cancelUrl = `${window.location.origin}`;

      const response = await createCheckoutSession({
        priceId,
        successUrl,
        cancelUrl,
      }).unwrap();

      window.location.href = response.redirectUrl;
    } catch (err) {
      toast.error("Failed to create payment session. Please try again.");
    }
  };

  const prices = paywall?.prices || [];

  if (!prices.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">No Plans Available</h2>
          <p className="text-muted-foreground">
            There are currently no subscription plans available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Upgrade to Premium
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Unlock all features and get the most out of your job search
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prices.map((price: PaywallPrice) => (
            <Card key={price.priceId} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">{price.name}</h3>
                  <p className="text-muted-foreground">{price.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold">
                    {price.amount} {price.currency}
                  </span>
                  <span className="text-muted-foreground">
                    /{price.interval}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-primary mr-2" />
                    <span>Unlimited CV Matches</span>
                  </li>
                  <li className="flex items-center">
                    <SparklesIcon className="h-5 w-5 text-primary mr-2" />
                    <span>AI-Powered Job Matching</span>
                  </li>
                  <li className="flex items-center">
                    <FileTextIcon className="h-5 w-5 text-primary mr-2" />
                    <span>Custom CV Templates</span>
                  </li>
                </ul>

                <Button
                  className="w-full"
                  onClick={() => handleChoosePlan(price.priceId)}
                  disabled={isCreatingSession}
                >
                  {isCreatingSession ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Choose Plan"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
