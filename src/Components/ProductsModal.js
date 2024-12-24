import React, { useState, useEffect } from "react";
import axios from "axios";
import getApiUrl from "../config_domains";

export const ProductModal = ({ show, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
      numri: "",
      emri: "",
      kategoriaNumri: "",
      kategoriaEmri: "",
    });
  
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      if (initialData) {    //edit mode
        setFormData(initialData);
      } else {              //insert mode
        setFormData({
          emri: "",
          kategoriaNumri: "",
          kategoriaEmri: "",
        });
      }
    }, [initialData]);
  
    useEffect(() => {
      // Fetch categories from the Kategorite API endpoint
      const fetchCategories = async () => {
        try {
          const response = await axios.get(getApiUrl() + "KategoriteAPI"); // Adjust the endpoint URL as needed
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching categories", error);
        }
      };
  
      fetchCategories();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  
      // Update category name when category number changes
      if (name === "kategoriaNumri") {
        const selectedCategory = categories.find((category) => category.Numri === parseInt(value));
        setFormData((prev) => ({
          ...prev,
          kategoriaEmri: selectedCategory ? selectedCategory.Titulli : "",
        }));
      }
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
                <label className="form-label">Kategoria</label>
                <select
                  className="form-control"
                  name="kategoriaNumri"
                  value={formData.kategoriaNumri}
                  onChange={handleChange}
                >
                  <option value="">-- Emri i Kategorise --</option>
                  {categories.map((category) => (
                    <option key={category.numri} value={category.numri}>
                      {category.titulli}
                    </option>
                  ))}
                </select>
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

  