import { useContext, useState, useEffect } from "react";
import { useSearchParams, Link as RouterLink, NavLink } from "react-router-dom";
import { Box, Typography, Button, Link } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import RotateRightRoundedIcon from "@mui/icons-material/RotateRightRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { AuthContext } from "../context/AuthContext";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";

const VerifyPage = () => {
  // console.log("VerifyPage rendered");
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext)!; // non null assertion operator

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  // console.log("VerifyPage code:", code);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // console.log("VerifyPage useEffect ran");
    const getUserVerification = async (code: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/github?code=${code}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("customJWT")}`,
            },
            // credentials: "include",
          }
        );
        // console.log("getUserVerification response", response);

        if (!response.ok) {
          throw new Error("getUserVerification response: failed");
        }

        const data = await response.json();
        // console.log("getUserVerification data", data);

        if (!data) {
          throw new Error("getUserVerification data: No Data");
        }

        localStorage.setItem("authenticatedUser", JSON.stringify(data));
        setAuthenticatedUser(data);
      } catch (error) {
        console.error("getUserVerification error", error);
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (code && authenticatedUser?.roleId! > 1) {
      // console.log("VerifyPage useEffect IF BLOCK [1]");
      return;
    }

    if (code && authenticatedUser?.roleId! === 1) {
      // console.log("VerifyPage useEffect IF BLOCK [2] code:", code);
      getUserVerification(code);
      return;
    }

    if (!code) {
      // console.log("VerifyPage useEffect IF BLOCK [3]");
      return;
    }
  }, [code, authenticatedUser?.roleId, setAuthenticatedUser]);

  return (
    <Box my={2}>
      <Typography variant={"pageTitle"}>Verification Page</Typography>
      <Box
        display={"grid"}
        rowGap={2}
        mt={2}
        p={2}
        border={consistentBorder}
        borderRadius={consistentBorderRadius}
        bgcolor={consistentBgColor}
        boxShadow={consistentBoxShadow}
        sx={{
          backdropFilter: consistentBackdropFilter,
        }}>
        <Typography>
          STAR is only accessible to members of the{" "}
          <Link
            href="https://codeyourfuture.io/"
            target={"_blank"}
            underline={"hover"}>
            CodeYourFuture
          </Link>{" "}
          community.
        </Typography>
        <Typography>
          Once you have logged in with Google, your account will be{" "}
          <Typography component={"span"} fontWeight={600} color={"primary"}>
            Unverified
          </Typography>{" "}
          by default.
        </Typography>
        <Typography>
          For your account to be{" "}
          <Typography component={"span"} fontWeight={600} color={"primary"}>
            Verified
          </Typography>{" "}
          we will make a{" "}
          <Typography component={"span"} fontWeight={600}>
            one time check
          </Typography>{" "}
          to see if you are a part of the{" "}
          <Link
            href={"https://github.com/CodeYourFuture"}
            target={"_blank"}
            underline={"hover"}>
            CodeYourFuture GitHub Organization
          </Link>
        </Typography>
        <Typography>
          If successful you will be granted access to STAR!
        </Typography>
        <Box>
          <Box>
            <Button
              endIcon={
                isLoading ? (
                  <RotateRightRoundedIcon />
                ) : error ? (
                  <WarningRoundedIcon />
                ) : (
                  <SendRoundedIcon />
                )
              }
              disabled={
                authenticatedUser && authenticatedUser.roleId > 1 ? true : false
              }
              component={RouterLink}
              to={`https://github.com/login/oauth/authorize?client_id=${
                import.meta.env.VITE_GITHUB_CLIENT_ID
              }&scope=read:org`}
              variant="contained">
              Verify Me
            </Button>
          </Box>
          {error && (
            <Typography mt={1} color={"error"}>
              Error: {error}
            </Typography>
          )}
        </Box>
        {authenticatedUser && (
          <>
            <Box>
              <Typography>
                Name:{" "}
                <Typography component={"span"} fontWeight={600}>
                  {authenticatedUser.firstName} {authenticatedUser?.lastName}{" "}
                </Typography>
              </Typography>
              <Typography>
                Verification Status:{" "}
                <Typography
                  component={"span"}
                  fontWeight={600}
                  color={"primary"}>
                  {authenticatedUser.roleId > 1 ? "Verified" : "Unverified"}
                </Typography>
              </Typography>
              <Typography>
                Role ID:{" "}
                <Typography component={"span"} fontWeight={600}>
                  {authenticatedUser.roleId}
                </Typography>
              </Typography>
            </Box>
            {authenticatedUser.roleId > 1 && (
              <Box>
                <Button
                  component={NavLink}
                  to={"/profile"}
                  variant={"contained"}>
                  Verified! Continue...
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default VerifyPage;
