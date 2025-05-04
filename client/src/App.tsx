import { Switch, Route, Redirect } from "wouter";
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

// Lazy load pages for code splitting
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
const PaywallPage = loadable(() => import("@/pages/PaywallPage"), {
  fallback: <PageLoadingIndicator />,
});
const JobSearch = loadable(() => import("@/pages/JobSearch"), {
  fallback: <PageLoadingIndicator />,
});
const JobDetails = loadable(() => import("@/pages/JobDetails"), {
  fallback: <PageLoadingIndicator />,
});

// Auth Pages
const LoginPage = loadable(() => import("@/pages/auth/LoginPage"), {
  fallback: <PageLoadingIndicator />,
});
const RegisterPage = loadable(() => import("@/pages/auth/RegisterPage"), {
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
          <Route path="/paywall">{() => <PaywallPage />}</Route>
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
  // Check authentication state
  const { isAuthorized } = useAppSelector((state) => state.user);

  return (
    <Switch>
      {/* Auth routes - accessible when not logged in */}
      <Route path="/auth/login">
        {() => (isAuthorized ? <Redirect to="/" /> : <LoginPage />)}
      </Route>
      <Route path="/auth/register">
        {() => (isAuthorized ? <Redirect to="/" /> : <RegisterPage />)}
      </Route>

      {/* Protected routes - require authentication */}
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
        </BootstrapWrapper>
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
