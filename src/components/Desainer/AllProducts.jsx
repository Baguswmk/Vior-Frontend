import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsDesainer, deleteProduct, updateProduct } from "../../redux/actions/product";
import Loading from "../Layout/Loading";
const formatPrice = (price) => `Rp. ${price.toLocaleString()}`;
import Modal from "../Modal/Modal";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [productId, setProductId] = useState(null);
  const [initialData, setInitialData] = useState({ name: "", price: "", stock: "", sold: "" });

  useEffect(() => {
    if (user && user._id) {
      dispatch(getAllProductsDesainer(user._id));
    }
  }, [dispatch, user]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setOpenDelete(false);
  };

  const handleUpdate = (id) => {
    dispatch(updateProduct(id));
    setOpenForm(false);
  };
  const getProductById = (id) => {
    return products.find((product) => product._id === id) || { name: "", price: "", stock: "", sold: "" };
  };
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name Product",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Button",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
            <Button onClick={() => setProductId(params.id) || setInitialData(getProductById(params.id)) || setOpenForm(true)}>
              <AiOutlineEdit size={20} />
            </Button>
            <Button onClick={() => setProductId(params.id) || setOpenDelete(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  if (Array.isArray(products)) {
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: formatPrice(item.price),
        Stock: item.stock,
        sold: item.sold_out,
      });
    });
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      {isLoading ? <Loading /> : <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection disableSelectionOnClick />}{" "}
      {openDelete && (
        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
          <div>
            <h3>Are you sure you want to delete this product?</h3>
            <Button onClick={() => handleDelete(productId)}>Confirm</Button>
            <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          </div>
        </Modal>
      )}
      {openForm && (
        <Modal open={openForm} onClose={() => setOpenForm(false)}>
          <ProductForm onSubmit={handleUpdate} initialData={initialData} />
        </Modal>
      )}
    </div>
  );
};
import { TextField } from "@mui/material";
import { categoriesData } from "../../static/data";
import { AiOutlineCloseCircle, AiOutlineFile, AiOutlinePlusCircle } from "react-icons/ai";

const ProductForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData.name || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [stock, setStock] = useState(initialData.stock || "");
  const [sold, setSold] = useState(initialData.sold || "");
  const [category, setCategory] = useState(initialData.category || "Choose a category");
  const [images, setImages] = useState(initialData.images || []);
  const [models, setModels] = useState(initialData.models || []);

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
    onSubmit({ name, price, stock, sold, category, images, models });
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
        <h5 className="text-[30px] font-Poppins text-center">Update Product</h5>
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
          <input type="file" id="uploadModels" className="hidden" multiple onChange={handleModelChange} accept=".glb,.gltf,.obj,.skp" />
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

export default AllProducts;
