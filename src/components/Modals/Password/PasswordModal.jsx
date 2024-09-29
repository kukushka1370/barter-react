import styles from "./PasswordModal.module.css";
import Icons from "../../Icons/Icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const PasswordModal = ({ onClose }) => {
    const { udpatePassword } = useContext(AuthContext);

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatedNewPassword, setRepeatedNewPassword] = useState("");

    const handleClick = () => {
        if (newPassword !== repeatedNewPassword) return alert(`Пароли не совпадают`);
        udpatePassword(password, newPassword);
    };

    return (
        <div className={styles["password-modal"]}>
            <div className={styles["modal-header"]}>
                <div style={{ cursor: "pointer" }} onClick={onClose}>
                    <Icons variant="cancel" color="black" size={30} />
                </div>
            </div>
            <div className={styles["modal-body"]}>
                <label>Текущий пароль : </label>
                <input type="text" placeholder="qwwerty123" onChange={(e) => setPassword(e.target.value)} />

                <label>Новый пароль : </label>
                <input type="text" placeholder="qwwerty123" onChange={(e) => setNewPassword(e.target.value)} />

                <label>Повторите новый пароль : </label>
                <input type="text" placeholder="qwwerty123" onChange={(e) => setRepeatedNewPassword(e.target.value)} />

                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ border: "1px solid", padding: "4px", cursor: "pointer" }}
                    onClick={() => handleClick()}
                >Сменить Пароль</div>
            </div>
        </div>
    );
}

export default PasswordModal;