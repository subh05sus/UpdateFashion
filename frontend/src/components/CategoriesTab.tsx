/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getMenProducts, getWomenProducts, getCasualFootwearProducts, getFormalClothingProducts, getRandomProducts } from '../api-client';
import { Tabs } from './ui/tabs';
import { Link } from 'react-router-dom';

export function CategoryTabs() {
    const [menProducts, setMenProducts] = useState<any[]>([]);
    const [womenProducts, setWomenProducts] = useState<any[]>([]);
    const [casualFootwearProducts, setCasualFootwearProducts] = useState<any[]>([]);
    const [formalClothingProducts, setFormalClothingProducts] = useState<any[]>([]);
    const [randomProducts, setRandomProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setMenProducts(await getMenProducts());
            setWomenProducts(await getWomenProducts());
            setCasualFootwearProducts(await getCasualFootwearProducts());
            setFormalClothingProducts(await getFormalClothingProducts());
            setRandomProducts(await getRandomProducts());
        };
        fetchProducts();
    }, []);

    const renderProducts = (products: any, link: string) => {
        return (
            <div className="w-full overflow-scroll no-visible-scrollbar relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-slate-700 to-orange-950 flex flex-col items-center gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {products.map((product: any) => (
                        <Link key={product._id} className="bg-slate-200 shadow-md rounded-xl p-4 w-full" to={`/product/${product._id}`}>
                            <img src={product.imageUrl.split(',')[0]} alt={product.title} className="w-full h-40 object-cover rounded-lg" />
                            <h3 className="mt-2 text-lg poppins-semibold text-[#222]">{product.title}</h3>
                            <p className="mt-1 text-xs poppins text-gray-600">{product.shortDescription}</p>
                        </Link>
                    ))}
                </div>
                <Link to={link} className='px-6 py-2 border border-2 border-orange-600 rounded-full hover:bg-orange-600 text-orange-600 poppins-semibold hover:text-white duration-300 text-lg transition-all w-fit landscape:mt-6'>View More</Link>
            </div>
        );
    };

    const tabs = [
        {
            title: "Men Clothing",
            value: "men",
            content: renderProducts(menProducts, '/sub-category/men'),
            products: menProducts,
        },
        {
            title: "Women Clothing",
            value: "women",
            content: renderProducts(womenProducts, '/sub-category/women'),
            products: womenProducts,
        },
        {
            title: "Casual Footwear",
            value: "casual",
            content: renderProducts(casualFootwearProducts, '/sub-category/casual'),
            products: casualFootwearProducts,
        },
        {
            title: "Formal Clothing",
            value: "formal",
            content: renderProducts(formalClothingProducts, '/sub-category/formal'),
            products: formalClothingProducts,
        },
        {
            title: "Random",
            value: "random",
            content: renderProducts(randomProducts, '/all-products'),
            products: randomProducts,
        },
    ];

    const filteredTabs = tabs.filter(tab => tab.products && tab.products.length > 0);

    return (

            <div className="h-[30rem] md:h-[28rem] px-2 relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start mb-20">
                {filteredTabs.length > 0 ? <Tabs tabs={filteredTabs} /> : <p>No categories to display</p>}
            </div>

    );

}
