import avatar from "../../assets/avtr.svg";
import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const Chat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const { onlineUsers } = useContext(ChatContext);

    const isOnline = onlineUsers?.some(user => user?.userId === recipientUser?._id)

    return (
        <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button">
            <div className="d-flex">
                <div className="me-2">
                    <img src={avatar} height={34} alt="avatar" />
                </div>
                <div className="name">{recipientUser?.name}</div>
                <div className="text">Text message</div>
            </div>
            <div className="d-flex flex-column align-items-end">
                {/* <div className="date">12/12/2024</div> */}
                <div className="this-user-notifications">2</div>
                <span className={isOnline ? "user-online" : ""}></span>
            </div>
        </Stack>
    );
}

export default Chat;