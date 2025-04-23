import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import loadable from "@loadable/component";
import SideMenu from "@/components/layout/SideMenu";
import Content from "@/components/layout/Content";
import { InitialRequestProvider, useAppLoading } from "@/context/AppLoadingContext";
import { GlobalLoadingScreen, PageLoadingIndicator } from "@/components/loading/GlobalLoadingScreen";

// Lazy load pages for code splitting
const NotFound = loadable(() => import("@/pages/not-found"), {
  fallback: <PageLoadingIndicator />
});
const CvBuilder = loadable(() => import("@/pages/CvBuilder"), {
  fallback: <PageLoadingIndicator />
});
const CvBuilderCreate = loadable(() => import("@/pages/CvBuilderCreate"), {
  fallback: <PageLoadingIndicator />
});
const CvReview = loadable(() => import("@/pages/CvReview"), {
  fallback: <PageLoadingIndicator />
});
const JobSearch = loadable(() => import("@/pages/JobSearch"), {
  fallback: <PageLoadingIndicator />
});
const CvMatching = loadable(() => import("@/pages/CvMatching"), {
  fallback: <PageLoadingIndicator />
});
const CoverLetter = loadable(() => import("@/pages/CoverLetter"), {
  fallback: <PageLoadingIndicator />
});
const Settings = loadable(() => import("@/pages/Settings"), {
  fallback: <PageLoadingIndicator />
});
const Help = loadable(() => import("@/pages/Help"), {
  fallback: <PageLoadingIndicator />
});
const PickTemplate = loadable(() => import("@/pages/PickTemplateWithCarousel"), {
  fallback: <PageLoadingIndicator />
});

function Router() {
  return (
    <div className="flex h-screen">
      <SideMenu />
      <Content>
        <Switch>
          <Route path="/" component={() => <Redirect to="/job-search" />} />
          <Route path="/cv-builder">
            {() => <CvBuilder />}
          </Route>
          <Route path="/cv-builder/create">
            {() => <CvBuilderCreate />}
          </Route>
          <Route path="/cv-review">
            {() => <CvReview />}
          </Route>
          <Route path="/job-search">
            {() => <JobSearch />}
          </Route>
          <Route path="/cv-matching">
            {() => <CvMatching />}
          </Route>
          <Route path="/cover-letter">
            {() => <CoverLetter />}
          </Route>
          <Route path="/settings">
            {() => <Settings />}
          </Route>
          <Route path="/help">
            {() => <Help />}
          </Route>
          <Route path="/pick-template">
            {() => <PickTemplate />}
          </Route>
          <Route path="/pick-template/:returnPath">
            {() => <PickTemplate />}
          </Route>
          <Route>
            {() => <NotFound />}
          </Route>
        </Switch>
      </Content>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InitialRequestProvider>
        <AppContent />
      </InitialRequestProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

function AppContent() {
  const { isInitialLoading, initialRequestError, retryInitialRequest, initData } = useAppLoading();
  
  // During initial loading, show the full-page loader
  if (isInitialLoading) {
    return <GlobalLoadingScreen fullPage={true} />;
  }
  
  // If there was an error and we don't have cached data
  if (initialRequestError && !initData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center p-6 bg-card rounded-lg shadow-lg border border-border">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Failed to Load Application</h2>
          <p className="text-sm text-muted-foreground mb-4">
            There was a problem connecting to the server. Please check your internet connection and try again.
          </p>
          <Button 
            onClick={() => retryInitialRequest()} 
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }
  
  // If maintenance mode is enabled
  if (initData?.appConfig.maintenance) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center p-6 bg-card rounded-lg shadow-lg border border-border">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Maintenance Mode</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The Job Seeker's Dashboard is currently undergoing scheduled maintenance. 
            Please check back later.
          </p>
          <Button 
            onClick={() => retryInitialRequest()} 
            className="mt-2"
            variant="outline"
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }
  
  // All good, render the application
  return <Router />;
}

export default App;
