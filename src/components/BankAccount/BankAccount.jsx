// import styles from "./BankAccount.module.css";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const BankAccount = ({ currency, amountTotal, currencySymbol, currencyCode, amountPurchases, amountSales, deleteBankAccount, id, isCredit, term }) => {
    const location = useLocation();

    const { bankAccounts, fetchUserBankAccounts } = useContext(AuthContext);
    const [t1, setT1] = useState(true);

    const { transferMoney } = useContext(AuthContext);
    const [showTransferModal, setShowTransferModal] = useState(false);

    const [transferBankAccountId, setTransferBankAccountId] = useState("");
    const [transferAmount, setTransferAmount] = useState(0);

    useEffect(() => {
        fetchUserBankAccounts();
    }, []);

    const copyId = async (id) => {
        if (!t1) return;
        if (!navigator.clipboard) {
            alert('Копирование в буфер обмена не поддерживается в вашем браузере');
            setT1(false);
            return;
        }

        try {
            await navigator.clipboard.writeText(id);
            alert(`Айди счета скопирован`);
        } catch (error) {
            console.error('Failed to copy text: ', error);
        }
    };

    return (
        <div style={{ width: "250px", position: "relative", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)", padding: location.pathname === "/" ? "" : "1rem", borderRadius: "5px" }}>
            {
                showTransferModal && <div style={{ position: "absolute", height: "300px", width: "500px", zIndex: "5", background: "grey", padding: ".2rem", display: "flex", gap: "1rem", flexDirection: "column" }}>
                    <span style={{ cursor: "pointer" }} onClick={() => setShowTransferModal(false)}>X</span>
                    <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                        <input style={{ width: "100%", padding: ".2rem", fontSize: "13px" }} value={transferBankAccountId} onChange={(e) => setTransferBankAccountId(e.target.value)} placeholder="Ваш универсальный ключ для перевода" type="text" />
                        <input style={{ width: "100%", padding: ".2rem", fontSize: "13px" }} value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} placeholder="Сумма для перевода" type="text" />
                        <span onClick={() => transferMoney(id, transferBankAccountId, transferAmount)} style={{ cursor: "pointer", padding: ".6rem", border: "1px solid", display: "grid", placeContent: "center", color: "#fff" }}>Перевести</span>
                    </div>
                    <div className="d-flex" style={{ gap: "1rem", marginTop: "1rem", alignItems: "center" }}>
                        <span style={{ fontSize: "15px" }}>Id вашего счета :</span>
                        <span style={{ color: "greenyellow", cursor: "pointer" }} onClick={() => copyId(id)}>{id}</span>
                    </div>
                </div>
            }
            {
                location.pathname === "/" ?
                    <div style={{ padding: "8px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px", background: "#3983c1" }}>
                        <span style={{ textAlign: "start", color: "#fff" }}>Мой счет</span>
                    </div> :
                    <div>
                        <h4>{currency}</h4>
                        {
                            isCredit && <div style={{ position: "absolute", right: "10px", top: "10px", display: "flex", flexDirection: "column", zIndex: 3 }}>
                                <span style={{ fontSize: "18px", color: "black", background: "yellow", padding: ".5rem" }}>Кредит</span>
                                {/* <span style={{fontSize: "15px"}}>Действителен в течение {term}</span> */}
                            </div>
                        }
                        <div className="d-flex flex-wrap" style={{ gap: "20px" }}>
                            <span onClick={() => setShowTransferModal(p => !p || false)} style={{ background: "green", color: "#fff", padding: "8px", cursor: "pointer", borderRadius: "7px", border: "none", fontWeight: "600" }}>Пополнить</span>
                            <span onClick={() => deleteBankAccount(currencyCode)} style={{ background: "red", color: "#fff", padding: "8px", cursor: "pointer", borderRadius: "7px", border: "none", fontWeight: "600" }}>Удалить</span>
                        </div>
                    </div>
            }
            <div className="d-flex justify-content-between" style={{ gap: "20px", color: "#111", borderBottom: "1px solid #3f3f3f", padding: "10px 10px 10px 5px", fontWeight: "600" }}>
                <span>На счету:</span>
                <span>{amountTotal?.toFixed(2) || +bankAccounts[0]?.amount?.toFixed(2) || 0} {currencySymbol || bankAccounts[0]?.currencySymbol}</span>
            </div>
            <div className="d-flex justify-content-between" style={{ gap: "20px", color: "#3f3f3f", borderBottom: "1px solid #3f3f3f", padding: "10px 10px 10px 5px" }}>
                <span>В покупках:</span>
                <span>{amountPurchases || +bankAccounts[0]?.amountPurchases || 0} {currencySymbol || bankAccounts[0]?.currencySymbol}</span>
            </div>
            <div className="d-flex justify-content-between" style={{ gap: "20px", color: "#3f3f3f", padding: "10px 10px 10px 5px" }}>
                <span>В продажах:</span>
                <span>{amountSales || +bankAccounts[0]?.amountSales || 0} {currencySymbol || bankAccounts[0]?.currencySymbol}</span>
                {
                    isCredit &&
                    <div style={{ position: "absolute", right: "5px", bottom: "10px", display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "18px", color: "black", background: "yellow", padding: ".5rem" }}>Действует {term} с момента открытия</span>
                        {/* <span style={{fontSize: "15px"}}>Действителен в течение {term}</span> */}
                    </div>
                }
            </div>
        </div>
    );
}

export default BankAccount;