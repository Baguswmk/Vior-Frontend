import DashboardHeader from '../../components/Desainer/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Desainer/Layout/DashboardSideBar'
import AllRefundOrders from "../../components/Desainer/AllRefundOrders";

const DesainerAllRefunds = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
           <AllRefundOrders />
        </div>
      </div>
</div>
  )
}

export default DesainerAllRefunds