import React, { useState } from 'react';
import './CommunityPage.scss';
import TrendComponent from '../../components/TrendComponent/TrendComponent';


const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('Xu hướng');
  const [currentComponent, setCurrentComponent] = useState('xuhuong');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Xu hướng') {
      setCurrentComponent('xuhuong');
    }
    if (tab === 'Bản thân') {
      setCurrentComponent('banthan');
    }
    // Add more conditions if you have other components to show for different tabs
  };

  return (
    <div className='CommunityPage'>
      <div className='CommunityPage-header'>
        <ul>
          <li 
            className={activeTab === 'Xu hướng' ? 'active_community' : ''} 
            onClick={() => handleTabClick('Xu hướng')}
          >
            Xu hướng
          </li>
          <li 
            className={activeTab === 'Bản thân' ? 'active_community' : ''} 
            onClick={() => handleTabClick('Bản thân')}
          >
            Bản thân
          </li>
          <li 
            className={activeTab === '24h' ? 'active_community' : ''} 
            onClick={() => handleTabClick('24h')}
          >
            24h
          </li>
          <li 
            className={activeTab === 'Khác' ? 'active_community' : ''} 
            onClick={() => handleTabClick('Khác')}
          >
            Khác <i className="fa-solid fa-sort-down"></i>
          </li>
        </ul>
      </div>
      <div>
        {currentComponent === 'xuhuong' && <TrendComponent/>}
        {/* {currentComponent === 'banthan' && <HomeGroup />} */}
      </div>
    </div>
  );
}

export default CommunityPage;
