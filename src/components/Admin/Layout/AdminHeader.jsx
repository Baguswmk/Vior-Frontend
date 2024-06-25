// import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../Assests/images/logo/fullLogo.webp";
import { useEffect } from "react";
import Loading from "../../Layout/Loading";

const AdminHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login", { replace: true });
    }

    if (!isAuthenticated || !user) {
      return navigate("/login", { replace: true });
    } else if (user.role !== "admin") {
      return navigate("/", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="max-w-36">
        <Link to="/">
          <img loading="lazy" src={logo} alt="logo" className="w-full " />
        </Link>
      </div>
      <div className="flex items-center ">
        <div className="flex items-center mr-4">
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          {/* <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link> */}
          <Link to="/profile">
            <img
              loading="lazy"
              src={user.avatar ? `${user.avatar.url}` : "default-avatar-url"} // Provide a default avatar URL
              alt="user avatar"
              className="w-[50px] h-[50px] rounded-full object-cover"
              style={{ maxWidth: "50px", maxHeight: "50px" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
