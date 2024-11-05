import React from 'react';
import { UserOutlined, MoreOutlined } from "@ant-design/icons";
import UserComponent from "../UserDocumentTag/UserDocumentTag";
import './DocumentTag.scss';

const Documents = () => {
  const userComponents = Array.from({ length: 3 });
  
  return (
    <div className='danhba-item'>
      <div className='danhba-phanloai'>
        <div className='danhba-item-header'>
          <div className='danhba-item-header-left' style={{background:'green',color:"white"}}>
            <UserOutlined /> Web shopify
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
            <UserOutlined /> Công ty abc
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

export default Documents;
