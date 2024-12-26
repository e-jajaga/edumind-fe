import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import getApiUrl from "../config_domains";
import { ThemeContext } from "./ThemeContext";
import "../Components/Categories.css"

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
          const response = await axios.get(getApiUrl() + "KategoriteAPI");
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching cats", error);
        }
      };

    return (
        <div className={`categories-container ${theme}`}>
            <h1>Categories</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.numri}>{category.titulli}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
