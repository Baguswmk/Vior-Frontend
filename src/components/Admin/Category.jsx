import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import styles from "../../styles/styles";
import CategoryForm from "./Form/CategoryForm";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../../redux/actions/category";

const Category = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [initialData, setInitialData] = useState({ name: "", price: "", stock: "", sold: "" });

  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteCategory(id));
    setOpenDelete(false);
  };

  const handleFormSubmit = (data) => {
    if (categoryId) {
      dispatch(updateCategory(categoryId, data));
    } else {
      dispatch(createCategory(data));
    }
    setOpenForm(false);
  };

  const columns = [
    { field: "no", headerName: "No", minWidth: 100, flex: 0.3 },
    { field: "id", headerName: "Category ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1.4 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => setCategoryId(params.id) || setInitialData(getCategoryById(params.id)) || setOpenForm(true)}>
            <AiOutlineEdit size={20} />
          </Button>
          <Button onClick={() => setCategoryId(params.id) || setOpenDelete(true)}>
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

  const getCategoryById = (id) => {
    return category.find((category) => category._id === id) || { name: "" };
  };
  const rows = category.map((product, index) => ({
    no: index + 1,
    id: product._id,
    name: product.name,
  }));

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <div className="w-full flex justify-between mb-4">
          <h3 className="text-[22px] font-Poppins pb-2">All Category</h3>
          <button
            onClick={() => {
              setOpenForm(true);
            }}
            className={`${styles.button} text-[18px]`}
          >
            Create Category
          </button>
        </div>
        <div>
          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
        </div>
        {openDelete && (
          <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
            <div>
              <h3>Are you sure you want to delete this category?</h3>
              <Button onClick={() => handleDelete(categoryId)}>Confirm</Button>
              <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
            </div>
          </Modal>
        )}
        {openForm && (
          <Modal open={openForm} onClose={() => setOpenForm(false)}>
            <CategoryForm onSubmit={handleFormSubmit} initialData={initialData} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Category;
