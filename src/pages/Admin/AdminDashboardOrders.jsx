import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllOrders from "../../components/Admin/Orders";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOrdersAdmin } from "../../redux/actions/order";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
  }, [dispatch]);

  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
