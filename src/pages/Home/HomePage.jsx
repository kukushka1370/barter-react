import styles from "./HomePage.module.css";

import General from "../../components/General/General";
import News from "../../components/News/News";
import Sidebar from "../../components/Sidebar/Sidebar";
import Updates from "../../components/Updates/Updates";
import Organization from "../../components/Organization/Organization";
import BankAccount from "../../components/BankAccount/BankAccount";
import GroupChat from "../../components/GroupChat/GroupChat";

const HomePage = () => {
    return (
        <div className={styles["home-container"]} style={{ padding: "15px", gap: "15px" }}>
            <Sidebar />
            <General />
            <GroupChat />
            <Updates />
            <News />
            <Organization />
            <BankAccount />
        </div>
    );
}

export default HomePage;