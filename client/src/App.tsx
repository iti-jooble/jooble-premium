import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import SideMenu from "@/components/layout/SideMenu";
import Content from "@/components/layout/Content";
import ModalProvider from "@/providers/ModalProvider";
import BootstrapProvider from "@/providers/BootstrapProvider";
import OnboardingRoutes from "@/routes/Onboarding";
import AuthRoutes from "@/routes/Auth";
import MainRoutes from "@/routes/Main";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <BootstrapProvider>
          <OnboardingRoutes>
            <AuthRoutes>
              <div className="flex h-screen">
                <SideMenu />
                <Content>
                  <MainRoutes />
                </Content>
              </div>
            </AuthRoutes>
          </OnboardingRoutes>
          <ModalProvider />
        </BootstrapProvider>
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
