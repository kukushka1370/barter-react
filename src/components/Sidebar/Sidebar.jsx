import styles from "./Sidebar.module.css";

import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="d-flex flex-column" style={{ width: "320px", gap: "10px", }}>
            <span style={{ fontWeight: "600", fontSize: "19px", textAlign: "center", position: "relative" }}>{`${user?.name} ${user?.surname}`}
                {
                    user && user?.isDemo && <div style={{ background: "red", display: "grid", placeContent: "center", color: "#fff", padding: ".3rem", position: "absolute", right: 0, top: 0 }}>ДЕМО</div>
                }
            </span>
            <ProgressBar
                variant={user?.rating > 80 ? "success" : (user?.rating > 50 ? "warning" : "danger")}
                label={`${user?.rating}%`}
                now={user?.rating}
                style={{ height: "20px", borderRadius: "10px" }}
            />
            <div className="d-flex flex-column" style={{ gap: "2px" }}>
                <Link to="catalog" className={styles["menu-btn"]} style={{ background: "#387db8" }}><span>Каталог</span></Link>
                <Link to={`catalog?userId=${user?.id}`} className={styles["menu-btn"]} style={{ background: "#efa43c" }}><span>Мои товары</span></Link>
                <Link to="deals" className={styles["menu-btn"]} style={{ background: "#42b6d8" }}><span>Мои сделки</span></Link>
                <Link to="messages" className={styles["menu-btn"]} style={{ background: "#387cb7" }}><span>Мои сообщения</span></Link>
                <Link to="/" className={styles["menu-btn"]} style={{ background: "#f9f9f9" }}><span>Рефералы</span></Link>
            </div>
        </div>
    );
}

export default Sidebar;