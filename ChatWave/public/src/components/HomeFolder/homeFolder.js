import React from "react";
import './homeFolder.scss';
import { BookOutlined, MessageOutlined, FolderOutlined, PlusCircleOutlined,DownCircleOutlined } from "@ant-design/icons";
import UserComponent from "../UserComponent/UserComponent";

const HomeFolder = () => {
  const userComponents = Array.from({ length: 8 });

    return (
      <div>
        <div className="header123">
            <div className="homefolder-header1">
                <div className="homefolder-header1-left">
                  <h6 style={{marginBottom:'0px'}}>Vui chơi</h6>
                </div>
                <div className="homefolder-header1-right">
                <DownCircleOutlined style={{fontSize:'22px',color:'white'}}/>
                </div>
            </div>
            <div className="homefolder-header2">
              
            </div>
            <div className="homefolder-header3">
            <div className='menu-right-11'>
            <div className='menu-tag-add1'>
              <PlusCircleOutlined /> Thêm phân loại
            </div>
          </div>
          <div className='menu-right-22'>
            <h5 style={{marginRight:'20px'}}>Sắp xếp</h5>
            <div className='menu-tag-add1' style={{border: '1px solid black'}}>
              Gần đây
            </div>
          </div>
            </div>
        </div>
        <div className="content-homefolder">
        <div style={{ height: 'auto' }} className="row">
            {userComponents.map((_, index) => (
              <UserComponent key={index} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default HomeFolder;
