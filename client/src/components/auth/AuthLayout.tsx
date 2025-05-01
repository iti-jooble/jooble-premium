import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

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
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-600"
          >
            <path
              d="M6 7H18V17H11L6 12V7Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-2xl font-bold ml-2 text-gray-900">fitly</span>
        </div>
      </div>
      
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm">
        {children}
      </Card>
      
      {footer && (
        <div className="mt-6 text-center text-xs text-gray-500">
          {footer}
        </div>
      )}
    </div>
  );
};

export default AuthLayout;