import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";
import { IoIosArrowBack } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DesainerInfo = ({ isOwner }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/user/user-info/${id}`)
      .then((res) => {
        setData(res.data.user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  useEffect(() => {
    if (id) {
      axios
        .get(`${server}/product/get-all-products-designer/${id}`)
        .then((res) => {
          setProducts(res.data.products);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data, id]);

  const logoutHandler = async () => {
    axios.get(`${server}/user/logout`);
    window.location.reload();
  };
  const totalReviewsLength = Array.isArray(products) ? products.reduce((acc, product) => acc + product.reviews.length, 0) : 0;
  const totalRatings = Array.isArray(products) ? products.reduce((acc, product) => acc + product.reviews.reduce((sum, review) => sum + review.rating, 0), 0) : 0;
  const averageRating = (totalRatings / totalReviewsLength || 0).toFixed(2);

  const handleBack = () => {
    window.history.back();
  };
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[90vh]" />
      ) : (
        <div className="800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm  800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
          <button className="w-20 flex flex-row items-center font-bold m-4" onClick={handleBack}>
            <IoIosArrowBack />
            Back
          </button>

          <div className="overflow-hidden">
            <div className="w-full py-5 ">
              <div className="w-full flex item-center justify-center">
                <img loading="lazy" src={`${data.avatar.url}`} alt="" className="w-[150px] h-[150px] object-cover rounded-full" />
              </div>
              <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
              <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">{data.description}</p>
            </div>
            {/* <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data.address}</h4>
          </div> */}
            {/* <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
          </div> */}
            <div className="p-3">
              <h5 className="font-[600]">Total Products</h5>
              <h4 className="text-[#000000a6]">{products && products.length}</h4>
            </div>
            <div className="p-3">
              <h5 className="font-[600]">Desainer Ratings</h5>
              <h4 className="text-[#000000b0]">{averageRating}/5</h4>
            </div>
            <div className="p-3">
              <h5 className="font-[600]">Joined On</h5>
              <h4 className="text-[#000000b0]">{data.createdAt.slice(0, 10)}</h4>
            </div>
            {isOwner && (
              <div className="py-3 px-4">
                <Link to="/settings">
                  <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                    <span>Edit Desainer</span>
                  </div>
                </Link>
                <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`} onClick={logoutHandler}>
                  <span>Log Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DesainerInfo;
