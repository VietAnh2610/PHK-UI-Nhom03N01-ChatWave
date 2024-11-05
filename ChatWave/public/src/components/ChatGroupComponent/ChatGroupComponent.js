import React, { useEffect, useRef, useState } from "react";
import "./ChatFriendsComponent.scss";
import { Upload, Input as AntdInput, Modal, Button, notification } from "antd"; // Thêm notification vào đây
import { UploadOutlined, SmileOutlined } from "@ant-design/icons";
import Picker from "emoji-picker-react";
import axios from "axios";
import { detailUserRoute, sendGroupdRoute } from "../../utils/APIRoutes"; // Đảm bảo import đúng

const ChatGroupComponent = ({
  group,
  messages,
  inputValue,
  handleInputChange,
  handleSendMessage,
}) => {
  const chatContentRef = useRef(null);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false); // đổi tên biến cho rõ ràng
  const [isMembersModalVisible, setIsMembersModalVisible] = useState(false);
  const [friends, setFriends] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]); // State để lưu thông tin thành viên
  const [invitedFriends, setInvitedFriends] = useState([]); // Thêm state để theo dõi những người bạn đã mời

  // Lấy ID người dùng từ localStorage
  const userId = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;

  useEffect(() => {
    // Cuộn xuống cuối mỗi khi tin nhắn thay đổi
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Lấy danh sách bạn bè từ API detailUserRoute
    const fetchFriends = async () => {
      try {
        const data = await axios.get(`${detailUserRoute}/${userId}`);
        setFriends(data.data.user.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [userId]);

  // Hàm lấy thông tin chi tiết các thành viên trong nhóm
  const fetchGroupMembers = async () => {
    try {
      const memberDetails = await Promise.all(
        group.members.map(async (memberId) => {
          const response = await axios.get(`${detailUserRoute}/${memberId}`);
          return response.data.user;
        })
      );
      setGroupMembers(memberDetails);
    } catch (error) {
      console.error("Error fetching group members:", error);
    }
  };

  const handleEmojiClick = (event, emojiObject) => {
    handleInputChange({ target: { value: inputValue + emojiObject.emoji } });
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerVisible(!isEmojiPickerVisible);
  };

  const handleFileChange = ({ file }) => {
    if (file.status === "done") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const handleCustomSendMessage = () => {
    if (selectedFile) {
      handleSendMessage({
        message: { text: inputValue, image: selectedFile },
      });
      setSelectedFile(null);
    } else {
      handleSendMessage({
        message: { text: inputValue },
      });
    }
    handleInputChange({ target: { value: "" } });
  };

  const showInviteModal = () => {
    setIsInviteModalVisible(true);
  };

  const handleInviteModalCancel = () => {
    setIsInviteModalVisible(false);
  };

  const showMembersModal = async () => {
    await fetchGroupMembers(); // Lấy thông tin thành viên trước khi hiển thị modal
    setIsMembersModalVisible(true);
  };

  const handleMembersModalCancel = () => {
    setIsMembersModalVisible(false);
  };

  const handleInviteFriend = async (friendId) => {
    try {
      const response = await axios.post(sendGroupdRoute, {
        senderId: userId,
        receiverId: friendId,
        groupId: group._id,
      });

      if (response.data.msg) {
        // Thông báo mời thành công
        notification.success({
          message: "Thành công",
          description: "Đã gửi lời mời",
        });

        // Thêm friendId vào danh sách những người đã mời
        setInvitedFriends((prevInvited) => [...prevInvited, friendId]);
      }
    } catch (error) {
      console.error("Error sending group invitation:", error);
      notification.error({
        message: "Lỗi",
        description: "Gửi lời mời thất bại.",
      });
    }
  };

  return (
    <div className="ChatGroupComponent">
      {group ? (
        <div className="ChatGroupComponent-item px-0">
          <div className="ChatGroupComponent-item-header">
            <div className="d-flex align-items-center py-2">
              <img
                style={{ marginLeft: 10, width: 60, height: 50, marginRight: 10 }}
                className="avatar-homeAll chatgroup-img"
                src={group.avatarImage}
                alt="group-avatar"
              />
              <div style={{ width: "100%" }} className="d-flex justify-content-between">
                <div className="infoGroup d-flex flex-column">
                  <h1 style={{ fontSize: 16 }}>{group.name}</h1>
                  <p   onClick={showMembersModal} style={{ margin: 0, cursor:'pointer' }}>
                    <i
                      className="fa-regular fa-user"
                      onClick={showMembersModal}
                      style={{ cursor: "pointer" }}
                    ></i>{" "}
                    {group.members.length} thành viên
                  </p>
                </div>
                <div className="d-flex align-items-center ChatGroupComponent-item-header-right">
                  <i className="fa-regular fa-bookmark"></i>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <i className="fa-solid fa-ellipsis-vertical" onClick={showInviteModal}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="ChatGroupComponent-item-body">
            <div className="ChatGroupComponent-content" ref={chatContentRef}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`ChatGroupComponent-content-chat-item${
                    msg.fromSelf ? "-me" : ""
                  } py-2`}
                >
                  {!msg.fromSelf && <img src={msg.senderAvatar} alt="chat-avatar" />}
                  {msg.message.image ? (
                    <img src={msg.message.image} alt="sent" className="sent-image" />
                  ) : (
                    <p>{msg.message.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="ChatGroupComponent-item-bottom">
            <div className="ChatGroupComponent-item-bottom-icon d-flex">
              <div className="ChatGroupComponent-item-bottom-icon-left">
                <i className="fa-solid fa-microphone"></i>
                <i className="fa-solid fa-note-sticky"></i>
                <i className="fa-solid fa-gift"></i>
              </div>
              <div className="ChatGroupComponent-item-bottom-icon-right">
                <i className="fa-solid fa-robot"></i>
                <span>Tôi có thể gợi ý câu trả lời cho bạn...</span>
              </div>
            </div>
            <div className="ChatGroupComponent-item-bottom-message d-flex align-items-center">
              <div className="ChatGroupComponent-item-bottom-message-left">
                <AntdInput
                  style={{ marginLeft: 10, marginTop: 10 }}
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Nhập tin nhắn..."
                  addonAfter={<SmileOutlined onClick={toggleEmojiPicker} />}
                />
                {isEmojiPickerVisible && (
                  <Picker
                    pickerStyle={{ position: "absolute", bottom: "50px", right: "50px" }}
                    onEmojiClick={handleEmojiClick}
                  />
                )}
              </div>
              <div
                style={{ marginTop: 10 }}
                className="ChatGroupComponent-item-bottom-message-right"
              >
                {inputValue.trim() || selectedFile ? (
                  <i className="fa-solid fa-paper-plane" onClick={handleCustomSendMessage}></i>
                ) : (
                  <i className="fa-solid fa-thumbs-up"></i>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Chọn một nhóm để bắt đầu trò chuyện</p>
      )}

      <Modal
        title="Thêm bạn vào nhóm"
        visible={isInviteModalVisible}
        onCancel={handleInviteModalCancel}
        footer={null}
      >
        <ul style={{marginTop:20}} className="friend-list">
          {friends.map((friend) => (
            <li style={{listStyle:'none', margin:10}} key={friend._id} className="friend-item">
              <img style={{width:50, borderRadius:'50%'}} src={friend.avatarImage} alt="friend-avatar" />
              <span style={{marginLeft:10, marginRight:50}}>{friend.username}</span>
              <Button
              style={{float:'right'}}
                type="primary"
                onClick={() => handleInviteFriend(friend._id)}
                disabled={invitedFriends.includes(friend._id)}
              >
                {invitedFriends.includes(friend._id) ? "Đã mời" : "Mời vào nhóm"}
              </Button>
            </li>
          ))}
        </ul>
      </Modal>

      {/* Modal hiển thị danh sách thành viên */}
      <Modal
        title="Danh sách thành viên"
        visible={isMembersModalVisible}
        onCancel={handleMembersModalCancel}
        footer={null}
      >
        <ul className="member-list">
          {groupMembers.map((member) => (
            <li style={{listStyle:'none', marginTop:20}} key={member._id} className="member-item">
              <img style={{width:50, borderRadius:"50%", marginRight:20}} src={member.avatarImage} alt="member-avatar" />
              <span>{member.username}</span>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default ChatGroupComponent;
