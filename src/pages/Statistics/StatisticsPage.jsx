import { useContext, useEffect } from "react";
import styles from "./StatisticsPage.module.css";
import { ShopContext } from "../../context/ShopContext";
import { AuthContext } from "../../context/AuthContext";

const StatisticsPage = () => {
    const { statistics, getStatistics, products } = useContext(ShopContext);
    const { users } = useContext(AuthContext);

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
            ["Коммиссия системы :", "2%", "	0"],
            ["Инвестору франшизы X2", "1%", "	0"],
            ["Менеджеру по индексу X2", "1%", "0"],
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
                                            <span>{arr[1]}</span>
                                            <span>{arr[2]}</span>
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

export default StatisticsPage;