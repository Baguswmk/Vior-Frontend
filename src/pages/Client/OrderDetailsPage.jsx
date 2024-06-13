import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import UserOrderDetails from "../../components/Profile/UserOrderDetails";

const OrderDetailsPage = () => {
  return (
    <div>
      <Header activeHeading={9} />
      <UserOrderDetails />
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
