import { useToast } from "@/hooks/use-toast";
import {
  login as performLogin,
  register as performRegister,
} from "@/redux/thunks";
import { AuthCredentials, RegisterData } from "@/types/api/auth.types";
import { useAppDispatch } from "@/redux/store";
import { useState } from "react";
import { useLocation } from "wouter";
import { ValidationStatus } from "./enums";

export const useManualAuth = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (status?: ValidationStatus): void => {
    switch (status) {
      case ValidationStatus.WrongEmailOrPassword:
        setError("Invalid email or password. Please try again.");
        break;
      case ValidationStatus.InvalidEmail:
        setError("Invalid email address. Please try again.");
        break;
      case ValidationStatus.ForbiddenName:
        setError("This name is not allowed. Please choose another one.");
        break;
      case ValidationStatus.Taken:
        setError("This email is already in use. Try logging in instead.");
        break;
      case null:
        break;
      default:
        setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleLoginSucceed = (): void => {
    toast({
      title: "Login successful",
      description: "Welcome back!",
    });

    setLocation("/");
  };

  const handleRegisterSucceed = (): void => {
    toast({
      title: "Account created successfully",
      description: "Welcome to Fitly!",
    });

    setLocation("/");
  };

  const login = async (data: AuthCredentials) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await dispatch(performLogin(data)).unwrap();

      if (response.status !== ValidationStatus.Valid) {
        handleError(response.status as ValidationStatus);
        return;
      }

      handleLoginSucceed();
    } catch (error) {
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await dispatch(performRegister(data)).unwrap();

      if (response.status !== ValidationStatus.Valid) {
        handleError(response.status as ValidationStatus);
        return;
      }

      handleRegisterSucceed();
    } catch (error) {
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    isLoading,
    error,
  };
};
