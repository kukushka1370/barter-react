import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

    return (
        <div className="all-users" style={{ zIndex: 7 }}>
            <ul>
                {
                    potentialChats && potentialChats?.map((u, ind) => (
                        <li key={ind} onClick={() => createChat(user?.id, u.id)}>
                            {u?.name}
                            {u?.surname}
                            <span className={onlineUsers?.some(user => user?.userId === u?.id) ? "user-online" : ""}></span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

{/* <div className="single-user" key={ind} onClick={() => createChat(user?.id, u.id)}>
{u.name}
<span className={onlineUsers?.some(user => user?.userId === u?.id) ? "user-online" : ""}></span>
</div> */}

export default PotentialChats;