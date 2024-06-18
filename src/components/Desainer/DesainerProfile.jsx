import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import ProductCard from "../Route/Product/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import axios from "axios";
import { server } from "../../server";
import Loading from "../Layout/Loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DesainerProfile = ({ isOwner }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (id) {
      axios
        .get(`${server}/product/get-all-products-designer/${id}`)
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  const allReviews = [];
  if (Array.isArray(products)) {
    products.forEach((product) => {
      allReviews.push(...product.reviews);
    });
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5 className={`font-[600] text-[20px] ${active === 1 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-[20px]`}>{"Shop Products" || <Skeleton />}</h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5 className={`font-[600] text-[20px] ${active === 2 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-[20px]`}>Shop Reviews</h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span>Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />
      {active === 1 &&
        (isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {Array.isArray(products) && products.map((i, index) => <ProductCard data={i} key={index} isShop={true} />)}
          </div>
        ))}

      {active === 2 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4" key={index}>
                <img src={`${item.user.avatar.url}`} className="w-[50px] h-[50px] rounded-full" alt="" />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">{item.comment}</p>
                  <p className="text-[#000000a7] text-[14px]">{"2days ago"}</p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && <h5 className="w-full text-center py-5 text-[18px]">No Reviews have for this shop!</h5>}
        </div>
      )}
    </div>
  );
};

export default DesainerProfile;
