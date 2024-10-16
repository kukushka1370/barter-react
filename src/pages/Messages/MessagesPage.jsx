import { useContext } from "react";

import { Container, Stack } from "react-bootstrap";

import PotentialChats from "../../components/Chat/PotentialChats";
import ChatBox from "../../components/Chat/ChatBox";
import Chat from "../../components/Chat/Chat";

import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const MessagesPage = () => {
    const { userChats, isUserChatsLoading, updateCurrentChat, potentialChats } = useContext(ChatContext);
    const { user } = useContext(AuthContext);

    return (
        <Container className="d-flex flex-column align-items-center" style={{gap: "1rem"}}>
            {/* <PotentialChats /> */}
            <input type="text" placeholder="Найти пользователя" style={{borderRadius: "10px", marginTop: "2rem", padding: ".3rem", border: "1px solid", width: "50%"}} />
            {
                !userChats?.length ? <h1>No chats yet..</h1> :
                    <Stack direction="horizontal" gap={4} className="align-items-start">
                        <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                            {
                                isUserChatsLoading && <p>Loading your chats...</p>
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