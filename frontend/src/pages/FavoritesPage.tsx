/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getFavorites, removeFromFavorites } from '../api-client';
import { CgBox } from 'react-icons/cg';
import { AiFillHeart } from 'react-icons/ai';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<any[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const fetchedFavorites = await getFavorites();
                setFavorites(fetchedFavorites);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (productId: string) => {
        try {
            // Assuming you have a function to remove a favorite product
            await removeFromFavorites(productId); 
            setFavorites(prevFavorites => prevFavorites.filter(product => product._id !== productId));
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    if (favorites.length === 0) {
        return <p className="text-center text-gray-700">No Favorites Found</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Favorites</h1>
            <ul className="space-y-6">
                {favorites.map(product => (
                    <li key={product._id} className="bg-gray-50 p-4 rounded-lg shadow-lg border border-gray-200 flex flex-col lg:flex-row lg:justify-between">
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xs font-semibold text-gray-800">Product ID: {product._id}</h2>
                            </div>
                            <div className="flex items-center mb-2">
                                <p className="text-lg font-bold text-gray-900">{product.title}</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <CgBox className="text-gray-500 mr-2" />
                                <p className="text-gray-700 text-sm">{product.category}</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <img src={product.imageUrl.split(',')[0]} className="h-24 w-24 object-cover object-center rounded-lg" alt={product.title} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start gap-3 items-end">
                            <button
                                onClick={() => handleRemoveFavorite(product._id)}
                                className="bg-red-600 w-fit text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                            >
                                <AiFillHeart className="inline" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesPage;
