import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
export const RootLayout = () => {
  return (
    <>
      <NavBar />
      <main className="pages">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
