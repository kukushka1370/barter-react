import { useContext, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { $api } from "../../../http";

const UserCard = ({ userInfo }) => {
    const { approveOrDecline, user } = useContext(AuthContext);
    const [personalCOmmission, setPersonalCOmmission] = useState(userInfo?.personalCommission || "");

    const changeCommission = () => {
        $api.post("/users/update-commission", { userId: userInfo?.id || userInfo?._id, newCommission: personalCOmmission })
            .then((res) => {
                console.log(res.data);
                alert(`Комиссия обновлена для пользователя ${userInfo?.name} ${userInfo?.surname}`);
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="d-flex flex-column align-items-center" style={{ width: "250px", gap: "10px", border: "1px solid", padding: "8px", position: "relative" }}>
            <span style={{ color: "#155892" }}>{userInfo.surname} {userInfo.name}</span>
            {
                userInfo && userInfo?.isDemo &&
                <span style={{ background: "red", display: "grid", placeContent: "center", color: "#fff", padding: ".3rem", position: "absolute", right: 0, top: 0 }}>ДЕМО</span>
            }
            <ProgressBar
                variant={userInfo.rating > 80 ? "success" : (userInfo.rating > 50 ? "warning" : "danger")}
                label={`${Math.round(userInfo?.rating)}%`}
                now={Math.round(userInfo?.rating || 0)}
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
                {
                    user?.role?.includes("владелец") && <div className="d-flex" style={{ gap: "5px" }}>
                        <input value={personalCOmmission} placeholder={!userInfo?.personalCommission ? "Персональная комиссия пользователя" : `${userInfo?.personalCommission}%`} onChange={(e) => setPersonalCOmmission(e.target.value)} type="text" onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const t = window.confirm(`Вы точно хотите обновить комиссию для пользователя ${userInfo?.name} ${userInfo?.surname}?`);
                                if (!t) return;
                                changeCommission();
                            }
                        }} />
                    </div>
                }
            </div>
        </div>
    );
}

export default UserCard;