import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllWithdrawRequests, updateWithdrawRequest } from "../../redux/actions/withdraw";
import Loading from "../Layout/Loading";

const Withdraw = () => {
  const [open, setOpen] = useState(false);
  const [withdrawId, setWithdrawId] = useState("");
  const [desainerId, setDesainerId] = useState("");
  const [withdrawStatus, setWithdrawStatus] = useState("");
  const dispatch = useDispatch();
  const { withdraw, isLoading } = useSelector((state) => state.withdraw);

  useEffect(() => {
    dispatch(getAllWithdrawRequests());
  }, [dispatch]);

  const handleUpdateClick = (withdrawId, desainerId) => {
    setWithdrawId(withdrawId);
    setDesainerId(desainerId);
    setOpen(true);
  };
  const handleSubmit = async () => {
    await dispatch(updateWithdrawRequest(withdrawId, withdrawStatus, desainerId));
    window.location.reload();
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Desainer Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "desainerId",
      headerName: "Desainer Id",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "status",
      type: "text",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Request given at",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: " ",
      headerName: "Update Status",
      type: "number",
      minWidth: 130,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <div className="flex items-center align-middle justify-center h-full">
            <BsPencil
              size={20}
              className={`${params.row.status !== "Processing" ? "hidden" : ""} cursor-pointer`}
              onClick={() => {
                setOpen(true);
                handleUpdateClick(params.row.id, params.row.desainerId);
              }}
            />
          </div>
        );
      },
    },
  ];

  const rows =
    withdraw &&
    withdraw.map((item) => ({
      id: item._id,
      desainerId: item.desainer._id,
      name: item.desainer.name,
      amount: "Rp. " + item.amount,
      status: item.status,
      createdAt: item.createdAt.slice(0, 10),
    }));

  return (
    <div className="w-full flex items-center pt-5 justify-center">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[95%] bg-white">
          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
        </div>
      )}
      {open && (
        <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
          <div className="w-[30%] min-h-[40vh] bg-white rounded shadow p-4">
            <div className="flex justify-end w-full">
              <RxCross1 size={25} onClick={() => setOpen(false)} />
            </div>
            <h1 className="text-[25px] text-center font-Poppins">Update Withdraw status</h1>
            <br />
            <select name="" id="" value={withdrawStatus} onChange={(e) => setWithdrawStatus(e.target.value)} className="w-[200px] h-[35px] border rounded">
              <option value="">Select Status</option>
              <option value="Succeess">Success</option>
            </select>
            <button type="submit" className={`block ${styles.button}  !h-[42px] mt-4 text-[18px]`} onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
