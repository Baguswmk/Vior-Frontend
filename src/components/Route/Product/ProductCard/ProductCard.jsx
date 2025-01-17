import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { addToWishlist, removeFromWishlist } from "../../../../redux/actions/wishlist";
import { addTocart } from "../../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data._id, wishlist]);

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
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num;
  };

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link to={`${isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
        <img loading="lazy" src={`${data.images && data.images[0]?.url}`} alt="" className="w-full h-[170px] object-contain" />
      </Link>

      <h5 className={`${styles.shop_name}`}>{data.creator.name}</h5>
      <Link to={`${isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
        <h4 className="pb-3 font-[500]">{data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}</h4>
        <div className="flex">
          <Ratings rating={data.ratings} />
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center flex-col">
            <h3 className={`${styles.price}`}>{formatPrice(data.price)}</h3>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">{formatNumber(data.sold_out)} sold</span>
        </div>
      </Link>

      {/* side options */}
      <div>
        {click ? (
          <AiFillHeart size={22} className="cursor-pointer absolute right-2 top-5" onClick={() => removeFromWishlistHandler(data)} color={click ? "red" : "#333"} title="Remove from wishlist" />
        ) : (
          <AiOutlineHeart size={22} className="cursor-pointer absolute right-2 top-5" onClick={() => addToWishlistHandler(data)} color={click ? "red" : "#333"} title="Add to wishlist" />
        )}
        <AiOutlineEye size={22} className="cursor-pointer absolute right-2 top-14" onClick={() => setOpen(!open)} color="#333" title="Quick view" />
        <AiOutlineShoppingCart size={25} className="cursor-pointer absolute right-2 top-24" onClick={() => addToCartHandler(data._id)} color="#444" title="Add to cart" />
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </div>
  );
};

const formatPrice = (price) => {
  return `Rp. ${price.toLocaleString("id-ID", { style: "currency", currency: "IDR" }).replace("Rp", "").trim()}`;
};

export default ProductCard;
