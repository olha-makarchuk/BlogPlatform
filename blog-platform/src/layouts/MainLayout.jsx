import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./MainLayout.css";
import useScrollToTop from "../hooks/useScrollToTop";

function MainLayout() {
    useScrollToTop();

  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
