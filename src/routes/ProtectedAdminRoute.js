import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user.role !== "admin") {
      navigate("/");
    }
    return children;
  }
};

export default ProtectedAdminRoute;
