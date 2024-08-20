/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getMyOrders } from '../api-client';
import { useNavigate } from 'react-router-dom';
import {  FaCalendarDay } from 'react-icons/fa';
import { CgBox, CgSize } from 'react-icons/cg';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getMyOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    if (orders.length === 0) {
        return <p className="text-center text-gray-700">No Orders Found</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>
            <ul className="space-y-6">
                {orders.map(order => (
                    <li key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-lg border border-gray-200 flex justify-end">
                        <div className='flex-1'>
                        <div className="flex justify-between items-center">
                            <h2 className="text-xs font-semibold text-gray-800">Order ID: {order._id}</h2>
                            
                        </div>
                        <div className="flex items-center mb-2">
                            <p className="text-lg font-bold text-gray-900">Total: INR {order.amountToBePaid}</p>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <button
                                onClick={() => navigate(`/order-details/${order._id}`)}
                                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                            >
                                View Details
                            </button>
                        </div>
                        <div className="flex items-center mt-2">
                            <CgBox className="text-gray-500 mr-2" />
                            <p className="text-gray-700 text-sm">Item: {order.productId.title}</p>
                        </div>
                        <div className="flex items-center mt-2">
                            <CgSize className="text-gray-500 mr-2" />
                            <p className="text-gray-700 text-sm">Size: {order.size}</p>
                        </div>
                        </div>
                        <div className='flex flex-col items-end'>
                        <p className={`text-sm font-medium ${order.orderStatus === 'DELIVERED' ? 'text-green-600' : 'text-orange-600'}`}>
                                <FaCalendarDay className="inline mr-1" /> {order.orderStatus}
                            </p>
                        <img src={order.productId.imageUrl.split(',')[0]} className='h-24  w-24 object-cover object-center rounded-lg' alt=''/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyOrdersPage;
