import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllProducts, adminDeleteProduct, createProduct, adminUpdateProduct } from "../../redux/actions/product";
import Modal from "../Modal/Modal";
import ProductForm from "./Form/ProductForm";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

const Products = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [productId, setProductId] = useState(null);
  const [initialData, setInitialData] = useState({ name: "", price: "", stock: "", sold: "" });
  const [notification, setNotification] = useState(null);

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(adminGetAllProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(adminDeleteProduct(id));

      setOpenDelete(false);
      setNotification("Product deleted successfully!");
      dispatch(adminGetAllProducts());
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };
  const handleFormSubmit = async (data) => {
    if (productId) {
      await dispatch(adminUpdateProduct(productId, data));
      toast.success("Product updated successfully");
      dispatch(adminGetAllProducts());
    } else {
      await dispatch(createProduct(data));
      toast.success("Product created successfully");
      dispatch(adminGetAllProducts());
    }
    setOpenForm(false);
  };

  const columns = [
    { field: "no", headerName: "No", minWidth: 100, flex: 0.3 },
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 80, flex: 0.5 },
    { field: "sold", headerName: "Sold out", type: "number", minWidth: 130, flex: 0.6 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => setProductId(params.id) || setInitialData(getProductById(params.id)) || setOpenForm(true)}>
            <AiOutlineEdit size={20} />
          </Button>
          <Button onClick={() => setProductId(params.id) || setOpenDelete(true)}>
            <AiOutlineDelete size={20} />
          </Button>
          <Link to={`/product/${params.id}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        </>
      ),
    },
  ];

  const getProductById = (id) => {
    return products.find((product) => product._id === id) || { name: "", price: "", stock: "", sold: "" };
  };
  const productsArray = Array.isArray(products) ? products : [];

  const rows = productsArray.map((product, index) => ({
    no: index + 1,
    id: product._id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    sold: product.sold,
  }));

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[100%] px-4">
        {notification && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {notification}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setNotification(null)}>
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path
                  fill-rule="evenodd"
                  d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 111.414-1.414L10 8.586l4.293-4.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
        )}
        <div className="w-full flex justify-between mb-4">
          <h3 className="text-[22px] font-Poppins pb-2">All Products</h3>
          <button
            onClick={() => {
              setOpenForm(true);
            }}
            className={`${styles.button} text-[18px]`}
          >
            Create Product
          </button>
        </div>
        <div>
          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
        </div>
        {openDelete && (
          <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div>
                <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this category?</h3>
                <div className="flex justify-end">
                  <button className="bg-red-500 hover:bg-red-600 text-white  py-2 px-4 rounded mr-2" onClick={() => handleDelete(productId)}>
                    Confirm
                  </button>
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800  py-2 px-4 rounded" onClick={() => setOpenDelete(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
        {openForm && (
          <Modal open={openForm} onClose={() => setOpenForm(false)}>
            <ProductForm onSubmit={handleFormSubmit} initialData={initialData} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Products;
