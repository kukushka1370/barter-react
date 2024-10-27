import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";

import ProductCard from "../../components/Cards/Product/ProductCard";
import ProductModal from "../../components/Modals/Product/ProductModal";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CatalogPage = () => {
    const { products, fetchProducts, productCategories, currencies } = useContext(ShopContext);
    const { user } = useContext(AuthContext);

    const location = useLocation();

    const [searchValue, setSearchValue] = useState("");
    const [isProductModalOpened, setIsProductModalOpened] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("RUB");
    const [selectedPriceMovement, setSelectedPriceMovement] = useState("От дорогого к дешевому");

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const userId = searchParams.get("userId") || null;
        if (!userId) {
            // alert()
            return setFilteredProducts([...products]);
        }
        console.log('PROd ', products);
        // alert(userId)
        const filteredByUserIdProducts = products.filter((prod) => prod.userId === userId);
        // alert(filteredByUserIdProducts.length)
        console.log({ filteredByUserIdProducts })
        if (filteredByUserIdProducts.length < 1) {
            return setFilteredProducts([])
        }
        setFilteredProducts(filteredByUserIdProducts);
    }, [products, location]);

    useEffect(() => {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/\s/g, '')); // Убираем пробелы и парсим число
            const priceB = parseFloat(b.price.replace(/\s/g, ''));

            return selectedPriceMovement === "От дорогого к дешевому" ? priceB - priceA : priceA - priceB;
        });

        setFilteredProducts(sortedProducts);
    }, [selectedPriceMovement]);

    useEffect(() => {
        const filteredByUserIdProducts = products.filter((prod) => prod?.currencyCode?.toString() === selectedCurrency?.toString())
        setFilteredProducts([...filteredByUserIdProducts]);
        console.log(selectedCurrency);
    }, [selectedCurrency, products]);

    useEffect(() => {
        if (selectedOption.includes("Все") || selectedOption === "") return setFilteredProducts([...products]);
        const filteredByUserIdProducts = products.filter((prod) => prod?.category?.toString() === selectedOption?.toString())
        setFilteredProducts([...filteredByUserIdProducts]);
        console.log(selectedCurrency);
    }, [selectedOption, products]);

    useEffect(() => {
        fetchProducts();
        const searchParams = new URLSearchParams(location.search);
        const userId = searchParams.get("userId") || null;
        if (userId) {
            const filteredByUserIdProducts = products.filter((prod) => prod.userId === userId);
            console.log({ filteredByUserIdProducts })
            if (filteredByUserIdProducts.length < 1) {
                return setFilteredProducts([]);
            }
            setFilteredProducts(filteredByUserIdProducts);
        }
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
            <div className="d-flex" style={{ gap: "1rem" }}>
                {/* <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} style={{ padding: "10px", width: "100%" }}>
                    {
                        Object.values(currencies).map((curr, i) => (
                            <option value={curr.name} key={i}>{curr.name}</option>
                        ))
                    }
                </select> */}
                <select value={selectedPriceMovement} onChange={(e) => setSelectedPriceMovement(e.target.value)} style={{ padding: "10px", width: "240px", }}>
                    {
                        ["От дорогого к дешевому", "От дешевого к дорогому"].map((curr, i) => (
                            <option value={curr} key={i}>{curr}</option>
                        ))
                    }
                </select>
                <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} style={{ padding: "10px", width: "100px", }}>
                    {
                        Object.keys(currencies).map((curr, i) => (
                            <option value={curr} key={i}>{(currencies[curr].name)}</option>
                        ))
                    }
                </select>
            </div>
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
                    filteredProducts?.length < 1 ? <span>Ничего не найдено</span> :
                        filteredProducts?.map((product, index) => (
                            <ProductCard productInfo={product} key={index} />
                        ))
                }
            </div>
        </div>
    );
}

export default CatalogPage;