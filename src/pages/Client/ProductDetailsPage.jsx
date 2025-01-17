import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import ProductDetails from "../../components/Products/ProductDetails";
import SuggestedProduct from "../../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  const data = allProducts && allProducts.find((i) => i._id === id);
  return (
    <div>
      <Header activeHeading={3} />
      <ProductDetails data={data} />
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
