import styles from "./CalculatorPage.module.css";

const CalculatorPage = () => {
    return (
        <div className="d-flex flex-column" style={{ padding: "20px" }}>
            <h2>Калькулятор НДС</h2>
            <div className="d-flex" style={{ gap: "20px" }}>
                <div className={styles["bl"]}>
                    <div><span>Выделить НДС</span></div>
                </div>
                <div className={styles["bl"]}>
                    <div><span>Начислить НДС</span></div>
                </div>
            </div>
        </div>
    );
}

export default CalculatorPage;