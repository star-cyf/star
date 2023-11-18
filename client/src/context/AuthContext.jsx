import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { getCookieValue } from "../utils/getCookieValue";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // store the customJWT, the user information from the customJWT Payload
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // store the userCookie
  const [userCookie, setUserCookie] = useState(null);

  // Necessary for redirecting after logout
  const navigate = useNavigate();

  // get the Google Auth Methods
  const {
    loginGoogleIdToken,
    // loginGoogleAuthorizationCodePopup,
    // loginGoogleAuthorizationCodeRedirect,
    // loginGoogleAccessToken,
  } = useGoogleAuth({ setToken, setUser, navigate });

  useEffect(() => {
    // Try to retrieve the customJWT from localStorage
    const storedToken = localStorage.getItem("token");
    // console.log("storedToken:", storedToken);

    // Try to retrieve the user Cookie if it exists
    const userCookie = getCookieValue("user");
    // console.log("userCookie:", userCookie);

    if (storedToken) {
      setToken(storedToken);
      const user = JSON.parse(atob(storedToken.split(".")[1]));
      setUser(user);
    }

    if (userCookie) {
      setUserCookie(userCookie);
    }
  }, []);

  const login = useCallback(async () => {
    // choose one of the Google Auth Methods to use
    await loginGoogleIdToken();
    // await loginGoogleAuthorizationCodePopup();
    // await loginGoogleAuthorizationCodeRedirect();
    // await loginGoogleAccessToken();
  }, []);

  const logout = useCallback(() => {
    // remove the token from local storage
    localStorage.removeItem("token");
    // clear the token React State
    setToken(null);
    // clear the user React State
    setUser(null);
    // clear the userCookie React state
    setUserCookie(null);
    // Redirect to the Home Page
    navigate("/");
  }, []);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      userCookie,
      login,
      logout,
    }),
    [token, user, userCookie]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
