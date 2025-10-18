import React from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UserOutlined,
  ShopOutlined,
  HomeOutlined,
  LogoutOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useTheme } from "../../contexts/ThemeContext";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { key: "/home", label: "Home", icon: <HomeOutlined /> },
    { key: "/employees", label: "Employee-table", icon: <UserOutlined /> },
    { key: "/employee-cards", label: "Employee-card", icon: <ShopOutlined /> },
  ];

  const userMenu: MenuProps = {
    items: [
      {
        key: "theme",
        label: theme === "light" ? "Chuyển Dark Mode" : "Chuyển Light Mode",
        icon: <BulbOutlined />,
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        label: "Đăng xuất",
        icon: <LogoutOutlined />,
      },
    ],
    onClick: ({ key }) => {
      if (key === "theme") toggleTheme();
      if (key === "logout") {
        localStorage.removeItem("token");
        navigate("/login");
      }
    },
  };

  return (
    <AntHeader className="flex items-center justify-between transition-all duration-300 bg-white text-gray-900  border-gray-200">
      <div
        className="font-bold text-lg mr-10 cursor-pointer text-blue-500"
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
      <Dropdown menu={userMenu} placement="bottomRight" arrow>
        <Avatar
          size="large"
          className="cursor-pointer bg-blue-500"
          icon={<UserOutlined />}
        />
      </Dropdown>
    </AntHeader>
  );
};

export default Header;
