import React, { useState, useEffect } from "react";
import axios from "axios";
import getApiUrl from "../config_domains";

const ProductModal = ({ show, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    numri: "",
    emri: "",
    kategoriaNumri: "",
    kategoriaEmri: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        numri: "",
        emri: "",
        kategoriaNumri: "",
        kategoriaEmri: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{initialData ? "Update Product" : "Add Product"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                name="emri"
                value={formData.emri}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category Number</label>
              <input
                type="number"
                className="form-control"
                name="kategoriaNumri"
                value={formData.kategoriaNumri}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                name="kategoriaEmri"
                value={formData.kategoriaEmri}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(getApiUrl());
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
      if (product.numri) {
        await axios.put(`${getApiUrl()}/${product.numri}`, product);
      } else {
        await axios.post(getApiUrl(), product);
      }
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleDelete = async (numri) => {
    try {
      await axios.delete(`${getApiUrl()}/${numri}`);
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
            <th>Category Number</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.numri}>
              <td>{product.numri}</td>
              <td>{product.emri}</td>
              <td>{product.kategoriaNumri}</td>
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
