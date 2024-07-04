import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [activated, setActivated] = useState(false);
  const navigate = useNavigate();
  const activateAccount = async () => {
    try {
      const response = await axios.post(`${server}/user/activation`, {
        activation_token,
      });
      if (response.data.success === true) {
        navigate("/login");
      }
      setActivated(true);
    } catch (error) {
      setError(true);
    }
  };

  if (activation_token && !activated && !error) {
    activateAccount();
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? <p>Your token is expired!</p> : <p>Your account has been activated successfully!</p>}
    </div>
  );
};

export default ActivationPage;
