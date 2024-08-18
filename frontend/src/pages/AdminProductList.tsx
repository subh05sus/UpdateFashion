/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState, useEffect } from "react";
import { deleteProduct, getAllProducts } from "../api-client";
import { Link } from "react-router-dom";

const AdminProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("");

  useEffect(() => {
    // Fetch all products from the backend
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter products based on search query and selected filters
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter((product) => product.category === filterCategory);
    }

    if (filterSubCategory) {
      filtered = filtered.filter((product) =>
        Array.isArray(product.subCategory)
          ? product.subCategory.includes(filterSubCategory)
          : product.subCategory === filterSubCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, filterCategory, filterSubCategory, products]);

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border rounded-md w-full"
        >
          <option value="">Filter by Category</option>
          <option value="footwear">Footwear</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>
      <div className="mb-4">
        <select
          value={filterSubCategory}
          onChange={(e) => setFilterSubCategory(e.target.value)}
          className="p-2 border rounded-md w-full"
        >
          <option value="">Filter by Subcategory</option>
          {/* Add subcategory options dynamically */}
          <option value="casual">Casual</option>
          <option value="sneakers">Sneakers</option>
          <option value="sandals">Sandals</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="jerseys">Jerseys</option>
          <option value="formal">Formal</option>
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Subcategory</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b">{product.title}</td>
              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b">
                {Array.isArray(product.subCategory)
                  ? product.subCategory.join(", ")
                  : product.subCategory}
              </td>
              <td className="py-2 px-4 border-b">₹{product.price}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  className="text-blue-600 hover:underline"
                  to={`/admin/edit-product/${product._id}`}
                >
                  Edit
                </Link>
                <button
                  className="text-red-600 hover:underline ml-4"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
