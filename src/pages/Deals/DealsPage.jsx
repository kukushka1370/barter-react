import { useContext, useEffect, useState } from "react";
import styles from "./DealsPage.module.css";
import BankAccount from "../../components/BankAccount/BankAccount";
import BankAccountModal from "../../components/Modals/Bank/BankAccountModal";
import { AuthContext } from "../../context/AuthContext";
import { $api } from "../../http";
import { ShopContext } from "../../context/ShopContext";
import { formatDate } from "../../utils/utils";

const DealsPage = () => {
    const { users, bankAccounts, toToId, deleteBankAccount, addBankAccount, fetchUserBankAccounts, user, addNewCurrency, userTransfers, displayRatingModal, setDisplayRatingModal, showTransferModal, setShowTransferModal } = useContext(AuthContext);

    const [showModal2, setShowModal2] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState("");

    const [obPlatUserId, setObPlatUserId] = useState("");
    const [obPlatSumma, setObPlatSumma] = useState("");

    const [allCreditBankAccounts, setAllCreditBankAccounts] = useState([]);

    const [credittTerm, setCredittTerm] = useState("месяц");
    const [credittUserId, setCredittUserId] = useState("");
    const [credittcurrencyCode, setCredittcurrencyCode] = useState("RUB");
    const [credittAmount, setCredittAmount] = useState(0);

    const [obPlatUserId1, setObPlatUserId1] = useState("");
    const [obPlatSumma1, setObPlatSumma1] = useState("");

    const [newCurrencySymbol, setNewCurrencySymbol] = useState("");
    const [newCurrencyCode, setNewCurrencyCode] = useState("");
    const [newCurrencyName, setNewCurrencyName] = useState("");

    // const [currencies, setCurrencies] = useState({
    //     "RUB": {
    //         name: "Рубли",
    //     },
    //     "USD": {
    //         name: "Доллары",
    //     },
    //     "EUR": {
    //         name: "Евро",
    //     },
    //     "YUAN": {
    //         name: "Юани",
    //     },
    // });

    const { currencies, getCurrencies } = useContext(ShopContext);

    useEffect(() => {
        getCurrencies();
        fetchUserBankAccounts();
    }, []);

    // useEffect(() => {
    //     const fetchCurrencies = async () => {
    //         try {
    //           const response = await $api.get("/bank/get-currencies");
    //           console.log(response.data);
    //         //   setCurrencies(response.data);
    //         } catch (error) {
    //           console.error(error);
    //         }
    //       };
    //       fetchCurrencies();
    // }, []);

    const handleDeleteBankAccount = (currencyCode) => {
        alert("Счет будет моментально удален без возврата средств!");
        return deleteBankAccount(currencyCode);
    };

    const freezeCredit = (creditId) => {
        const t = window.confirm(`Точно хотите заморозить счет ${creditId}`);
        if (!t) return;
        $api.post("/bank/freeze-credit", {creditId})
            .then((res) => {
                console.log(res.data);
                alert(`Счет заморожен`);
            })
            .catch((err) => alert(err.message));
    };

    const createCredit = () => {
        $api.post("/bank/new-credit", { userId: user?.id || user?._id, bankId: obPlatUserId, amount: obPlatSumma })
            .then((res) => {
                console.log(res.data);
                alert(`Обещанный платеж открыт!`);
            })
            .catch((err) => alert(err.message));
    };

    const createCreditBankAccount = () => {
        $api.post("/bank/create-credit-bank-account", { userId: credittUserId, amount: credittAmount, term: credittTerm, currencyCode: credittcurrencyCode })
            .then((res) => {
                console.log("========== Кредит выдан :");
                console.log(res.data);
                alert(`Кредит выдан`);
            })
            .catch((err) => alert(err.message));
    };

    useEffect(() => {
        getAllCreditBankAccounts();
    }, []);

    const getAllCreditBankAccounts = () => {
        $api.get("/bank/get-all-credit-bank-accounts")
            .then((res) => {
                console.log("========== Кредиты пользователей :");
                console.log(res.data);
                setAllCreditBankAccounts(res.data);
                // alert(`Кредит выдан`);
            })
            .catch((err) => alert(err.message));
    };

    const askForCredit = () => {
        $api.post("/bank/new-credit-ask", { userId: user?.id || user?._id, bankId: obPlatUserId1, amount: obPlatSumma1 })
            .then((res) => {
                console.log(res.data);
                alert(`Ожидайте рассмотрения заявки`);
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className={styles["deals-container"]}>
            {
                user?.isDemo && <div className={styles["overlay"]}>
                    <h1>Дождитесь одобрения заявки для использования сделок</h1>
                </div>
            }
            {
                showModal && <BankAccountModal onClose={() => setShowModal(false)} addBankAccount={addBankAccount} currencies={currencies} />
            }
            {
                showModal2 && <div style={{ position: "absolute", background: "grey", height: "600px", width: "22rem", zIndex: 5, display: "flex", gap: "10px", flexDirection: "column" }}>
                    <span style={{ cursor: "pointer", padding: "1rem", color: "#fff" }} onClick={() => setShowModal2(false)}>X</span>
                    <div style={{ display: "flex", flexDirection: "column", padding: "1rem", gap: "1rem", fontSize: "15px" }}>
                        {/* <label htmlFor="">Этому человеку вы откроете обещанный платеж</label> */}
                        <h3 style={{ fontSize: "18px", color: "#fff" }}>Открыть обещанный платеж</h3>
                        <input value={obPlatUserId} onChange={(e) => setObPlatUserId(e.target.value)} type="text" placeholder="Введите Id пользователя" />
                        <input value={obPlatSumma} onChange={(e) => setObPlatSumma(e.target.value)} type="text" placeholder="Введите сумму обещанного платежа" />
                        <span onClick={() => createCredit()} style={{ display: "grid", placeContent: "center", color: "#fff", border: "1px solid", padding: "1rem", cursor: "pointer" }}>Открыть обещанный платеж</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", padding: "1rem", gap: "1rem", fontSize: "15px" }}>
                        <h3 style={{ fontSize: "18px", color: "#fff" }}>Запросить обещанный платеж</h3>
                        <input value={obPlatUserId1} onChange={(e) => setObPlatUserId1(e.target.value)} type="text" placeholder="Введите Id компании" />
                        <input value={obPlatSumma1} onChange={(e) => setObPlatSumma1(e.target.value)} type="text" placeholder="Введите сумму обещанного платежа" />
                        <span onClick={() => askForCredit()} style={{ display: "grid", placeContent: "center", color: "#fff", border: "1px solid", padding: "1rem", cursor: "pointer" }}>Запросить обещанный платеж</span>
                    </div>
                </div>
            }
            {
                displayRatingModal && <div style={{ gap: "1rem", position: "absolute", background: "grey", zIndex: 7, height: "70vh", width: "80vw", display: "flex", flexDirection: "column", alignItems: "self-start", padding: "1rem" }}>
                    <h2>Оцените пользователя</h2>
                    <div className={styles["rating"]}>
                        <input onChange={(e) => setRating(e.target.value)} value="5" name="rating" id="star5" type="radio" />
                        <label htmlFor="star5"></label>
                        <input onChange={(e) => setRating(e.target.value)} value="4" name="rating" id="star4" type="radio" />
                        <label htmlFor="star4"></label>
                        <input onChange={(e) => setRating(e.target.value)} value="3" name="rating" id="star3" type="radio" />
                        <label htmlFor="star3"></label>
                        <input onChange={(e) => setRating(e.target.value)} value="2" name="rating" id="star2" type="radio" />
                        <label htmlFor="star2"></label>
                        <input onClick={(e) => alert(e.target.value)} value="1" name="rating" id="star1" type="radio" />
                        <label htmlFor="star1"></label>
                    </div>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} name="" id=""></textarea>
                    <span
                        onClick={async () => {
                            setDisplayRatingModal(false);
                            await $api.post("/users/update-rating", { rating, userId: toToId, review: comment })
                                .then(res => console.log(res.data))
                                .catch(err => console.error(err.message));
                            alert(comment, " Rating : ", rating)
                        }}
                        style={{ cursor: "pointer", display: "grid", placeContent: "center", background: "green", color: "#fff", padding: ".4rem", borderRadius: "5px" }}>Оставить отзыв</span>
                </div>
            }
            <div className="d-flex align-items-center" style={{ background: "linear-gradient(to bottom, #428bca 0%, #357ebd 100%)", height: "40px", borderTopLeftRadius: "3px", borderTopRightRadius: "3px", color: "#fff", paddingLeft: "20px", marginBottom: "30px" }}>
                <span>Мой счет и сделки</span>
            </div>
            <div className={styles["add-acc-btn"]} style={{ border: "1px solid", width: "200px", padding: "8px" }} onClick={() => setShowModal(true)}>Добавить счет</div>
            <div className={styles["add-acc-btn"]} style={{ border: "1px solid", width: "200px", padding: "8px" }} onClick={() => setShowModal2(true)}>Обещанный платеж</div>
            <div className={styles["d-wrapper"]} style={{ rowGap: "30px", columnGap: "40px" }}>
                {
                    bankAccounts?.length && bankAccounts?.map(({ _id, amount, amountPurchases, amountSales, currencySymbol, currencyName, currencyCode, isCredit, term }, i) => (
                        <BankAccount
                            key={i}
                            id={_id}
                            isCredit={isCredit}
                            term={term}
                            amountTotal={amount}
                            amountPurchases={amountPurchases}
                            amountSales={amountSales}
                            currencySymbol={currencySymbol}
                            currency={currencyName}
                            currencyCode={currencyCode}
                            deleteBankAccount={handleDeleteBankAccount}
                        />
                    ))
                }
            </div>
            {
                user?.role?.includes("admin") && <div style={{ display: "flex", flexDirection: "column", padding: "1rem", borderRadius: "1px solid" }}>
                    <h2>Добавить новую валюту</h2>
                    <label htmlFor="">Символ валюты ($)</label>
                    <input value={newCurrencySymbol} onChange={(e) => setNewCurrencySymbol(e.target.value)} type="text" />
                    <label htmlFor="">Код валюты (USD)</label>
                    <input value={newCurrencyCode} onChange={(e) => setNewCurrencyCode(e.target.value)} type="text" />
                    <label htmlFor="">Название валюты (Доллары)</label>
                    <input value={newCurrencyName} onChange={(e) => setNewCurrencyName(e.target.value)} type="text" />
                    <span
                        style={{ border: "1px solid", padding: "10px", display: "grid", placeContent: "center", margin: "2rem", cursor: "pointer" }}
                        onClick={() => addNewCurrency(newCurrencySymbol, newCurrencyCode, newCurrencyName)}
                    >Добавить валюту</span>
                </div>
            }
            {
                user?.role?.includes("владелец") && <div style={{ display: "flex", flexDirection: "column", padding: "1rem", borderRadius: "1px solid" }}>
                    <h2>Выдать кредит</h2>
                    <label htmlFor="">Код валюты (RUB)</label>
                    <input value={credittcurrencyCode} onChange={(e) => setCredittcurrencyCode(e.target.value)} type="text" />
                    <label htmlFor="">Сумма кредита</label>
                    <input value={credittAmount} onChange={(e) => setCredittAmount(e.target.value)} type="text" />
                    <label htmlFor="">Id пользователя для открытия кредита</label>
                    <input value={credittUserId} onChange={(e) => setCredittUserId(e.target.value)} type="text" />
                    <label htmlFor="">Срок погашения кредита (Месяц)</label>
                    <input value={credittTerm} onChange={(e) => setCredittTerm(e.target.value)} type="text" />
                    <span
                        style={{ border: "1px solid", padding: "10px", display: "grid", placeContent: "center", margin: "2rem", cursor: "pointer" }}
                        onClick={() => createCreditBankAccount()}
                    >Выдать кредит</span>
                </div>
            }
            {
                user?.role.includes("admin") && <div style={{ maxWidth: "90vw" }}>
                    <h2>Список кредитов</h2>
                    <table style={{ width: "100%", border: "1px solid black", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Id кредита</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Имя пользователя</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Фамилия пользователя</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Почта пользователя</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Id пользователя</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Код валюты</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Срок погашения</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Открыт</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Статус</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Заморозка</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCreditBankAccounts.map((credit, i) => {
                                const dd = formatDate(credit?.createdAt);
                                const usrr = users.filter(usr => usr._id === credit.userId)[0];

                                return <tr key={i}>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{credit?._id}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{usrr?.name || JSON.stringify(usrr)}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{usrr?.surname || ""}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{usrr?.email || ""}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{usrr?._id || ""}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{credit?.currencyCode}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{credit?.term}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{dd}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{credit?.isFreezed ? "Заморожен" : "Активен"}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <span
                                            style={{ display: "grid", placeContent: "center", padding: ".3rem", border: "1px solid", cursor: "pointer" }}
                                            onClick={() => freezeCredit(credit?._id)}
                                        >
                                            Заморозить</span></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            }
            <div className="d-flex flex-column" style={{ width: "23rem", gap: "1rem" }}>
                {
                    userTransfers?.map((el, i) => {
                        const dd = formatDate(el?.createdAt);
                        return <span
                            style={{ fontWeight: "500", background: "lightgrey", padding: ".5rem", width: "100%", display: "flex", flexWrap: "wrap", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)" }}
                            key={i}>
                            Перевод на сумму {el?.amount} {el?.currencyFrom} на счет {el?.recepientId} статус - <span style={{ color: "green", margin: "0 2px" }}>Успешно</span> {dd || "Сегодня, 20:32"}
                        </span>
                    })
                }
            </div>
        </div>
    );
}

export default DealsPage;