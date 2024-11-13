import React from 'react';
import "./InvitationFriend.scss";
import InvitationReceived from '../InvitationComponent/InvitationReceived';
import { UserOutlined, MoreOutlined, CommentOutlined } from "@ant-design/icons";
import InvitationSent from '../InvitationComponent/InvitationSent';
import InvitationSuggest from '../InvitationComponent/InvitationSuggest';

const InvitationFriend = ({friendRequests, userId}) => {

  
  const invitationSent = Array.from({ length: 1});
  const invitationSuggest = Array.from({ length: 1 });
  console.log("friendRequests",friendRequests)
  return (
    <div className='Invitation'>
      <div className='invitation-phanloai'>
        <div className='invitation-header'>
          <p>Lời mời đã nhận</p>
          <span>{friendRequests.length}</span>
        </div>
        
        <div className='invitation-content'>
          <div style={{ height: 'auto'}} className="row" >
          {friendRequests.length > 0  ? (
            friendRequests?.map ((request) => (
              <InvitationReceived key={request._id} request={request} userId={userId} />
            ))
          ):(
            <p style={{marginLeft:30}}>Không có lời mời kết bạn nào</p>
          )}
          </div>
        </div>
      </div>
      <div className='invitation-phanloai'>
        <div className='invitation-header'>
          <p>Lời mời đã gửi</p>
          <span>1</span>
        </div>
        
        <div className='invitation-content'>
          <div style={{ height: 'auto'}} className="row" >
            {invitationSent.map((_, index) => (
              <InvitationSent key={index} /> 
            ))}
          </div>
        </div>
      </div>
      <div className='invitation-phanloai'>
        <div className='invitation-header'>
          <p>Gợi ý kết bạn</p>
          <span>1</span>
        </div>
        
        <div className='invitation-content'>
          <div style={{ height: 'auto'}} className="row" >
            {invitationSuggest.map((_, index) => (
              <InvitationSuggest key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationFriend;
