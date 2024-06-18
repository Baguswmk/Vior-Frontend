import { useState } from "react";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete, AiOutlineDownload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { deleteUserAddress, loadUser, updateUserAddress, updateUserInformation, updateUserAvatar } from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllItems, getAllOrders } from "../../redux/actions/order";
import Loading from "../Layout/Loading";
const formatPrice = (price) => {
  if (typeof price === "number") {
    return `Rp. ${price.toLocaleString()}`;
  }
  return "Rp. 0";
};

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password, avatar));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);

        try {
          dispatch(updateUserAvatar(reader.result));
          dispatch(loadUser());

          toast.success("Avatar updated successfully");
        } catch (error) {
          toast.error(error.message || "An error occurred while updating the avatar");
        }
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img loading="lazy" src={`${user.avatar.url}`} className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]" alt="" />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input type="file" id="image" className="hidden" onChange={handleImage} />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input type="text" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input type="text" className={`${styles.input} !w-[95%] mb-1 800px:mb-0`} required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input type="number" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input type="password" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <input className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`} required value="Update" type="submit" />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* items */}
      {active === 3 && (
        <div>
          <AllItems />
        </div>
      )}

      {/* Change Password */}
      {active === 5 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 6 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};
const Modal = ({ open, onClose, imageSrc }) => {
  const modalStyle = {
    display: open ? "block" : "none",
    position: "fixed",
    zIndex: 9999,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <img loading="lazy" src={imageSrc} alt="Item" style={{ maxWidth: "80%", maxHeight: "80%" }} />
      </div>
    </div>
  );
};
const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders(user._id));
  }, [dispatch, user._id]);

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
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: formatPrice(item.totalPrice),
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
    </div>
  );
};

const AllItems = () => {
  const { user } = useSelector((state) => state.user);
  const { items, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItems(user._id));
  }, [dispatch, user._id]);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageModalOpen = (imageSrc) => {
    setSelectedImage(imageSrc);
    setImageModalOpen(true);
  };

  const handleImageModalClose = () => {
    setImageModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "No", minWidth: 150, flex: 0.7 },
    { field: "orderId", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.7 },
    {
      field: "price",
      headerName: "Price",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Button onClick={() => handleImageModalOpen(params.value)}>
          <img loading="lazy" src={params.value} alt="Item" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
        </Button>
      ),
    },
    {
      field: "model3d",
      headerName: "Model 3D",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Button>
          <a href={params && params.value} target="_blank" rel="noreferrer">
            <AiOutlineDownload />
          </a>
        </Button>
      ),
    },

    {
      field: "download",
      headerName: "Download Image",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => (
        <Button onClick={() => handleDownloadClick(params.row.image)}>
          <AiOutlineDownload />
        </Button>
      ),
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
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const rows = Array.isArray(items.combinedItems)
    ? items.combinedItems.map((item, index) => ({
        id: index + 1,
        orderId: item.orderId,
        name: item.name,
        price: formatPrice(item.price),
        model3d: item.model3dUrl,
        image: item.imagePath,
      }))
    : [];

  const handleDownloadClick = (imageUrl) => {
    const fileName = getImageFileName(imageUrl);
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  const getImageFileName = (imageUrl) => {
    const parts = imageUrl.split("/");
    const fileNameWithExtension = parts[parts.length - 1];
    return fileNameWithExtension;
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pl-8 pt-1">
          <DataGrid rows={rows} columns={columns} pageSize={10} autoHeight disableSelectionOnClick />
          {/* Image Modal */}
          <Modal open={imageModalOpen} onClose={handleImageModalClose} imageSrc={selectedImage} />
        </div>
      )}
    </>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(`${server}/user/update-user-password`, { oldPassword, newPassword, confirmPassword }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">Change Password</h1>
      <div className="w-full">
        <form aria-required onSubmit={passwordChangeHandler} className="flex flex-col items-center">
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input type="password" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input type="password" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input type="password" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <input className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`} required value="Update" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(updateUserAddress(country, city, address1, address2, zipCode, addressType));
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">Add New Address</h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select name="" id="" value={country} onChange={(e) => setCountry(e.target.value)} className="w-[95%] border h-[40px] rounded-[5px]">
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option className="block pb-2" key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select name="" id="" value={city} onChange={(e) => setCity(e.target.value)} className="w-[95%] border h-[40px] rounded-[5px]">
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option className="block pb-2" key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input type="address" className={`${styles.input}`} required value={address1} onChange={(e) => setAddress1(e.target.value)} />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input type="address" className={`${styles.input}`} required value={address2} onChange={(e) => setAddress2(e.target.value)} />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input type="number" className={`${styles.input}`} required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select name="" id="" value={addressType} onChange={(e) => setAddressType(e.target.value)} className="w-[95%] border h-[40px] rounded-[5px]">
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option className="block pb-2" key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input type="submit" className={`${styles.input} mt-5 cursor-pointer`} required readOnly />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">My Addresses</h1>
        <div className={`${styles.button} !rounded-md`} onClick={() => setOpen(true)}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5" key={index}>
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">{user && user.phoneNumber}</h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete size={25} className="cursor-pointer" onClick={() => handleDelete(item)} />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && <h5 className="text-center pt-8 text-[18px]">You not have any saved address!</h5>}
    </div>
  );
};

export default ProfileContent;
