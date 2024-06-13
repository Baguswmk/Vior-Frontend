import styles from '../../styles/styles'
import DesainerInfo from "../../components/Desainer/DesainerInfo";
import DesainerProfile from "../../components/Desainer/DesainerProfile";

const DesainerHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
         <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
            <DesainerInfo isOwner={true} />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <DesainerProfile isOwner={true} />
          </div>
         </div>
    </div>
  )
}

export default DesainerHomePage