import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Register/RegisterForm";
import RegisterCard from "../../components/Register/RegisterCard";
const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowForm(true);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setShowForm(false);
  };
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return <div className="min-h-screen bg-gray-50 justify-center sm:px-6 lg:px-8 relative">{showForm ? <RegisterForm role={selectedRole} handleBack={handleBack} /> : <RegisterCard onSelectRole={handleRoleSelect} />}</div>;
};

export default RegisterPage;
