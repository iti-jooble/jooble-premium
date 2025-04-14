import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import SideMenu from "@/components/layout/SideMenu";
import Content from "@/components/layout/Content";
import CvBuilder from "@/pages/CvBuilder";
import CvBuilderCreate from "@/pages/CvBuilderCreate";
import CvReview from "@/pages/CvReview";
import JobSearch from "@/pages/JobSearch";
import CvMatching from "@/pages/CvMatching";
import CoverLetter from "@/pages/CoverLetter";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import ButtonDemo from "@/pages/ButtonDemo";

function Router() {
  return (
    <div className="flex h-screen">
      <SideMenu />
      <Content>
        <Switch>
          <Route path="/" component={() => <Redirect to="/job-search" />} />
          <Route path="/cv-builder" component={CvBuilder} />
          <Route path="/cv-builder/create" component={CvBuilderCreate} />
          <Route path="/cv-review" component={CvReview} />
          <Route path="/job-search" component={JobSearch} />
          <Route path="/cv-matching" component={CvMatching} />
          <Route path="/cover-letter" component={CoverLetter} />
          <Route path="/settings" component={Settings} />
          <Route path="/help" component={Help} />
          <Route path="/button-demo" component={ButtonDemo} />
          <Route component={NotFound} />
        </Switch>
      </Content>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
