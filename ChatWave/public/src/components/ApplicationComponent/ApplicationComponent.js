import React from 'react'
import './ApplicationComponent.scss'
import { SearchOutlined, CalendarOutlined, DropboxOutlined, QuestionOutlined } from '@ant-design/icons';
import googleCalendarIcon from '../../assets/icon2.png';
import questionIcon from '../../assets/icon3.png';
import googleDriveIcon from '../../assets/icon4.png';
import trelloIcon from '../../assets/trello.png';
import githubIcon from '../../assets/github.png';
import codefactorIcon from '../../assets/codefactor.png';
import dropboxIcon from '../../assets/dropbox.png';
import gitlapIcon from '../../assets/gitlab.png';

const ApplicationComponent = () => {
  const icon1 = require('../../assets/icon1.png');
  const GoogleCalendarIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
    >
      <path fill="#4285F4" d="M6 8h36v32H6z" />
      <path fill="#FFF" d="M14 10v3h20v-3zM10 12h4v4h-4zM14 22h20v2H14zM14 28h20v2H14zM14 34h10v2H14zM18 12v2h12v-2zM30 12v2h4v-2zM32 12h4v4h-4zM10 24h4v4h-4zM34 24h4v4h-4zM10 30h4v4h-4zM34 30h4v4h-4zM26 12v2h4v-2z" />
    </svg>
  );

  return (
    <div className='MyApplicationComponent'>
      <div className='header'>
        <img className='avatar1' src={icon1} alt="Icon"/>
        <div>
          <h1>KẾT NỐI CÁC CÔNG CỤ CỦA BẠN</h1>
          <p>
            Với mỗi ứng dụng bạn thêm vào, ChatWave sẽ trở nên hữu ích hơn nhiều. Nó đồng bộ hóa với lịch của bạn, hiển thị các tệp từ đám mây và tập hợp tất cả công cụ làm việc của bạn lại với nhau.
          </p>
        </div>
      </div>
      
      <div className="actions">
        <button className="btn"><img src={questionIcon} alt="Question Icon" style={{ width: '20px', marginRight: '8px' }} /> Tìm hiểu thêm ứng dụng</button>
        <button className="btn"><img src={googleCalendarIcon} alt="Google Calendar" style={{ width: '20px', marginRight: '8px' }} /> Cài đặt Google Calendar</button>
        <button className="btn"><img src={googleDriveIcon} alt="Google Calendar" style={{ width: '20px', marginRight: '8px' }} /> Cài đặt Google Drive</button>
      </div>
      
      <div className="search-bar">
      <SearchOutlined className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm theo tên hoặc danh mục"
      />
    </div>
    
    <div className="recommended-apps">
        <h2>Ứng dụng đề xuất</h2>
        <div className="apps">
          <div className='app-card'>
            <div className='trello'>
              <img src={trelloIcon} alt="Trello Icon" style={{  marginRight: '15px' }}/>
              <div>
                <h3>Trello</h3>
                <p>Công tác trên các dự án Trello mà không cần rời khỏi ChatWave</p>
              </div>
            </div>
            <button className='btn1'>Thêm</button>
          </div>
          <div className='app-card'>
            <div className='trello'>
              <img src={githubIcon} alt="Github Icon" style={{  marginRight: '15px' }}/>
              <div>
                <h3>GitHub</h3>
                <p>Nhận thông báo cập nhật từ nền tảng phát triển hàng đầu thế giới</p>
              </div>
            </div>
            <button className='btn1'>Thêm</button>
          </div>
          <div className='app-card'>
            <div className='trello'>
              <img src={codefactorIcon} alt="Codefactor Icon" style={{  marginRight: '15px' }}/>
              <div>
                <h3>CodeFactor</h3>
                <p>Đánh giá mã tự động cho GitHub và Bitbucket</p>
              </div>
            </div>
            <button className='btn1'>Thêm</button>
          </div>
          <div className='app-card'>
            <div className='trello'>
              <img src={dropboxIcon} alt="Dropbox Icon" style={{  marginRight: '15px' }}/>
              <div>
                <h3>Dropbox</h3>
                <p>Kết nối Dropbox với không gian làm việc ChatWave của bạn để dễ dàng chia sẻ nội dung</p>
              </div>
            </div>
            <button className='btn1'>Thêm</button>
          </div>
          <div className='app-card'>
            <div className='trello'>
              <img src={gitlapIcon} alt="Gitlab Icon" style={{  marginRight: '15px' }}/>
              <div>
                <h3>GitLab</h3>
                <p>Thêm lệnh GitLab</p>
              </div>
            </div>
            <button className='btn1'>Thêm</button>
          </div>
          
        </div>
      </div>
  </div>
  )
}

export default ApplicationComponent
