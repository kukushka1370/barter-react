import avatar from "../../assets/avtr.svg";
import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import { formatDate } from "../../utils/utils";

const Chat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const { onlineUsers } = useContext(ChatContext);

    useEffect(() => {
        // const recipientId = currentChat?.members.filter((el) => el !== user?.id)[0];
        // const recip = users.find(us => us?._id === recipientId);
        // setRecipient(recip);
        // console.log(recip)
        console.log({chat});
    }, [user, chat]);

    const isOnline = onlineUsers?.some(user => user?.userId === recipientUser?._id);
    const datee = formatDate(chat?.updatedAt)

    return (
        <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button">
            <div className="d-flex">
                <div className="me-2">
                    <img src={avatar} height={34} alt="avatar" />
                </div>
                <div className="name" style={{color: "black"}}>{recipientUser?.name || ""}{" "}{recipientUser?.name || ""}</div>
                {/* <div className="text">Text message</div> */}
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">{datee || chat?.updatedAt || ""}</div>
                {/* <div className="this-user-notifications">{2}</div> */}
                <span className={isOnline ? "user-online" : ""}></span>
            </div>
        </Stack>
    );
}

export default Chat;