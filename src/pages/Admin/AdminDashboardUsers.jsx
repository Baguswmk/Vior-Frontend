import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllUsers from "../../components/Admin/Users";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions/user";

const AdminDashboardUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={3} />
          </div>
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
