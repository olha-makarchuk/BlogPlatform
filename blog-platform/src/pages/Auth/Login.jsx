import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";
import { ROUTES } from "../../utils/constants";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD.ROOT, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const from = location.state?.from?.pathname || ROUTES.DASHBOARD.ROOT;

    login(email, password);

    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Вхід в особистий кабінет</h2>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Увійти</button>
    </form>
  );
}

export default Login;
