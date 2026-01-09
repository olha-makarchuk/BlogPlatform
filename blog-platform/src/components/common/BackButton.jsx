import { useNavigate } from "react-router-dom";
import "./BackButton.css";

function BackButton({ children = "Назад" }) {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      ← {children}
    </button>
  );
}

export default BackButton;
