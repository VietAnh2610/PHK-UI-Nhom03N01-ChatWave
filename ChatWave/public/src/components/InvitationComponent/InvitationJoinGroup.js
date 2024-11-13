import React, { useState } from "react";
import "./InvitationJoinGroup.scss";
import { UsergroupAddOutlined } from "@ant-design/icons";
import axios from "axios";
import { notification } from "antd";
import { scpGroupRoute, rejectGroupRoute } from "../../utils/APIRoutes";

const InvitationJoinGroup = ({ item }) => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const userId = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;

  const handleAcceptInvitation = async () => {
    try {
      const response = await axios.post(scpGroupRoute, {
        userId: userId,
        groupId: item._id, // Assuming item contains group ID
      });

      
        notification.success({
          message: "Thành công",
          description: "Bạn đã tham gia nhóm thành công!",
          duration: 2,
        });
        setHasAccepted(true); // Set state to update UI
      
      
    } catch (error) {
      console.error("Error accepting invitation:", error);
      notification.error({
        message: "Lỗi",
        description: "Đã xảy ra lỗi khi tham gia nhóm.",
        duration: 2,
      });
    }
  };

  const handleRejectInvitation = async () => {
    try {
      const response = await axios.post(rejectGroupRoute, {
        userId: userId,
        groupId: item._id, // Assuming item contains group ID
      });


        notification.success({
          message: "Thành công",
          description: "Bạn đã từ chối lời mời tham gia nhóm!",
          duration: 2,
        });
     
      
    } catch (error) {
      console.error("Error rejecting invitation:", error);
      notification.error({
        message: "Lỗi",
        description: "Đã xảy ra lỗi khi từ chối lời mời.",
        duration: 2,
      });
    }
  };

  return (
    <div className="infoInvitation_item col-md-2 col-sm-6 py-2">
      <div className="infoInvitation-header-top d-flex">
        <img className="avatar-homeAll" src={item.avatarImage} alt="Avatar" />
        <div className="infoInvitation d-flex flex-column">
          <h1>{item?.name}</h1>
          <div className="sdt d-flex">
            <UsergroupAddOutlined />
            <p>{item?.members?.length} Thành viên</p>
          </div>
        </div>
      </div>
      <div className="infoInvitation-header-down d-flex">
        <button className="btn" onClick={handleAcceptInvitation} disabled={hasAccepted}>
          {hasAccepted ? "Đã tham gia" : "Đồng ý"}
        </button>
        <button className="btn" onClick={handleRejectInvitation} disabled={hasAccepted}>
          Từ chối
        </button>
      </div>
    </div>
  );
};

export default InvitationJoinGroup;
