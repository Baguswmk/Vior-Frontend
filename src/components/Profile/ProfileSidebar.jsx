import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { PiImageSquare } from "react-icons/pi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/user";
import Loading from "../Layout/Loading";
const ProfileSidebar = ({ setActive, active }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser())
      .then(() => {
        toast.success("Logout successfully!");
        window.location.href = "/";
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred during logout");
      });

    return <Loading />;
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(1)}>
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span className={`pl-3 ${active === 1 ? "text-[red]" : ""} 800px:block hidden`}>Profile</span>
      </div>
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(2)}>
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span className={`pl-3 ${active === 2 ? "text-[red]" : ""} 800px:block hidden`}>Orders</span>
      </div>

      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(3)}>
        <PiImageSquare size={20} color={active === 3 ? "red" : ""} />
        <span className={`pl-3 ${active === 3 ? "text-[red]" : ""} 800px:block hidden`}>My Items</span>
      </div>

      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(4) || navigate("/message")}>
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span className={`pl-3 ${active === 4 ? "text-[red]" : ""} 800px:block hidden`}>Inbox</span>
      </div>

      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(5)}>
        <RiLockPasswordLine size={20} color={active === 5 ? "red" : ""} />
        <span className={`pl-3 ${active === 5 ? "text-[red]" : ""} 800px:block hidden`}>Change Password</span>
      </div>

      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(6)}>
        <TbAddressBook size={20} color={active === 6 ? "red" : ""} />
        <span className={`pl-3 ${active === 6 ? "text-[red]" : ""} 800px:block hidden`}>Address</span>
      </div>

      {user && user?.role === "admin" && (
        <Link to="/admin/dashboard">
          <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(8)}>
            <MdOutlineAdminPanelSettings size={20} color={active === 8 ? "red" : ""} />
            <span className={`pl-3 ${active === 8 ? "text-[red]" : ""} 800px:block hidden`}>Admin Dashboard</span>
          </div>
        </Link>
      )}
      {user && (user.role === "desainer" || user.role === "admin") && (
        <Link to="/dashboard">
          <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(8)}>
            <LuLayoutDashboard size={20} color={active === 8 ? "red" : ""} />
            <span className={`pl-3 ${active === 8 ? "text-[red]" : ""} 800px:block hidden`}>Desainer Dashboard</span>
          </div>
        </Link>
      )}

      <div className="single_item flex items-center cursor-pointer w-full mb-8" onClick={logoutHandler}>
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span className={`pl-3 ${active === 8 ? "text-[red]" : ""} 800px:block hidden`}>Log out</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
