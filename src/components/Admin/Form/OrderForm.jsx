import { useState, useEffect } from "react";
import styles from "../../../styles/styles";

const OrderForm = ({ onSubmit, initialData }) => {
  const [cart, setCart] = useState(initialData.cart || []);
  const [shippingAddress, setShippingAddress] = useState(initialData.shippingAddress || {});
  const [user, setUser] = useState(initialData.user || {});
  const [totalPrice, setTotalPrice] = useState(initialData.totalPrice || 0);
  const [status, setStatus] = useState(initialData.status || "Processing");

  useEffect(() => {
    if (initialData.cart !== undefined) {
      setCart(initialData.cart);
    }
    if (initialData.shippingAddress !== undefined) {
      setShippingAddress(initialData.shippingAddress);
    }
    if (initialData.user !== undefined) {
      setUser(initialData.user);
    }
    if (initialData.totalPrice !== undefined) {
      setTotalPrice(initialData.totalPrice);
    }
    if (initialData.status !== undefined) {
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cart, shippingAddress, user, totalPrice, status });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea placeholder="Cart" value={JSON.stringify(cart, null, 2)} onChange={(e) => setCart(JSON.parse(e.target.value))} className="border p-2 rounded" required />
      <textarea placeholder="Shipping Address" value={JSON.stringify(shippingAddress, null, 2)} onChange={(e) => setShippingAddress(JSON.parse(e.target.value))} className="border p-2 rounded" required />
      <textarea placeholder="User" value={JSON.stringify(user, null, 2)} onChange={(e) => setUser(JSON.parse(e.target.value))} className="border p-2 rounded" required />
      <input type="number" placeholder="Total Price" value={totalPrice} onChange={(e) => setTotalPrice(parseFloat(e.target.value))} className="border p-2 rounded" required />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded">
        <option value="Processing">Processing</option>
        <option value="Delivered">Delivered</option>
      </select>
      <button type="submit" className={`${styles.button} text-[18px] !h-[42px] mt-4`}>
        {initialData.id ? "Update Order" : "Create Order"}
      </button>
    </form>
  );
};



export default OrderForm;
