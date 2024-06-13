import DashboardHeader from '../../components/Desainer/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Desainer/Layout/DashboardSideBar'
import AllCoupons from "../../components/Desainer/AllCoupons";

const DesainerAllCoupouns = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={9} />
            </div>
            <div className="w-full justify-center flex">
                <AllCoupons />
            </div>
          </div>
    </div>
  )
}

export default DesainerAllCoupouns