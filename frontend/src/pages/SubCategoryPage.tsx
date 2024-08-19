/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsBySubCategory } from '../api-client';
import ProductCard from '../components/ProductCard';

export default function SubCategoryPage() {
    const { subcategory } = useParams<{ subcategory: string }>(); // Get the subcategory from the URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProductsBySubCategory(subcategory!);
                setProducts(fetchedProducts);
            } catch (err) {
                setError("Failed to fetch products by subcategory");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [subcategory]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8 capitalize">{subcategory} Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product: any) => (
                    <ProductCard
                        key={product._id}
                        link={`/product/${product._id}`}
                        imageUrl={product.imageUrl.split(',')[0]}
                        title={product.title}
                        shortDescription={product.shortDescription}
                        price={product.price}
                        isSpecialPrice={product.isSpecialPrice}
                        adminRating={product.adminRating} category={product.category}/>))}
            </div>
        </div>
    );
}
