import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./DashboardSidebar.css";

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
            <NavLink to="/posts/new">Створити статтю</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" end>
              Головна
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-posts">Мої статті</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/settings">Налаштування</NavLink>
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
