import DashboardHeader from "../../components/Desainer/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Desainer/Layout/DashboardSideBar";
import AllOrders from "../../components/Desainer/AllOrders";

const DesainerAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <AllOrders/>
        </div>
      </div>
    </div>
  );
};

export default DesainerAllOrders;
