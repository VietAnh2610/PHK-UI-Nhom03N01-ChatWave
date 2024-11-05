import React, { useState } from 'react';
import './HomeFriends.scss';
import UserFriendsComponent from '../UserFriendsComponent/UserFriendsComponent';
import { Modal, Button, Input, Select, message } from 'antd';
import axios from 'axios';
import { searchByPhoneRoute, sendFriendRoute } from '../../utils/APIRoutes'; // Import route API

const { Option } = Select;

const HomeFriends = ({ userData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null); // Trạng thái lưu trữ kết quả tìm kiếm
  const [isSearching, setIsSearching] = useState(false); // Trạng thái để quản lý quá trình tìm kiếm

  console.log(userData);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      // Gọi API tìm kiếm bạn bè theo số điện thoại
      const response = await axios.post(searchByPhoneRoute, {
        phone: phoneNumber,
      });

      const { status, user, msg } = response.data;

      if (status) {
        setSearchResult(user); // Lưu trữ kết quả tìm kiếm vào trạng thái
      } else {
        setSearchResult(null); // Xóa kết quả cũ nếu không tìm thấy
        message.warning(msg || 'Không tìm thấy bạn bè.');
      }
    } catch (error) {
      console.error('Lỗi tìm kiếm bạn bè:', error);
      message.error('Số điện thoại chưa đăng ký.');
    } finally {
      setIsSearching(false); // Đặt lại trạng thái tìm kiếm
    }
  };

  const handleAddFriend = async () => {
    if (!searchResult) {
      message.error('Không có người dùng để gửi yêu cầu kết bạn.');
      return;
    }
    
    try {
      await axios.post(sendFriendRoute, {
        userId: userData._id,
        friendId: searchResult._id,
      });
      message.success('Yêu cầu kết bạn đã được gửi!');
      // Có thể cần cập nhật lại danh sách bạn bè hoặc giao diện khác ở đây
    } catch (error) {
      console.error('Lỗi gửi yêu cầu kết bạn:', error);
      message.error('Có lỗi xảy ra khi gửi yêu cầu kết bạn.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPhoneNumber('');
    setSearchResult(null); // Xóa kết quả khi đóng modal
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="HomeAll-top d-flex justify-content-between">
        <div className="HomeAll-top-left d-flex justify-content-between">
          <p>
            Bạn bè <span>{userData?.friends?.length || 0}</span>
          </p>
          <div
            onClick={showModal}
            style={{ marginLeft: 20 }}
            className="Homechannel-top-left d-flex justify-content-between align-items-center"
          >
            Tìm bạn bè
          </div>
        </div>
        <div className="HomeAll-top-right d-flex justify-content-between">
          <p>Sắp xếp</p>
          <Select defaultValue="Gần đây" style={{ width: 120 }}>
            <Option value="Gần đây">Gần đây</Option>
            <Option value="Danh sách 03">Danh sách 03</Option>
            <Option value="Danh sách 04">Danh sách 04</Option>
          </Select>
        </div>
      </div>
      <div style={{ height: 'auto' }} className="row">
        <UserFriendsComponent userDataFriends={userData?.friends} />
      </div>
      <Modal
        title="Tìm bạn bè"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Ẩn phần footer mặc định của modal
      >
        <Input
          placeholder="Nhập số điện thoại"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Button
          type="primary"
          onClick={handleSearch}
          loading={isSearching}
          style={{ marginBottom: 10 }}
        >
          Tìm kiếm
        </Button>
        {isSearching ? (
          <p>Đang tìm kiếm...</p>
        ) : (
          <div>
            {searchResult ? (
              <div className="search-result">
                <h4>Kết quả tìm kiếm:</h4>
                <div className='d-flex align-items-center'>
                  <div className="friend-card d-flex">
                    <img
                      src={searchResult.avatarImage}
                      alt={searchResult.username}
                      className="friend-avatar"
                    />
                    <h5>{searchResult.username}</h5>
                  </div>
                  <Button
                    style={{ marginLeft: 20 }}
                    type="primary"
                    className="friend-info"
                    onClick={handleAddFriend} // Gọi hàm gửi yêu cầu kết bạn
                  >
                    Thêm bạn bè
                  </Button>
                </div>
              </div>
            ) : phoneNumber && <p></p>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HomeFriends;
