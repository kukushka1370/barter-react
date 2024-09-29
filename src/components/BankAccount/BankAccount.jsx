// import styles from "./BankAccount.module.css";
import { useLocation } from "react-router-dom";

const BankAccount = ({ currency, amountTotal, currencySymbol, currencyCode, amountPurchases, amountSales, depositBankAccount, deleteBankAccount }) => {
    const location = useLocation();

    return (
        <div style={{ width: "250px", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)", padding: location.pathname === "/" ? "" : "1rem", borderRadius: "5px" }}>
            {
                location.pathname === "/" ?
                    <div style={{ padding: "8px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px", background: "#3983c1" }}>
                        <span style={{ textAlign: "start", color: "#fff" }}>Мой счет</span>
                    </div> :
                    <div>
                        <h4>{currency}</h4>
                        <div className="d-flex flex-wrap" style={{ gap: "20px" }}>
                            <span onClick={() => depositBankAccount()} style={{ background: "green", color: "#fff", padding: "8px", cursor: "pointer", borderRadius: "7px", border: "none", fontWeight: "600" }}>Пополнить</span>
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