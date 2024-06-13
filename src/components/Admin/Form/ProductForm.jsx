import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData.name || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [stock, setStock] = useState(initialData.stock || "");
  const [sold, setSold] = useState(initialData.sold || "");

  useEffect(() => {
    if (initialData.name !== undefined) {
      setName(initialData.name);
    }
    if (initialData.price !== undefined) {
      setPrice(initialData.price);
    }
    if (initialData.stock !== undefined) {
      setStock(initialData.stock);
    }
    if (initialData.sold !== undefined) {
      setSold(initialData.sold);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, price, stock, sold });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField type="text" label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField type="number" label="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <TextField type="number" label="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
      <TextField type="number" label="Sold Out" value={sold} onChange={(e) => setSold(e.target.value)} required />
      <Button type="submit" variant="contained">
        {initialData.name ? "Update" : "Create"} Product
      </Button>
    </form>
  );
};


export default ProductForm;
