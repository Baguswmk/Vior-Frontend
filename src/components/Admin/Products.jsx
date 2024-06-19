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

const Products = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [productId, setProductId] = useState(null);
  const [initialData, setInitialData] = useState({ name: "", price: "", stock: "", sold: "" });

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(adminGetAllProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(adminDeleteProduct(id));
    setOpenDelete(false);
  };

  const handleFormSubmit = (data) => {
    if (productId) {
      dispatch(adminUpdateProduct(productId, data));
    } else {
      dispatch(createProduct(data));
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
      <div className="w-[97%]">
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
            <div>
              <h3>Are you sure you want to delete this product?</h3>
              <Button onClick={() => handleDelete(productId)}>Confirm</Button>
              <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
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
