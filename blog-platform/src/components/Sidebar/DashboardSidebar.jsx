import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./DashboardSidebar.css";
import { ROUTES } from "../../utils/constants";

function DashboardSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside className="sidebar-block">
      <h3>Особистий кабінет</h3>

      <nav>
        <ul className="menu">
          <li>
            <NavLink to={ROUTES.DASHBOARD.ROOT}>Головна</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.POSTS.NEW}>Створити статтю</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.DASHBOARD.MY_POSTS}>Мої статті</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.DASHBOARD.SETTINGS}>Налаштування</NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>Вийти</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default DashboardSidebar;
