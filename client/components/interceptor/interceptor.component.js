import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logOutUser } from "../../redux/user/user.action";
import axios from "axios";

function Interceptor({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          try {
            console.log("401 Error > Logout");
            dispatch(logOutUser());
            router.push("/login");
          } catch (err) {
            console.log("Axios Interceptors Error", err);
            reject(error);
          }
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("api/v1/csrf-token");
      axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return <>{children}</>;
}

export default Interceptor;
