import React, { Component } from "react";
import { Form, Input, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 25,
  },
};
export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      show: false,
      password: "",
    };
  }

  render() {
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
      localStorage.setItem("name", values.name);
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
      localStorage.setItem("show", true);

      if (
        localStorage.getItem("name") === values.name &&
        localStorage.getItem("email") === values.email &&
        localStorage.getItem("password") === values.password &&
        localStorage.getItem("show") === "true"
      ) {
        window.location.replace("/home");
      } else if (localStorage.getItem("show") === "false") {
        window.location.replace("#");
      }
    };

    return (
      <div className="App">
        <Title level={3} type="success" strong style={{ marginTop: "20px" }}>
          NFN Labs Task
        </Title>
        <div className="card">
          <Form
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            onSubmit={() => {
              this.onFinish();
            }}
            {...layout}
          >
            <Form.Item style={{ fontSize: "20px", fontWeight: "bold" }}>
              Register
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name...!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>

            <Form.Item>
              Or <Link to="/">Login now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
