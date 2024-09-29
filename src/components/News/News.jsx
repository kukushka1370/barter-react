import styles from "./News.module.css";

const News = () => {
    const newsList = [];

    return (
        <div className="d-flex flex-column" style={{ width: "300px", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)", borderRadius: "5px" }}>
            <div style={{ padding: "8px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px", background: "#3983c1" }}>
                <span style={{ textAlign: "start", color: "#fff" }}>Новости</span>
            </div>
            <ul className={styles["list"]}>
                {
                    newsList?.map((news, index) => (
                        <li
                            className={styles["list-item"]}
                            key={index}
                        >
                            <div style={{ padding: "7px 0" }}>
                                <span>{news}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default News;