import { Layout, Typography } from "antd";
import { useSelector } from "react-redux";
import AppLayout from "../../components/app-layout/app-layout.component";
import Jumbotron from "../../components/jumbotron/jumbotron.component";
import ProtectedRoute from "../../components/protected-route/protected-route.component";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function Dashboard() {
  const {
    currentUser: { name },
  } = useSelector((state) => state.user);
  return (
    <AppLayout>
      <Jumbotron>
        <Title>Welcome, {name}</Title>
        <Paragraph>Welcome to the NextLMS</Paragraph>
      </Jumbotron>
      <Content></Content>
    </AppLayout>
  );
}

export default ProtectedRoute(Dashboard);
