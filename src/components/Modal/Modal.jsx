import { RxCross1 } from "react-icons/rx";
const Modal = ({ open, onClose, children, title }) => {
  if (!open) return null;

  return (
    <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
      <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
        <div className="w-full flex justify-end cursor-pointer">
          <RxCross1 size={25} onClick={onClose} />
        </div>
        {title && <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
};


export default Modal;
