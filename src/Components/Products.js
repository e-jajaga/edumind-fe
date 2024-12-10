import { useEffect, useState } from "react";
import CreateEditProduct from "./CreateEditProduct";

function Products() {
  const [productsLs, setProducts] = useState([]);
  const api = "https://localhost:7238/api/ProduktetAPI";

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(api);
      const result = await response.json();
      setProducts(result); // Updates the state once
    }

    fetchProducts();
  }, []); // Empty array, effect runs only once on mount

  return (
    <div>
        <CreateEditProduct />
      <ul>
        {productsLs.map((product) => (
          <li key={product.numri}>{product.emri}</li>
        ))}
      </ul>
    </div>
  );

};

export default Products;