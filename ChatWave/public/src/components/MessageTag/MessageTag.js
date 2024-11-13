import React from 'react';
import { UserOutlined, MoreOutlined } from "@ant-design/icons";
import UserComponent from "../UserComponent/UserComponent";
import './MessageTag.scss';

const Messages = () => {
  const userComponents = Array.from({ length: 6 });
  
  return (
    <div className='danhba-item'>
      <div className='danhba-phanloai'>
        <div className='danhba-item-header' >
          <div className='danhba-item-header-left' style={{background:'green',color:"white"}}>
          <i class="fa-solid fa-plane-departure"></i>    Du lịch
          </div>
          <div className='danhba-item-header-right'>
            <MoreOutlined />
          </div>
        </div>
        <div className='danhba-item-content'>
          <div style={{ height: 'auto' }} className="row">
            {userComponents.map((_, index) => (
              <UserComponent key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className='danhba-phanloai'>
        <div className='danhba-item-header' style={{ borderTop: '2px solid blue' }}>
          <div className='danhba-item-header-left' style={{background:"blue", color: 'white', border: '1px solid blue', borderTop: 'none ' }}>
          <i class="fa-solid fa-briefcase"></i> Công việc
          </div>
          <div className='danhba-item-header-right'>
            <MoreOutlined />
          </div>
        </div>
        <div className='danhba-item-content'>
          <div style={{ height: 'auto' }} className="row">
            {userComponents.map((_, index) => (
              <UserComponent key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
