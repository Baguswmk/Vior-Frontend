import { useSelector } from "react-redux";
import styles from "../../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const TopProduct = () => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <div className="mt-12">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Top Products</h1>
        </div>

        {allProducts && allProducts.length !== 0 ? (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {allProducts.map((product, index) => (
              <ProductCard data={product} key={index} />
            ))}
          </div>
        ) : (
          <p className="text-center w-full h-56 flex items-center align-middle text-gray-500 justify-center ">Product not found</p>
        )}
      </div>
    </div>
  );
};

export default TopProduct;
