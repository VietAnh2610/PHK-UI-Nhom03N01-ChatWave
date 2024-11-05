import React from "react";
import "./HomeAll.scss";
import anh1 from '../../assets/anh1.jpg'
import anh2 from '../../assets/anh2.jpg'
import anh3 from '../../assets/anh3.jpg'
import anh4 from '../../assets/anh4.png'
import anh5 from '../../assets/anh5.jpg'
import Slider from "react-slick";
import UserComponent from "../UserComponent/UserComponent";
const HomeAll = () => {
    // const userComponents = Array.from({ length: 20 });
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
  return (
    <div  style={{padding:20}}>
      {/* <div className="HomeAll-top d-flex justify-content-between">
        <div  className="HomeAll-top-left d-flex justify-content-between">
          <p>
            Bạn bè <span>40</span>
          </p>
          <p>
            Nhóm <span>40</span>
          </p>
          <p>
            Chưa đọc <span>40</span>
          </p>
        </div>
        <div className="HomeAll-top-right d-flex justify-content-between">
          <p>Sắp xếp</p>
          <select>
            <option>Gần đây</option>
            <option>Chưa đọc</option>
            <option>Danh sách 03</option>
            <option>Danh sách 04</option>
          </select>
        </div>
      </div> */}
      {/* <div style={{height:'auto'}} className="row">
      {userComponents.map((_, index) => (
        <UserComponent key={index} />
      ))}

      </div> */}
       <div className="no-chat-active">
        <h4>Chào mừng đến với <strong>CHATWAVE</strong>!</h4>
        <p>Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng<br></br> người thân, bạn bè được tối ưu hoá cho máy tính của bạn.</p>
              <Slider {...sliderSettings}>
                <div className="slide-item">
                  <img src={anh1} alt="Slide 1" />
                  <h3>Gọi nhóm và làm việc hiệu quả với ChatWave Group Call</h3>
                  <p>Trao đổi công việc mọi lúc mọi nơi</p>
                </div>
                <div className="slide-item">
                  <img src={anh2} alt="Slide 2" />
                  <h3>Giải quyết công việc hiệu quả, lên tới 40%</h3>
                  <p>Với Chatwave PC</p>
                </div>
                <div className="slide-item">
                  <img src={anh3} alt="Slide 3" />
                  <h3>Chat nhóm với đồng nghiệp</h3>
                  <p>Tiện lợi hơn, nhờ các công cụ hỗ trợ chat trên máy tính</p>
                </div>
                <div className="slide-item">
                  <img src={anh4} alt="Slide 3" />
                  <h3>Gử file nặng?</h3>
                  <p>Đã có ChatWave "xử" hết</p>
                </div>
                <div className="slide-item">
                  <img src={anh5} alt="Slide 3" />
                  <h3>Trải nghiệm xuyên suốt</h3>
                  <p>Kết nối và giải quyết công việc trên mọi thiết bị với dữ liệu luôn được đồng bộ</p>
                </div>
              </Slider>
              
            </div>
    </div>
  );
};

export default HomeAll;
