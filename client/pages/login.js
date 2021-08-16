import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Layout, Typography, Form, Input, Button, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import AppLayout from "../components/app-layout/app-layout.component";
import Jumbotron from "../components/jumbotron/jumbotron.component";
import { signInStart } from "../redux/user/user.action";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const useStyles = () => ({
  registerForm: {
    maxWidth: "360px",
    margin: "0 auto",
  },
});

const successNotification = (message) => {
  notification.open({
    message: message,
    duration: 0,
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
};
const failureNotification = (message) => {
  notification.open({
    message: message,
    duration: 0,
    icon: <SmileOutlined style={{ color: "red" }} />,
  });
};

function Login() {
  const { currentUser, isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const styles = useStyles();

  const handleSubmit = (values) => {
    dispatch(signInStart(values));
  };

  useEffect(() => {
    if (error !== "") {
      failureNotification(error);
    }
    if (error === "" && currentUser !== null) {
      return router.push("/");
    }
  }, [error, currentUser]);

  return (
    <AppLayout>
      <Jumbotron>
        <Title>Login</Title>
        <Paragraph>Welcome to the NextLMS</Paragraph>
      </Jumbotron>
      <Content>
        <div style={styles.registerForm}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={(values) => handleSubmit(values)}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Please enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Please enter your password" />
            </Form.Item>
            <Form.Item>
              <Button loading={isFetching} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </AppLayout>
  );
}

export default Login;
