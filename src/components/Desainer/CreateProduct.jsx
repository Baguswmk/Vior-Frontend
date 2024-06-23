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
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleModelChange = (e) => {
    setModels([...models, ...e.target.files]);
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
        <div className="w-[90%] 800px:w-[80%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
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
                onChange={(e) => setName(e.target.value)}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product name..."
                required
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                cols="30"
                rows="8"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product description..."
                required
              ></textarea>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select className="w-full mt-2 border h-[35px] rounded-[5px]" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose a category</option>
                {categoriesData.map((category) => (
                  <option key={category.title} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <br />
            <div>
              <label className="pb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product price..."
                required
              />
            </div>

            <br />
            <div>
              <label className="pb-2">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product stock..."
                required
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <input type="file" id="uploadImages" className="hidden" multiple onChange={handleImageChange} accept="image/*" />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="uploadImages">
                  <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                </label>
                {images.map((image, index) => (
                  <div key={index} className="relative m-2">
                    <img loading="lazy" src={URL.createObjectURL(image)} alt={`Product Image ${index + 1}`} className="h-[120px] w-[120px] object-cover m-2" />
                    <button className="absolute top-0 right-0 p-1 bg-red-500 rounded-full" onClick={() => handleImageDelete(index)}>
                      <AiOutlineCloseCircle size={20} color="#fff" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <br />
            <div>
              <label className="pb-2">Upload 3D Models</label>
              <input type="file" id="uploadModels" className="hidden" multiple accept=".glb,.gltf,.obj,.dae" onChange={handleModelChange} />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="uploadModels">
                  <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                </label>
                {models.map((model, index) => (
                  <div key={index} className="relative m-2">
                    <div className="cursor-pointer flex flex-col items-center">
                      <AiOutlineFile size={50} color="#333" />
                      <span>{model.name}</span>
                    </div>
                    <button className="absolute z-10 top-0 right-0 p-1 bg-red-500 rounded-full" onClick={() => handleModelDelete(index)}>
                      <AiOutlineCloseCircle size={20} color="#fff" />
                    </button>
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
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
