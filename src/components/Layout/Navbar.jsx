import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={index}>
            <Link to={i.url} className={`${active === index + 1 ? "text-[#FFD700]" : "text-black md:text-white "} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}>
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
