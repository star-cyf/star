declare const google: any; // define google as a global variable
// From "index.html" <script src="https://accounts.google.com/gsi/client" async defer></script>

import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { AuthenticatedUser } from "../types/auth";

const useAuth = () => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser | null>(null);

  const [statusLogs, setStatusLogs] = useState<string[]>([]);

  // const navigate = useNavigate();
  // const location = useLocation();

  // ----------------------------------------------------------------

  const setStatusAndLog = (newStatus: string) => {
    const now = new Date();
    const timestamp = now.toLocaleString();
    setStatusLogs((prevStatusLogs) => [
      ...prevStatusLogs,
      `${timestamp} | ${newStatus}`,
    ]);
  };

  // ----------------------------------------------------------------

  const getAuthenticatedUser = async () => {
    setStatusAndLog("3️⃣ GET /api/auth/user");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/user`,
        { credentials: "include" }
      );
      // console.log("getAuthenticatedUser response:", response);

      if (!response.ok) {
        throw new Error(
          `3️⃣ GET /api/auth/user Failed ${response.status} ${response.statusText}`
        );
      }

      setStatusAndLog(
        `3️⃣ GET /api/auth/user Response ${response.status} ${response.statusText} ✅`
      );

      const data = await response.json();
      // console.log("getAuthenticatedUser data:", data);
      setStatusAndLog(`3️⃣ GET /api/auth/user Data ✅`);

      return data;
    } catch (error) {
      // console.error("getAuthenticatedUser error:", error);
      setStatusAndLog(`3️⃣❌ GET /api/auth/user Error ${error}`);
      // throw new Error(error);
      throw error;
    }
  };

  // ----------------------------------------------------------------

  const googleAccountsIdInitializeFlow = async () => {
    try {
      setStatusAndLog("1️⃣ google accounts id initialize");

      // This method initializes the Google Sign-In client instance.
      // This instance is responsible for managing the sign-in process
      // and providing callbacks for when the user signs in or signs out.
      // The initialize method takes an object as an argument, which is used to configure the client.

      google.accounts.id.initialize({
        client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
        // itp_support: itpSupportBoolean(),
        callback: async (googleIdTokenResponse: { credential: string }) => {
          try {
            setStatusAndLog("1️⃣ getting idToken from Google...");

            // Receive the Google ID Token from Google
            const googleIdToken = googleIdTokenResponse.credential;

            setStatusAndLog(
              `1️⃣ received idToken 🎫 from Google: ~${googleIdToken.slice(
                -6
              )} ✅`
            );

            // Send the "Google ID Token" to the backend in the Request Header
            // Receive back an HTTP-Only Cookie with CustomJWT

            setStatusAndLog("2️⃣ POST /api/auth/google/idtoken");

            let response;
            try {
              response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/google/idtoken`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${googleIdToken}`,
                  },
                  credentials: "include",
                }
              );
              // console.log("googleAccountsIdInitializeFlow response:", response);
            } catch (error) {
              setStatusAndLog(
                `2️⃣ ❌ POST /api/auth/google/idtoken Failed ${error}`
              );
              // throw new Error(error);
              throw error;
            }

            setStatusAndLog(
              `2️⃣ POST /api/auth/google/idtoken Response ${response.status} ${response.statusText} ✅`
            );
            setStatusAndLog(
              "2️⃣ POST /api/auth/google/idtoken Received customJWT 🍪 ✅"
            );

            let user;
            try {
              user = await getAuthenticatedUser();
              // console.log("googleAccountsIdInitializeFlow user", user);
            } catch (error) {
              setStatusAndLog(`3️⃣ ❌ getAuthenticatedUser Failed ${error}`);
              // throw new Error(error);
              throw error;
            }

            setStatusAndLog(`3️⃣ authenticatedUser 👤 ${user.firstName} ✅`);

            // Set "authenticatedUser" into LocalStorage
            localStorage.setItem("authenticatedUser", JSON.stringify(user));

            // Set the user React State
            setAuthenticatedUser(user);

            setStatusAndLog("↩️ login complete!");

            // Navigate to the Profile Page
            // navigate("/profile");
          } catch (error) {
            console.error(
              `googleAccountsIdInitializeFlow callback Error ${error}`
            );
          }
        },
      });

      // This method triggers the Google Sign-In prompt.
      // This prompt will display a modal window that allows the user to sign in to their Google account.
      // Once the user has signed in, the callback function specified in the initialize method will be called.
      // The callback function will be passed an object containing information about the signed-in user.
      await google.accounts.id.prompt(
        (notification: {
          isNotDisplayed(): string;
          isSkippedMoment(): string;
          getNotDisplayedReason(): string;
        }) => {
          setStatusAndLog(
            `1️⃣ google.accounts.id.prompt notification : ${JSON.stringify(
              notification
            )}`
          );
          // console.log("googleAccountsIdPrompt notification:", notification);

          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // console.log(
            //   "googleAccountsIdPrompt notification.getNotDisplayedReason():",
            //   notification.getNotDisplayedReason()
            // );

            setStatusAndLog(
              `1️⃣ google accounts id prompt notification ${notification.getNotDisplayedReason()}`
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

              setStatusAndLog(
                "1️⃣ google accounts id prompt failed... using oauth2popup"
              );

              // googleAccountsOAuth2InitCodeClientPopupFlow();
            }
          }
        }
      );
    } catch (error) {
      console.error(
        `googleAccountsIdInitializeFlow Outer Catch Error ${error}`
      );
      setStatusAndLog(
        `❌ googleAccountsIdInitializeFlow Outer Catch Error ${error}`
      );
    }
  };

  // ----------------------------------------------------------------

  const login = async () => {
    // if (location !== "/auth") {
    //   navigate("/auth");
    // }
    setStatusAndLog("↪️ logging in...");
    googleAccountsIdInitializeFlow();
  };

  // ----------------------------------------------------------------

  const logout = () => {
    // Remove the "g_state" Cookie that Google Sign In creates
    document.cookie =
      "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Clear the "customJWT" from Local Storage
    // localStorage.removeItem("customJWT");

    // Clear the "authenticatedUser" from Local Storage
    localStorage.removeItem("authenticatedUser");

    // Clear the authenticatedUser React State
    setAuthenticatedUser(null);

    // Clear the status logs
    setStatusLogs([]);

    // Navigate to the Home Page
    // navigate("/");
  };

  // ----------------------------------------------------------------

  useEffect(() => {
    // Get "authenticatedUser" from LocalStorage
    const authenticatedUserLocalStorage = JSON.parse(
      localStorage.getItem("authenticatedUser") as string
    );

    // If there is no "authenticatedUser"
    if (!authenticatedUserLocalStorage) {
      // Remove the "customJWT" from Local Storage
      // localStorage.removeItem("customJWT");
      return;
    }

    const now = Date.now();
    const customJWTExpirationTime =
      authenticatedUserLocalStorage.expirationTime * 1000;
    const isCustomJWTExpired = customJWTExpirationTime <= now;

    // If there is an "authenticatedUser" but the CustomJWT has expired
    if (authenticatedUserLocalStorage && isCustomJWTExpired) {
      // Remove the "customJWT" from Local Storage
      // localStorage.removeItem("customJWT");
      // Remove the "authenticatedUser" from Local Storage
      localStorage.removeItem("authenticatedUser");
      return;
    }

    // there is an "authenticatedUser" and the CustomJWT is still valid
    if (authenticatedUserLocalStorage && !isCustomJWTExpired) {
      // If there is an "authenticatedUser"
      // Update the authenticatedUser React State with that user
      setAuthenticatedUser(authenticatedUserLocalStorage);
      return;
    }
  }, []);

  // ----------------------------------------------------------------

  return {
    authenticatedUser,
    setAuthenticatedUser,
    login,
    logout,
    statusLogs,
    setStatusLogs,
  };
};

export default useAuth;
