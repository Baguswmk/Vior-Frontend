import { categoriesData } from "../../static/data";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import logo from "../../Assests/images/logo/blackLogo.webp";
import logoW from "../../Assests/images/logo/fullLogo.webp";
import logoM from "../../Assests/images/logo/whiteLogo.webp";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = allProducts && allProducts.filter((product) => product.name.toLowerCase().includes(term.toLowerCase()));
    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px]  800px:my-[20px] 800px:flex items-center justify-between">
          <Link to="/" className=" ">
            <div className="flex lg:flex-row items-center space-x-2 cursor-pointer">
              <img loading="lazy" src={logo} alt="Logo" className="h-10 w-10" />
              <div className="flex md:hidden lg:flex w-[2px] rounded-xl h-12 mx-2  bg-[#FFDE59]"></div>
              <div className="flex sm:flex-col md:hidden lg:flex lg:flex-col items-center">
                <span className="font-semibold text-xl hidden md:flex">VIOR</span>
                <span className="hidden md:flex md:text-center">DESAIN INTERIOR</span>
              </div>
            </div>
          </Link>

          {/* search box */}
          <div className="relative xl:w-[500px] xl:-ml-[150px] lg:w-[500px] lg:-ml-[100px] lg:-mr-32 md:w-[400px]  md:-mr-[100px]">
            <AiOutlineSearch size={30} className="absolute right-2 top-1.5 cursor-pointer" />
            <input type="text" placeholder="Search Product..." value={searchTerm} onChange={handleSearchChange} className="h-[40px] w-full  px-2 border-[#323334] border-[2px] rounded-md" />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i) => {
                    return (
                      <Link to={`/product/${i._id}`} key={i._id}>
                        <div className="w-full flex items-start-py-3">
                          <img loading="lazy" src={`${i.images[0].url}`} alt="" className="w-[40px] h-[40px] mr-[10px]" />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          {/* Icons */}
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]" onClick={() => setOpenWishlist(true)}>
                <AiOutlineHeart size={30} color="rgb(0 0 0/ 70%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#F2994A] w-4 h-4  p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">{wishlist && wishlist.length}</span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]" onClick={() => setOpenCart(true)}>
                <AiOutlineShoppingCart size={30} color="rgb(0 0 0/70%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#F2994A] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">{cart && cart.length}</span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img loading="lazy" src={`${user.avatar.url}`} className="w-[35px] h-[35px] rounded-full" alt="" />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(0 0 0/ 70%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
          </div>
        </div>
      </div>

      {/* NavbarBawah */}
      <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex items-center w-full bg-[#323334] h-[70px]`}>
        <div className={`w-11/12 flex items-center justify-center  mx-auto`}>
          {/* Logo */}

          <div className={` ${active === true ? "flex items-end" : "hidden"} `}>
            <Link to="/" className=" ">
              <div className="flex lg:flex-row items-center space-x-2 cursor-pointer">
                <img loading="lazy" src={logoM} alt="Logo" className="w-12" />
              </div>
            </Link>
          </div>
          {/* navitems */}
          <div className={`${styles.normalFlex} w-full justify-center`}>
            <Navbar active={activeHeading} />
            {/* categories */}
            <div className="mx-4" onClick={() => setDropDown(!dropDown)}>
              <div className="relative h-[60px] w-[140px] -ml-8 hidden 1000px:block">
                <button className={`h-[100%] w-[80%] items-center text-white font-sans text-lg font-[500] select-none`}>Categories</button>
                <IoIosArrowDown size={20} className="absolute right-2 top-5 cursor-pointer text-white" onClick={() => setDropDown(!dropDown)} />
                {dropDown ? <DropDown categoriesData={categoriesData} setDropDown={setDropDown} /> : null}
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className={` ${active === true ? "flex items-end md:w-48 " : "hidden"} `}>
            <div className="relative cursor-pointer mr-[10px]" onClick={() => setOpenWishlist(true)}>
              <AiOutlineHeart size={30} color="rgb(255 255 255/ 90%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#F2994A] w-4 h-4  p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">{wishlist && wishlist.length}</span>
            </div>
            <div className="relative cursor-pointer mr-[10px]" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} color="rgb(255 255 255/90%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#F2994A] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">{cart && cart.length}</span>
            </div>
            <div className="relative cursor-pointer mr-[10px]">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img loading="lazy" src={`${user.avatar.url}`} className="w-[35px] h-[35px] rounded-full" alt="" />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} color="rgb(255 255 255/ 90%)" />
                </Link>
              )}
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null}
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm md:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft size={40} className="ml-4" onClick={() => setOpen(true)} />
          </div>
          <div className="my-2">
            <Link to="/">
              <div className="flex lg:flex-row items-center space-x-2 cursor-pointer">
                <img loading="lazy" src={logoW} alt="Logo" className="h-12 w-36" />
              </div>
            </Link>
          </div>

          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          <div className="flex items-center gap-3 mr-4">
            <div>
              <div className="relative " onClick={() => setOpenCart(true)}>
                <AiOutlineShoppingCart size={30} color="rgb(0 0 0/ 70%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#F2994A] w-4 h-4   p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">{cart && cart.length}</span>
              </div>
            </div>
            {isAuthenticated ? (
              <div>
                <Link to="/profile">
                  <img loading="lazy" src={`${user.avatar.url}`} alt="" className="w-[35px] h-[35px] rounded-full border-[2px] border-[#323334]" />
                </Link>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-[18px] pr-[10px] text-[#000000b7]">
                  Login /
                </Link>
                <Link to="/sign-up" className="text-[18px] text-[#000000b7]">
                  Sign up
                </Link>
              </>
            )}
          </div>
          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]" onClick={() => setOpenWishlist(true) || setOpen(false)}>
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#F2994A] w-4 h-4   p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">{wishlist && wishlist.length}</span>
                  </div>
                </div>
                <RxCross1 size={30} className="ml-4 mt-5" onClick={() => setOpen(false)} />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input type="search" placeholder="Search Product..." className="h-[40px] w-full px-2 border-[#323334] border-[2px] rounded-md" value={searchTerm} onChange={handleSearchChange} />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i, index) => {
                      const d = i.name;
                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`} key={index}>
                          <div className="flex items-center">
                            <img loading="lazy" src={i.image_Url[0].url} alt="" className="w-[50px] mr-2" />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              {/* categories */}
              <div onClick={() => setDropDown(!dropDown)}>
                <div className="relative h-[60px] w-[180px] hidden 1000px:block">
                  <button className={`h-[100%] w-full items-center text-white font-sans text-lg font-[500] select-none`}>All Categories</button>
                  <IoIosArrowDown size={20} className="absolute right-2 top-5 cursor-pointer text-white" onClick={() => setDropDown(!dropDown)} />
                  {dropDown ? <DropDown categoriesData={categoriesData} setDropDown={setDropDown} /> : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
