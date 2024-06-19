import { useState, useEffect } from "react";
import styles from "../../../styles/styles";

const CategoryForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData.name || "");

  useEffect(() => {
    if (initialData.name !== undefined) {
      setName(initialData.name);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Name Category" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" required />

      <button type="submit" className={`${styles.button} text-[18px] !h-[42px] mt-4`}>
        {initialData.id ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
};

export default CategoryForm;
