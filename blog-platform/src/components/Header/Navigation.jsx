import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Navigation.css";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";
import useClickOutside from "../../hooks/useClickOutside";
import { ROUTES } from "../../utils/constants";

function Navigation({ onSearchToggle }) {
  const { user, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setMenuOpen(false));

  return (
    <nav className="nav">
      <div className="nav__inner">
        <NavLink to={ROUTES.HOME} className="nav__logo">
          <img src={logo} alt="Blog Logo" />
        </NavLink>

        <div className="container-menu">
          <button
            className="search-toggle"
            onClick={onSearchToggle}
            aria-label="Пошук"
          >
            <img src={searchIcon} alt="Пошук" className="search-icon" />
          </button>

          <button
            className={`nav__burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div ref={menuRef} className={`nav__menu ${menuOpen ? "open" : ""}`}>
            <NavLink to={ROUTES.CATEGORIES} onClick={() => setMenuOpen(false)}>
              Категорії
            </NavLink>
            <NavLink to={ROUTES.AUTHORS} onClick={() => setMenuOpen(false)}>
              Автори
            </NavLink>
            <NavLink to={ROUTES.ABOUT} onClick={() => setMenuOpen(false)}>
              Про нас
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink to={ROUTES.DASHBOARD} onClick={() => setMenuOpen(false)}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="user-avatar"
                  />
                </NavLink>
              </>
            ) : (
              <NavLink to={ROUTES.LOGIN} onClick={() => setMenuOpen(false)}>
                Увійти
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
