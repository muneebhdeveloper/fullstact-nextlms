import "antd/dist/antd.css";
import "../public/assets/styles.css";
import { Provider } from "react-redux";
import Interceptor from "../components/interceptor/interceptor.component";
import store from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Interceptor>
        <Component {...pageProps} />
      </Interceptor>
    </Provider>
  );
}

export default MyApp;
