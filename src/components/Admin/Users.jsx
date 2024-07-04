import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser, createUser, updateUser } from "../../redux/actions/user";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import Modal from "../Modal/Modal";
import UserForm from "./Form/UserForm";
import { toast } from "react-toastify";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [openDelete, setOpenDelete] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [initialData, setInitialData] = useState({ name: "", email: "", password: "", avatar: "", role: "pembeli" });
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (userId) {
      await dispatch(deleteUser(id));
      dispatch(getAllUsers());
    }
    setOpenDelete(false);
  };

  const handleFormSubmit = async (data) => {
    if (userId) {
      await dispatch(updateUser(userId, data));
      toast.success("User updated successfully");
      setSuccess(true);
      dispatch(getAllUsers());
    } else {
      await dispatch(createUser(data));
      toast.success("User created successfully");
      dispatch(getAllUsers());
    }
    setOpenForm(false);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.role.toLowerCase().includes(roleFilter.toLowerCase()) &&
      (user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.role.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const columns = [
    { field: "no", headerName: "No", minWidth: 100, flex: 0.3 },
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "actions",
      flex: 1,
      minWidth: 150,
      headerName: "Actions",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const user = users.find((usr) => usr._id === params.id);
        return (
          <>
            <Button
              onClick={() => {
                setUserId(params.id);
                setInitialData({ name: user.name, email: user.email, password: "", avatar: user.avatar, role: user.role });
                setOpenForm(true);
              }}
            >
              <AiOutlineEdit size={20} />
            </Button>
            <Button onClick={() => setUserId(params.id) || setOpenDelete(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  filteredUsers &&
    filteredUsers.forEach((item, index) => {
      row.push({
        no: index + 1,
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <div className="w-full flex justify-between mb-4">
          <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
          <button
            onClick={() => {
              setUserId(null);
              setInitialData({ name: "", email: "", password: "", avatar: "", role: "pembeli" });
              setOpenForm(true);
            }}
            className={`${styles.button} text-[18px]`}
          >
            Create User
          </button>
        </div>
        <div className="flex gap-2 mb-4 ">
          <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 rounded" />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="border p-2 rounded ">
            <option value="">Filter by role </option>
            <option value="pembeli">Pembeli</option>
            <option value="desainer">Desainer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
        </div>
        {openDelete && (
          <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div>
                <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this product?</h3>
                <div className="flex justify-end">
                  <button className="bg-red-500 hover:bg-red-600 text-white  py-2 px-4 rounded mr-2" onClick={() => handleDelete(userId)}>
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
        <Modal open={openForm} onClose={() => setOpenForm(false)} title={userId ? "Update User" : "Create User"}>
          <UserForm onSubmit={handleFormSubmit} initialData={initialData} />
        </Modal>
      </div>
    </div>
  );
};

export default Users;
