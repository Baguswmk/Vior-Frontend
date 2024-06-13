import DashboardHeader from '../../components/Desainer/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Desainer/Layout/DashboardSideBar'
import AllProducts from "../../components/Desainer/AllProducts";

const DesainerAllProducts = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={3} />
            </div>
            <div className="w-full justify-center flex">
                <AllProducts />
            </div>
          </div>
    </div>
  )
}

export default DesainerAllProducts