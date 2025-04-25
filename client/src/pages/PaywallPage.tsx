import { useGetConfigsQuery } from "../redux/api/configApiSlice";
import { useCreateCheckoutSessionMutation } from "../redux/api/paymentApiSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircleIcon, SparklesIcon, FileTextIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IPaywallPricing } from "@/types/state/config.types";
import { toast } from "sonner";

export default function PaywallPage() {
  const { data: config, isLoading, error } = useGetConfigsQuery();
  const [createCheckoutSession, { isLoading: isCreatingSession }] = useCreateCheckoutSessionMutation();
  const navigate = useNavigate();

  const handleChoosePlan = async (priceId: string) => {
    try {
      const successUrl = `${window.location.origin}`;
      const cancelUrl = `${window.location.origin}`;

      console.log("priceId", priceId);

      const response = await createCheckoutSession({
        priceId,
        successUrl,
        cancelUrl,
      }).unwrap();

      console.log("response");
      console.log(response.redirectUrl);
      // Redirect to the payment page
      window.location.href = response.redirectUrl;
    } catch (err) {
      toast.error("Failed to create payment session. Please try again.");
      console.error("Payment session creation failed:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Error Loading Plans</h2>
          <p className="text-muted-foreground mb-4">
            There was a problem loading the subscription plans. Please try again later.
          </p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const paywallConfig = config?.configs?.paywall;
  const prices = paywallConfig?.prices || [];

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
        <h1 className="text-3xl font-bold text-center mb-8">Upgrade to Premium</h1>
        <p className="text-center text-muted-foreground mb-12">
          Unlock all features and get the most out of your job search
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prices.map((price: IPaywallPricing) => (
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
                  <span className="text-muted-foreground">/{price.interval}</span>
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