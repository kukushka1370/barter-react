import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const MailingPage = () => {
    const { users } = useContext(AuthContext);
    const [fU, setFU] = useState([]);
    const [mailingMessage, setMailingMessage] = useState("");

    const formatUsers = (users) => {
        const t = users.map((user) => `${user.surname} ${user.name}`).join("\n");
        return setFU(t);
    }

    useEffect(() => {
        formatUsers(users);
    }, [users]);

    return (
        <div className="d-flex flex-wrap" style={{ gap: "1rem", padding: "1rem" }}>
            <div>
                <textarea value={mailingMessage} onChange={(e) => setMailingMessage(e.target.value)} style={{ minHeight: "200px", padding: ".5rem" }} name="" id="" placeholder="Сообщение для рассылки"></textarea>
                <div style={{ width: "140px", padding: "5px", border: "1px solid", cursor: "pointer", display: "grid", placeContent: "center" }}>Отправить</div>
            </div>
            <div>
                <textarea style={{ minHeight: "200px", minWidth: "100px", padding: ".3rem" }} name="" id="" value={fU}></textarea>
            </div>
        </div>
    );
}

export default MailingPage;