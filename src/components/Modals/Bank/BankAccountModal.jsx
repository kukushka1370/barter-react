import styles from "./BankAccountModal.module.css";
import Icons from "../../Icons/Icons";
import { useState } from "react";

const BankAccountModal = ({ onClose, addBankAccount, currencies = {} }) => {
    const [selectedOption, setSelectedOption] = useState("RUB");

    return (
        <div className={styles["bank-account-modal"]}>
            <div className={styles["modal-header"]}>
                <div style={{ cursor: "pointer" }} onClick={onClose}>
                    <Icons variant="cancel" color="black" size={30} />
                </div>
            </div>
            <div className={styles["modal-body"]}>
                <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    {
                        Object.keys(currencies)?.map((currencyCode, i) => (
                            <option key={i} value={currencyCode}>{currencies[currencyCode].name}</option>
                        ))
                    }
                </select>

                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ border: "1px solid", padding: "4px", cursor: "pointer" }}
                    onClick={() => addBankAccount(selectedOption)}>Добавить Счет</div>
            </div>
        </div>
    );
}

export default BankAccountModal;