/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../api-client';
import { FaCalendarDay } from 'react-icons/fa';
import { CgBox, CgPhone, CgProfile, CgSize } from 'react-icons/cg';
import { AiOutlineEdit } from 'react-icons/ai';

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [newStatus, setNewStatus] = useState<string>('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getAllOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: string) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, orderStatus: newStatus } : order
                )
            );
            setNewStatus('');
            setSelectedOrderId(null);
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    if (orders.length === 0) {
        return <p className="text-center text-gray-700">No Orders Found</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">All Orders</h1>
            <ul className="space-y-6">
                {orders.map(order => (
                    <li key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-lg border border-gray-200 flex flex-col lg:flex-row lg:justify-between">
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xs font-semibold text-gray-800">Order ID: {order._id}</h2>

                            </div>
                            <div className="flex items-center mb-2">
                                <p className="text-lg font-bold text-gray-900">Total: INR {order.amountToBePaid}</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <CgBox className="text-gray-500 mr-2" />
                                <p className="text-gray-700 text-sm">Item: {order.productId.title}</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <CgSize className="text-gray-500 mr-2" />
                                <p className="text-gray-700 text-sm">Size: {order.size}</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <CgProfile className="text-gray-500 mr-2" />
                                <p className="text-gray-700 text-sm">Name: {order.userId.firstName} {order.userId.lastName}</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <CgPhone className="text-gray-500 mr-2" />
                                <p className="text-gray-700 text-sm">Phone: {order.phone} </p>
                            </div>
                            <div className="flex items-center mb-2">
                                <img src={order.productId.imageUrl.split(',')[0]} className="h-24 w-24 object-cover object-center rounded-lg" alt="" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start gap-3 items-end">
                        <p className={`text-sm font-medium ${order.orderStatus === 'DELIVERED' ? 'text-green-600' : `${order.orderStatus === 'CANCELED' ? 'text-red-600' : 'text-yellow-600'}`}`}>
                                    <FaCalendarDay className="inline mr-1" /> {order.orderStatus}
                                </p>
                            <button
                                onClick={() => setSelectedOrderId(order._id)}
                                className="bg-orange-600 w-fit text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700 transition"
                            >
                                <AiOutlineEdit className="inline" /> Update Status
                            </button>
                            {selectedOrderId === order._id && (
                                <div className="mt-4 lg:mt-0 lg:ml-4">
                                    <select
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        className="border border-gray-300 rounded-lg p-2 mr-2"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="ORDER PLACED">Order Placed</option>
                                        <option value="ORDER CONFIRMED">Order Confirmed</option>
                                        <option value="ORDER PROCESSING">Order Processing</option>
                                        <option value="DISPATCHED">Dispatched</option>
                                        <option value="IN TRANSIT">In Transit</option>
                                        <option value="OUT FOR DELIVERY">Out for Delivery</option>
                                        <option value="DELIVERED">Delivered</option>
                                        <option value="CANCELED">Canceled</option>
                                    </select>
                                    <button
                                        onClick={() => handleStatusChange(order._id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Update
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminOrdersPage;
