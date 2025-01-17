import { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const formatPrice = (price) => {
  return `Rp. ${price.toLocaleString("id-ID", { style: "currency", currency: "IDR" }).replace("Rp", "").trim()}`;
};

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const navigate = useNavigate();

  const paymentSubmit = () => {
    if (address1 === "" || address2 === "" || zipCode === null || country === "" || city === "") {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };
      const updatedCart = cart.map(item => {
        return {
          ...item,
          productId: item._id 
        };
      });
      
      const orderData = {
        cart: updatedCart,
        totalPrice,
        subTotalPrice,
        tax,
        shippingAddress,
        user,
      };

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  const tax = subTotalPrice * 0.1;

  const totalPrice = subTotalPrice + tax;

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData totalPrice={totalPrice} tax={tax} subTotalPrice={subTotalPrice} />
        </div>
      </div>
      <div className={`${styles.button} w-[150px] 800px:w-[280px] mt-10 text-white cursor-pointer hover:text-black`} onClick={paymentSubmit}>
        <h5>Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({ user, country, setCountry, city, setCity, userInfo, setUserInfo, address1, setAddress1, address2, setAddress2, zipCode, setZipCode }) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input type="text" value={user && user.name} required className={`${styles.input} !w-[95%]`} />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input type="email" value={user && user.email} required className={`${styles.input}`} />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input type="number" required value={user && user.phoneNumber} className={`${styles.input} !w-[95%]`} />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required className={`${styles.input}`} />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select className="w-[95%] border h-[40px] rounded-[5px]" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select className="w-[95%] border h-[40px] rounded-[5px]" value={city} onChange={(e) => setCity(e.target.value)}>
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input type="address" required value={address1} onChange={(e) => setAddress1(e.target.value)} className={`${styles.input} !w-[95%]`} />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input type="address" value={address2} onChange={(e) => setAddress2(e.target.value)} required className={`${styles.input}`} />
          </div>
        </div>

        <div></div>
      </form>
      <button className="text-[18px] cursor-pointer inline-block" onClick={() => setUserInfo(!userInfo)}>
        Choose From saved address
      </button>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div key={index} className="w-full flex mt-1">
                <input type="checkbox" className="mr-3" value={item.addressType} onClick={() => setAddress1(item.address1) || setAddress2(item.address2) || setZipCode(item.zipCode) || setCountry(item.country) || setCity(item.city)} />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({ totalPrice, tax, subTotalPrice }) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal Price :</h3>
        <h5 className="text-[18px] font-[600]">{formatPrice(subTotalPrice)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b border-[#1d1a1ab4] pb-2">
        <h3 className="text-[16px] font-[400] text-[#000000a4] ">Tax :</h3>
        <h5 className="text-[18px] font-[600]">{formatPrice(tax)}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4] ">Total Price :</h3>
        <h5 className="text-[18px] font-[600]  ">{formatPrice(totalPrice)}</h5>
      </div>
    </div>
  );
};

export default Checkout;
