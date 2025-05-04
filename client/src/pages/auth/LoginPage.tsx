import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthLayout from "@/components/auth/AuthLayout";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { useManualAuth, useGoogleAuth } from "@/hooks/useAuth";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Form data type
type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [, setLocation] = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login, error } = useManualAuth();
  const {
    authorize,
    error: googleError,
    isLoading: isGoogleLoading,
  } = useGoogleAuth();

  // Initialize form
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <AuthLayout
      footer={
        <p>
          By logging in, you agree to the Fitly{" "}
          <a href="#" className="text-primary-blue hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary-blue hover:underline">
            Terms of Service
          </a>
        </p>
      }
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-gray-600 mt-1">Log in to access your account</p>
      </div>

      {(error || googleError) && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error ?? googleError}</AlertDescription>
        </Alert>
      )}

      <GoogleAuthButton onClick={authorize} isLoading={isGoogleLoading} />

      <div className="relative flex items-center justify-center mb-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600 text-sm">
          Or with email
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(login)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} autoComplete="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary-blue hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="text-primary-blue hover:text-blue-800 font-semibold"
            onClick={(e) => {
              e.preventDefault();
              setLocation("/auth/register");
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
