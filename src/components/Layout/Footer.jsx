import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { Link } from "react-router-dom";
import { footerCompanyLinks, footerProductLinks, footerSupportLinks } from "../../static/data";
import logoW from "../../Assests/images/logo/whiteLogo.svg";
const Footer = () => {
  return (
    <div className="bg-[#323334] text-white">
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img src={logoW} alt="Logo" style={{ filter: "brightness(0) invert(1)", width: "300px", height: "100px" }} />
          <br />
          <p>Transforming Spaces, Inspiring Lives: Your Ultimate Interior Design Destination</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter size={25} style={{ marginLeft: "15px", cursor: "pointer" }} />
            <AiFillInstagram size={25} style={{ marginLeft: "15px", cursor: "pointer" }} />
            <AiFillYoutube size={25} style={{ marginLeft: "15px", cursor: "pointer" }} />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Menu</h1>
          {footerCompanyLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Category</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center pt-2 text-gray-400 text-sm pb-8 bg-[#222222]">
        <span>
          © 2024 <span className="text-[#F2C94C]">Vior</span>. All rights reserved.
        </span>
        <span>Terms · Privacy Policy</span>
      </div>
    </div>
  );
};

export default Footer;
