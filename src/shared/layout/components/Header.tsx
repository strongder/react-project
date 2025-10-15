import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UserOutlined,
  ShopOutlined,
//   DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "/employees", label: "Employee-table", icon: <UserOutlined /> },
    { key: "/employee-cards", label: "Employee-card", icon: <ShopOutlined /> },
    { key: "/employee-detail", label: "Settings", icon: <SettingOutlined /> },
  ];

  return (
    <AntHeader className="flex items-center">
      <div className="text-white font-bold text-lg mr-6 cursor-pointer"
           onClick={() => navigate("/")}>
        MyApp
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ flex: 1, minWidth: 0 }}
      />
    </AntHeader>
  );
};

export default Header;