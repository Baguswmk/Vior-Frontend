import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../redux/actions/product";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import Loader from "../../components/Layout/Loading";
import ProductCard from "../../components/Route/Product/ProductCard/ProductCard";
import styles from "../../styles/styles";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (categoryData === null) {
      setData(allProducts);
    } else {
      const filteredProducts = allProducts?.filter((product) => product.category === categoryData);
      setData(filteredProducts);
    }
  }, [allProducts, categoryData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data?.map((product, index) => (
                <ProductCard data={product} key={index} />
              ))}
            </div>
            {data?.length === 0 && <h1 className="text-center w-full pb-[100px] text-[20px]">No products Found!</h1>}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
