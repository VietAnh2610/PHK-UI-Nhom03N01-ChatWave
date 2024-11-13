import React, { useState } from 'react';
import './HomeTag.scss';
import { BookOutlined, MessageOutlined, FolderOutlined, PlusCircleOutlined, UserOutlined, DownOutlined, MoreOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from 'antd';
import Messages from '../MessageTag/MessageTag';
import Documents from '../DocumentTag/DocumentTag';
import UserComponent from "../UserComponent/UserComponent";
import UserComponent2 from "../UserDocumentTag/UserDocumentTag";

const HomeTag = () => {
  const [currentComponent, setCurrentComponent] = useState('contacts'); // Phần tử chính hiện tại
  const [dropdownContent, setDropdownContent] = useState('Bạn bè'); // Nội dung Dropdown
  const [dropdownColor, setDropdownColor] = useState('blue'); // Màu chữ mặc định
  const [borderColor, setBorderColor] = useState('blue'); // Màu border mặc định

  const userComponents = Array.from({ length: 6 });

  const renderContent = () => {
    switch (currentComponent) {
      case 'messages':
        return (
          <div className='danhba-item-content'>
            <div style={{ height: 'auto' }} className="row">
              {userComponents.map((_, index) => (
                <UserComponent key={index} />
              ))}
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className='danhba-item-content'>
            <div style={{ height: 'auto' }} className="row">
              {userComponents.map((_, index) => (
                <UserComponent2 key={index} />
              ))}
            </div>
          </div>
        );
      case 'contacts': // Chỉ hiển thị nội dung của phần tử chính
        return (
          <div className='danhba-item-content'>
            <div style={{ height: 'auto' }} className="row">
              {userComponents.map((_, index) => (
                <UserComponent key={index} />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleMenuClick = (e) => {
    const key = e.key;
    let title = '';
    let color = '';
    let border = '';

    if (key === 'friend1') {
      title = 'Bạn bè';
      color = 'blue'; // Màu chữ cho Bạn bè
      border = 'blue'; // Màu border cho Bạn bè
    } else if (key === 'friend2') {
      title = 'Đồng nghiệp';
      color = 'green'; // Màu chữ cho Đồng nghiệp
      border = 'green'; // Màu border cho Đồng nghiệp
    } else if (key === 'travel') {
      title = 'Du lịch';
      color = 'purple'; // Màu chữ cho Du lịch
      border = 'purple'; // Màu border cho Du lịch
    } else if (key === 'work') {
      title = 'Công việc';
      color = 'orange'; // Màu chữ cho Công việc
      border = 'orange'; // Màu border cho Công việc
    } else if (key === 'webshopee') {
      title = 'Web Shopify';
      color = 'red'; // Màu chữ cho Công việc
      border = 'red'; // Màu border cho Công việc
    } else if (key === 'companyabc') {
      title = 'Công ty ABC';
      color = 'purple'; // Màu chữ cho Công việc
      border = 'purple'; // Màu border cho Công việc
    }

    setDropdownContent(title);
    setDropdownColor(color);
    setBorderColor(border);
  };

  const friendsMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="friend1" className="custom-dropdown-menu"className="dropdown-item" style={{borderColor: 'blue'}}>
        Bạn bè
      </Menu.Item>
      <Menu.Item key="friend2" className="custom-dropdown-menu"className="dropdown-item" style={{borderColor: 'green'}}>
        Đồng nghiệp
      </Menu.Item>
    </Menu>
  );

  const messagesMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="travel" className="custom-dropdown-menu" style={{borderColor: 'purple'}}>
        Du lịch
      </Menu.Item>
      <Menu.Item key="work" className="custom-dropdown-menu" style={{borderColor: 'orange'}}>
        Công việc
      </Menu.Item>
    </Menu>
  );

  const documentsMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="webshopee" className="custom-dropdown-menu"style={{borderColor: 'red'}}>
        Web Shopify
      </Menu.Item>
      <Menu.Item key="companyabc" className="custom-dropdown-menu" style={{borderColor: 'purple'}}>
        Công ty abc
      </Menu.Item>
    </Menu>
  );

  const handleComponentClick = (component) => {
    setCurrentComponent(component);
    if (component === 'contacts') {
      setDropdownContent('Bạn bè');
      setDropdownColor('blue');
      setBorderColor('blue');
    } else if (component === 'messages') {
      setDropdownContent('Du lịch');
      setDropdownColor('purple');
      setBorderColor('purple');
    } else if (component === 'documents') {
      setDropdownContent('Web Shopify'); // Hoặc giá trị mặc định tương ứng nếu có
      setDropdownColor('red');
      setBorderColor('red');
    }
  };

  return (
    <div className='tag_all'>
      <div className='tag-menu'>
        <div className='tag-menu-left1'>
          <Dropdown
            overlay={currentComponent === 'contacts' ? friendsMenu : (currentComponent === 'messages' ? messagesMenu : documentsMenu)} 
            trigger={['click']}
          >
            <div className='danhba-item-header-1' onClick={e => e.preventDefault()}>
              <div 
                className='danhba-item-header-left-1'
                style={{backgroundColor: dropdownColor, borderColor: borderColor, color: 'white'}}
              >
                <UserOutlined /> {dropdownContent} <DownOutlined />
              </div>
            </div>
          </Dropdown>
        </div>
        <div className='tag-menu-left' style={{ padding: '10px',justifyContent:'center' }}>
          <a className={`menu-item ${currentComponent === 'contacts' ? 'active' : ''}`}
            onClick={() => handleComponentClick('contacts')}
            style={{ borderBottomLeftRadius: '15px', borderTopLeftRadius: '15px' }}>
            <p><BookOutlined />Danh bạ</p>
          </a>
          <a className={`menu-item ${currentComponent === 'messages' ? 'active' : ''}`}
            onClick={() => handleComponentClick('messages')}
            style={{ borderRadius: '0px', borderLeft: '0px' }}>
            <p><MessageOutlined />Tin nhắn</p>
          </a>
          <a className={`menu-item ${currentComponent === 'documents' ? 'active' : ''}`}
            onClick={() => handleComponentClick('documents')}
            style={{ borderBottomRightRadius: '15px', borderTopRightRadius: '15px' }}>
            <p><FolderOutlined />Tài liệu</p>
          </a>
        </div>
        <div className='tag-menu-right'>
          <div className='menu-right-1'>
            <div className='menu-tag-add'>
              <PlusCircleOutlined /> Thêm phân loại
            </div>
          </div>
          <div className='menu-right-2'>
            <h5>Sắp xếp</h5>
            <div className='menu-tag-add' style={{ border: '1px solid black' }}>
              Gần đây
            </div>
          </div>
        </div>
      </div>
      <div className='danhba-item'>
        {renderContent()}
      </div>
    </div>
  );
};

export default HomeTag;
