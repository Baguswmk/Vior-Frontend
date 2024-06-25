import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductById } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import Viewer from "../3DModel/Viewer/Viewer";
import BaseScene from "../3DModel/Models/BaseScene";
import BaseCharacter from "../3DModel/Models/BaseCharacter";
import { Sky } from "@react-three/drei";
import Loading from "../Layout/Loading";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [dataDesainer, setDataDesainer] = useState({});
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (data && data._id) {
      const fetchData = async () => {
        try {
          dispatch(getProductById(data._id));

          const { data: productData } = await axios.get(`${server}/product/get-product-details/${data._id}`);
          setDataDesainer(productData.product.creator);
          if (wishlist && wishlist.find((i) => i._id === data._id)) {
            setClick(true);
          } else {
            setClick(false);
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchData();
    }
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [data, dispatch, wishlist, modalIsOpen]);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => count > 1 && setCount(count - 1);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else if (data.stock < 1) {
      toast.error("Product stock limited!");
    } else {
      const cartData = { ...data, qty: count };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  let totalReviewsLength = 0;

  data.reviews?.forEach(() => {
    totalReviewsLength++;
  });

  const totalRatings = data.reviews?.reduce((sum, review) => sum + review.rating, 0);

  const averageRating = (totalRatings / totalReviewsLength || 0).toFixed(2);

  // const handleMessageSubmit = async () => {
  //   if (isAuthenticated) {
  //     const groupTitle = data._id + user._id;
  //     const userId = user._id;
  //     const desainerId = data.creator._id;
  //     try {
  //       const res = await axios.post(`${server}/conversation/create-new-conversation`, {
  //         groupTitle,
  //         userId,
  //         desainerId,
  //       });
  //       navigate(`/message?${res.data.conversation._id}`);
  //     } catch (error) {
  //       toast.error(error.response.data.message);
  //     }
  //   } else {
  //     toast.error("Please login to create a conversation");
  //   }
  // };

  if (!data) {
    return <Loading />;
  }
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <div className="w-full flex mb-4">
                  <div className="max-w-[100%] border px-4 flex gap-5 ">
                    {data.images.map((i, index) => (
                      <div key={index} className="cursor-pointer">
                        <img src={i.url} alt="" className="h-[250px] mx-auto overflow-hidden my-3 flex items-center jusitfy-center" onClick={() => setSelect(index)} />
                      </div>
                    ))}
                  </div>
                </div>
                <img loading="lazy" src={data.images[select].url} alt="" className="w-[80%]" />
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={styles.productTitle}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3 flex-col">
                  <h3 className={`${styles.price}`}>{formatPrice(data.price)}</h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button className="bg-gradient-to-r from-teal-400 to-teal-500 font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out" onClick={decrementCount}>
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">{count}</span>
                    <button className="bg-gradient-to-r from-teal-400 to-teal-500 font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out" onClick={incrementCount}>
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart size={30} className="cursor-pointer" onClick={() => removeFromWishlistHandler(data)} color={click ? "red" : "#333"} title="Remove from wishlist" />
                    ) : (
                      <AiOutlineHeart size={30} className="cursor-pointer" onClick={() => addToWishlistHandler(data)} color={click ? "red" : "#333"} title="Add to wishlist" />
                    )}
                  </div>
                </div>
                {data.models3d && data.models3d.length > 0 && data.models3d[0].url && isAuthenticated && (
                  <div className={`${styles.button} max-w-52 mt-6 rounded-[4px] h-11 flex items-center`} onClick={openModal}>
                    <span className="flex items-center">View 3D Model</span>
                  </div>
                )}
                <div className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`} onClick={() => addToCartHandler(data._id)}>
                  <span className="flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center pt-8 cursor-pointer">
                  <Link to={`/desainer/preview/${data.creator._id}`}>
                    <img loading="lazy" src={data.creator.avatar.url} alt="" className="w-[50px] h-[50px] rounded-full mr-2 border-gray-500 border" />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/desainer/preview/${data.creator._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>{data.creator.name}</h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">({averageRating}/5) Ratings product</h5>
                  </div>
                  {/* <div className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`} onClick={handleMessageSubmit}>
                    <span className="flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={dataDesainer} products={data} totalReviewsLength={totalReviewsLength} averageRating={averageRating} />
          <br />
          <br />
        </div>
      ) : null}
      {modalIsOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={closeModal}></div>
          <div className="relative bg-white w-11/12 h-screen rounded-lg overflow-hidden ">
            <BaseScene>
              <Viewer model={{ url: "https://vior-backend.vercel.app" + data.models3d[0].url }} args={[0.5, 1, 0.5]} scale={1} position={[2, 0.2, 0]} />
              <BaseCharacter controls position={[2, 1, 3]} args={[0.8]} color="yellow" />
              <Sky />
            </BaseScene>
            <button onClick={closeModal} className="z-[10000] absolute top-0 right-0 m-2 text-red-600 p-2 rounded-full bg-white">
              <AiOutlineClose />
            </button>
            <div className="absolute top-2 right-2 text-white text-sm">
              <p className="mb-1">Kontrol:</p>
              <ul>
                <li>W: Maju</li>
                <li>S: Mundur</li>
                <li>A: Ke kiri</li>
                <li>D: Ke kanan</li>
                <li>Spasi: Loncat</li>
                <li>Mouse: Pergerakan kamera</li>
                <li>Esc: Keluar</li>
                <li>Close atau X: Menutup</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const formatPrice = (price) => {
  return `Rp. ${price.toLocaleString("id-ID", { style: "currency", currency: "IDR" }).replace("Rp", "").trim()}`;
};

const ProductDetailsInfo = ({ data, products, totalReviewsLength, averageRating }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5 className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]" onClick={() => setActive(1)}>
            Product Details
          </h5>
          {active === 1 && <div className={styles.active_indicator} />}
        </div>
        <div className="relative">
          <h5 className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]" onClick={() => setActive(2)}>
            Product Reviews
          </h5>
          {active === 2 && <div className={styles.active_indicator} />}
        </div>
        <div className="relative">
          <h5 className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]" onClick={() => setActive(3)}>
            Desainer Information
          </h5>
          {active === 3 && <div className={styles.active_indicator} />}
        </div>
      </div>
      {active === 1 && <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">{products.description}</p>}
      {active === 2 && (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data.reviews && data.reviews.length > 0 ? (
            data.reviews.map((item, index) => (
              <div key={index} className="w-full flex my-2">
                <img loading="lazy" src={item.user.avatar.url} alt="" className="w-[50px] h-[50px] rounded-full border-gray-500 border " />
                <div className="pl-2">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <h5>No Reviews for this product!</h5>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5 items-center">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/desainer/preview/${data._id}`}>
              <div className="flex items-center ">
                <img loading="lazy" src={data.avatar?.url} className="w-[50px] h-[50px] rounded-full border-gray-500 border " alt="" />
                <div className="pl-3">
                  <h3 className={styles.shop_name}>{data.name}</h3>
                  <h5 className="pb-2 text-[15px]">({averageRating}/5) Ratings product</h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{products.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">{data.createdAt?.slice(0, 10)}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products: <span className="font-[500]">{products.length || 0}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews Product: <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to={`/desainer/preview/${data._id}`}>
                <div className={`${styles.button} !rounded-[4px] items-center mt-3`}>
                  <h4>Visit Desainer</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
