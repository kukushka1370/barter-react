import { useContext, useState } from "react";

import { Container, Stack } from "react-bootstrap";

import PotentialChats from "../../components/Chat/PotentialChats";
import ChatBox from "../../components/Chat/ChatBox";
import Chat from "../../components/Chat/Chat";

import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const MessagesPage = () => {
    const { userChats, isUserChatsLoading, updateCurrentChat, potentialChats, createChat } = useContext(ChatContext);
    const { user, users } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [possibleUsers, setPossibleUsers] = useState([]);

    const handleSearch = (value) => {
        setSearch(value);
        if (value === "") return setPossibleUsers([]);
        const s = search.toLowerCase();
        const pb = users?.filter(u => u.name?.toLowerCase().includes(s) || u.surname?.toLowerCase().includes(s) || u.email?.toLowerCase().includes(s));
        setPossibleUsers(pb)
    };

    return (
        <Container className="d-flex flex-column align-items-center" style={{ gap: "1rem" }}>
            {/* <PotentialChats /> */}
            <input onChange={(e) => handleSearch(e.target.value)} type="text" placeholder="Найти пользователя" style={{ borderRadius: "10px", marginTop: "2rem", padding: ".3rem", border: "1px solid", width: "50%" }} />
            {
                possibleUsers?.length > 0 && <div style={{
                    border: "1px solid", display: "grid", placeContent: "center", padding: "2rem", maxHeight: "200px",
                    overflowY: "auto",
                    overflowX: "hidden"
                }}>
                    {
                        possibleUsers?.map((u, i) => (
                            <div style={{ cursor: "pointer" }} key={i} onClick={() => createChat(user?.id, u?._id)}>
                                <span>{u.name || ""}{" "}{u.surname || ""}</span>
                            </div>
                        ))
                    }
                </div>
            }
            {
                !userChats?.length ? <h1>У вас пока что нет чатов..</h1> :
                    <Stack direction="horizontal" gap={4} className="align-items-start">
                        <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                            {
                                isUserChatsLoading && <p>Подгружаем информацию...</p>
                            }

                            {
                                userChats?.map((chat, ind) => (
                                    <div key={ind} onClick={() => updateCurrentChat(chat)}>
                                        <Chat chat={chat} user={user} />
                                    </div>
                                ))
                            }
                        </Stack>
                        <ChatBox />
                    </Stack>
            }
        </Container>
    );
}

export default MessagesPage;