import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../redux/userSlice";

const { Header } = Layout;

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useAuth();

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/posts/create">Upload</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => dispatch(logout())}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div
        className="logo"
        style={{
          float: "left",
          width: "120px",
          height: "31px",
          margin: "16px 24px 16px 0",
          background: "rgba(255, 255, 255, 0.2)",
        }}
      ></div>
      {!user ? (
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      ) : (
        <div style={{ textAlign: "right", color: "#fff" }}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <span>
              Welcome {user.username} <DownOutlined />
            </span>
          </Dropdown>
        </div>
      )}
    </Header>
  );
}
