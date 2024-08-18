import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, editProduct, uploadPicture } from "../api-client";

// Define the types for the state
interface Spec {
    key: string;
    value: string;
  }
  
  interface Product {
    imageUrl: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    category: "footwear" | "clothing";
    subCategory: string | string[];
    isSpecialPrice: boolean;
    isFeatured: boolean;
    highlights: string[];
    specs: Spec[];
    adminRating: number;
    prioritizeAdminRating: boolean;
  }


const AdminEditProduct = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product>({
    imageUrl: "",
    title: "",
    shortDescription: "",
    longDescription: "",
    price: 0,
    category: "footwear",
    subCategory: "",
    isSpecialPrice: false,
    isFeatured: false,
    highlights: [],
    specs: [],
    adminRating: 0,
    prioritizeAdminRating: true,
  });

  const [newImage, setNewImage] = useState<File | null>(null);
  const navigate = useNavigate()
  useEffect(() => {
    // Fetch the product details based on the product ID
    const fetchData = async () => {
      try {
        const data = await getProductById(id!);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.checked });
  };

  const handleSpecChange = (index: number, key: string, value: string) => {
    const newSpecs = [...product.specs];
    newSpecs[index] = { key, value };
    setProduct({ ...product, specs: newSpecs });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...product.highlights];
    newHighlights[index] = value;
    setProduct({ ...product, highlights: newHighlights });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = product.imageUrl;
      if (newImage) {
        imageUrl = await uploadPicture(newImage);
      }

      const updatedProduct = { ...product, imageUrl };
      await editProduct(id!, updatedProduct);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea
            name="shortDescription"
            value={product.shortDescription}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Long Description</label>
          <textarea
            name="longDescription"
            value={product.longDescription}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="footwear">Footwear</option>
            <option value="clothing">Clothing</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subcategory</label>
          <input
            type="text"
            name="subCategory"
            value={product.subCategory}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Is Special Price</label>
          <input
            type="checkbox"
            name="isSpecialPrice"
            checked={product.isSpecialPrice}
            onChange={handleCheckboxChange}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Is Featured</label>
          <input
            type="checkbox"
            name="isFeatured"
            checked={product.isFeatured}
            onChange={handleCheckboxChange}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Admin Rating</label>
          <input
            type="number"
            name="adminRating"
            value={product.adminRating}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            min="0"
            max="5"
            step="0.1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Prioritize Admin Rating</label>
          <input
            type="checkbox"
            name="prioritizeAdminRating"
            checked={product.prioritizeAdminRating}
            onChange={handleCheckboxChange}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Highlights</label>
          {product.highlights.map((highlight, index) => (
            <input
              key={index}
              type="text"
              value={highlight}
              onChange={(e) => handleHighlightChange(index, e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Specifications</label>
          {product.specs.map((spec, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={spec.key}
                onChange={(e) => handleSpecChange(index, e.target.value, spec.value)}
                className="mt-1 p-2 border rounded-md w-1/2"
                placeholder="Key"
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) => handleSpecChange(index, spec.key, e.target.value)}
                className="mt-1 p-2 border rounded-md w-1/2 ml-2"
                placeholder="Value"
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
