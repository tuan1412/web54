import React from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../components/Layout";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { Form, Input, Button } from "antd";

export default function Login() {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [status, setStatus] = React.useState("idle");

  const isLoading = status === "loading";

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      setStatus("loading");
      await dispatch(login({ username, password })).unwrap();
    } catch (err) {
      setStatus("error");
      console.log(err);
    }
  };

  return (
    <AuthLayout>
      <div className="border p-3" style={{ width: 500 }}>
        <h1>MindX Form</h1>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ username: 'tuan1', password: '123456' }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isLoading}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item noStyle>
            <Link to="/register">Not have acc? Register</Link>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  );
}
