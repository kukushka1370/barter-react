import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../utils/constants";

import UserService from "../services/UserService";
import ChatService from "../services/ChatService";
import MessageService from "../services/MessageService";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [chatError, setChatError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isGroupChatDisabled, setIsGroupChatDisabled] = useState(false);
    const [groupChatMessages, setGroupChatMessages] = useState([
        { "message": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor repellendus ducimus unde.", from: "Анатолий Курзанцев", createdAt: "20/12/24 08:50" },
        { "message": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor repellendus ducimus unde.", from: "Евгений Фарт", createdAt: "20/12/24 08:50" },
        { "message": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor repellendus ducimus unde.", from: "Иван Петров", createdAt: "20/12/24 08:51" },
        { "message": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor repellendus ducimus unde.", from: "Николай Афонин", createdAt: "20/12/24 10:32" },
    ]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendMessageError, setSendMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [newGroupChatMessage, setNewGroupChatMessage] = useState(null);

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // console.log({ onlineUsers });

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user]);

    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", user?.id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off("getOnlineUsers");
        }
    }, [socket, user]);


    useEffect(() => {
        if (socket === null) return;
        const recipientId = currentChat?.members?.find((id) => id !== user?.id);
        socket.emit("sendMessage", { ...newMessage, recipientId });
    }, [newMessage, currentChat?.members, user?.id, socket]);

    useEffect(() => {
        if (socket === null) return;
        console.log(newGroupChatMessage)
        socket.emit("sendGroupChatMessage", newGroupChatMessage);
    }, [newGroupChatMessage, socket]);

    useEffect(() => {
        if (socket === null) return;
        socket.on("getGroupChatMessage", (res) => {
            setGroupChatMessages(prev => [...prev, res]);
        });

        return () => {
            socket.off("getGroupChatMessage");
        }
    }, [socket]);

    useEffect(() => {
        if (socket === null) return;
        socket.on("getMessage", (res) => {
            if (currentChat?._id !== res.chatId) return;
            setMessages(prev => [...prev, res]);
        });

        return () => {
            socket.off("getMessage");
        }
    }, [socket, currentChat]);

    useEffect(() => {
        if (user?.id) {
            UserService.fetchUsers().then(res => {
                console.log(res.data);
                const pChats = res.data.filter((u) => {
                    let isChatCreated = false;
                    if (user.id === u._id) return false;
                    if (userChats) {
                        isChatCreated = userChats?.some((chat) => chat.members[0] === u._id || chat.members[1] === u._id);
                    }
                    return !isChatCreated;
                });
                setPotentialChats(pChats);
            }).catch(err => {
                setChatError(err);
                console.log(err);
            });
        }
    }, [userChats, user]);

    useEffect(() => {
        const userId = user?._id || user?.id;
        if (userId) {
            setIsUserChatsLoading(true);
            ChatService.fetchChats(userId).then(res => {
                setUserChats(res.data);
            }).catch(err => {
                console.log(err);
                setChatError(err);
            }).finally(() => setIsUserChatsLoading(false));
        }
    }, [user]);

    useEffect(() => {
        setIsMessagesLoading(true);
        setMessagesError(null);
        console.log('currentChat : ', currentChat); //
        MessageService.getMessages(currentChat?._id).then(res => {
            setMessages(res.data);
            console.log({ msg: res.data });
        }).catch(err => {
            console.log(err);
            setMessagesError(err);
        }).finally(() => setIsMessagesLoading(false));
    }, [currentChat]);

    const sendMessage = useCallback((textMessage, senderId, currentChatId, setTextMessage) => {
        if (!textMessage) return;
        MessageService.createMessage({ chatId: currentChatId, senderId, text: textMessage })
            .then(res => {
                console.log(res.data);
                setNewMessage(res.data);
                setMessages(prev => [...prev, newMessage]);
                setTextMessage("");
            })
            .catch(err => {
                console.log(err);
                setSendMessageError(err);
            });
    }, []);

    const sendGroupChatMessage = useCallback((message, from, setTextMessage) => {
        if (isGroupChatDisabled) return;
        console.log({ from, message });
        if (!message) return;
        // setGroupChatMessages(prev => [...prev, { message, from } || {}]);
        setGroupChatMessages(prev => [...prev, { message, from, createdAt: new Date() }]);
        setTextMessage("");
        setIsGroupChatDisabled(true);
        MessageService.createGroupChatMessage({ from, message })
            .then(res => {
                console.log(res.data);
                setNewGroupChatMessage(res.data);
                setGroupChatMessages(prev => [...prev, newGroupChatMessage]);
            })
            .catch(err => {
                console.log(err);
                setSendMessageError(err);
            });
    }, []);

    const updateCurrentChat = (chat) => {
        setCurrentChat(chat);
        console.log({ chat });
    }

    const createChat = useCallback(async (firstId, secondId) => {
        ChatService.createChat({ firstId, secondId })
            .then(res => {
                setUserChats(prev => {
                    if (prev) return [...prev, ...res.data];
                });
                console.log("User Chats (Chat Context) ", res.data);
            })
            .catch(err => console.warn('An error occured while creating chat' + err));
    }, []);

    const getGroupChatMessages = useCallback(() => {
        MessageService.getGroupChatMessages()
            .then(res => {
                setGroupChatMessages(res.data);
                console.log("!!Group chat messages : ", res.data);
            })
            .catch(err => console.warn('An error occured while creating chat' + err));
    }, []);

    return <ChatContext.Provider
        value={{
            userChats,
            isUserChatsLoading,
            chatError,
            potentialChats,
            createChat,
            currentChat,
            updateCurrentChat,
            messages,
            isMessagesLoading,
            messagesError,
            sendMessage,
            sendMessageError,
            onlineUsers,
            groupChatMessages,
            newGroupChatMessage,
            sendGroupChatMessage,
            getGroupChatMessages,
            isGroupChatDisabled,
            setIsGroupChatDisabled,
        }}
    >
        {children}
    </ChatContext.Provider>
}