import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedDesainerRoute = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user.role !== "desainer" || user.role !== "admin") {
      navigate("/");
    }
    return children;
  }
};

export default ProtectedDesainerRoute;
