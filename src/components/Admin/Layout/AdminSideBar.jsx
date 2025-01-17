import { FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4 mt-4">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard size={30} color={`${active === 1 ? "crimson" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 1 ? "text-[crimson]" : "text-[#555]"}`}>Dashboard</h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-orders" className="w-full flex items-center">
          <FiShoppingBag size={30} color={`${active === 2 ? "crimson" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 2 ? "text-[crimson]" : "text-[#555]"}`}>Orders</h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-users" className="w-full flex items-center">
          <HiOutlineUserGroup size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 3 ? "text-[crimson]" : "text-[#555]"}`}>Users</h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-products" className="w-full flex items-center">
          <BsHandbag size={30} color={`${active === 4 ? "crimson" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 4 ? "text-[crimson]" : "text-[#555]"}`}>Products</h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-category" className="w-full flex items-center">
          <BiCategory size={30} color={`${active === 5 ? "crimson" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 5 ? "text-[crimson]" : "text-[#555]"}`}>Category</h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-withdraw-request" className="w-full flex items-center">
          <CiMoneyBill size={30} color={`${active === 6 ? "crimson" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 6 ? "text-[crimson]" : "text-[#555]"}`}>Withdraw Request</h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/profile" className="w-full flex items-center">
          <AiOutlineSetting size={30} color={`${active === 7 ? "crimson" : "#555"}`} />
          <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 7 ? "text-[crimson]" : "text-[#555]"}`}>Settings</h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
