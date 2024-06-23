import Header from "../../components/Layout/Header";
import Hero from "../../components/Route/Hero/Hero";
import Categories from "../../components/Route/Categories/Categories";
import BestDeals from "../../components/Route/BestDeals/BestDeals";
import TopProduct from "../../components/Route/Product/TopProduct/TopProduct";

import Footer from "../../components/Layout/Footer";
const HomePage = () => {
  return (
    <>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <TopProduct />
      <Footer />
    </>
  );
};

export default HomePage;
