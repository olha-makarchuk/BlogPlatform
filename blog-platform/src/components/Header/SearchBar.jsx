import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import useClickOutside from "../../hooks/useClickOutside";
import { ROUTES } from "../../utils/constants";

function SearchBar({ onClose }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const formRef = useRef(null);

  useClickOutside(formRef, onClose);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(ROUTES.SEARCH(searchTerm));
    setSearchTerm("");
    onClose();
  };

  return (
    <div className="search-bar-container" ref={formRef}>
      <form className="search-form-wide" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Пошук..."
          className="input"
          autoFocus
        />
        <button type="submit" className="button-submit">
          Пошук
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
