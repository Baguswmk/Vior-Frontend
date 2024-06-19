import { useEffect } from "react";
import styles from "../../../styles/styles";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAdmin } from "../../../redux/actions/order";
import Loader from "../../Layout/Loading";
import { getAllUsers } from "../../../redux/actions/user";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector((state) => state.order);
  const { users, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
    dispatch(getAllUsers());
  }, [dispatch]);

  const adminBalance = user.totalIncome.toFixed(2);
  const desainerUsers = users && users.filter((user) => user.role === "desainer");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];
  const formatPrice = (price) => `Rp. ${price.toLocaleString()}`;

  const row = [];
  const ordersArray = Array.isArray(orders) ? orders : [];
  ordersArray.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
      total: formatPrice(item.totalPrice),
      status: item.status,
      createdAt: item.createdAt.slice(0, 10),
    });
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect size={30} className="mr-2" fill="#00000085" />
                <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>Total Earning</h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">Rp. {adminBalance}</h5>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>All Designers</h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{desainerUsers && desainerUsers.length}</h5>
              <Link to="/admin-users">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Designers</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect size={30} className="mr-2" fill="#00000085" />
                <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>All Orders</h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
              </Link>
            </div>
          </div>

          <br />
          <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid rows={row} columns={columns} pageSize={4} disableSelectionOnClick autoHeight />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
