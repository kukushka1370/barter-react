import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./GroupChat.module.css";
import { formatDate } from "../../utils/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const GroupChat = () => {
    const { groupChatMessages, sendGroupChatMessage, getGroupChatMessages, isGroupChatDisabled, setIsGroupChatDisabled } = useContext(ChatContext);
    const { user } = useContext(AuthContext);

    const chatListRef = useRef(null);

    const [textMessage, setTextMessage] = useState("");
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        getGroupChatMessages();
    }, []);

    useEffect(() => {
        let intervalId;

        if (isGroupChatDisabled) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isGroupChatDisabled]);

    useEffect(() => {
        if (timer <= 0) {
            setIsGroupChatDisabled(false);
            setTimer(30);
        }
    }, [timer]);

    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    }, [groupChatMessages]);

    return (
        <div className="d-flex flex-column" style={{ width: "300px", position: "relative", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)", borderRadius: "5px", }}>
            <div style={{ padding: "8px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px", background: "#3983c1" }}>
                <span style={{ textAlign: "start", color: "#fff" }}>Общий чат</span>
            </div>
            <ul ref={chatListRef} className={styles["list"]} style={{
                overflowY: "auto",
                maxHeight: "450px",
                padding: "10px",
                scrollbarWidth: "thin",
                scrollbarColor: "gray",
                paddingLeft: "10px"
            }}>
                {
                    groupChatMessages?.filter(Boolean).map(({ message, from, createdAt }, index) => {
                        // const date = moment(createdAt, 'DD/MM/YYYY HH:mm');
                        // if (!date.isValid()) {
                        //     console.warn(`Invalid timestamp: ${createdAt}`);
                        //     return null;
                        // }
                        // const formattedDate = date.format('DD/MM/YYYY HH:mm');
                        // const formattedDate = createdAt.toString();
                        const formattedDate = formatDate(JSON.stringify(createdAt));
                        return <li
                            className={styles["list-item"]}
                            key={index}
                        >
                            <div>
                                <div className="d-flex justify-content-between align-items-center" style={{ padding: "7px", fontSize: "15px" }}>
                                    <span style={{ fontSize: "12px" }}>{formattedDate || createdAt || ""}</span>
                                    <span style={{ fontSize: "14px", fontWeight: "500" }}>{!from?.includes("undefined") && from || "Банк"}</span>
                                </div>
                                <p style={{ paddingLeft: ".7rem" }}>{message}</p>
                            </div>
                        </li>
                    })
                }
            </ul>
            <div className="d-flex align-items-center" style={{ gap: "1rem", position: "absolute", bottom: 0, width: "100%", padding: "10px" }}>
                <input
                    type="text"
                    placeholder={isGroupChatDisabled ? timer : "Введите сообщение"}
                    style={{ borderRadius: "7px", border: "1px solid", padding: "4px 7px", width: "100%" }}
                    onChange={(e) => setTextMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendGroupChatMessage(textMessage, `${user?.name} ${user?.surname}`, setTextMessage)
                        }
                        return;
                    }}
                    value={textMessage}
                    disabled={isGroupChatDisabled}
                />
                <div
                    onClick={() => sendGroupChatMessage(textMessage, `${user?.name} ${user?.surname}`, setTextMessage)}
                    className="d-flex align-items-center justify-content-center"
                    style={{ cursor: "pointer", borderRadius: "7px", background: "#37b1d5", color: "white", height: "2rem", width: "4rem", padding: "0px" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default GroupChat;