import { useContext } from "react";
import styles from "./DealsControl.module.css";
import { AuthContext } from "../../context/AuthContext";
import { ShopContext } from "../../context/ShopContext";
import { formatDate } from "../../utils/utils";

const DealsControl = () => {
    const { updates } = useContext(ShopContext);
    const { transfers } = useContext(AuthContext);

    return (
        <div className={styles["deals-container"]}>
            {
                [...updates, ...transfers]?.map((el, i) => {
                    const dd = formatDate(el?.createdAt)
                    return <span style={{ background: "lightgrey", padding: "10px", borderRadius: "10px" }} key={i}>{el?.msg || `Совершен успешный перевод на сумму в ${el?.amount}${el?.currencyFrom}\nОтправитель : ${el?.userId}\nПолучатель : ${el?.recepientId}`} {dd}</span>
                })
            }
        </div>
    );
}

export default DealsControl;