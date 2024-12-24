import React, { useState, useEffect } from "react";
import axios from "axios";
import getApiUrl from "../config_domains";
import { ProductModal } from "./ProductsModal";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(getApiUrl() + "ProduktetAPI");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSave = async (product) => {
    try {
      if (product.numri) {    //edit mode
        await axios.put(`${getApiUrl() + "ProduktetAPI"}/${product.numri}`, product);
      } else {                //insert
        await axios.post(getApiUrl() + "ProduktetAPI", product);
      }
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleDelete = async (numri) => {
    try {
      await axios.delete(`${getApiUrl() + "ProduktetAPI"}/${numri}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="container">
      <h1>Products</h1>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Add Product
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.numri}>
              <td>{product.numri}</td>
              <td>{product.emri}</td>
              <td>{product.kategoriaEmri}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.numri)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ProductModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          initialData={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
