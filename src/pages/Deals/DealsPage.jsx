import { useContext, useEffect, useState } from "react";
import styles from "./DealsPage.module.css";
import BankAccount from "../../components/BankAccount/BankAccount";
import BankAccountModal from "../../components/Modals/Bank/BankAccountModal";
import { AuthContext } from "../../context/AuthContext";

const DealsPage = () => {
    const { bankAccounts, deleteBankAccount, addBankAccount, fetchUserBankAccounts } = useContext(AuthContext);

    const [showModal, setShowModal] = useState();
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
                    bankAccounts?.length && bankAccounts?.map(({ _id, amountTotal, amountPurchases, amountSales, currencySymbol, currencyName, currencyCode }, i) => (
                        <BankAccount
                            key={i}
                            id={_id}
                            amountTotal={amountTotal}
                            amountPurchases={amountPurchases}
                            amountSales={amountSales}
                            currencySymbol={currencySymbol}
                            currency={currencyName}
                            currencyCode={currencyCode}
                            deleteBankAccount={handleDeleteBankAccount}
                            depositBankAccount={() => console.log(";;")}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default DealsPage;