/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import "./InvitationSuggest.scss";
import { UserOutlined, MoreOutlined, CommentOutlined, UsergroupAddOutlined} from "@ant-design/icons";

const InvitationSuggest = () => {
  // useEffect(() => {
  //   const evenButtons = document.querySelectorAll('.infoInvitation-header-down .btn:nth-child(even)');
    
  //   evenButtons.forEach((button, index) => {
  //     button.addEventListener('click', () => {
  //       alert(`Even Button ${index + 1} clicked!`);
  //     });
  //   });

  //   // Clean up event listeners on component unmount
  //   return () => {
  //     evenButtons.forEach((button) => {
  //       button.removeEventListener('click', () => {
  //         alert(`Even Button clicked!`);
  //       });
  //     });
  //   };
  // }, []);

  return (
    <div className="infoInvitation_item col-md-2 col-sm-6 py-2">
      <div className="infoInvitation-header-top d-flex">
        <img
          className="avatar-homeAll"
          src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRGrH-J5ubDI_Z6vukkwsNvei3yz1A9vV8ZxVSVipUkDQIYE2UY"
          alt="Avatar"
        />
        <div className="infoInvitation d-flex flex-column">
          <h1>Nguyễn Đình Quang</h1>
          <div className='sdt d-flex'>
            <CommentOutlined />
            <p>+84 123456789</p>
          </div>
        </div>
      </div>
      <div className='infoInvitation-header-down'>
        <button className='btn'>Kết bạn</button>
        
      </div>
    </div>
  );
}

export default InvitationSuggest;
