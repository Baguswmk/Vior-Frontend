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
  const { users, success, error } = useSelector((state) => state.user);
  const [openDelete, setOpenDelete] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [initialData, setInitialData] = useState({ name: "", email: "", password: "", avatar: "", role: "pembeli" });
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleDelete = (id) => {
    if (userId) {
      dispatch(deleteUser(id));
    }
    setOpenDelete(false);
  };

  const handleFormSubmit = (data) => {
    if (userId) {
      dispatch(updateUser(userId, data));
      if (success) {
        window.location.reload();
      }
    } else {
      dispatch(createUser(data));
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
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpenDelete(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">Are you sure you wanna delete this user?</h3>
              <div className="w-full flex items-center justify-center">
                <div className={`${styles.button} text-[18px] !h-[42px] mr-4`} onClick={() => setOpenDelete(false)}>
                  cancel
                </div>
                <div className={`${styles.button} text-[18px] !h-[42px] ml-4`} onClick={() => setOpenDelete(false) || handleDelete(userId)}>
                  confirm
                </div>
              </div>
            </div>
          </div>
        )}
        <Modal open={openForm} onClose={() => setOpenForm(false)} title={userId ? "Update User" : "Create User"}>
          <UserForm onSubmit={handleFormSubmit} initialData={initialData} />
        </Modal>
      </div>
    </div>
  );
};

export default Users;
