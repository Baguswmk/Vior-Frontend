import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllCategory from "../../components/Admin/Category";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../../redux/actions/category";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={5} />
          </div>
          <AllCategory />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
