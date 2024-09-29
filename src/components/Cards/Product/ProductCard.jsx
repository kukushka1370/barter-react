import styles from "./ProductCard.module.css";
import { API_URL } from "../../../utils/constants";
import { formatDate } from "../../../utils/utils";
import { Link } from "react-router-dom";

const ProductCard = ({ productInfo }) => {
    const formdattedDate = formatDate(productInfo?.createdAt || "");

    return (
        <div className={`d-flex align-items-center ${styles["product-card"]}`}>
            <Link className={styles["img-link"]} to={`${productInfo?._id}`}>
                <img className={styles["adapt-img"]} src={`${API_URL}/${productInfo?.img}`} alt="" />
            </Link>
            <div className="d-flex flex-column justify-content-center" style={{ padding: "10px", height: "100%", gap: "10px" }}>
                <Link to={`${productInfo?._id}`} style={{ textAlign: "center" }}>{productInfo?.name}</Link>
                <span style={{ textAlign: "center" }}>{productInfo?.price} {productInfo?.currencyCode || "RUB"}</span>
                <span style={{ textAlign: "center", fontSize: "12px" }}>Добавлено : {formdattedDate || productInfo?.createdAt || ""}</span>
            </div>
        </div>
    );
}

export default ProductCard;