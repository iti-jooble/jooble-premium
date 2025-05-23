import { Switch, Route, Redirect } from "wouter";
import loadable from "@loadable/component";
import { PageLoadingIndicator } from "@/components/loading/GlobalLoadingScreen";

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

function Main() {
  return (
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
  );
}

export default Main;
