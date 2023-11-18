import AuthProvider from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import AuthState from "../components/AuthState";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <>
      <AuthProvider>
        <AuthState />
        <Header />
        <Navigation />
        <Outlet />
        <Footer />
      </AuthProvider>
    </>
  );
};

export default RootLayout;
