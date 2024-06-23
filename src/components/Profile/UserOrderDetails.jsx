import { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { getAllOrders, getOrderDetails } from "../../redux/actions/order";
import { server } from "../../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import CheckoutSteps from "../Checkout/CheckoutSteps";
import { removeFromCart } from "../../redux/actions/cart";
import { useNavigate } from "react-router-dom";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, [dispatch]);

  const data = orders;
  const reviewHandler = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .put(
        `${server}/product/create-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem._id,
          orderId: id,
        },
        config
      )
      .then((res) => {
        dispatch(getAllOrders(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
        window.location.reload();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const createMidtransTransaction = async () => {
    try {
      const orderId = id;
      if (!orderId) throw new Error("Failed to create order");

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const userDetails = {
        name: user.name,
        email: user.email,
      };

      const PPN_RATE = 0.1;

      const items = orderData.cart.map((item) => {
        const itemPriceWithPPN = item.price * (1 + PPN_RATE);
        return {
          id: item._id,
          price: Math.round(itemPriceWithPPN),
          normalPrice: Math.round(item.price),
          quantity: item.qty,
          nameProduct: item.name,
          creatorName: item.creator,
        };
      });

      const grossAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

      const transactionDetails = {
        order_id: orderId,
        gross_amount: Math.round(grossAmount),
      };

      const transactionData = {
        transaction_details: transactionDetails,
        customer_details: userDetails,
        item_details: items,
      };

      const response = await axios.post(`${server}/payment/create-payment`, transactionData, config);
      const snapToken = response.data.snapToken;
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          handlePaymentSuccess(result);
        },
        onPending: function (result) {
          handlePaymentPending(result);
        },
        onError: function () {
          toast.error("Payment failed!");
        },
        onClose: function () {
          toast.info("You closed the payment popup without completing the payment.");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentSuccess = async (result) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${server}/order/update-order-status`, { orderId: result.order_id, status: "Paid" }, config);
      if (response.data.success) {
        toast.success("Payment success! Order status updated.");
        navigate("/order/success");
        dispatch(removeFromCart(cart));
      } else {
        toast.error("Payment success, but failed to update order status.");
      }
    } catch (error) {
      toast.error("Failed to update order status.");
      console.error(error);
    }
  };

  const handlePaymentPending = async (result) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${server}/order/update-order-status`, { orderId: result.data.order_id, status: "Pending" }, config);

      if (response.data.success) {
        toast.success("Payment Pending, Please wait for the payment to be processed.");
        return <CheckoutSteps active={3} />;
      } else {
        toast.error("Payment Pending, but failed to update order status.");
      }
    } catch (error) {
      toast.error("Failed to update order status.");
      console.error(error);
    }
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      {data &&
        data.cart &&
        data.cart.map((item, index) => {
          return (
            <div key={index} className="w-full flex items-start mb-5">
              <img loading="lazy" src={`${item.images[0].url}`} alt="" className="w-[80x] h-[80px]" />
              <div className="w-full">
                <h5 className="pl-3 text-[20px]">{item.name}</h5>
                <h5 className="pl-3 text-[20px] text-[#00000091]">
                  Rp. {item.price} x {item.qty}
                </h5>
              </div>
              {data.status === "Paid" ? (
                <div className={`${styles.button} text-[#fff]`} onClick={() => setOpen(true) || setSelectedItem(item)}>
                  Write a review
                </div>
              ) : null}
            </div>
          );
        })}

      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1 size={30} onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">Give a Review</h2>
            <br />
            <div className="w-full flex">
              <img loading="lazy" src={`${selectedItem.images[0].url}`} alt="" className="w-[80px] h-[80px]" />
              <div>
                <div className="pl-3 text-[20px]">{selectedItem.name}</div>
                <h4 className="pl-3 text-[20px]">
                  Rp. {selectedItem.price} x {selectedItem.qty}
                </h4>
              </div>
            </div>

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)} />
                ) : (
                  <AiOutlineStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)} />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">(optional)</span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? write your expresion about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div className={`${styles.button}  text-[20px] ml-3`} onClick={rating > 1 ? reviewHandler : null}>
              Submit
            </div>
          </div>
        </div>
      )}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>Rp. {data.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />

      <br />
      <div className="w-full flex items-center justify-center gap-5">
        {/* <Link to="/">
          <div className={`${styles.button} `}>Send Message</div>
        </Link> */}
        {data.status === "Processing" ? (
          <button className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`} onClick={createMidtransTransaction}>
            Pay Now
          </button>
        ) : null}
      </div>
      <br />
    </div>
  );
};

export default UserOrderDetails;
