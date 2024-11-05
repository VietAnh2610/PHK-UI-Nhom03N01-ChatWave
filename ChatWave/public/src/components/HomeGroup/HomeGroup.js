import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Checkbox, List, Avatar, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { createGroupRouter, detailUserRoute } from '../../utils/APIRoutes'; // Đảm bảo đường dẫn import chính xác
import './HomeGroup.scss';
import UserGroupComponent from '../UserGroupComponent/UserGroupComponent';

const HomeGroup = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groupImageBase64, setGroupImageBase64] = useState(null);
  const [userData, setUserData] = useState(null);
  const fetchUserData = async () => {
    try {
      const id = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;
      const response = await axios.get(`${detailUserRoute}/${id}`);

      setUserData(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!groupName) {
      message.error('Vui lòng nhập tên nhóm');
      return;
    }
    if (selectedFriends.length === 0) {
      message.error('Vui lòng chọn ít nhất một bạn bè');
      return;
    }

    // Thêm ID của bạn vào danh sách thành viên nếu chưa có
    const members = [userData._id, ...selectedFriends];

    try {
      // Gửi dữ liệu nhóm lên server
      const response = await axios.post(createGroupRouter, {
        name: groupName,
        members: members,
        avatarImage: groupImageBase64, // Gửi chuỗi base64 của ảnh
      });

      if (response.data) {
        message.success('Nhóm được tạo thành công');
        console.log('Tạo nhóm với dữ liệu:', response.data);

      
        
        // Đặt lại giá trị input
        setGroupName('');
        setSelectedFriends([]);
        setGroupImageBase64(null);
        setIsModalVisible(false);
        fetchUserData();
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi khi tạo nhóm');
      console.error('Lỗi khi tạo nhóm:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFriendSelection = (friendId) => {
    setSelectedFriends((prevSelected) => {
      if (prevSelected.includes(friendId)) {
        return prevSelected.filter((id) => id !== friendId);
      } else {
        return [...prevSelected, friendId];
      }
    });
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      // Chuyển đổi ảnh thành chuỗi base64
      const reader = new FileReader();
      reader.onload = () => {
        setGroupImageBase64(reader.result);
      };
      reader.onerror = (error) => {
        message.error('Đã xảy ra lỗi khi tải ảnh');
        console.error('Lỗi đọc file:', error);
      };
      reader.readAsDataURL(info.file.originFileObj); // Đọc file thành chuỗi base64

      // Lưu ảnh gốc vào state (nếu cần thiết)
      message.success(`${info.file.name} tải lên thành công`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} tải lên thất bại`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="HomeAll-top d-flex justify-content-between">
        <div className="HomeAll-top-left d-flex justify-content-between">
          <p>
            Nhóm <span>{userData?.groups.length}</span>
          </p>
          <div
            style={{ marginLeft: 20, cursor: 'pointer' }}
            className="Homechannel-top-left d-flex justify-content-between align-items-center"
            onClick={showModal}
          >
            <PlusOutlined style={{ marginRight: 5 }} />
            Tạo nhóm
          </div>
        </div>
        <div className="HomeAll-top-right d-flex justify-content-between">
          <p>Sắp xếp</p>
          <select>
            <option>Gần đây</option>
            <option>Danh sách 03</option>
            <option>Danh sách 04</option>
          </select>
        </div>
      </div>
      <div style={{ height: 'auto' }} className="row">
        <UserGroupComponent userDataGroups={userData?.groups || []} />
      </div>

      {/* Modal tạo nhóm */}
      <Modal
        title="Tạo nhóm mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Tạo nhóm"
        cancelText="Hủy"
        width={350}
      >
        <Input
          placeholder="Nhập tên nhóm"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <Upload
          accept="image/*"
          showUploadList={false}
          customRequest={({ file, onSuccess }) => {
            setTimeout(() => {
              onSuccess('ok');
            }, 0);
          }}
          onChange={handleImageUpload}
        >
          <Button icon={<UploadOutlined />}>Chọn ảnh nhóm</Button>
        </Upload>

        <List
          style={{ marginTop: 20, width: '100%' }}
          header={<div>Chọn bạn bè để thêm vào nhóm</div>}
          dataSource={userData?.friends || []}
          renderItem={(friend) => (
            <List.Item>
              <Checkbox
                checked={selectedFriends.includes(friend._id)}
                onChange={() => handleFriendSelection(friend._id)}
              >
                <List.Item.Meta
                  avatar={<Avatar size={50} src={friend.avatarImage} />}
                  title={friend.username}
                  description={friend.phone}
                />
              </Checkbox>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default HomeGroup;
