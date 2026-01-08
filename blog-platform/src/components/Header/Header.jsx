import React, { useState } from "react";
import Navigation from "./Navigation";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import SearchBar from "./SearchBar";
import "./Header.css";

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  const closeSearch = () => setSearchOpen(false);

  return (
    <header className="header">
      <div className="header__inner">
        <Navigation onSearchToggle={() => setSearchOpen((prev) => !prev)} />
      </div>

      <div>
        <Breadcrumbs />
      </div>

      {searchOpen && <SearchBar onClose={closeSearch} />}
    </header>
  );
}

export default Header;
