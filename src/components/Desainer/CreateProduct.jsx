import { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineCloseCircle, AiOutlineFile } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import Loading from "../Layout/Loading";

const CreateProduct = () => {
  const { user } = useSelector((state) => state.user);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [models, setModels] = useState([]);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleModelChange = (event) => {
    setModels([...models, ...event.target.files]);
  };

  const handleImageDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleModelDelete = (index) => {
    const newModels = [...models];
    newModels.splice(index, 1);
    setModels(newModels);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("creator", user._id);

    images.forEach((image) => {
      formData.append("images", image);
    });

    models.forEach((model) => {
      formData.append("model", model);
    });

    try {
      await dispatch(createProduct(formData));
      if (success) {
        toast.success("Product created successfully");
        navigate("/dashboard-products");
      } else if (error) {
        toast.error(error);
      }
    } catch (error) {
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-[90%] 800px:w-[80%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
          <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
          <form onSubmit={handleSubmit}>
            <br />
            <div>
              <label className="pb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your product name..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                cols="30"
                required
                rows="8"
                type="text"
                name="description"
                value={description}
                className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your product description..."
              ></textarea>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select className="w-full mt-2 border h-[35px] rounded-[5px]" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Choose a category">Choose a category</option>
                {categoriesData &&
                  categoriesData.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
            </div>

            <br />
            <div>
              <label className="pb-2">Price</label>
              <input
                type="number"
                name="price"
                value={price}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter your product price..."
              />
            </div>

            <br />
            <div>
              <label className="pb-2">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={stock}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter your product stock..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <input type="file" name="" id="uploadImages" className="hidden" multiple onChange={handleImageChange} />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="uploadImages">
                  <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                </label>
                {images &&
                  images.map((image, index) => (
                    <div key={index} className="relative m-2">
                      <img src={image} alt="" className="h-[120px] w-[120px] object-cover m-2" />
                      <button className="absolute top-0 right-0 p-1 bg-red-500 rounded-full" onClick={() => handleImageDelete(index)}>
                        <AiOutlineCloseCircle size={20} color="#fff" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <label className="pb-2">
                Upload 3D Models <span className="text-red-500">*</span>
              </label>
              <input type="file" name="" id="uploadModels" className="hidden" multiple accept=".glb,.gltf" onChange={handleModelChange} />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="uploadModels">
                  <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                </label>
                {models.map((model, index) => (
                  <div key={index} className="relative m-2">
                    <button className="absolute z-10 top-0 right-0 p-1 bg-red-500 rounded-full" onClick={() => handleModelDelete(index)}>
                      <AiOutlineCloseCircle size={20} color="#fff" />
                    </button>
                    <div className="cursor-pointer flex flex-col items-center">
                      <AiOutlineFile size={50} color="#333" />
                      <span>{model.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <div>
                <input
                  type="submit"
                  value="Create"
                  className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {/* {modalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={closeModal}></div>
                  <div className="relative bg-white w-11/12 h-screen rounded-lg overflow-hidden ">
                    <BaseScene>
                      <Viewer model={preview[selectedModelIndex]} args={[0.5, 1, 0.5]} scale={0.2} position={[2, 1, 0]} />
                      <BaseCharacter controls position={[2, 1, 3]} args={[0.8]} color="yellow" />
                      <Sky />
                    </BaseScene>
                    <button onClick={closeModal} className="z-[10000] absolute top-0 right-0 m-2 text-red-600 p-2 rounded-full bg-white">
                      <AiOutlineClose />
                    </button>
                    <div className="absolute top-2 right-2 text-white text-sm">
                      <p className="mb-1">Kontrol:</p>
                      <ul>
                        <li>W: Maju</li>
                        <li>S: Mundur</li>
                        <li>A: Ke kiri</li>
                        <li>D: Ke kanan</li>
                        <li>Spasi: Loncat</li>
                        <li>Mouse: Pergerakan kamera</li>
                        <li>Esc: Keluar</li>
                        <li>Close atau X: Menutup</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
