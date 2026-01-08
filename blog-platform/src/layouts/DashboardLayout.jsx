import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/Sidebar/DashboardSidebar";
import "./DashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar />

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
