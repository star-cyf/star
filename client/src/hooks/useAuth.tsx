declare const google: any; // define google as a global variable
// From "index.html" <script src="https://accounts.google.com/gsi/client" async defer></script>

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import isTokenExpired from "../utils/isTokenExpired";
import { AuthenticatedUser } from "../types/auth";

const useAuth = () => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser | null>(null);

  const navigate = useNavigate();

  // ----------------------------------------------------------------

  const getAuthenticatedUser = useCallback(async (customJWT: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${customJWT}`,
          },
          // credentials: "include",
        }
      );
      // console.log("getAuthenticatedUser response:", response);

      if (!response.ok) {
        throw new Error(
          `getAuthenticatedUser failed ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      // console.log("getAuthenticatedUser data:", data);

      return data;
    } catch (error) {
      console.error("getAuthenticatedUser error:", error);
    }
  }, []);

  // ----------------------------------------------------------------

  const googleAccountsIdInitializeFlow = useCallback(async () => {
    // This method initializes the Google Sign-In client instance.
    // This instance is responsible for managing the sign-in process
    // and providing callbacks for when the user signs in or signs out.
    // The initialize method takes an object as an argument, which is used to configure the client.
    google.accounts.id.initialize({
      client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
      // itp_support: itpSupportBoolean(),
      callback: async (googleIdTokenResponse: { credential: string }) => {
        try {
          // console.log(
          //   "googleAccountsIdInitializeFlow googleIdTokenResponse:",
          //   JSON.stringify(googleIdTokenResponse)
          // );

          // Receive the Google ID Token from Google
          const googleIdToken = googleIdTokenResponse.credential;
          // console.log(
          //   "googleAccountsIdInitializeFlow googleIdToken:",
          //   googleIdTokenResponse.credential
          // );

          // Send the "Authorization Code" to the backend in the Request Header
          // Receive back a JSON Body with CustomJWT
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/auth/google/idtoken`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${googleIdToken}`,
              },
              // credentials: "include",
            }
          );
          // console.log("googleAccountsIdInitializeFlow response:", response);

          if (!response.ok) {
            throw new Error(
              `Error: ${response.status} ${response.statusText} : googleAccountsIdInitializeFlow response failed`
            );
          }

          const customJWT = await response.json();
          // console.log("googleAccountsIdInitializeFlow customJWT:", customJWT);

          // Set "customJWT" into LocalStorage
          localStorage.setItem("customJWT", customJWT);

          const user = await getAuthenticatedUser(customJWT);
          // console.log("googleAccountsIdInitializeFlow user", user);

          if (!user) {
            throw new Error("googleAccountsIdInitializeFlow no user");
          }

          // Set "authenticatedUser" into LocalStorage
          localStorage.setItem("authenticatedUser", JSON.stringify(user));

          // Set the user React State
          setAuthenticatedUser(user);

          // Navigate to the Profile Page
          navigate("/profile");
        } catch (error) {
          console.error("googleAccountsIdInitializeFlow callback error", error);
        }
      },
    });

    // This method triggers the Google Sign-In prompt.
    // This prompt will display a modal window that allows the user to sign in to their Google account.
    // Once the user has signed in, the callback function specified in the initialize method will be called.
    // The callback function will be passed an object containing information about the signed-in user.
    google.accounts.id.prompt(
      (notification: {
        isNotDisplayed(): string;
        isSkippedMoment(): string;
        getNotDisplayedReason(): string;
      }) => {
        console.log("googleAccountsIdPrompt notification:", notification);
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log(
            "googleAccountsIdPrompt notification.getNotDisplayedReason():",
            notification.getNotDisplayedReason()
          );

          // Remove the "g_state" Cookie that Google Sign In creates
          document.cookie =
            "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          const notDisplayedReason = notification.getNotDisplayedReason();
          // browser_not_supported;
          // invalid_client;
          // missing_client_id;
          // opt_out_or_no_session * secure_http_required;
          // suppressed_by_user;
          // unregistered_origin;
          // unknown_reason;
          if (notDisplayedReason === "opt_out_or_no_session") {
            // If we reach here we cannot login with One Tap...
            // So we have to use another flow...
          }
        }
      }
    );
  }, [getAuthenticatedUser, navigate]);

  // ----------------------------------------------------------------

  const login = useCallback(async () => {
    googleAccountsIdInitializeFlow();
  }, [googleAccountsIdInitializeFlow]);

  // ----------------------------------------------------------------

  const logout = useCallback(() => {
    // Remove the "g_state" Cookie that Google Sign In creates
    document.cookie =
      "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Clear the "customJWT" from Local Storage
    localStorage.removeItem("customJWT");

    // Clear the "authenticatedUser" from Local Storage
    localStorage.removeItem("authenticatedUser");

    // Clear the authenticatedUser React State
    setAuthenticatedUser(null);

    // Navigate to the Home Page
    navigate("/");
  }, [navigate]);

  // ----------------------------------------------------------------

  useEffect(() => {
    const authenticatedUserLocalStorage = JSON.parse(
      localStorage.getItem("authenticatedUser") as string
    );

    if (authenticatedUserLocalStorage) {
      if (isTokenExpired(authenticatedUserLocalStorage)) {
        logout();
      } else {
        setAuthenticatedUser(authenticatedUserLocalStorage);
      }
    } else {
      localStorage.removeItem("customJWT");
    }
  }, [logout]);

  // ----------------------------------------------------------------

  return {
    authenticatedUser,
    login,
    logout,
  };
};

export default useAuth;
