import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Layout/Loading";
import { getAllWithdrawRequestsDesainer, createWithdrawRequest } from "../../redux/actions/withdraw";
import styles from "../../styles/styles";
import Modal from "../Modal/Modal";

const AllWithdraw = () => {
  const { withdraw, isLoading } = useSelector((state) => state.withdraw);
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(getAllWithdrawRequestsDesainer());
  }, [dispatch]);

  const createWithdraw = (amount, paymentMethod) => {
    dispatch(createWithdrawRequest(amount, paymentMethod));
    setOpenForm(false);
  };

  const columns = [
    { field: "id", headerName: "Withdraw ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "ammount",
      headerName: "Ammount",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "availableBalance",
      headerName: "Total Ammount",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const rows = withdraw.map((item) => ({
    id: item._id,
    name: item.desainer.name,
    ammount: "Rp. " + item.amount,
    availableBalance: "Rp. " + (item.desainer.availableBalance - item.amount),
    status: item.status,
  }));

  return (
    <>
      <div style={{ height: 400, width: "90%" }}>
        <div className="flex w-full items-end justify-end my-4">
          <button
            onClick={() => {
              setOpenForm(true);
            }}
            className={`${styles.button} text-[18px]`}
          >
            Create Withdraw
          </button>
        </div>

        {isLoading ? <Loading /> : <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />}

        <Modal open={openForm} onClose={() => setOpenForm(false)} title="Create Withdraw">
          <WithdrawForm onSubmit={createWithdraw} />
        </Modal>
      </div>
    </>
  );
};

const WithdrawForm = ({ onSubmit }) => {
  const [bankName, setBankName] = useState("");
  const [rekeningNumber, setRekeningNumber] = useState("");
  const [rekeningName, setRekeningName] = useState("");
  const [ammount, setAmmount] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ammount, { bankName, rekeningNumber, rekeningName });
    setBankName("");
    setRekeningNumber("");
    setRekeningName("");
    setAmmount(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} className="border p-2 rounded" required />
      <input type="text" placeholder="Rekening Name" value={rekeningName} onChange={(e) => setRekeningName(e.target.value)} className="border p-2 rounded" required />
      <input type="text" placeholder="Rekening Number" value={rekeningNumber} onChange={(e) => setRekeningNumber(e.target.value)} className="border p-2 rounded" required />
      <input type="number" placeholder="Ammount" value={ammount} onChange={(e) => setAmmount(e.target.value)} className="border p-2 rounded" required />
      <button type="submit" className={`${styles.button} text-[18px] !h-[42px] mt-4`}>
        Create Withdraw
      </button>
    </form>
  );
};

export default AllWithdraw;
