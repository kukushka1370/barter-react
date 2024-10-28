import { useContext, useState } from "react";
import Icons from "../../Icons/Icons";
import styles from "./ProductModal.module.css";
import { ShopContext } from "../../../context/ShopContext";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext";

const ProductModal = ({ onClose }) => {
    const { productCategories, addProduct, isAddProductLoading, currencies } = useContext(ShopContext);
    const { user } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedCurrOption, setSelectedCurrOption] = useState("RUB");
    const [fileError, setFileError] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        userId: user?.id,
        category: "",
        article: "",
        website: "",
        price: "",
        quantity: "",
        description: "",
        img: null,
        currencyCode: "",
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedExtensions = ["png", "jpg", "txt", "pdf"];
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (allowedExtensions.includes(fileExtension)) {
                setNewProduct({ ...newProduct, img: file });
                setFileError(null);
            } else {
                setFileError("Недопустимое расширение файла");
            }
        }
    };

    const handleInputChange = (e) => {
        setNewProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className={styles["product-modal"]}>
            <div className={styles["modal-header"]}>
                <div style={{ cursor: "pointer" }} onClick={onClose}>
                    <Icons variant="cancel" color="#fff" size={30} />
                </div>
            </div>
            <div className={styles["modal-body"]}>
                <div className={styles["block"]}>
                    <label>Название*:</label>
                    <input type="text" name="name" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className={styles["block"]}>
                    <label>Категория*:</label>
                    <select value={selectedOption} name="category" onChange={(e) => {
                        handleInputChange(e)
                        setSelectedOption(e.target.value);
                    }}>
                        {
                            productCategories?.map((category, ind) => (
                                <option value={category} key={ind}>{category}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles["block"]}>
                    <label>Артикул:</label>
                    <input type="text" name="article" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className={styles["block"]}>
                    <label>Ссылка на сайт:</label>
                    <input type="text" name="website" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className={styles["block"]}>
                    <label>Цена/шт.*:</label>
                    <input type="text" name="price" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className={styles["block"]}>
                    <label>Валюта</label>
                    <select value={selectedCurrOption} name="currencyCode" onChange={(e) => {
                        handleInputChange(e)
                        setSelectedCurrOption(e.target.value);
                    }}>
                        {
                            currencies?.map((opt, ind) => (
                                <option value={opt} key={ind}>{opt}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles["block"]}>
                    <label>Штук в наличии*:</label>
                    <input type="text" name="quantity" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className={styles["block"]}>
                    <label>Фото:</label>
                    <input type="file" accept=".png, .jpg, .txt, .pdf" onChange={(e) => handleFileChange(e)} />
                    {
                        fileError && <div style={{ color: "red" }}>{fileError}</div>
                    }
                </div>
                <div className={styles["block"]}>
                    <label>Описание товара:</label>
                    <textarea type="text" name="description" onChange={(e) => handleInputChange(e)} />
                </div>
                <div
                    onClick={() => addProduct(newProduct)}
                    className="d-flex align-items-center justify-content-center"
                    style={{ padding: "7px", background: "#5cb85c", color: "#fff", width: "200px", borderRadius: "8px", margin: "20px", cursor: "pointer" }}
                >{
                        isAddProductLoading ? <Spinner size="sm" /> : "Добавить"}</div>
            </div>
        </div>
    );
}

export default ProductModal;