import DashboardHeader from "../../components/Desainer/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Desainer/Layout/DashboardSideBar";
import DashboardHero from "../../components/Desainer/DashboardHero";

const DesainerDashboardPage = () => {
  return (
        <div>
          <DashboardHeader />
          <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={1} />
            </div>
            <DashboardHero />
          </div>
        </div>
  );
};

export default DesainerDashboardPage;
