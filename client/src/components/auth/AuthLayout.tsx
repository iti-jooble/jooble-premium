import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface AuthLayoutProps {
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * A shared layout component for authentication pages
 * (login, register, forgot password, etc.)
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children, footer }) => {
  return (
    <div className="min-h-screen bg-primary-gradient flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <div className="flex items-start justify-center">
          <img
            src="/images/logo.svg"
            alt="Fitly Logo"
            className="relative top-[2px] mr-2"
          />
          <img src="/images/logo-name.svg" alt="Fitly" />
        </div>
      </div>

      <Card className="w-full max-w-md p-6 bg-white rounded-2xl shadow-sm">
        {children}
      </Card>

      {footer && (
        <div className="mt-6 text-center text-xs text-gray-500">{footer}</div>
      )}
    </div>
  );
};

export default AuthLayout;
