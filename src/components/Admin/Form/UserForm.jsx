import { useState, useEffect } from "react";
import styles from "../../../styles/styles";
import { RxAvatar } from "react-icons/rx";

const UserForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [password, setPassword] = useState(initialData.password || "");
  const [avatar, setAvatar] = useState(initialData.avatar || "");
  const [role, setRole] = useState(initialData.role || "pembeli");

  useEffect(() => {
    setName(initialData.name || "");
    setEmail(initialData.email || "");
    setPassword(initialData.password || "");
    setAvatar(initialData.avatar || "");
    setRole(initialData.role || "pembeli");
  }, [initialData]);

  const handleAvatarChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, password, avatar, role });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" required />
      <div className="ml-1 flex items-center">
        <span className="inline-block h-8 w-8 rounded-full overflow-hidden">{avatar ? <img loading="lazy" src={avatar} alt="avatar" className="h-full w-full object-cover rounded-full" /> : <RxAvatar className="h-8 w-8" />}</span>
        <label htmlFor="file-input" className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <span>Upload a file</span>
          <input type="file" id="file-input" name="avatar" accept=".jpg,.jpeg,.png" onChange={handleAvatarChange} className="sr-only" />
        </label>
      </div>
      <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 rounded">
        <option value="pembeli">Pembeli</option>
        <option value="desainer">Desainer</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className={`${styles.button} text-[18px] !h-[42px] mt-4`}>
        {initialData ? "Create User" : "Update User"}
      </button>
    </form>
  );
};

export default UserForm;
