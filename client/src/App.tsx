import { Switch, Route, Redirect, useLocation } from "wouter";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import loadable from "@loadable/component";
import SideMenu from "@/components/layout/SideMenu";
import Content from "@/components/layout/Content";
import { useAppSelector } from "@/redux/store";
import { BootstrapWrapper } from "@/context/BootstrapWrapper";
import { PageLoadingIndicator } from "@/components/loading/GlobalLoadingScreen";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ModalProvider from "@/providers/ModalProvider";
import { useEffect } from "react";
import { hasCompletedOnboarding } from "@/utils/localStorage";

const NotFound = loadable(() => import("@/pages/not-found"), {
  fallback: <PageLoadingIndicator />,
});
const CvBuilder = loadable(() => import("@/pages/CvBuilder"), {
  fallback: <PageLoadingIndicator />,
});
const CvBuilderCreate = loadable(() => import("@/pages/CvBuilderCreate"), {
  fallback: <PageLoadingIndicator />,
});
const CvReview = loadable(() => import("@/pages/CvReview"), {
  fallback: <PageLoadingIndicator />,
});
const CvMatching = loadable(() => import("@/pages/CvMatching"), {
  fallback: <PageLoadingIndicator />,
});
const CoverLetter = loadable(() => import("@/pages/CoverLetter"), {
  fallback: <PageLoadingIndicator />,
});
const Settings = loadable(() => import("@/pages/Settings"), {
  fallback: <PageLoadingIndicator />,
});
const Help = loadable(() => import("@/pages/Help"), {
  fallback: <PageLoadingIndicator />,
});
const PickTemplate = loadable(() => import("@/pages/PickTemplate"), {
  fallback: <PageLoadingIndicator />,
});
const JobSearch = loadable(() => import("@/pages/JobSearch"), {
  fallback: <PageLoadingIndicator />,
});
const JobDetails = loadable(() => import("@/pages/JobDetails"), {
  fallback: <PageLoadingIndicator />,
});
const LoginPage = loadable(() => import("@/pages/auth/LoginPage"), {
  fallback: <PageLoadingIndicator />,
});
const RegisterPage = loadable(() => import("@/pages/auth/RegisterPage"), {
  fallback: <PageLoadingIndicator />,
});

// Onboarding pages
const OnboardingCheck = loadable(() => import("@/pages/onboarding/OnboardingCheck"), {
  fallback: <PageLoadingIndicator />,
});
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

function ProtectedApp() {
  return (
    <div className="flex h-screen">
      <SideMenu />
      <Content>
        <Switch>
          <Route path="/" component={() => <Redirect to="/jobs" />} />
          <Route path="/resume">{() => <CvBuilder />}</Route>
          <Route path="/cv-builder">{() => <CvBuilderCreate />}</Route>
          <Route path="/cv-review">{() => <CvReview />}</Route>
          <Route path="/jobs">{() => <JobSearch />}</Route>
          <Route path="/job-details/:jobId">{() => <JobDetails />}</Route>
          <Route path="/cv-matching">{() => <CvMatching />}</Route>
          <Route path="/cover-letter">{() => <CoverLetter />}</Route>
          <Route path="/settings">{() => <Settings />}</Route>
          <Route path="/help">{() => <Help />}</Route>
          <Route path="/pick-template">{() => <PickTemplate />}</Route>
          <Route>{() => <NotFound />}</Route>
        </Switch>
      </Content>
    </div>
  );
}

function Router() {
  const { isAuthorized } = useAppSelector((state) => state.user);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Only check for onboarding if user is authorized and not already on an onboarding page
    if (isAuthorized && 
        !location.startsWith('/onboarding') && 
        location !== '/auth/login' && 
        location !== '/auth/register') {
      
      // If user hasn't completed onboarding, redirect them
      if (!hasCompletedOnboarding()) {
        setLocation('/onboarding/check');
      }
    }
  }, [isAuthorized, location, setLocation]);

  return (
    <Switch>
      {/* Onboarding routes */}
      <Route path="/onboarding/check">{() => <OnboardingCheck />}</Route>
      <Route path="/onboarding/step1">{() => <OnboardingStep1 />}</Route>
      <Route path="/onboarding/step2">{() => <OnboardingStep2 />}</Route>
      <Route path="/onboarding/step3">{() => <OnboardingStep3 />}</Route>
      <Route path="/onboarding/step4">{() => <OnboardingStep4 />}</Route>
      
      {/* Auth routes */}
      <Route path="/auth/login">
        {() => (isAuthorized ? <Redirect to="/" /> : <LoginPage />)}
      </Route>
      <Route path="/auth/register">
        {() => (isAuthorized ? <Redirect to="/" /> : <RegisterPage />)}
      </Route>
      
      {/* Main app routes */}
      <Route>
        {() => (
          <ProtectedRoute>
            <ProtectedApp />
          </ProtectedRoute>
        )}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <BootstrapWrapper>
          <Router />
          <ModalProvider />
        </BootstrapWrapper>
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
