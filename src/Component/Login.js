import React, { Component } from "react";
import { Form, Input, Button, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Title } = Typography;

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 25,
  },
};

export class Login extends Component {
  render() {
    const onFinish = (values) => {
      localStorage.setItem("show", true);
      if (
        localStorage.getItem("email") === values.email &&
        localStorage.getItem("password") === values.password &&
        localStorage.getItem("show") === "true"
      ) {
        window.location.replace("/home");
      } else {
        alert(
          "Please check email and password. Otherwise Please do registration"
        );
        window.location.reload();
      }
    };
    return (
      <div className="App">
        <Title level={3} type="success" strong style={{ marginTop: "20px" }}>
          NFN Labs Task
        </Title>
        <div className="cardbox">
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item style={{ fontSize: "20px", fontWeight: "bold" }}>
              Login
            </Form.Item>
            <Form.Item
              label="Email Id"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email id...!",
                },
              ]}
            >
              <Input
                type="email"
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <br />
            </Form.Item>

            <Form.Item>
              Or <Link to="/register">Register now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
