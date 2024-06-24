import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Layout/Header";
import Loader from "../../components/Layout/Loading";
import ProductCard from "../../components/Route/Product/ProductCard/ProductCard";
import styles from "../../styles/styles";
import Footer from "../../components/Layout/Footer";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, [allProducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data.map((product, index) => (
                <ProductCard data={product} key={index} />
              ))}
            </div>
            {data.length === 0 && <h1 className="text-center w-full pb-[100px] text-[20px]">Product not found!</h1>}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
