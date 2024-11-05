import React, { useState } from "react";
import axios from "axios";
import { UpdateUserRoute } from "../../utils/APIRoutes"; 
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';
import "./AccountInfoComponent.scss";

const AccountInfoComponent = ({ userData, onClose ,fetchUserData}) => {
  const [username, setUsername] = useState(userData?.user.username || "");
  const [email, setEmail] = useState(userData?.user.email || "");
  const [phone, setPhone] = useState(userData?.user.phone || "");
  const [nickname, setNickname] = useState(userData?.user.nickname || "");
  const [bio, setBio] = useState(userData?.user.bio || ""); 
  const [avatarImage, setAvatar] = useState(userData?.user.avatarImage || ""); 
  const [isEditMode, setIsEditMode] = useState(false);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = error => console.log('Error: ', error);
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        username,
        email,
        phone,
        nickname,
        bio,
        avatarImage,
      };

      const userId = userData?.user._id; 

      const response = await axios.put(`${UpdateUserRoute}/${userId}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (response.data.success) {
        toast.success("Thông tin đã được cập nhật thành công!");
        setIsEditMode(false); 
        fetchUserData()
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật thông tin.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin.");
    }
  };



  const uploadProps = {
    beforeUpload: file => {
      getBase64(file, base64 => {
        setAvatar(base64);
      });
      return false; // Không gửi file lên server
    },
    showUploadList: false, 
  };

  return (
    <div className="account-info-container">
      <ToastContainer />
      <div className="account-info-overlay" onClick={onClose}></div>
      <div className="account-info-content">
        <div className="d-flex justify-content-between account-info-content-top">
          <h2>Thông tin tài khoản</h2>
          <i onClick={() => setIsEditMode(true)} class="fa-solid fa-user-pen"></i>
        </div>
        <div className="background-user">
          <div className="avt d-flex">
            <div className="image-avt">
              <img src={avatarImage} alt="Avatar" />
            </div>
            <div className="avt-right">
              <div>
                <p>{username}</p>
                <h3 style={{ color: "rgb(148, 148, 148)", marginTop: 4 }}>{email}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="user-info">
          <h3>Tiểu sử</h3>
          <p style={{backgroundColor:"rgb(245, 245, 245)"}}>{bio}</p>
        </div>
        <div className="user-item">
          <div className="user-item-left">
            <i className="fa-solid fa-circle-user"></i>
            <span>Họ và tên</span>
          </div>
          <div className="user-item-right">
            <p>{username}</p>
          </div>
        </div>

        <div className="user-item">
          <div className="user-item-left">
            <i className="fa-solid fa-phone"></i>
            <span>Số điện thoại</span>
          </div>
          <div className="user-item-right">
            <p>{phone}</p>
          </div>
        </div>

        <div className="user-item">
          <div className="user-item-left">
            <span style={{ fontWeight: 600, marginRight: 10 }}>@</span>
            <span>Tên người dùng</span>
          </div>
          <div className="user-item-right">
            <p>{nickname}</p>
          </div>
        </div>

        <div className="user-item">
          <div className="user-item-left">
            <i className="fa-solid fa-envelope"></i>
            <span>Email</span>
          </div>
          <div className="user-item-right">
            <p>{email}</p>
          </div>
        </div>

        <div className="blog">
          <p>Bài viết</p>
        </div>
        <div className="user-item-bottom">
          <p>Chia sẻ bài viết của bạn để hiển thị</p>
          <div className="blog-create">
            <p>Tạo bài viết mới</p>
          </div>
        </div>
        <div className="bottom"></div>
       

        <Modal
        
        width={450}
          title="Chỉnh sửa thông tin"
          visible={isEditMode}
          onCancel={() => setIsEditMode(false)}
          footer={[
            <Button key="back" onClick={() => setIsEditMode(false)}>
              Hủy
            </Button>,
            <Button style={{backgroundColor:"rgb(245, 182, 120)"}} key="submit" type="" onClick={handleUpdate}>
              Lưu
            </Button>,
          ]}
        >
          <div className="background-user">
            <div className="avt d-flex">
              <div className="image-avt">
                <img src={avatarImage } alt="Avatar" />
              </div>
              <Upload {...uploadProps}
              >
                <Button
                className="button-upload"
                icon={<UploadOutlined />}></Button>
              </Upload>
            </div>
            
          </div>
          <div className="user-info">
            <h3>Tiểu sử</h3>
            <Input
            style={{height:40}}
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="user-item">
            <div className="user-item-left">
              <i className="fa-solid fa-circle-user"></i>
              <span>Họ và tên</span>
            </div>
            <div className="user-item-right">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="user-item">
            <div className="user-item-left">
              <i className="fa-solid fa-phone"></i>
              <span>Số điện thoại</span>
            </div>
            <div className="user-item-right">
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="user-item">
            <div className="user-item-left">
              <span style={{ fontWeight: 600, marginRight: 10 }}>@</span>
              <span>Tên người dùng</span>
            </div>
            <div className="user-item-right">
              <Input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>

          <div className="user-item">
            <div className="user-item-left">
              <i className="fa-solid fa-envelope"></i>
              <span>Email</span>
            </div>
            <div className="user-item-right">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AccountInfoComponent;
