import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/Theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("location", JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    const lastLocation = JSON.parse(
      sessionStorage.getItem("location") as string
    );

    if (lastLocation && lastLocation !== location) {
      navigate(lastLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            minHeight={"100vh"}
            display={"grid"}
            gridTemplateRows={"auto 1fr auto"}>
            <Header />
            <Box
              px={2}
              sx={{
                backgroundImage: consistentPageBackgroundImage,
                backgroundSize: "cover",
                backgroundPositionX: "center",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
              }}>
              <Box maxWidth={1200} mx={"auto"}>
                <Outlet />
              </Box>
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default RootLayout;
