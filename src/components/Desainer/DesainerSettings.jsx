import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { updateUser, updateUserAvatar } from "../../redux/actions/user";
import { toast } from "react-toastify";

const DesainerSettings = () => {
  const { user } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(user && user.name);
  const [description, setDescription] = useState(user && user.description ? user.description : "");
  const [address, setAddress] = useState(user && user.address);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        dispatch(updateUserAvatar(reader.result));
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    const data = {
      name,
      address,
      phoneNumber,
    };
    try {
      dispatch(updateUser(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img src={avatar ? avatar : `${user.avatar?.url}`} alt="" className="w-[200px] h-[200px] rounded-full cursor-pointer" />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input type="file" id="image" className="hidden" onChange={handleImage} />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}
        <form aria-required={true} className="flex flex-col items-center" onSubmit={updateHandler}>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Name</label>
            </div>
            <input type="name" placeholder={`${user.name}`} value={name} onChange={(e) => setName(e.target.value)} className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Description</label>
            </div>
            <input
              type="name"
              placeholder={`${user?.description ? user.description : "Enter your desainer description"}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Address</label>
            </div>
            <input type="name" placeholder={user?.address} value={address} onChange={(e) => setAddress(e.target.value)} className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Phone Number</label>
            </div>
            <input type="number" placeholder={user?.phoneNumber} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input type="submit" value="Update Data" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required readOnly />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DesainerSettings;
