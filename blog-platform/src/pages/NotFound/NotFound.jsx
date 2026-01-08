import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <h1>404</h1>
        <h2>Сторінка не знайдена</h2>
        <p>Вибачте, але сторінка, яку ви шукаєте, не існує.</p>
        <Link to="/" className="notfound-button">
          На головну
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
