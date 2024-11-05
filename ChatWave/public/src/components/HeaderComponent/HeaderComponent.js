import React, { useEffect, useState } from 'react';
import './HeaderComponent.scss';
import {
  AppstoreOutlined,
  SecurityScanOutlined,
  LockOutlined,
  FormatPainterOutlined,
  SwapOutlined,
  CommentOutlined,
  ShopOutlined,
  PicLeftOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { detailUserRoute, logoutRoute } from '../../utils/APIRoutes';
import AccountInfoComponent from '../AccountInfoComponent/AccountInfoComponent';
import { Modal } from 'antd';

const HeaderComponent = () => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const id = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;
      const response = await axios.get(`${detailUserRoute}/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  const showSettingModal = () => {
    setIsSettingModalVisible(true);
    setIsPopoverVisible(false);
  };

  const showAccountModal = () => {
    setIsAccountModalVisible(true);
    setIsPopoverVisible(false);
  };

  // Định nghĩa hàm handleAccountModalCancel để đóng modal tài khoản
  const handleAccountModalCancel = () => {
    setIsAccountModalVisible(false);
  };

  const handLogOutClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className='Header'>
      <div className='Header-left'>
        <h2>ChatWave</h2>
      </div>
      <div className='Header-center'>
        <AppstoreOutlined />
        <i
          style={{ marginLeft: 10, cursor: 'pointer' }}
          className="fa-solid fa-map-location-dot"
          onClick={() => navigate('/map')}
        ></i>
      </div>
      <div className='Header-right'>
        <i className="fa-solid fa-cloud-arrow-up"></i>
        <i style={{ marginRight: 5 }} className="fa-solid fa-moon"></i>
        <img
          style={{ marginRight: 15, cursor: 'pointer' }}
          src={userData?.user.avatarImage  || `https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg`}
          alt='User Avatar'
          onClick={togglePopover}
        />
        {isPopoverVisible && (
          <div className='popover'>
            <div className='header-component-inf-container'>
              <div className='img-inf-header-component'>
                <img
                  style={{ marginRight: 15, cursor: 'pointer' }}
                  src={userData?.user.avatarImage || `https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg`}
                  alt='ar'
                  onClick={togglePopover}
                  
                />
              </div>
              <div className='inf-username-header-component'>
                <h5 style={{ margin: '0' }}>{userData?.user.username}</h5>
                <p style={{ margin: '0', color: 'gray' }}>@{userData?.user.nickname}</p>
              </div>
            </div>
            <h6 onClick={showSettingModal} style={{ cursor: 'pointer' }}>Cài đặt</h6>
            <h6 onClick={showAccountModal} style={{ cursor: 'pointer' }}>Tài khoản</h6>
            <h6 href="" onClick={handLogOutClick} className='close-link'>Đăng xuất</h6>
          </div>
        )}
      </div>

      {isAccountModalVisible && (
        <AccountInfoComponent
          userData={userData}
          onClose={handleAccountModalCancel}
          fetchUserData={fetchUserData}
        />
      )}

      {/* Modal for Settings */}
      <Modal
        title="Cài đặt"
        visible={isSettingModalVisible}
        onOk={() => setIsSettingModalVisible(false)}
        onCancel={() => setIsSettingModalVisible(false)}
        footer={null}
      >
        <div className='line'></div>
        <div className='setting-container-item'>
          <div className='setting-container-item-left'>
            <SecurityScanOutlined style={{ fontSize: '24px' }} />
          </div>
          <div className='setting-container-item-right'>
            <h6 style={{ margin: '0' }}>Tài khoản và bảo mật</h6>
          </div>
        </div>
        <div className='setting-container-item'>
          <div className='setting-container-item-left'>
            <LockOutlined style={{ fontSize: '24px' }} />
          </div>
          <div className='setting-container-item-right'>
            <h6 style={{ margin: '0' }}>Quyền riêng tư</h6>
          </div>
        </div>
        <div className='setting-container-item'>
          <div className='setting-container-item-left'>
            <FormatPainterOutlined style={{ fontSize: '24px' }} />
          </div>
          <div className='setting-container-item-right'>
            <h6 style={{ margin: '0' }}>Giao diện</h6>
          </div>
        </div>
        <div className='setting-container-item'>
          <div className='setting-container-item-left'>
            <SwapOutlined style={{ fontSize: '24px' }} />
          </div>
          <div className='setting-container-item-right'>
            <h6 style={{ margin: '0' }}>Tiện ích</h6>
          </div>
        </div>
        <div className='setting-container-item'>
          <div className='setting-container-item-left'>
            <CommentOutlined style={{ fontSize: '24px' }} />
          </div>
          <div className='setting-container-item-right'>
            <h6 style={{ margin: '0' }}>Thông báo</h6>
          </div>
        </div>
        <div className='setting-container-item'>
          <div className='setting-container-item-left'>
            <ShopOutlined style={{ fontSize: '24px' }} />
          </div>
          <div className='setting-container-item-right'>
            <h6 style={{ margin: '0' }}>Cửa hàng</h6>
          </div>
        </div>
        <div className='setting-container-item'>
          <div className='setting-container-item-left'>
            <PicLeftOutlined style={{ fontSize: '24px' }} />
          </div>
          <div className='setting-container-item-right'>
            <h6 style={{ margin: '0' }}>Thư viện</h6>
          </div>
        </div>
        <div className='setting-container-item'>
          <div className='setting-container-item-left'>
            <WindowsOutlined style={{ fontSize: '24px' }} />
          </div>
          <div className='setting-container-item-right'>
            <h6 style={{ margin: '0' }}>Ứng dụng</h6>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HeaderComponent;
