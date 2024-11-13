import React, { useEffect, useState } from 'react';
import "./InvitationReceived.scss";
import { UserOutlined, MoreOutlined, CommentOutlined } from "@ant-design/icons";
import { message } from 'antd';
import axios from 'axios';
import { scpFriendRoute ,rejectFriendRoute} from '../../utils/APIRoutes';

const InvitationReceived = ({request, userId}) => {
  const [accepted, setAccepted] = useState(false); 
  const [rejected, setRejected] = useState(false);


  const handleAccept = async () => {
    try {
      const response = await axios.post(scpFriendRoute, {
        userId: userId,
        friendId: request._id,  
      });

      const { msg } = response.data;

      if (response.status === 200) {
        message.success('Chấp nhận lời mời kết bạn thành công.');
        setAccepted(true);
        
      } else {
        message.error(msg || 'Không thể chấp nhận lời mời.');
      }
    } catch (error) {
      console.error('Lỗi khi chấp nhận lời mời kết bạn:', error);
      message.error('Có lỗi xảy ra khi chấp nhận lời mời.');
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.post(rejectFriendRoute, {
        userId: userId,
        friendId: request._id,  
      });

      const { msg } = response.data;

      if (response.status === 200) {
        message.success('Đã từ chối lời mời kết bạn.');
        setAccepted(true);
        
      } else {
        message.error(msg || 'Không thể từ chốt lời mời.');
      }
    } catch (error) {
      console.error('Lỗi khi từ chốt lời mời kết bạn:', error);
      message.error('Có lỗi xảy ra khi từ chốt lời mời.');
    }
  };
  return (
    <div className="infoInvitation_item col-md-2 col-sm-6 py-2">
      <div className="infoInvitation-header-top d-flex">
        <img
          className="avatar-homeAll"
          src={request?.avatarImage}
          alt="Avatar"
        />
        <div className="infoInvitation d-flex flex-column">
          <h1>{request?.username}</h1>
          <div className='sdt d-flex'>
            <CommentOutlined />
            <p>+84 {request.phone}</p>
          </div>
        </div>
      </div>
      <div className='infoInvitation-header-down d-flex'>
        {accepted ? (
          <span className='btn'>Đã đồng ý</span> 
        ) : rejected ? (
          <span className='btn'>Đã từ chối</span> 
        ) : (
          <>
            <button onClick={handleAccept} className='btn'>Đồng ý</button>
            <button onClick={handleReject} className='btn'>Từ chối</button>
          </>
        )}
      </div>
    </div>
  );
}

export default InvitationReceived;
