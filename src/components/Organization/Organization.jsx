import { useContext } from "react";
import styles from "./Organization.module.css";
import { AuthContext } from "../../context/AuthContext";

const Organization = () => {
    const {user} = useContext(AuthContext);
    const organizationList = {
        "Название": user?.organizationName || "",
        "ИНН": "",
    };

    return (
        <div className="d-flex flex-column" style={{ width: "300px", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)", borderRadius: "5px" }}>
            <div style={{ padding: "8px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px", background: "#3983c1" }}>
                <span style={{ textAlign: "start", color: "#fff" }}>Организация</span>
            </div>
            <ul className={styles["list"]}>
                {
                    Object.keys(organizationList)?.map((item, index) => (
                        <li
                            className={styles["list-item"]}
                            key={index}
                        >
                            <div style={{ padding: "7px 0" }}>
                                <span>{item}:</span>
                                <span>{organizationList[item]}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Organization;