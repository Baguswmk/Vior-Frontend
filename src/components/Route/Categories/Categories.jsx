import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} my-12 bg-white p-6 rounded-lg mb-12`} id="categories">
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-4 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div className="w-full h-[100px] flex items-center justify-evenly bg-gray-50 rounded shadow-md cursor-pointer overflow-hidden" key={i.id} onClick={() => handleSubmit(i)}>
                  <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                  <img loading="lazy" src={i.image_Url} className="w-[120px] object-cover" alt="" />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
