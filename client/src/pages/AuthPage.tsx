import { useContext, useState, useEffect } from "react";
import UAParser from "ua-parser-js";
import { Box, Typography, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";

const AuthPage = () => {
  const {
    login,
    statusLogs,
    setStatusLogs,
    authenticatedUser,
    setAuthenticatedUser,
  } = useContext(AuthContext)!; // non null assertion operator

  const userAgentParser = new UAParser(navigator.userAgent);
  const userAgent = userAgentParser.getResult();

  const renderUserAgentInfo = (data: UAParser.IResult, parentKey = "") => {
    return Object.entries(data).map(([key, value], index) => (
      <Box key={index} flex={1}>
        {typeof value === "object" ? (
          renderUserAgentInfo(value, key)
        ) : (
          <>
            <Typography component={"span"} fontSize={{ xs: 10, sm: 12 }}>
              {parentKey ? `${parentKey}.${key}` : key}:{" "}
            </Typography>
            <Typography
              component={"span"}
              color={"primary"}
              fontSize={{ xs: 12, sm: 12 }}>
              {value}
            </Typography>
          </>
        )}
      </Box>
    ));
  };

  const [cookieStatus, setCookieStatus] = useState(document.cookie);

  const clearCookies = () => {
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const equals = cookie.indexOf("=");
      const name = equals > -1 ? cookie.substring(0, equals) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });
    setCookieStatus(document.cookie);
  };

  const clearAuthenticatedUser = () => {
    localStorage.removeItem("authenticatedUser");
    setAuthenticatedUser(null);
  };

  useEffect(() => {
    setCookieStatus(document.cookie);
  }, [login]);

  return (
    <Box my={2}>
      <Box display={"grid"} gap={2}>
        <Typography variant={"pageTitle"}>Auth Page</Typography>
        <Box
          px={4}
          py={3}
          border={consistentBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          boxShadow={consistentBoxShadow}
          sx={{
            backdropFilter: consistentBackdropFilter,
          }}>
          <Typography fontWeight={600}>User Agent:</Typography>
          <Box display={"flex"} flexWrap={"wrap"} gap={1}>
            {renderUserAgentInfo(userAgent)}
          </Box>
        </Box>
        <Box
          px={4}
          py={3}
          border={consistentBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          boxShadow={consistentBoxShadow}
          sx={{
            backdropFilter: consistentBackdropFilter,
          }}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Box>
            <Typography fontWeight={600}>Cookies:</Typography>
            <Box>
              <Typography component={"span"} fontSize={{ xs: 10, sm: 12 }}>
                document.cookie :
              </Typography>
              <Typography
                component={"span"}
                color={"primary"}
                fontSize={{ xs: 12, sm: 14 }}>
                {cookieStatus}
              </Typography>
            </Box>
          </Box>
          <Button variant={"contained"} size={"small"} onClick={clearCookies}>
            Clear Cookies
          </Button>
        </Box>
        <Box
          px={4}
          py={3}
          border={consistentBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          boxShadow={consistentBoxShadow}
          sx={{
            backdropFilter: consistentBackdropFilter,
          }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <Typography fontWeight={600}>
              AuthProvider State &quot;status&quot; logs:
            </Typography>
            <Button
              variant={"contained"}
              size={"small"}
              onClick={() => setStatusLogs([])}>
              Clear Logs
            </Button>
          </Box>
          <Box mt={2}>
            {statusLogs &&
              statusLogs.map((log: string, index: number) => (
                <Box key={index}>
                  <Typography component={"span"} fontSize={{ xs: 10, sm: 12 }}>
                    {log.split("|")[0]}
                  </Typography>
                  <Typography
                    component={"span"}
                    color={"primary"}
                    fontSize={{ xs: 12, sm: 14 }}>
                    {log.split("|")[1]}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
        <Box
          px={4}
          py={3}
          border={consistentBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          boxShadow={consistentBoxShadow}
          sx={{
            backdropFilter: consistentBackdropFilter,
          }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <Typography fontWeight={600}>
              AuthProvider State &quot;authenticatedUser&quot;
            </Typography>
            <Button
              variant={"contained"}
              size={"small"}
              onClick={clearAuthenticatedUser}>
              Clear User
            </Button>
          </Box>
          <Box>
            {!authenticatedUser && (
              <Typography fontSize={{ xs: 10, sm: 12 }}>null</Typography>
            )}
            {authenticatedUser && (
              <>
                {Object.entries(authenticatedUser).map((entry, index) => (
                  <Box key={index}>
                    <Typography
                      component={"span"}
                      fontSize={{ xs: 10, sm: 12 }}>
                      {entry[0]} :
                    </Typography>
                    <Typography
                      component={"span"}
                      color={"primary"}
                      fontSize={{ xs: 12, sm: 14 }}
                      sx={{
                        wordBreak: "break-word",
                      }}>
                      {entry[1] ? entry[1] : ""}
                    </Typography>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
