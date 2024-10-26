import { useContext } from "react";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const UserCard = ({ userInfo }) => {
    const { approveOrDecline, user } = useContext(AuthContext);

    return (
        <div className="d-flex flex-column align-items-center" style={{ width: "250px", gap: "10px", border: "1px solid", padding: "8px", position: "relative" }}>
            <span style={{ color: "#155892" }}>{userInfo.surname} {userInfo.name}</span>
            {
                userInfo && userInfo?.isDemo &&
                <span style={{ background: "red", display: "grid", placeContent: "center", color: "#fff", padding: ".3rem", position: "absolute", right: 0, top: 0 }}>ДЕМО</span>
            }
            <ProgressBar
                variant={userInfo.rating > 80 ? "success" : (userInfo.rating > 50 ? "warning" : "danger")}
                label={`${Math.round(userInfo.rating)}%`}
                now={Math.round(userInfo.rating)}
                style={{ height: "17px", borderRadius: "8px", fontSize: "12px", width: "80%" }}
            />
            <div className="d-flex flex-wrap justify-content-evenly" style={{ gap: "5px" }}>
                <Link to={`/catalog?userId=${userInfo?.id || userInfo?._id}`} className="d-flex align-items-center justify-content-center" style={{ background: "#f0ad4e", borderRadius: "7px", padding: "5px", textDecoration: "none", color: "#fff", width: "110px", fontSize: ".9em", fontWeight: "500" }}>Товары</Link>
                <Link to={`/`} className="d-flex align-items-center justify-content-center" style={{ background: "#5bc0de", borderRadius: "7px", padding: "5px", textDecoration: "none", color: "#fff", width: "110px", fontSize: ".9em", fontWeight: "500" }}>Потребности</Link>
                <Link to={`mailto:${userInfo?.email}`} className="d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(rgb(126 126 126) 0%, rgb(52 52 52) 100%)", borderRadius: "7px", padding: "5px", textDecoration: "none", color: "#fff", width: "110px", fontSize: ".9em", fontWeight: "500" }}>Почта</Link>
                <Link to={`/messages`} className="d-flex align-items-center justify-content-center" style={{ background: "#428bca", borderRadius: "7px", padding: "5px", textDecoration: "none", color: "#fff", width: "110px", fontSize: ".9em", fontWeight: "500" }}>Сообщение</Link>
                {
                    user?.role?.includes("admin") && userInfo?.isDemo && <div className="d-flex" style={{ gap: "5px" }}>
                        <div className="d-flex align-items-center justify-content-center" onClick={() => approveOrDecline(userInfo?.id || userInfo?._id, true)} style={{ cursor: "pointer", background: "rgb(6 183 0)", borderRadius: "7px", padding: "5px", textDecoration: "none", color: "#fff", width: "110px", fontSize: ".9em", fontWeight: "500" }}>Одобрить</div>
                        <div className="d-flex align-items-center justify-content-center" onClick={() => approveOrDecline(userInfo?.id || userInfo?._id, false)} style={{ cursor: "pointer", background: "rgb(188 13 13)", borderRadius: "7px", padding: "5px", textDecoration: "none", color: "#fff", width: "110px", fontSize: ".9em", fontWeight: "500" }}>Отказать</div>
                    </div>
                }
            </div>
        </div>
    );
}

export default UserCard;