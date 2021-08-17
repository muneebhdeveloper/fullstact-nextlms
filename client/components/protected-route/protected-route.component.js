import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthenticationStart } from "../../redux/user/user.action";

function ProtectedRoute(WrappedComponent) {
  return (props) => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(userAuthenticationStart());
    }, []);

    if (!isAuthenticated) {
      return false;
    }

    return <WrappedComponent {...props} />;
  };
}

export default ProtectedRoute;
