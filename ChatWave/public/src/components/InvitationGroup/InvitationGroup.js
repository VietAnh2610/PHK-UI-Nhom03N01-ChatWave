/* eslint-disable react/jsx-no-undef */
import React from "react";
import "./InvitationGroup.scss";
import { UserOutlined, MoreOutlined, CommentOutlined } from "@ant-design/icons";
import InvitationJoinGroup from "../InvitationComponent/InvitationJoinGroup";

function InvitationGroup({ groupsRequests }) {
  // const invitationJoinGroup = Array.from({ length: 4 });
  console.log("groupsRequests", groupsRequests);
  return (
    <div className="Invitation">
      <div className="invitation-phanloai">
        <div className="invitation-header">
          <p>Lời mời đã nhận</p>
          <span>{groupsRequests.length}</span>
        </div>

        <div className="invitation-content">
          <div style={{ height: "auto" }} className="row">
            {groupsRequests.map((item, index) => (
              <InvitationJoinGroup item = {item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationGroup;
