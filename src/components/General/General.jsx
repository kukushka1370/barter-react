import styles from "./General.module.css";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import PasswordModal from "../Modals/Password/PasswordModal";
import { API_URL } from "../../utils/constants";

const General = () => {
    const { user } = useContext(AuthContext);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const hideModal = () => {
        setShowPasswordModal(false);
    };

    const formFields = {
        "Ментор": "нет",
        "Статус": `${user?.role}`,
        "Пароль": <div
            className="d-flex align-items-center justify-content-center"
            onClick={() => setShowPasswordModal(!showPasswordModal)}
            style={{ width: "150px", padding: "4px", background: "none", border: "1px solid", cursor: "pointer" }}
        >Смена пароля</div>,
        "Город": `${user?.region}`,
        "Почтовый индекс": `${user?.postcode}`,
        "E-mail": `${user?.email}`,
        "Id участника": `${user?.id || user?._id || ""}`,
        "Сайт": user?.website || <input type="text" placeholder="Добавить" className={styles["invis-input"]} />,
        "Телефон": `${user?.phoneNumber}`,
        "Доп. телефон": user?.additionalPhoneNumber || <input type="text" placeholder="Добавить" className={styles["invis-input"]} />,
        "Реферальная ссылка": `${API_URL}/${user?.referralLink}` || "",
    };

    return (
        <div className="d-flex flex-column" style={{ width: "370px", position: "relative", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)", borderRadius: "5px" }}>
            <div style={{ padding: "8px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px", background: "#3983c1" }}>
                <span style={{ textAlign: "start", color: "#fff" }}>Основное</span>
            </div>
            <ul className={styles["list"]}>
                {
                    Object.keys(formFields).map((field, index) => (
                        <li
                            className={styles["list-item"]}
                            key={index}
                        >
                            <div style={{ padding: "7px 0", display: "flex", justifyContent: "space-between", alignItems: "center", width: "320px", overflowY: "auto" }}>
                                <span>{field} :</span>
                                <span style={{ maxWidth: "150px", width: "auto", fontSize: field == "Реферальная ссылка" ? "10px" : "16px" }}>{formFields[field]}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
            {
                showPasswordModal && <PasswordModal onClose={hideModal} />
            }
        </div>
    );
}

export default General;