import Footer from "../../components/Layout/Footer";
import DesainerSettings from "../../components/Desainer/DesainerSettings";
import DashboardHeader from "../../components/Desainer/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Desainer/Layout/DashboardSideBar";

const DesainerSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <DesainerSettings />
      </div>
      <Footer />
    </div>
  );
};

export default DesainerSettingsPage;
