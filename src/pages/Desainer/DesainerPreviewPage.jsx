import styles from "../../styles/styles";
import DesainerInfo from "../../components/Desainer/DesainerInfo";
import DesainerProfile from "../../components/Desainer/DesainerProfile";

const DesainerPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5] flex flex-col`}>
      <div className="w-full 800px:flex  justify-between">
        <DesainerInfo isOwner={false} />

        <div className="800px:w-[72%] mt-5 800px:mt-['unset'] rounded-[4px]">
          <DesainerProfile isOwner={false} />
        </div>
      </div>
    </div>
  );
};

export default DesainerPreviewPage;
