import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { categoriesData } from "../../../static/data";
import { AiOutlineCloseCircle, AiOutlineFile, AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

const ProductForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData.name || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [stock, setStock] = useState(initialData.stock || "");
  const [sold, setSold] = useState(initialData.sold || "");
  const [category, setCategory] = useState(initialData.category || "Choose a category");
  const [images, setImages] = useState(initialData.images || []);
  const [models, setModels] = useState(initialData.models || []);
  const [creator, setCreator] = useState(initialData.creator || "");
  const { user } = useSelector((state) => state.user);
  const userId = user._id;
  setCreator(userId);
  useEffect(() => {
    setName(initialData.name || "");
    setPrice(initialData.price || "");
    setStock(initialData.stock || "");
    setSold(initialData.sold || "");
    setCategory(initialData.category || "Choose a category");
    setImages(initialData.images || []);
    setModels(initialData.models || []);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, price, stock, sold, category, images, models, creator });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imageUrls]);
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleModelChange = (e) => {
    const files = Array.from(e.target.files);
    const modelNames = files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setModels([...models, ...modelNames]);
  };

  const handleModelDelete = (index) => {
    const updatedModels = [...models];
    updatedModels.splice(index, 1);
    setModels(updatedModels);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className=" bg-white  rounded-[4px] p-3">
        <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <TextField type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full" placeholder="Enter your product name..." required />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <TextField type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-2 w-full" placeholder="Enter your product price..." required />
        </div>
        <br />
        <div>
          <label className="pb-2">Product Stock</label>
          <TextField type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="mt-2 w-full" placeholder="Enter your product stock..." />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select className="w-full mt-2 border h-[35px] rounded-[5px]" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Choose a category">Choose a category</option>
            {categoriesData.map((category, index) => (
              <option key={index} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Upload Images</label>
          <input
            type="file"
            id="uploadImages" // Menambahkan id untuk menghubungkan dengan elemen label
            className="hidden"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="uploadImages">
              {" "}
              {/* Menggunakan htmlFor dengan id yang sesuai */}
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images.map((image, index) => (
              <div key={index} className="relative m-2">
                <img loading="lazy" src={image} alt="" className="h-[120px] w-[120px] object-cover m-2" />
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
          <input
            type="file"
            id="uploadModels" // Menambahkan id untuk menghubungkan dengan elemen label
            className="hidden"
            multiple
            onChange={handleModelChange}
            accept=".glb,.gltf,.obj,.skp"
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="uploadModels">
              {" "}
              {/* Menggunakan htmlFor dengan id yang sesuai */}
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
        </div>
        <br />
        <div>
          <Button type="submit" variant="contained">
            {initialData.name ? "Update" : "Create"} Product
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
