import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { deleteOrder, getAllOrdersAdmin } from "../../redux/actions/order";

const Orders = () => {
  const { orders } = useSelector((state) => state.order);
  const [openDelete, setOpenDelete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteOrder(id));
    toast.success("Order deleted successfully");
    setOpenDelete(false);
  };

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
      type: "string",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => setOrderId(params.id) || setOpenDelete(true)}>
            <AiOutlineDelete size={20} />
          </Button>
        </>
      ),
    },
  ];

  const formatPrice = (price) => `Rp. ${price.toLocaleString()}`;

  const rows = orders.map((order) => ({
    id: order._id,
    itemsQty: order.cart.reduce((acc, item) => acc + item.qty, 0),
    total: formatPrice(order.totalPrice),
    status: order.status,
    createdAt: new Date(order.createdAt),
  }));

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <div className="w-full flex justify-between mb-4">
          <h3 className="text-[22px] font-Poppins pb-2">All Orders</h3>
        </div>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid rows={rows} columns={columns} pageSize={4} disableSelectionOnClick autoHeight />
        </div>
        {openDelete && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpenDelete(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">Are you sure you want to delete this Order?</h3>
              <div className="w-full flex items-center justify-center">
                <div className={`${styles.button} text-[18px] !h-[42px] mr-4`} onClick={() => setOpenDelete(false)}>
                  Cancel
                </div>
                <div className={`${styles.button} text-[18px] !h-[42px] ml-4`} onClick={() => handleDelete(orderId)}>
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
