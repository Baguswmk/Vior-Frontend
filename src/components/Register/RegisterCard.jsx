import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FaShoppingCart } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { useState } from "react";
import CardOnHover from "./HoverRegsiterCard";

const RegisterCard = ({ onSelectRole }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedRole, setSelectedRole] = useState(null);
  const [cardSelected, setCardSelected] = useState(false);
  const [hoverVisible, setHoverVisible] = useState(false);
  const handleMouseEnter = (e, role) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setSelectedRole(role);
    setHoverVisible(true);
  };
  const handleMouseLeave = () => {
    setSelectedRole(null);
    setHoverVisible(false);
  };
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  const handleCardClick = (role) => {
    setSelectedRole(role);
    setCardSelected(true);
    onSelectRole(role);
  };
  return (
    <div className="w-full flex flex-col mb-4">
      <div className="my-12 md:my-32">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Choose Role</h1>
        <p className="text-center text-sm m-4">Hover over each role for more information</p>
      </div>
      <div className="flex items-center flex-col space-y-2 justify-center md:space-x-5 md:flex-row">
        <div className="hover:shadow-2xl transition-all delay-75 ease-in-out mt-2">
          <Card sx={{ width: [280, 345], borderRadius: "8px" }} onMouseEnter={(e) => handleMouseEnter(e, "pembeli")} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {!cardSelected && (
              <>
                <div className="m-2 rounded-lg p-3 md:p-5 bg-[#f0f0f0]">
                  <FaShoppingCart
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      padding: "10px",
                    }}
                    className="text-[80px] md:text-[120px]"
                  />
                </div>
                <CardContent>
                  <p className="text-left text-xl mb-2 font-bold text-gray-700">Buyer</p>
                  <p className="text-left text-gray-700">A Buyer can purchase products, view products, and make payments</p>
                </CardContent>
              </>
            )}
            <button
              onClick={() => handleCardClick("pembeli")}
              className="flex w-[90%] mx-auto my-4 py-2 rounded justify-center text-white bg-[#323334] hover:ring-[#323334] hover:ring hover:bg-white hover:text-black transition-all ease-in-out"
            >
              Click To Register
            </button>
          </Card>
        </div>
        <div className="hover:shadow-2xl transition-all delay-75 ease-in-out ">
          <Card sx={{ width: [280, 345], borderRadius: "8px" }} onMouseEnter={(e) => handleMouseEnter(e, "desainer")} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {!cardSelected && (
              <>
                <div className="m-2 rounded-lg p-3 md:p-5 bg-[#f0f0f0]">
                  <MdDesignServices
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      padding: "10px",
                    }}
                    className="text-[80px] md:text-[120px]"
                  />
                </div>
                <CardContent > 
                  <p className="text-left text-xl mb-2 font-bold text-gray-700">Designer</p>
                  <p className="text-left text-gray-700">A designer can create creative designs for products, can edit the products</p>
                </CardContent>
              </>
            )}
            <button
              onClick={() => handleCardClick("desainer")}
              className="flex w-[90%] mx-auto my-4 py-2 bg-[#323334] rounded text-white justify-center hover:ring-[#323334] hover:ring hover:bg-white hover:text-black transition-all ease-in-out"
            >
              Click To Register
            </button>
          </Card>
        </div>
      </div>
      <CardOnHover role={selectedRole} position={mousePosition} visible={hoverVisible} />
    </div>
  );
};

export default RegisterCard;
