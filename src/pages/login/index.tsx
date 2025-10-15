import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleFinish = (values: { email: string; password: string }) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (values.email === "admin@gmail.com" && values.password === "123456") {
        message.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        message.error("Email hoặc mật khẩu không đúng!");
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Typography.Title level={3} className="text-center mb-6">
          Đăng nhập hệ thống
        </Typography.Title>
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" autoComplete="email" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu"
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-gray-500 text-sm mt-4">
          <span>
            email: <strong>admin@gmail.com</strong>
          </span>{" "}
          <br />
          password: <strong>123456</strong>
          <span></span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
