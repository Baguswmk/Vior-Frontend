import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ProtectedDesaineroute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login", { replace: true });
    }
    if (loading === false) {
      if (!isAuthenticated) {
        return navigate("/login", { replace: true });
      } else if (user.role !== "admin" && user.role !== "desainer") {
        return navigate("/", { replace: true });
      }
    }
  }, [loading, isAuthenticated, user, navigate, children]);
  return children;
};

export default ProtectedDesaineroute;
