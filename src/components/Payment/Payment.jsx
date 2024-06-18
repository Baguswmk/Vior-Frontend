import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import CheckoutSteps from "../Checkout/CheckoutSteps";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/cart";
const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [orderData, setOrderData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, [dispatch]);

  const handleCreateOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(`${server}/order/create-order`, orderData, config);

      if (data.success === false && data.message === "You already have an order that is being processed.") {
        dispatch(removeFromCart(cart));
        toast.error(data.message);
        if (data.orderId) {
          navigate(`/user/order/${data.orderId}`);
        }
        return data.orderId;
      }

      return data.orders[0]._id;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const { message, orderId } = error.response.data;
        toast.error(message);
        if (orderId) {
          navigate(`/user/order/${orderId}`);
        }
      } else {
        toast.error(error.message || "An error occurred while creating the order.");
        console.error(error);
      }
    }
  };

  const createMidtransTransaction = async () => {
    try {
      const orderId = await handleCreateOrder();
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
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo createMidtransTransaction={createMidtransTransaction} />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData />
        </div>
      </div>
    </div>
  );
};

const formatPrice = (price) => {
  return `Rp. ${price.toLocaleString("id-ID", { style: "currency", currency: "IDR" }).replace("Rp", "").trim()}`;
};

const PaymentInfo = ({ createMidtransTransaction }) => {
  const orderData = JSON.parse(localStorage.getItem("latestOrder"));
  const navigate = useNavigate();

  const handlePreview = (item) => {
    navigate(`/product/${item._id}`);
  };

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex w-full pb-5 border-b mb-2">
        <h4 className="text-[18px] font-[600] text-[#000000b1]">Pay with Midtrans Snap</h4>
      </div>
      <div className="justify-center w-full flex flex-col">
        <h3 className="text-[22px] font-[600] text-center mb-4">Cart Items:</h3>
        <div className="flex gap-5 flex-wrap w-full items-center justify-center mb-5">
          {orderData.cart.map((item, index) => (
            <div key={index} className="p-4 rounded-md shadow-md w-[300px] cursor-pointer hover:shadow-2xl" onClick={() => handlePreview(item)}>
              {item.images.length > 0 && <img loading="lazy" src={item.images[0].url} alt={item.name} className="w-full h-auto mt-2" />}
              <p className="text-[16px] font-[500] mb-2">Item {index + 1}</p>
              <p className="text-[14px] font-[400]">Name Product: {item.name}</p>
              <p className="text-[14px] font-[400]">Price: {formatPrice(item.price)}</p>
              <p className="text-[14px] font-[400]">Quantity: {item.qty}</p>
              <p className="text-[14px] font-[400]">Creator Name: {item.creator.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <button className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600] mb-2`} onClick={createMidtransTransaction}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

const CartData = () => {
  const { cart } = useSelector((state) => state.cart);
  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  const tax = subTotalPrice * 0.1;

  const totalPriceWithTax = subTotalPrice + tax;

  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">{formatPrice(subTotalPrice)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Tax (10%):</h3>
        <h5 className="text-[18px] font-[600]">{formatPrice(tax)}</h5>
      </div>
      <br />
      <div className="flex justify-between pb-3">
        <h3 className="text-[18px] font-[600]  text-[#000000a4]">Total:</h3>
        <h5 className="text-[18px] font-[600] text-end ">{formatPrice(totalPriceWithTax)}</h5>
      </div>
      <br />
    </div>
  );
};

export default Payment;
