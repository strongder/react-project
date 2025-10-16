import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {key: "/home", label: "Home", icon: <HomeOutlined />},
    { key: "/employees", label: "Employee-table", icon: <UserOutlined /> },
    { key: "/employee-cards", label: "Employee-card", icon: <ShopOutlined /> },
  ];

  return (
    <AntHeader className="flex items-center">
      <div
        className="text-white font-bold text-lg mr-10 cursor-pointer"
        onClick={() => navigate("/")}
      >
        HR Management
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ flex: 1, minWidth: 0 }}
      />
      <LogoutOutlined
        style={{color: "white", fontSize: "20px"}}
        onClick={() => {
          navigate("/login");
        }}
      />
    </AntHeader>
  );
};

export default Header;
