import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ImageCarousel({ data }) {
  const [select, setSelect] = useState(0);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const nextImage = () => {
    setSelect((select + 1) % data.images.length);
  };

  const prevImage = () => {
    setSelect((select - 1 + data.images.length) % data.images.length);
  };

  return (
    <div className="max-w-[100%]">
      <Carousel additionalTransfrom={0} arrows={true} centerMode={false} draggable={false} infinite responsive={responsive} showDots={false} selectedIndex={select}>
        {data.images.map((image, index) => (
          <div key={index} className="cursor-pointer" onClick={() => setSelect(index)}>
            <img src={image.url} alt={`Image ${index}`} className={`h-[250px] overflow-hidden px-2 flex items-center justify-center ${index === select ? "opacity-100" : "opacity-50 hover:opacity-100"}`} />
          </div>
        ))}
      </Carousel>

      <img loading="lazy" src={data.images[select].url} alt={`Selected Image ${select}`} className="w-[80%] mx-auto block mt-4 mb-2" />
    </div>
  );
}

export default ImageCarousel;
