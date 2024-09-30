// import styles from "./BankAccount.module.css";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const BankAccount = ({ currency, amountTotal, currencySymbol, currencyCode, amountPurchases, amountSales, depositBankAccount, deleteBankAccount, id }) => {
    const location = useLocation();
    const { transferMoney } = useContext(AuthContext);
    const [showTransferModal, setShowTransferModal] = useState(false);

    const [transferBankAccountId, setTransferBankAccountId] = useState("");
    const [transferAmount, setTransferAmount] = useState(0);

    return (
        <div style={{ width: "250px", position: "relative", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)", padding: location.pathname === "/" ? "" : "1rem", borderRadius: "5px" }}>
            {
                showTransferModal && <div style={{ position: "absolute", height: "300px", background: "grey", padding: "1rem", display: "flex", gap: "1rem", flexDirection: "column" }}>
                    <span style={{ cursor: "pointer" }} onClick={() => setShowTransferModal(false)}>X</span>
                    <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                        <input value={transferBankAccountId} onChange={(e) => setTransferBankAccountId(e.target.value)} placeholder="Введите уникальный ключ для перевода" type="text" />
                        <input value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} placeholder="Сумма для перевода" type="text" />
                        <span onClick={() => transferMoney(id, transferBankAccountId, transferAmount)} style={{ cursor: "pointer", padding: ".6rem", border: "1px solid", display: "grid", placeContent: "center", color: "#fff" }}>Перевести</span>
                    </div>
                    <div className="d-flex" style={{ gap: "1rem", marginTop: "1rem", alignItems: "center" }}>
                        <span>Id вашего счета :</span>
                        <span style={{ color: "greenyellow", cursor: "pointer" }} onClick={() => { navigator?.clipboard?.writeText(id || ""); alert(`Айди счета скопирован`) }}>{id}</span>
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
                        <div className="d-flex flex-wrap" style={{ gap: "20px" }}>
                            <span onClick={() => setShowTransferModal(p => !p || false)} style={{ background: "green", color: "#fff", padding: "8px", cursor: "pointer", borderRadius: "7px", border: "none", fontWeight: "600" }}>Пополнить</span>
                            <span onClick={() => deleteBankAccount(currencyCode)} style={{ background: "red", color: "#fff", padding: "8px", cursor: "pointer", borderRadius: "7px", border: "none", fontWeight: "600" }}>Удалить</span>
                        </div>
                    </div>
            }
            <div className="d-flex justify-content-between" style={{ gap: "20px", color: "#111", borderBottom: "1px solid #3f3f3f", padding: "10px 10px 10px 5px", fontWeight: "600" }}>
                <span>На счету:</span>
                <span>{amountTotal || 0} {currencySymbol}</span>
            </div>
            <div className="d-flex justify-content-between" style={{ gap: "20px", color: "#3f3f3f", borderBottom: "1px solid #3f3f3f", padding: "10px 10px 10px 5px" }}>
                <span>В покупках:</span>
                <span>{amountPurchases || 0} {currencySymbol}</span>
            </div>
            <div className="d-flex justify-content-between" style={{ gap: "20px", color: "#3f3f3f", padding: "10px 10px 10px 5px" }}>
                <span>В продажах:</span>
                <span>{amountSales || 0} {currencySymbol}</span>
            </div>
        </div>
    );
}

export default BankAccount;