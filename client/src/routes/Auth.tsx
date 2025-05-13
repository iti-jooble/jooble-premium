import { Switch, Route, Redirect, useLocation } from "wouter";
import loadable from "@loadable/component";
import { PageLoadingIndicator } from "@/components/loading/GlobalLoadingScreen";
import AuthGuard from "./guards/AuthGuard";
import { useAppSelector } from "@/redux/store";

const LoginPage = loadable(() => import("@/pages/auth/LoginPage"), {
  fallback: <PageLoadingIndicator />,
});
const RegisterPage = loadable(() => import("@/pages/auth/RegisterPage"), {
  fallback: <PageLoadingIndicator />,
});

function Auth({ children }) {
  const { isAuthorized } = useAppSelector((state) => state.user);
  const [location, setLocation] = useLocation();

  return (
    <Switch>
      <Route path="/auth/login">
        {() => (isAuthorized ? <Redirect to="/" /> : <LoginPage />)}
      </Route>
      <Route path="/auth/register">
        {() => (isAuthorized ? <Redirect to="/" /> : <RegisterPage />)}
      </Route>

      <Route>{() => <AuthGuard>{children}</AuthGuard>}</Route>
    </Switch>
  );
}

export default Auth;
