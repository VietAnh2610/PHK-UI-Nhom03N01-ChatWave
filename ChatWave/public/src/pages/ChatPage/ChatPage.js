import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatFriendsComponent from "../../components/ChatFriendsComponent/ChatFriendsComponent";
import ChatGroupComponent from "../../components/ChatGroupComponent/ChatGroupComponent";
import { detailUserRoute, recieveMessageRoute, sendMessageRoute } from "../../utils/APIRoutes";
import "./ChatPage.scss";

const ChatPage = () => {
  const [activeChats, setActiveChats] = useState([]);
  const [activeGroups, setActiveGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const [isFriendsList, setIsFriendsList] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
        const response = await axios.get(`${detailUserRoute}/${id}`);
        setFriends(response.data.user.friends);
        setGroups(response.data.user.groups);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleList = () => {
    setIsFriendsList((prev) => !prev);
    setActiveChats([]);
    setActiveGroups([]);
  };

  const handleTabClick = async (entity, isGroup) => {
    const itemId = entity._id;
    const isActive = isGroup
      ? activeGroups.some((group) => group._id === itemId)
      : activeChats.some((chat) => chat._id === itemId);

    if (isActive) {
      if (isGroup) {
        setActiveGroups((prevGroups) =>
          prevGroups.filter((group) => group._id !== itemId)
        );
      } else {
        setActiveChats((prevChats) =>
          prevChats.filter((chat) => chat._id !== itemId)
        );
      }
    } else {
      if (isGroup) {
        setActiveGroups((prevGroups) => [...prevGroups, entity]);

        // Fetch new group messages
        const userId = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
        try {
          const response = await axios.get(recieveMessageRoute(userId, itemId));
          setMessages((prevMessages) => ({
            ...prevMessages,
            [itemId]: response.data,
          }));
          setNewMessages((prevNewMessages) => ({
            ...prevNewMessages,
            [itemId]: "",
          }));
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      } else {
        setActiveChats((prevChats) => [...prevChats, entity]);

        // Fetch new friend messages
        const userId = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
        try {
          const response = await axios.get(recieveMessageRoute(userId, itemId));
          setMessages((prevMessages) => ({
            ...prevMessages,
            [itemId]: response.data,
          }));
          setNewMessages((prevNewMessages) => ({
            ...prevNewMessages,
            [itemId]: "",
          }));
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    }
  };

  const handleInputChange = (e, itemId) => {
    const { value } = e.target;
    setNewMessages((prevNewMessages) => ({
      ...prevNewMessages,
      [itemId]: value,
    }));
  };

  const handleSendMessage = async (itemId, isGroup) => {
    const newMessage = newMessages[itemId];
    if (!newMessage.trim()) return;

    const userId = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = {
      from: userId,
      to: itemId,
      text: newMessage,
    };

    try {
      await axios.post(sendMessageRoute, data);

      setMessages((prevMessages) => ({
        ...prevMessages,
        [itemId]: [
          ...(prevMessages[itemId] || []),
          { fromSelf: true, message: { text: newMessage } },
        ],
      }));

      setNewMessages((prevNewMessages) => ({
        ...prevNewMessages,
        [itemId]: "",
      }));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="ChatPage">
      <div className="ChatPage-header d-flex">
        <ul className="d-flex">
          <li onClick={toggleList} style={{ cursor: "pointer" }}>
            <i
              style={{ marginRight: 5, color: "rgb(2, 230, 161)", fontSize: 20 }}
              className="fa-solid fa-droplet"
            ></i>
            {isFriendsList ? "Chuyển DS nhóm" : "Chuyển DS bạn bè"}
          </li>
          {(isFriendsList ? friends : groups).map((entity) => (
            <li
              key={entity._id}
              className={
                (isFriendsList ? activeChats : activeGroups).some(
                  (chatOrGroup) => chatOrGroup._id === entity._id
                )
                  ? "active-chat"
                  : ""
              }
              onClick={() => handleTabClick(entity, !isFriendsList)}
            >
              <img src={entity.avatarImage} alt={entity.name || entity.username} />
              {entity.name || entity.username}
            </li>
          ))}
          <li>+</li>
        </ul>
      </div>

      <div className="d-flex window-chat">
        {(isFriendsList ? activeChats : activeGroups).length > 0 ? (
          (isFriendsList ? activeChats : activeGroups).map((entity) => (
            <div
              style={{ width: "33.33%", height: "100%" }}
              key={entity._id}
              className="window-chat-item active"
            >
              {isFriendsList ? (
                <ChatFriendsComponent
                  friend={entity}
                  messages={messages[entity._id] || []}
                  inputValue={newMessages[entity._id] || ""}
                  handleInputChange={(e) => handleInputChange(e, entity._id)}
                  handleSendMessage={() => handleSendMessage(entity._id, false)}
                />
              ) : (
                <ChatGroupComponent
                  group={entity}
                  messages={messages[entity._id] || []}
                  inputValue={newMessages[entity._id] || ""}
                  handleInputChange={(e) => handleInputChange(e, entity._id)}
                  handleSendMessage={() => handleSendMessage(entity._id, true)}
                />
              )}
            </div>
          ))
        ) : (
          <div className="no-chat-active">
            Chọn bạn bè hoặc nhóm để bắt đầu trò chuyện.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
