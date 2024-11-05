import React, { useState, useEffect } from "react";
import { Link, useLocation, Route, Routes } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import logo from "../../assets/logo-web.png";

import {
  HomeOutlined,
  CommentOutlined,
  FundOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  MailOutlined 
} from "@ant-design/icons";
import "./style.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import HomePage from "../HomePage/HomePage";
import CommunityPage from "../CommunityPage/CommunityPage";
import InvitationPage from "../InvitationPage/InvitationPage";
import ChatPage from "../ChatPage/ChatPage";
import ConnectPage from "../ConnectPage/ConnectPage"
const { Header, Sider, Content } = Layout;

const Slide_bar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  useEffect(() => {
    const OwnerSTR = "GarageOwner";
    const ManageSTR = "GarageManage";
    const ServiceSTR = "GarageService";

    if (location.pathname.includes(OwnerSTR)) {
      setSelectedMenu("1");
    }
    if (location.pathname.includes(ManageSTR)) {
      setSelectedMenu("2");
    }
    if (location.pathname.includes(ServiceSTR)) {
      setSelectedMenu("3");
    }
  }, [location.pathname]);

  return (
    <Layout>
      <Sider
        theme="light"
        className="Slide_bar"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Link to="/">
          <img style={{ width: 80, margin: "0 auto" }} src={logo} />
        </Link>

        <Menu
          className="sb_item"
          theme="light"
          mode="inline"
          defaultSelectedKeys={[]}
          selectedKeys={[selectedMenu]}
          onSelect={({ key }) => setSelectedMenu(key)}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Trang chủ",
            },
            {
              key: "2",
              icon: <CommentOutlined />,
              label: "Tin nhắn ",
            },
            {
              key: "3",
              icon: <FundOutlined />,
              label: "Không biết",
            },
            {
              key: "4",
              icon: <MailOutlined />,
              label: "Thông báo",
            },
            {
              key: "5",
              icon: <AppstoreAddOutlined />,
              label: "Không biết",
              style: { marginTop: 500 }, 
            },
            {
              key: "6",
              icon: <SettingOutlined />,
              label: "Cài đặt",
            },
            // {
            //   key: "6",
            //   icon: <SettingOutlined />,
            //   label: "Thêm nhóm",
            // },
            
          ]}
        />
      </Sider>
      <Layout className="">
        <Header
            style={{
              
              padding:0,
              background: 'white', 
            }}
          >
            
        <HeaderComponent/>
        </Header>

        <Content
          style={{
            minHeight: 280,
            background:
            selectedMenu === "1" ||
              selectedMenu === "2" ||
              selectedMenu === "3" ||
              selectedMenu === "4"
                ? `linear-gradient(to bottom, #F5C46A, #FA8DAE)`
                : colorBgContainer,
          }}
        >
          {selectedMenu === "1" && <HomePage />}

          {selectedMenu === "2" && <ChatPage />}
          {selectedMenu === "4" && <InvitationPage />}
          {selectedMenu === "3" && <CommunityPage />}
          {selectedMenu === "5" && <ConnectPage/>}
          {/* {selectedMenu !== '2' && selectedMenu !== '3' && children} */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Slide_bar;
