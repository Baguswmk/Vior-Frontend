import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import bg from "../../../Assests/images/bg.webp";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover bg-center ${styles.normalFlex}`}
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1 className={`w-full md:w-[75%] lg:w-[50%] text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>Explore Our Exquisite Collection of Interior Designs</h1>
        <p className="w-full md:w-[90%] lg:w-[65%] pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Elevate your space with our innovative VR interior designs. From modern minimalism to timeless elegance, discover the perfect ambiance for your home. Let your imagination soar as you immerse yourself in our stunning collection.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="font-[Poppins] text-[18px] h">Shop Now</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
