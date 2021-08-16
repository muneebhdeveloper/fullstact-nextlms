import { Layout, Typography } from "antd";
import AppLayout from "../components/app-layout/app-layout.component";
import Jumbotron from "../components/jumbotron/jumbotron.component";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function HomePage() {
  return (
    <AppLayout>
      <Jumbotron>
        <Title>Homepage</Title>
        <Paragraph>Welcome to the NextLMS</Paragraph>
      </Jumbotron>
      <Content></Content>
    </AppLayout>
  );
}

export default HomePage;
