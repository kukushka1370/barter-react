import { useContext, useEffect, useState } from "react";
import styles from "./DealsPage.module.css";
import BankAccount from "../../components/BankAccount/BankAccount";
import BankAccountModal from "../../components/Modals/Bank/BankAccountModal";
import { AuthContext } from "../../context/AuthContext";
import { $api } from "../../http";

const DealsPage = () => {
    const { bankAccounts, deleteBankAccount, addBankAccount, fetchUserBankAccounts, user, addNewCurrency } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);

    const [newCurrencySymbol, setNewCurrencySymbol] = useState("");
    const [newCurrencyCode, setNewCurrencyCode] = useState("");
    const [newCurrencyName, setNewCurrencyName] = useState("");

    const [currencies, setCurrencies] = useState({
        "RUB": {
            name: "Рубли",
        },
        "USD": {
            name: "Доллары",
        },
        "EUR": {
            name: "Евро",
        },
        "YUAN": {
            name: "Юани",
        },
    });

    useEffect(() => {
        fetchUserBankAccounts();
    }, []);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
              const response = await $api.get("/bank/get-currencies");
              setCurrencies(response.data);
            } catch (error) {
              console.error(error);
            }
          };
          fetchCurrencies();
    }, []);

    const handleDeleteBankAccount = (currencyCode) => {
        alert("Счет будет моментально удален без возврата средств!");
        return deleteBankAccount(currencyCode);
    };

    return (
        <div className={styles["deals-container"]}>
            {
                showModal && <BankAccountModal onClose={() => setShowModal(false)} addBankAccount={addBankAccount} currencies={currencies} />
            }
            <div className="d-flex align-items-center" style={{ background: "linear-gradient(to bottom, #428bca 0%, #357ebd 100%)", height: "40px", borderTopLeftRadius: "3px", borderTopRightRadius: "3px", color: "#fff", paddingLeft: "20px", marginBottom: "30px" }}>
                <span>Мой счет и сделки</span>
            </div>
            <div className={styles["add-acc-btn"]} style={{ border: "1px solid", width: "200px", padding: "8px" }} onClick={() => setShowModal(true)}>Добавить счет</div>
            <div className={styles["d-wrapper"]} style={{ rowGap: "30px", columnGap: "40px" }}>
                {
                    bankAccounts?.length && bankAccounts?.map(({ _id, amount, amountPurchases, amountSales, currencySymbol, currencyName, currencyCode }, i) => (
                        <BankAccount
                            key={i}
                            id={_id}
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
                user?.role?.includes("admin") && <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
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
        </div>
    );
}

export default DealsPage;