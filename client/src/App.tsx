import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
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
  const { isInitialLoading } = useAppLoading();
  
  if (isInitialLoading) {
    return <GlobalLoadingScreen />;
  }
  
  return <Router />;
}

export default App;
