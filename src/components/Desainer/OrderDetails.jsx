/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateStatus } from "../../redux/actions/order";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (user && user._id) {
      dispatch(getAllOrders(user._id));
    }
  }, [dispatch, user]);

  const data = orders && orders.find((item) => item._id === id);
  const orderUpdateHandler = async (id) => {
    try {
      setLoading(true);
     await dispatch(updateStatus(id, status));
    } catch (error) {
      toast.error(error);
    }
  };

  const refundOrderUpdateHandler = async () => {
    await axios
      .put(`${server}/order/order-refund-success/${id}`, {
        status,
      })
      .then(() => {
        toast.success("Order updated!");
        dispatch(getAllOrders(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const formatPrice = (price) => `${price.toLocaleString()}`;

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px]  font-[600] !h-[45px] text-[18px]`}>Order List</div>
        </Link>
        {/* text-[#e94560] */}
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data._id.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data.createdAt.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data.cart.map((item, index) => (
          <div key={index} className="w-full flex items-start mb-5">
            <img loading="lazy" src={`${item.images[0].url}`} alt="" className="w-[80x] h-[80px]" />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                Rp. {formatPrice(item.price)} x {item.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>Rp. {data.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />

      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {data.status !== "Processing refund" && data.status !== "Refund Success" && (
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-[200px] mt-2 border h-[35px] rounded-[5px]">
          {["Processing", "Transferred to delivery partner", "Shipping", "Received", "On the way", "Delivered"]
            .slice(["Processing", "Transferred to delivery partner", "Shipping", "Received", "On the way", "Delivered"].indexOf(data.status))
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      )}
      {data.status === "Processing refund" || data.status === "Refund Success" ? (
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-[200px] mt-2 border h-[35px] rounded-[5px]">
          {["Processing refund", "Refund Success"].slice(["Processing refund", "Refund Success"].indexOf(data.status)).map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
      ) : null}

      <div className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px]  font-[600] !h-[45px] text-[18px]`} onClick={data.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}>
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
