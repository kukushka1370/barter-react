import styles from "./ProductPage.module.css";

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import { API_URL } from "../../utils/constants";
import { ShopContext } from "../../context/ShopContext";
import { AuthContext } from "../../context/AuthContext";

const ProductPage = () => {
    const { productId } = useParams();
    const { productInfo, getProductById } = useContext(ShopContext);
    const { user } = useContext(AuthContext);

    // const [product, setProduct] = useState({});
    const [formFields, setFormFields] = useState({
        user: {
            "id": 2,
            "Имя": "Иван",
            "Фамилия": "Попов",
            "Рэйтинг": <ProgressBar
                variant={user.rating > 80 ? "success" : (user.rating > 50 ? "warning" : "danger")}
                label={`${user.rating}%`}
                now={user.rating}
                style={{ height: "20px", borderRadius: "10px" }}
            />,
            "Продано": 1,
            "E-mail": "ageh@gmail.com",
            "Телефон": "+79992459842",
            "Организация": "Хожиакбар",
            "ИНН": "2007",
        },
        product: {
            "Категория": "product?.category",
            "Цена": "40 000",
            "Количество, шт.": 2,
            "Бронь, шт.": 0,
            "Артикул": 2,
            "Ссылка на сайт": "https://alifshop.uz/uz/offer/igrovoe-kreslo-gaming-chair-cougar-outrider-orange-cougar",
            "Просмотры": 23,
        },
    });

    // const pro = {
    //     id: 1,
    //     name: `MacBook Pro 14"`,
    //     img: `https://static.re-store.ru/upload/resize_cache/iblock/dfb/560_280_140cd750bba9870f18aada2478b24840a/64r2tpmb0cmys9g0mcpoqmfcz5onoudf.jpg`,
    //     price: `490 000`,
    //     quantity: 2,
    //     user: {
    //         name: `Владислав`,
    //         surname: `Крячков`,
    //         rating: 74,
    //     },
    //     added: `11.12.2024 07:36`,
    // };

    useEffect(() => {
        getProductById(productId);
        // const p = products.find(el => el.id === +productId);
    }, []);

    useEffect(() => {
        setFormFields(
            {
                user: {
                    "Id": productInfo["user"]?._id,
                    // "Idd": productInfo["user"]?._id,
                    "Имя": productInfo["user"]?.name,
                    "Фамилия": productInfo["user"]?.surname,
                    "Рэйтинг": <ProgressBar
                        variant={productInfo["user"]?.rating > 80 ? "success" : (productInfo["user"]?.rating > 50 ? "warning" : "danger")}
                        label={`${productInfo["user"]?.rating}%`}
                        now={productInfo["user"]?.rating}
                        style={{ height: "20px", borderRadius: "10px", width: "160px" }}
                    />,
                    "Рэйтинг Системы": <ProgressBar
                        variant={productInfo["user"]?.systemRating > 80 ? "success" : (productInfo["user"]?.systemRating > 50 ? "warning" : "danger")}
                        label={`${productInfo["user"]?.systemRating}%`}
                        now={productInfo["user"]?.systemRating}
                        style={{ height: "20px", borderRadius: "10px", width: "160px" }}
                    />,
                    "Количество сделок": productInfo["user"]?.productSold || 0,
                    // "Количество сделок": productInfo["user"]?.transactionCount || 0,
                    "Общее количество транзакций": productInfo["transfers"]?.length || 0,
                    "Количество счетов": productInfo["bankAccounts"]?.length || 0,
                    "E-mail": productInfo["user"]?.email,
                    "Телефон": productInfo["user"]?.phoneNumber,
                    "Организация": productInfo["user"]?.organizationName || "",
                    "ИНН": "",
                },
                product: {
                    "Категория": productInfo["product"]?.category,
                    "Цена": productInfo["product"]?.price,
                    "Количество, шт.": productInfo["product"]?.quantity,
                    "Бронь, шт.": 0,
                    "Артикул": productInfo["product"]?.article,
                    "Ссылка на сайт": productInfo["product"]?.website,
                    "Просмотры": 23,
                },
            });
            console.log(productInfo["user"])
    }, [productInfo]);

    useEffect(() => {
        console.log(formFields);
    }, [formFields]);

    return (
        <div className={`${styles["product-page-container"]}`} style={{ padding: "15px" }}>
            <div className="d-flex flex-column">
                <h2>{productInfo["product"]?.name}</h2>
                <img src={`${API_URL}/${productInfo["product"]?.img}`} alt="" style={{ width: "400px" }} />
                <div className="d-flex flex-column" style={{ gap: "5px" }}>
                    <Link to={`mailto:${formFields["user"]["E-mail"]}`} className={styles["menu-btn"]} style={{ background: "linear-gradient(to bottom, #5bc0de 0%, #2aabd2 100%)" }}><span>Написать на почту</span></Link>
                    <Link to={`/messages`} className={styles["menu-btn"]} style={{ background: "linear-gradient(to bottom, #428bca 0%, #2d6ca2 100%)" }}><span>Написать сообщение</span></Link>
                    <Link to={`/catalog?userId=${formFields["user"]["Id"]}`} className={styles["menu-btn"]} style={{ background: "linear-gradient(to bottom, #f0ad4e 0%, #eb9316 100%)" }}><span>В каталог продавца</span></Link>
                    <Link to="/" className={styles["menu-btn"]} style={{ background: "linear-gradient(to bottom, #d9534f 0%, #c12e2a 100%)" }}><span>Пожаловаться</span></Link>
                </div>
            </div>
            <div className="d-flex flex-column" style={{ gap: "20px" }}>
                <div className="d-flex flex-column" style={{ width: "300px" }}>
                    <div style={{ padding: "8px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px", background: "#3983c1" }}>
                        <span style={{ textAlign: "start", color: "#fff" }}>Информация о продавце</span>
                    </div>
                    <ul className={styles["list"]}>
                        {
                            formFields && formFields["user"] && Object.keys(formFields["user"])?.map((field, index) => (
                                <li
                                    className={styles["list-item"]}
                                    key={index}
                                >
                                    <div className="d-flex justify-content-between flex-wrap" style={{ padding: "7px 0" }}>
                                        <span>{field} :</span>
                                        <span>{formFields["user"][field]}</span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="d-flex flex-column" style={{ width: "300px" }}>
                    <div style={{ padding: "8px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px", background: "#3983c1" }}>
                        <span style={{ textAlign: "start", color: "#fff" }}>Информация о товаре</span>
                    </div>
                    <ul className={styles["list"]}>
                        {
                            formFields && formFields["product"] && Object.keys(formFields["product"])?.map((field, index) => (
                                <li
                                    className={styles["list-item"]}
                                    key={index}
                                >
                                    <div className="d-flex justify-content-between flex-wrap" style={{ padding: "7px 0" }}>
                                        <span>{field} : </span>
                                        <span>{formFields["product"][field]}</span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;