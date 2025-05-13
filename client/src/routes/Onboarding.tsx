import { Switch, Route, Redirect, useLocation } from "wouter";
import loadable from "@loadable/component";
import { PageLoadingIndicator } from "@/components/loading/GlobalLoadingScreen";
import OnboardingGuard from "./guards/OnboardingGuard";
import { useAppSelector } from "@/redux/store";

const OnboardingStep1 = loadable(() => import("@/pages/onboarding/Step1"), {
  fallback: <PageLoadingIndicator />,
});
const OnboardingStep2 = loadable(() => import("@/pages/onboarding/Step2"), {
  fallback: <PageLoadingIndicator />,
});
const OnboardingStep3 = loadable(() => import("@/pages/onboarding/Step3"), {
  fallback: <PageLoadingIndicator />,
});
const OnboardingStep4 = loadable(() => import("@/pages/onboarding/Step4"), {
  fallback: <PageLoadingIndicator />,
});

function Onboarding({ children }) {
  const { isAuthorized } = useAppSelector((state) => state.user);
  const [location, setLocation] = useLocation();

  return (
    <Switch>
      <Route path="/onboarding/1">
        {() => (isAuthorized ? <Redirect to="/" /> : <OnboardingStep1 />)}
      </Route>
      <Route path="/onboarding/2">
        {() => (isAuthorized ? <Redirect to="/" /> : <OnboardingStep2 />)}
      </Route>
      <Route path="/onboarding/3">
        {() => (isAuthorized ? <Redirect to="/" /> : <OnboardingStep3 />)}
      </Route>
      <Route path="/onboarding/4">
        {() => (isAuthorized ? <Redirect to="/" /> : <OnboardingStep4 />)}
      </Route>

      <Route>{() => <OnboardingGuard>{children}</OnboardingGuard>}</Route>
    </Switch>
  );
}

export default Onboarding;
