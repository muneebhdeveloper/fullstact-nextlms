import { useState } from "react";
import { Layout, Typography, Form, Input, Button, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import AppLayout from "../components/app-layout/app-layout.component";
import Jumbotron from "../components/jumbotron/jumbotron.component";
import axios from "axios";

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

function Register() {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/register", {
        ...values,
      });
      if (data.ok === true) {
        successNotification(data.message);
      } else {
        failureNotification(data.message);
      }
      setLoading(false);
    } catch (err) {
      console.log("Error", err.message);
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <Jumbotron>
        <Title>Register</Title>
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
              label="Username"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Please your enter your username!" />
            </Form.Item>

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
              <Button loading={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </AppLayout>
  );
}

export default Register;
