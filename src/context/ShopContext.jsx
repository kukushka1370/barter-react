import { createContext, useCallback, useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import StatisticsService from "../services/StatisticsService";
import UpdateService from "../services/UpdateService";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: `MacBook Pro 14"`,
            img: `https://static.re-store.ru/upload/resize_cache/iblock/dfb/560_280_140cd750bba9870f18aada2478b24840a/64r2tpmb0cmys9g0mcpoqmfcz5onoudf.jpg`,
            price: `490 000`,
            quantity: 2,
            user: {
                id: "1",
                name: `Владислав`,
                surname: `Крячков`,
            },
            added: `11.12.2024 07:36`,
        },
        {
            id: 2,
            name: `MacBook Pro 15"`,
            img: `https://static.re-store.ru/upload/resize_cache/iblock/dfb/560_280_140cd750bba9870f18aada2478b24840a/64r2tpmb0cmys9g0mcpoqmfcz5onoudf.jpg`,
            price: `790 000`,
            quantity: 50,
            user: {
                id: "3",
                name: `Alex`,
                surname: `Fertikov`,
            },
            added: `11.12.2024 07:36`,
        },
        {
            id: 3,
            name: `MacBook Pro 11"`,
            img: `https://static.re-store.ru/upload/resize_cache/iblock/dfb/560_280_140cd750bba9870f18aada2478b24840a/64r2tpmb0cmys9g0mcpoqmfcz5onoudf.jpg`,
            price: `190 000`,
            quantity: 1,
            user: {
                id: "3",
                name: `Alex`,
                surname: `Fertikov`,
            },
            added: `11.12.2024 07:36`,
        },
        {
            id: 4,
            name: `Apple Watch Series 9, 45 мм`,
            img: `https://static.re-store.ru/upload/resize_cache/iblock/48e/100500_800_140cd750bba9870f18aada2478b24840a/kq093xf54z62hf49d0vu1ygoqjda83ji.jpg`,
            price: `49 990`,
            quantity: 1,
            user: {
                id: "2",
                name: `Владислав`,
                surname: `Крячков`,
            },
            added: `11.12.2024 07:36`,
        },
        {
            id: 5,
            name: `Apple iPad Pro (M4, 2024) 13" Wi-Fi + Cellular 2 ТБ, серебристый`,
            img: `https://static.re-store.ru/upload/resize_cache/iblock/12a/100500_800_140cd750bba9870f18aada2478b24840a/idxegonafandos9i4p7l6i4hrsvd7cks.jpg`,
            price: `329 900`,
            quantity: 1,
            user: {
                id: "2",
                name: `Владислав`,
                surname: `Крячков`,
            },
            added: `12.12.2024 09:56`,
        },
        {
            id: 6,
            name: `Apple iPhone 15 Pro Max SIM 256 ГБ, «титановый синий»`,
            img: `https://static.re-store.ru/upload/resize_cache/iblock/68f/100500_800_140cd750bba9870f18aada2478b24840a/n0riox3i0t7vnp8b4puk943l8y138mwx.jpg`,
            price: `149 000`,
            quantity: 1,
            user: {
                id: "3",
                name: `Alex`,
                surname: `Fertikov`,
            },
            added: `01.12.2024 03:16`,
        },
    ]);
    const [productCategories, setProductCategories] = useState([
        "Все товары",
        "Мебель",
        "Для дома и дачи",
        "Животные и товары для них",
        "Сад и огород",
        "Товары для сна",
        "Посуда",
        "Интерьер",
        "Канцелярия",
        "Живопись",
        "Ремесла",
        "Скульптура",
        "Обувь",
        "Одежда",
    ]);
    const [isAddProductLoading, setIsAddProductLoading] = useState(false);
    const [productInfo, setProductInfo] = useState({});
    const [statistics, setStatistics] = useState({});
    const [updates, setUpdates] = useState([{ createdAt: "2020", msg: "Yjfejopfef efpjfpo fepjf" }, { createdAt: "2020", msg: "Yjfejopfef efpjfpo fepjf" }]);

    const [commis, setComm] = useState([]);
    const [max, setMax] = useState([]);

    useEffect(() => {
        StatisticsService.getStatistics().then((stats) => {
            // alert()
            setStatistics(stats);
        });
    }, []);

    useEffect(() => {
        console.log({ commis });
        console.log({ max });
    }, [commis, max])

    const fetchProducts = useCallback(() => {
        ProductService.fetchProducts().then((response) => setProducts(response.data.rows)).catch((err) => console.error(err)).finally(() => console.log(`Finished fetching products!`));
    }, []);

    const fetchLatestUpdates = useCallback(() => {
        UpdateService.getLatestUpdates().then((response) => setUpdates(response.data)).catch((err) => console.error(err)).finally(() => console.log(`Finished fetching updates`));
    }, []);

    const getProductById = useCallback((productId) => {
        console.log("getting product info... for ", productId);
        ProductService.getProductById(productId).then((response) => { setProductInfo(response.data); console.log(response.data) }).catch((err) => console.error(err)).finally(() => console.log(`Finished fetching products!`));
    }, []);

    const addProduct = useCallback((newProduct) => {
        const formData = new FormData();
        console.log(newProduct);
        Object.keys(newProduct).forEach((key) => {
            formData.append(key, newProduct[key]);
        });
        console.log([...formData.entries()])
        setIsAddProductLoading(true);
        ProductService.addProduct(formData).then((response) => console.log(response)).catch((err) => console.error(err)).finally(() => setIsAddProductLoading(false));
    }, []);

    const getStatistics = useCallback(() => {
        StatisticsService.getStatistics().then((response) => { setStatistics(response.data); console.log("Sup!", response.data) }).catch((err) => console.error(err)).finally();
    }, []);

    const updateTotalMoney = (n) => {
        StatisticsService.updateTotalMoney({ updatedMoney: n }).then((res) => { console.log(res.data); setStatistics(res.data) });
    };

    const updateCommission = () => {
        alert(commis);
        // StatisticsService.updateTotalMoney({ updatedMoney: n }).then((res) => {console.log(res.data); setStatistics(res.data)});
    };

    const updateMax = () => {
        alert(max);
        // StatisticsService.updateTotalMoney({ updatedMoney: n }).then((res) => {console.log(res.data); setStatistics(res.data)});
    };

    return <ShopContext.Provider
        value={{
            updateCommission,
            updateMax,
            updateTotalMoney,
            products,
            fetchProducts,
            productCategories,
            addProduct,
            isAddProductLoading,
            getProductById,
            productInfo,
            getStatistics,
            statistics,
            fetchLatestUpdates,
            updates,
            commis,
            setComm,
            max,
            setMax,
        }}
    >
        {children}
    </ShopContext.Provider>
}