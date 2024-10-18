import { useContext, useEffect } from "react";
import styles from "./Updates.module.css";
import { ShopContext } from "../../context/ShopContext";
import { formatDate } from "../../utils/utils";

const Updates = () => {
    const { updates, fetchLatestUpdates } = useContext(ShopContext);

    useEffect(() => {
        fetchLatestUpdates();
    }, []);

    return (
        <div className="d-flex flex-column" style={{ width: "300px", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)", borderRadius: "5px" }}>
            <div style={{ padding: "8px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px", background: "#3983c1" }}>
                <span style={{ textAlign: "start", color: "#fff" }}>Обновления</span>
            </div>
            <ul className={styles["list"]}>
                {
                    updates?.map(({ msg, createdAt }, index) => {
                        const formattedDate = formatDate(createdAt)
                        return <li
                            className={styles["list-item"]}
                            key={index}
                        >
                            <div style={{ padding: "3px 0" }}>
                                <span style={{ fontSize: "15px" }}>{formattedDate || createdAt || ""}</span>
                                <p>{msg}</p>
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    );
}

export default Updates;