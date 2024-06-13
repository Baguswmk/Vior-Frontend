import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Login from "../../components/Login/Login";
import Loading from "../../components/Layout/Loading";

const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated === true) {
      setIsLoading(true);
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  return <div>{isLoading ? <Loading /> : <Login />}</div>;
};

export default LoginPage;
