import React from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps";
const OrderSuccessPage = () => {
  return (
    <div className="w-full min-h-screen  bg-[#f6f9fc]">
      <Header activeHeading={9} />

      <div className="w-full flex pt-28  gap-10 flex-col h-[70vh]">
        <CheckoutSteps active={3} />
        <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">Your order is successful 😍</h5>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
