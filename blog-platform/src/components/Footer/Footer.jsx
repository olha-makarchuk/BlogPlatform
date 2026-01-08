import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} TechTalk. Всі права захищені.</p>
      </div>
    </footer>
  );
}

export default Footer;
