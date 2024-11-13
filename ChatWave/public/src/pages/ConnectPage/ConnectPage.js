import React, { useState } from 'react'
import "./ConnectPage.scss"
import ApplicationComponent from '../../components/ApplicationComponent/ApplicationComponent';
import MyApplicationComponent from '../../components/MyApplicationComponent/MyApplicationComponent';
import Robot from "../../assets/Robot2.gif";
import RobotChat from "../../components/RobotChat/RobotChat";


const ConnectPage = () => {
    const [activeTab, setActiveTab] = useState('Ứng dụng');
    const [currentComponent, setCurrentComponent] = useState('ungdung');
    const [isRobotChatVisible, setRobotChatVisible] = useState(false);
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'Ứng dụng') {
          setCurrentComponent('ungdung');
        }
        if (tab === 'Ứng dụng của bạn') {
          setCurrentComponent('ungdungcuaban');
        }
        // Add more conditions if you have other components to show for different tabs
      };

      const toggleRobotChat = () => {
        setRobotChatVisible(!isRobotChatVisible);
      };

  return (
    <div className='ConnectPage'>
      <img className="Robot" src={Robot} onClick={toggleRobotChat} alt="Robot" />
      {isRobotChatVisible && <RobotChat onClose={toggleRobotChat} />}
      <div className='ConnectPage-header'>
        <ul>
            <li
            className={activeTab === 'Ứng dụng' ? 'active_community' : ''} 
            onClick={() => handleTabClick('Ứng dụng')}
            >Ứng dụng</li>
            <li
            className={activeTab === 'Ứng dụng của bạn' ? 'active_community' : ''} 
            onClick={() => handleTabClick('Ứng dụng của bạn')}
            >Ứng dụng của bạn</li>
        </ul>
      </div>

      <div>
      {currentComponent === 'ungdung' && <ApplicationComponent/>}
      {currentComponent === 'ungdungcuaban' && <MyApplicationComponent/>}

      </div>
    </div>
  )
}

export default ConnectPage
