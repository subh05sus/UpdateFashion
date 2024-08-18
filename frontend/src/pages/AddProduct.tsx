import React, { useState } from "react";
import { uploadPictures } from "../api-client"; // Ensure this path is correct based on your project structure
import { addProduct } from "../api-client"; // Add the function for adding product

const AdminAddProduct: React.FC = () => {
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [category, setCategory] = useState<"footwear" | "clothing">("footwear");
    const [subCategory, setSubCategory] = useState<string[]>([]);
    const [isSpecialPrice, setIsSpecialPrice] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [highlights, setHighlights] = useState<string[]>([]);
    const [specs, setSpecs] = useState<{ key: string; value: string }[]>([]);
    const [adminRating, setAdminRating] = useState<number | "">("");
    const [prioritizeAdminRating, setPrioritizeAdminRating] = useState(true);
    const [images, setImages] = useState<FileList | null>(null);

    const handleAddHighlight = () => setHighlights([...highlights, ""]);
    const handleRemoveHighlight = (index: number) =>
        setHighlights(highlights.filter((_, i) => i !== index));

    const handleAddSpec = () => setSpecs([...specs, { key: "", value: "" }]);
    const handleRemoveSpec = (index: number) =>
        setSpecs(specs.filter((_, i) => i !== index));

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value as "footwear" | "clothing");
        setSubCategory([]);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const imageUrls = images ? await uploadPictures(Array.from(images)) : "";
            const productData = {
                title,
                shortDescription,
                longDescription,
                price: Number(price),
                category,
                subCategory,
                isSpecialPrice,
                isFeatured,
                highlights,
                specs,
                adminRating: Number(adminRating),
                prioritizeAdminRating,
                imageUrl: imageUrls,
            };
            console.log(productData)
            await addProduct(productData);
            alert("Product added successfully!");
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product");
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Short Description
                    </label>
                    <textarea
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Long Description
                    </label>
                    <textarea
                        value={longDescription}
                        onChange={(e) => setLongDescription(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.valueAsNumber || "")}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="footwear">Footwear</option>
                        <option value="clothing">Clothing</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Sub Category
                    </label>
                    <input
                        type="text"
                        value={subCategory.join(", ")}
                        onChange={(e) =>
                            setSubCategory(
                                e.target.value.split(",").map((sub) => sub.trim())
                            )
                        }
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <p className="text-gray-500 text-sm">
                        * For clothing, separate multiple subcategories with a comma.
                    </p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Is Special Price
                    </label>
                    <input
                        type="checkbox"
                        checked={isSpecialPrice}
                        onChange={(e) => setIsSpecialPrice(e.target.checked)}
                        className="ml-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Is Featured
                    </label>
                    <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="ml-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Highlights
                    </label>
                    {highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={highlight}
                                onChange={(e) =>
                                    setHighlights(
                                        highlights.map((h, i) => (i === index ? e.target.value : h))
                                    )
                                }
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            <button
                                type="button"
                                className="ml-2 text-red-500"
                                onClick={() => handleRemoveHighlight(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="mt-2 text-blue-500"
                        onClick={handleAddHighlight}
                    >
                        Add Highlight
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Specs
                    </label>
                    {specs.map((spec, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                placeholder="Key"
                                value={spec.key}
                                onChange={(e) =>
                                    setSpecs(
                                        specs.map((s, i) =>
                                            i === index ? { ...s, key: e.target.value } : s
                                        )
                                    )
                                }
                                className="w-1/2 p-2 border rounded-md mr-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={spec.value}
                                onChange={(e) =>
                                    setSpecs(
                                        specs.map((s, i) =>
                                            i === index ? { ...s, value: e.target.value } : s
                                        )
                                    )
                                }
                                className="w-1/2 p-2 border rounded-md"
                                required
                            />
                            <button
                                type="button"
                                className="ml-2 text-red-500"
                                onClick={() => handleRemoveSpec(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="mt-2 text-blue-500"
                        onClick={handleAddSpec}
                    >
                        Add Spec
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Admin Rating
                    </label>
                    <input
                        type="number"
                        value={adminRating}
                        onChange={(e) => setAdminRating(e.target.valueAsNumber || "")}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Prioritize Admin Rating
                    </label>
                    <input
                        type="checkbox"
                        checked={prioritizeAdminRating}
                        onChange={(e) => setPrioritizeAdminRating(e.target.checked)}
                        className="ml-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Product Images
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                        className="w-full p-2 border rounded-md"
                        accept="image/*"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AdminAddProduct;
