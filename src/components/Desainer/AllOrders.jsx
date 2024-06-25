import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../Layout/Loading";
import { getAllOrdersDesainer } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";

const AllOrders = ({ role }) => {
  const { desainerOrders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = user._id;
    if (userId || role === "admin") {
      dispatch(getAllOrdersDesainer(userId, role));
    }
  }, [dispatch, user, role]);

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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];
  const orderArray = Array.isArray(desainerOrders) ? desainerOrders : [];

  const rows = orderArray.map((item) => ({
    id: item._id,
    itemsQty: item.cart.length,
    total: "Rp. " + item.totalPrice,
    status: item.status,
  }));

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>{isLoading ? <Loading /> : <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />}</div>
    </>
  );
};

export default AllOrders;
