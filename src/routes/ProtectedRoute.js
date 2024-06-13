import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }
  }, [loading, isAuthenticated, navigate]);

  return children;
};

export default ProtectedRoute;
