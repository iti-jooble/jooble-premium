import { useToast } from "@/hooks/use-toast";
import { authByGoogle } from "@/redux/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useState, useEffect, useRef, MouseEventHandler } from "react";
import { useLocation } from "wouter";
import { tryLoadScript } from "@/utils/loadScript";

export const useGoogleAuth = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { google: googleConfigs } = useAppSelector(
    (state) => state.bootstrap.configs,
  );
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tokenClientRef = useRef<any>(null);

  const handleError = (error?: string): void => {
    setError(error ?? "Sorry, something went wrong. Please try again later");
  };

  const handleSucceed = (): void => {
    toast({
      title: "Login successful",
      description: "Have fun!",
    });

    setLocation("/");
  };

  const authCallback = async (response) => {
    if (response.error) {
      handleError();
      return;
    }

    if (!response.access_token) {
      setError("Failed to get access token from Google");

      return;
    }

    try {
      setIsLoading(true);

      await dispatch(
        authByGoogle({
          token: response.access_token,
          source: 1100,
        }),
      );

      handleSucceed();
    } catch (error) {
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  const tryGetTokenClient = () => {
    if (!googleConfigs || tokenClientRef.current) {
      return;
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      scope:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
      client_id: googleConfigs.clientId,
      callback: authCallback,
      error_callback: handleError,
    });
    tokenClientRef.current = tokenClient;
  };

  useEffect(() => {
    if (!window.google?.accounts) {
      tryLoadScript("https://accounts.google.com/gsi/client")
        .then(tryGetTokenClient)
        .catch(handleError);
    } else {
      tryGetTokenClient();
    }
  }, []);

  const authorize: MouseEventHandler<HTMLButtonElement> = () => {
    try {
      const tokenClient = tokenClientRef.current;

      if (!tokenClient) {
        handleError();
        return;
      }

      // !!! Do not move or insert something before the next line because it can break authorization in safari https://stackoverflow.com/a/2587692 !!!
      tokenClient.requestAccessToken(); // will trigger tokenClient.callback after user logs in
    } catch (error) {
      handleError();
    }
  };

  return {
    authorize,
    isLoading,
    error,
  };
};
