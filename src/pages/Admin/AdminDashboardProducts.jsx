import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllProducts from "../../components/Admin/Products";

const AdminDashboardProducts = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={4} />
          </div>
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProducts;
