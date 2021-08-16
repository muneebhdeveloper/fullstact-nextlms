import { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { LoginOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { logOutUser, signInSuccess } from "../../redux/user/user.action";
import { useDispatch, useSelector } from "react-redux";

const { Header, Footer } = Layout;
const { Item } = Menu;

function AppLayout({ children }) {
  const [current, setCurrent] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (router.pathname === "/") {
      setCurrent("home");
    } else {
      const routerName = router.pathname.split("/").join("");
      setCurrent(routerName);
    }
  }, []);

  useEffect(() => {
    if (currentUser === null && localStorage.getItem("user")) {
      dispatch(signInSuccess(JSON.parse(localStorage.getItem("user"))));
      if (router.pathname === "/login" || router.pathname === "/register") {
        router.push("/");
      }
    }
  }, [currentUser]);

  const handleMenuChange = (event) => {
    if (event.key === "home" || event.key === "logout") {
      router.push("/");
    } else {
      router.push(`/${event.key}`);
    }
  };

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <Layout>
      <Header>
        <Menu
          onClick={(event) => handleMenuChange(event)}
          mode="horizontal"
          theme="dark"
          selectedKeys={[current]}
        >
          {currentUser !== null ? (
            <>
              <Item icon={<HomeOutlined />} key="home">
                Home
              </Item>
              <Item
                onClick={handleLogout}
                icon={<LoginOutlined />}
                key="logout"
              >
                Logout
              </Item>
            </>
          ) : (
            <>
              <Item icon={<HomeOutlined />} key="home">
                Home
              </Item>
              <Item icon={<LoginOutlined />} key="login">
                Login
              </Item>
              <Item icon={<LogoutOutlined />} key="register">
                Register
              </Item>
            </>
          )}
        </Menu>
      </Header>
      <Layout>{children}</Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}

export default AppLayout;
