import { useContext, useEffect, useState } from "react";
import styles from "./ControlPage.module.css";
import { ShopContext } from "../../context/ShopContext";
import { AuthContext } from "../../context/AuthContext";

const ControlPage = () => {
    const { statistics, getStatistics, updateTotalMoney, products, commis, setComm, max, setMax, updateCommission, updateMax } = useContext(ShopContext);
    const { users } = useContext(AuthContext);
    const [newTotalMoney, setNewTotalMoney] = useState("");

    const totalProductPrice = products?.reduce((acc, pr) => acc + +pr.price, 0);
    const totalProductQuantity = products?.reduce((acc, pr) => acc + +pr.quantity, 0);
    const formFields = {
        "Общая статистика системы": {
            "Пользователей в системе": users?.length || 1,
            "Всего обязательств в системе": statistics?.totalMoney || 0,
            "Обязательств на пользователя": statistics?.totalMoney / users?.length || 0,
        },
        "Коммиссия по сделкам": [
            ["Вид коммиссии", "Ставка коммиссии", "Макс номинал ставки"],
            ["Коммиссия системы :", `${statistics?.systemCommission || "1"}%`, `${statistics?.systemCommissionMax || "0"}`],
            ["Инвестору франшизы X2", `${statistics?.investorCommission || "1"}%`, `${statistics?.investorCommissionMax || "0"}`],
            ["Менеджеру по индексу X2", `${statistics?.managerCommission || "1"}%`, `${statistics?.managerCommissionMax || "0"}`],
        ],
        "Товары и услуги": {
            "Кол-во предложений в системе": products?.length || 0,
            "Кол-во единиц товара в системе": totalProductQuantity || 0,
            "Товаров на общую сумму": totalProductPrice || 0,
            "Соотношение обязательств/товары на сумму": statistics?.totalMoney / totalProductPrice || 0,
        },
    };

    useEffect(() => {
        getStatistics();
    }, []);

    const handleTotalMoneyChange = (sign = "+") => {
        return updateTotalMoney(+`${sign}${newTotalMoney}`);
    };

    return (
        <div className="d-flex flex-column" style={{ gap: "1.4rem", padding: "1rem" }}>
            {
                Object.keys(formFields).map((sectionName, i) => {
                    if (sectionName !== "Коммиссия по сделкам") {
                        return (
                            <div key={i} className="d-flex justify-content-center flex-column">
                                <div
                                    className="d-flex align-items-center"
                                    style={{ background: "linear-gradient(to bottom, #d9edf7 0%, #c4e3f3 100%)", color: "#31718f", padding: ".6rem", marginBottom: ".3rem" }}>
                                    <h2 style={{ fontSize: "16px" }}>{sectionName}</h2>
                                </div>
                                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                    {
                                        Object.keys(formFields[sectionName]).map((name, i) => (
                                            name === "Всего обязательств в системе" ?
                                                <li key={i} className={styles["list-item"]} style={{ borderBottom: "1px solid #dddddd", padding: "14px 12px 14px 2px" }}>
                                                    <span>{name} :</span>
                                                    <span>{formFields[sectionName][name] || 0}</span>
                                                    <div className="d-flex align-items-center" style={{ gap: ".4rem" }}>
                                                        <div
                                                            className="d-flex align-items-center justify-content-center"
                                                            onClick={() => handleTotalMoneyChange("-")}
                                                            style={{ height: "2rem", width: "2rem", background: "lightblue", color: "#fff", borderRadius: "6px", padding: "4px", cursor: "pointer" }}>-</div>
                                                        <input type="text" placeholder="Cумма" value={newTotalMoney} onChange={e => setNewTotalMoney(e.target.value)} />
                                                        <div
                                                            className="d-flex align-items-center justify-content-center"
                                                            onClick={() => handleTotalMoneyChange("+")}
                                                            style={{ height: "2rem", width: "2rem", background: "lightblue", color: "#fff", borderRadius: "6px", padding: "4px", cursor: "pointer" }}>+</div>
                                                    </div>
                                                </li> :
                                                <li key={i} className={styles["list-item"]} style={{ borderBottom: "1px solid #dddddd", padding: "14px 12px 14px 2px" }}>
                                                    <span>{name} :</span>
                                                    <span>{formFields[sectionName][name] || 0}</span>
                                                </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
                    return (
                        <div key={i} className="d-flex justify-content-center flex-column">
                            <div
                                className="d-flex align-items-center"
                                style={{ background: "linear-gradient(to bottom, #d9edf7 0%, #c4e3f3 100%)", color: "#31718f", padding: ".6rem", marginBottom: ".3rem" }}>
                                <h2 style={{ fontSize: "16px" }}>{sectionName}</h2>
                            </div>
                            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                {
                                    formFields[sectionName].map((arr, i) => (
                                        <li key={i} className={styles["list-item"]} style={{ borderBottom: "1px solid #dddddd", padding: "14px 12px 14px 2px" }}>
                                            <span>{arr[0]}</span>
                                            {
                                                i == 0 &&
                                                <div className="d-flex justify-content-between" style={{ width: "60%" }}>
                                                    <span>{arr[1]}</span>
                                                    <span>{arr[2]}</span>
                                                </div>
                                            }
                                            {/* <span>{arr[3]}</span>
                                            <span>{arr[4]}</span> */}
                                            {
                                                i !== 0 &&
                                                <div className="d-flex">
                                                    <input type="text" placeholder={arr[1]}
                                                        onChange={(e) => setComm(prev => {
                                                            const t = [...prev];
                                                            t[i - 1] = e.target.value;
                                                            return t;
                                                        })} value={commis[i - 1]} style={{ width: "80%", padding: "0 10px" }} />
                                                    <div className="d-flex align-items-center justify-content-center" style={{ width: "6rem", background: "lightblue", color: "#fff", cursor: "pointer" }} onClick={() => updateCommission()}>Изменить</div>
                                                </div>
                                            }
                                            {
                                                i !== 0 &&
                                                <div className="d-flex">
                                                    <input type="text" placeholder={arr[2]}
                                                        onChange={(e) => setMax(prev => {
                                                            const t = [...prev];
                                                            t[i - 1] = e.target.value;
                                                            return t;
                                                        })} value={max[i - 1]} style={{ width: "80%", padding: "1px" }} />
                                                    <div className="d-flex align-items-center justify-content-center" style={{ width: "6rem", background: "lightblue", color: "#fff", cursor: "pointer" }} onClick={() => updateMax()}>Изменить</div>
                                                </div>
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ControlPage;