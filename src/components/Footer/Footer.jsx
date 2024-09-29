import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="d-flex flex-column" style={{ height: "140px", padding: "20px 10px", gap: "5px", borderTop: "1px solid #c9c9c9", marginTop: "30px" }}>
            <span style={{ textAlign: "center" }}>Использование сайта <Link to="369barter.club">369barter.club</Link> означает согласие с <Link to="/">Пользовательским соглашением</Link> и <Link to="/">Правилами системы.</Link></span>
            <span style={{ textAlign: "center" }}>&copy; <Link to="369barter.club">369barter.club</Link> 0.301 от 07 Jun 2020</span>
        </footer>
    );
}

export default Footer;