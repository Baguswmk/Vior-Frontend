import DashboardHeader from '../../components/Desainer/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Desainer/Layout/DashboardSideBar'
import CreateProduct from "../../components/Desainer/CreateProduct";

const DesainerCreateProduct = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={5} />
            </div>
            <div className="w-full justify-center flex">
                <CreateProduct />
            </div>
          </div>
    </div>
  )
}

export default DesainerCreateProduct