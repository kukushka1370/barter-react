import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";

import ProductCard from "../../components/Cards/Product/ProductCard";
import ProductModal from "../../components/Modals/Product/ProductModal";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CatalogPage = () => {
    const { products, fetchProducts, productCategories } = useContext(ShopContext);
    const { user } = useContext(AuthContext);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("userId") || null;

    const [searchValue, setSearchValue] = useState("");
    const [isProductModalOpened, setIsProductModalOpened] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        if (!userId) {
            return setFilteredProducts([...products]);
        }
        console.log(products);
        const filteredByUserIdProducts = products.filter((prod) => prod?.userId?.toString() === userId?.toString())
        setFilteredProducts([...filteredByUserIdProducts]);
    }, [products, userId]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpenModal = () => {
        if (user?.isDemo) return alert(`Сначала дождитесь одобрения Вашей заявки`);
        setIsProductModalOpened(true);
    };

    const handleCloseModal = () => {
        setIsProductModalOpened(false);
    };

    const handleSearch = async () => {
        if (searchValue.trim() === "") return setFilteredProducts([...products]);
        let searchedProducts = products.filter((product) => {
            return product.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        if (searchedProducts.length !== 0) {
            return setFilteredProducts(searchedProducts);
        }
        return [];
        // searchedProducts = await fetchProducts(searchValue);
        // return setFilteredProducts(searchedProducts);
    };

    return (
        <div className="d-flex flex-column align-items-center" style={{ gap: "40px", paddingTop: "30px", position: "relative" }}>
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} style={{ padding: "10px", width: "60%" }}>
                {
                    productCategories?.map((category, i) => (
                        <option value={category} key={i}>{category}</option>
                    ))
                }
            </select>
            <div className="d-flex" style={{ gap: "20px", width: "80vw" }}>
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Поиск пользователя, организации или потребности..." style={{ width: "85%", padding: "7px", borderRadius: "9px" }} />
                <div onClick={() => handleSearch()} className="d-flex align-items-center justify-content-center" style={{ background: "#5bc0de", color: "#fff", borderRadius: "10px", padding: "9px", cursor: "pointer" }}>Найти</div>
            </div>
            <div className="d-flex" style={{ gap: "10px" }}>
                <div
                    onClick={() => handleOpenModal()}
                    className="d-flex align-items-center justify-content-center"
                    style={{ fontWeight: "500", background: user?.isDemo ? "grey" : "#5cb85c", padding: "10px", width: "180px", borderRadius: "7px", color: "#fff", cursor: "pointer" }}
                >Добавить товар</div>
                <Link to={!user?.isDemo ? `?userId=${user?.id}` : ""} className="d-flex align-items-center justify-content-center" style={{ fontWeight: "500", background: user?.isDemo ? "grey" : "#f0ad4e", padding: "10px", width: "180px", borderRadius: "7px", color: "#fff", cursor: "pointer" }}>Мои товары</Link>
            </div>
            {
                isProductModalOpened && <ProductModal onClose={handleCloseModal} />
            }
            <div className="d-flex flex-wrap justify-content-center" style={{ gap: "50px" }}>
                {
                    !filteredProducts?.length ? <span>Ничего не найдено</span> :
                        filteredProducts?.map((product, index) => (
                            <ProductCard productInfo={product} key={index} />
                        ))
                }
            </div>
        </div>
    );
}

export default CatalogPage;