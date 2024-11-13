import React, { useState } from 'react';
import './MyApplicationComponent.scss';
import githubIcon from '../../assets/github-mark.png';
import {
  FileOutlined,
  FolderAddOutlined,
  LayoutOutlined,
  PlusSquareOutlined,
  TagOutlined,
  NotificationOutlined,
  SearchOutlined,
  EllipsisOutlined,
  UserAddOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import googleDriveIcon from '../../assets/ggdrive.png';
import dropboxIcon from '../../assets/doc1.png';
import game from '../../assets/game.jpg'
const MyApplicationComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isCodeEntryVisible, setIsCodeEntryVisible] = useState(false); // Thêm state để theo dõi trạng thái

  const items = [
    { name: 'Valorant', icon: <LayoutOutlined style={{ fontSize: '30px', paddingTop: '5px' }} /> },
    { name: 'Liên Minh Huyền Thoại', icon: <LayoutOutlined style={{ fontSize: '30px', paddingTop: '5px' }} /> },
    { name: 'CSGO', icon: <LayoutOutlined style={{ fontSize: '30px', paddingTop: '5px' }} /> },
    { name: 'Thêm dự án', icon: <PlusSquareOutlined style={{ fontSize: '30px', color: 'orange', paddingTop: '5px' }} /> },
  ];
  const images = [
    { src: githubIcon, alt: 'Github Icon' },
    { src: googleDriveIcon, alt: 'Google Drive Icon' },
    { src: dropboxIcon, alt: 'Dropbox Icon' },
    { src: 'https://www.google.com/chrome/static/images/chrome-logo-m100.svg', alt: 'Chrome Icon' }
  ];
  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div className='myappall'>
        <div className="myapp-left">
          <div className="header-myapp-left">
            <div className='inf-myappleft'>
              <img src={githubIcon} alt="Github Icon" style={{ width: '40px', height: '40px' }} />
              <h5>Github</h5>
            </div>
            <div className="icon-myappleft">
              <FileOutlined style={{ fontSize: '30px', color: 'orange', paddingTop: '5px' }} />
              <FolderAddOutlined style={{ fontSize: '30px', color: 'orange', paddingTop: '5px' }} />
            </div>
          </div>
          <div className='content-myapp-left'>
            {items.map((item, index) => (
              <a
                key={index}
                href="#"
                style={{
                  color: activeIndex === index ? '#ff004d' : 'black',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  textDecoration: 'none',
                }}
                onClick={() => setActiveIndex(index)}
                className='item-content-myapp-left'
              >
                {item.icon}
                <h5>{item.name}</h5>
              </a>
            ))}
          </div>
        </div>

        <div className='myapp-middle'>
          {isCodeEntryVisible ? (
            // Nội dung mới khi nhấn vào nút "Nhập mã"
            <>
              <div className='header-myapp-middle'>
                <div className='header-myapp-middle-filename'>
                  <div className='item-content-myapp-left'>
                    <LayoutOutlined style={{ fontSize: '30px', paddingTop: '0px' }} />
                    <h5>Valorant</h5>
                  </div>
                </div>
                <div className='header-myapp-middle-search'>
                  <TagOutlined style={{ fontSize: '30px', paddingTop: '5px', color: 'orange', paddingRight: '20px' }} />
                  <NotificationOutlined style={{ fontSize: '30px', paddingTop: '5px', color: 'orange' }} />
                  <div className="search-bar1">
                    <SearchOutlined className="search-icon1" />
                    <input
                      type="text"
                      className="search-input1"
                      placeholder="Tìm kiếm "
                    />
                  </div>
                  <EllipsisOutlined style={{ fontSize: '50px', paddingTop: '5px' }} />
                </div>
              </div>
              <div className='menu-myapp-middle'>
                <div className='item-menu-myapp' style={{ background: '#fff4e0' }}>
                  <h5>Tin nhắn</h5>
                </div>
                <div className='item-menu-myapp'>
                  <h5>Thông tin khác</h5>
                </div>
              </div>
              <div className='content1-myapp-middle'>
                <div className='content-1-1-myapp-middle'>
                  <div className='icon-header1-myapp'>
                    <img src={game} alt="Github Icon" style={{ width: '150px', height: '150px' }} />
                  </div>
                  <div className='welcome-header1-myapp'>
                    <span>
                      <h1 style={{ display: 'inline' }}>CHÀO MỪNG BẠN ĐÃ THAM GIA</h1>
                      <h1 style={{ color: '#ff004d', display: 'inline' }}>#GAME_GO_DOT_2D</h1>
                    </span>
                    <h1 style={{   }}>Bắt đầu một ngày làm việc mới cùng với mọi người đồng hành phát triển dự án</h1>
                  </div>
                </div>
                <div className='content-1-2-myapp-middle'>
                  
                  <div style={{ color: '#ff004d', display: 'inline-block' }}>
                    <UserAddOutlined style={{ fontSize: '30px' }} />
                  <h4 style={{ display: 'inline', fontSize: '20px'  }}> Mời đồng nghiệp tham gia #GAME_GO_DOT_2D</h4>
                  </div>
                </div>
              </div>
              <div className='content2-myapp-middle'>
                <h5 style={{ textAlign: 'center' }}>26/7/2024</h5>
                <div className='content2-1-myapp-middle'>
                  <div className='icon-content2-1-myapp-middle'>
                    <img src={githubIcon} alt="Github Icon" style={{ width: '40px', height: '40px' }} />
                  </div>
                  <div className='content2-2-myapp-middle'>
                    <h4 style={{ color: 'orange' }}>Github</h4>
                    <div className='chat-content2-2-myapp-middle'>
                    <h5 style={{ display: 'inline', marginRight: '10px' }}>Đã đăng ký thành công</h5>
<h5 style={{ display: 'inline', color: '#ff004d', marginRight: '10px' }}>NguyenThinh/GAME_GO_DOT_2D</h5>
<h5 style={{ display: 'inline', marginRight: '10px' }}>Bạn sẽ nhận được các thông báo</h5>
<h5 style={{  color: 'blue' }}>issues, pull, commit, releases, deployment</h5>

                    </div>
                  </div>
                </div>
                
              </div>

              <div className='content2-myapp-middle'>
                <div className='content2-1-myapp-middle'>
                  <div className='icon-content2-1-myapp-middle'>
                    <img src={githubIcon} alt="Github Icon" style={{ width: '40px', height: '40px' }} />
                  </div>
                  <div className='content2-2-myapp-middle'>
                    <h4 style={{ color: 'orange' }}>Github</h4>
                    <h5 style={{display:'inline'}}> Yêu cầu Pull được mở bởi </h5>
                    <h5 style={{color:'#ff004d',display:'inline'}}>nguyenquang/main</h5>
                    <div className='chat-content2-2-myapp-middle'>
                      <h5 style={{color:'#ff004d'}}>#37 Cập nhật HomeCharter.gd</h5>
                      <img src={githubIcon} alt="Github Icon" style={{ width: '17px', height: '17px',color:'gray',display:'inline' }} /> 
                      <h7 style={{display:'inline',color:'gray'}}>NguyenThinh/GAME_GO_DOT_2D Thứ 6, 11;03 SA</h7>
                      
                      <button style={{color:'blue', border: '1px solid blue'}}>Nhập mã</button> {/* Cập nhật trạng thái khi nhấn vào nút */}

                    </div>
                      <div className='reply-myapp'>
                      <img src={githubIcon} alt="Github Icon" style={{ width: '21px', height: '21px',color:'gray',display:'inline' }} /> 
                      <h5 style={{color:'#ff004d'}}>3 trả lời</h5>
                      <h5 style={{color:'gray'}}> Trả lời cuối cùng vào thứ 6, 11:45 SA</h5>
                      </div>
                  </div>
                </div>
                <div className='content2-1-myapp-middle'>
                  <div className='icon-content2-1-myapp-middle'>
                    <img src={githubIcon} alt="Github Icon" style={{ width: '40px', height: '40px' }} />
                  </div>
                  <div className='content2-2-myapp-middle'>
                    <h4 style={{ color: 'orange' }}>NguyenThinh2002</h4>
                    <div className='chat-content2-2-myapp-middle'>
                      <h5 style={{color:'blue',display:'inline'}}>@Quang</h5>
                      <h5 style={{color:'black',display:'inline'}}> Bro sửa lại file vukhi.gd phần chuyển đổi vũ khí và hướng dẫn</h5>
                      <h6 style={{color:'blue'}}>http://github.com/NguyenThinh/GAME_GO_DOT_2D/tree/main/Script/vukhi.gd</h6>
                      

                    </div>
                      
                  </div>
                </div>
              </div>
              
              <div className='input-content2-myapp-middle'>
                  <div className="search-bar2">
                    <LinkOutlined className="search-icon2" />
                    <input
                      type="text"
                      className="search-input2"
                      placeholder="Viết tin nhắn"
                    />
                  </div>
                </div>
            </>
          ) : (
            // Nội dung mặc định
            <>
              <div className='header-myapp-middle'>
                <div className='header-myapp-middle-filename'>
                  <div className='item-content-myapp-left'>
                    <LayoutOutlined style={{ fontSize: '30px', paddingTop: '0px' }} />
                    <h5>Valorant</h5>
                  </div>
                </div>
                <div className='header-myapp-middle-search'>
                  <TagOutlined style={{ fontSize: '30px', paddingTop: '5px', color: 'orange', paddingRight: '20px' }} />
                  <NotificationOutlined style={{ fontSize: '30px', paddingTop: '5px', color: 'orange' }} />
                  <div className="search-bar1">
                    <SearchOutlined className="search-icon1" />
                    <input
                      type="text"
                      className="search-input1"
                      placeholder="Tìm kiếm "
                    />
                  </div>
                  <EllipsisOutlined style={{ fontSize: '50px', paddingTop: '5px' }} />
                </div>
              </div>
              <div className='menu-myapp-middle'>
                <div className='item-menu-myapp' style={{ background: '#fff4e0' }}>
                  <h5>Tin nhắn</h5>
                </div>
                <div className='item-menu-myapp'>
                  <h5>Thông tin khác</h5>
                </div>
              </div>
              <div className='content1-myapp-middle'>
                <div className='content-1-1-myapp-middle'>
                  <div className='icon-header1-myapp'>
                    <img src={githubIcon} alt="Github Icon" style={{ width: '150px', height: '150px' }} />
                  </div>
                  <div className='welcome-header1-myapp'>
                    <span>
                      <h1 style={{ display: 'inline' }}>CHÀO MỪNG BẠN ĐẾN VỚI</h1>
                      <h1 style={{ color: 'blue', display: 'inline' }}>@Github</h1>
                    </span>
                    <h1 style={{ color: 'blue', paddingTop: "10px" }}>@Github hoạt động như nào</h1>
                  </div>
                </div>
                <div className='content-1-2-myapp-middle'>
                  <span>
                    <h1 style={{ display: 'inline' }}> Hãy bắt đầu lịch sử nhắn tin trực tiếp với </h1>
                    <h1 style={{ color: '#ff004d', display: 'inline' }}>#Valorant</h1>
                    <h1 style={{ display: 'inline' }}> Ngay bây giờ!</h1>
                  </span>
                  <div style={{ color: '#ff004d', display: 'inline-block' }}>
                    <UserAddOutlined style={{ fontSize: '40px' }} />
                    <h1 style={{ display: 'inline' }}> Mời đồng nghiệp tham gia #Valorant</h1>
                  </div>
                </div>
              </div>
              <div className='content2-myapp-middle'>
                <h5 style={{ textAlign: 'center' }}>26/7/2024</h5>
                <div className='content2-1-myapp-middle'>
                  <div className='icon-content2-1-myapp-middle'>
                    <img src={githubIcon} alt="Github Icon" style={{ width: '40px', height: '40px' }} />
                  </div>
                  <div className='content2-2-myapp-middle'>
                    <h4 style={{ color: 'orange' }}>Github</h4>
                    <div className='chat-content2-2-myapp-middle'>
                      <h5>Bạn đã cài đặt thành công ứng dụng Github trên không gian làm việc Slack này! Đăng nhập tài khoản Github của bạn để sử dụng các lệnh</h5>
                      <div className='connect-github-myapp'>
                        <h5 style={{ color: 'white' }}>Kết nối tài khoản Github</h5>
                      </div>
                      <h5>Hoàn tất đăng nhập bằng cách nhập mã xác minh được cung cấp cho bạn sau khi xác thực </h5>
                      <button onClick={() => setIsCodeEntryVisible(true)}>Nhập mã</button> {/* Cập nhật trạng thái khi nhấn vào nút */}
                    </div>
                  </div>
                </div>
                <div className='input-content2-myapp-middle' style={{paddingTop:'200px'}}>
                  <div className="search-bar2">
                    <LinkOutlined className="search-icon2" />
                    <input
                      type="text"
                      className="search-input2"
                      placeholder="Viết tin nhắn"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className='myapp-right'>
          <img src={githubIcon} alt="Github Icon" style={{ width: '50%', height: 'auto', paddingBottom: '20px' }} />
          <img src={googleDriveIcon} alt="Google Drive Icon" style={{ width: '50%', height: 'auto', paddingBottom: '20px' }} />
          <img src={dropboxIcon} alt="Dropbox Icon" style={{ width: '50%', height: 'auto', paddingBottom: '20px' }} />
          <img src="https://www.google.com/chrome/static/images/chrome-logo-m100.svg" alt="Chrome Icon" style={{ width: '50%', height: 'auto', paddingBottom: '20px' }} />
          <PlusSquareOutlined style={{ fontSize: '50px', color: 'orange', paddingBottom: '20px' }} />
        </div>
      </div>
    </div>
  );
};

export default MyApplicationComponent;
