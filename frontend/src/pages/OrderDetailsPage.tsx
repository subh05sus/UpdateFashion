/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../api-client';
import { FaShippingFast, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const OrderDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const fetchedOrder = await getOrderById(id!);
                setOrder(fetchedOrder);
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) {
        return <p className="text-gray-600">Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">Order Details <FaShippingFast className='text-orange-600'/> </h1>
            <div className="bg-slate-300 border hover:shadow-lg p-4 rounded-xl shadow-sm mb-6">
                <p className="text-lg text-gray-700"><span className="font-bold text-sm">Order ID:</span> {order._id}</p>
                <p className="text-lg text-orange-700 font-bold"><span className="font-bold text-gray-700 text-sm">Status:</span> {order.orderStatus}</p>
                <p className="text-lg text-gray-700"><span className="font-bold text-sm">Total:</span> INR {order.amountToBePaid} {order.alreadyPaid && <span>{`(Already Paid)`}</span>}</p>
            </div>

            <div className="flex justify-end bg-slate-300 border hover:shadow-lg p-4 rounded-xl shadow-sm">
                <div className=" flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{order.productId.title}</h3>
                    <p className="text-gray-700 text-xs">{order.productId.shortDescription}</p>
                    <p className="text-gray-700"> <span className="font-bold text-gray-700 text-sm">Size:</span> {order.size}</p>
                    <p className="text-gray-700"> <span className="font-bold text-gray-700 text-sm">Price:</span> {order.productId.price}</p>
                    <Link to={`/product/${order.productId._id}`} className="text-white px-4 py-2 rounded-lg bg-orange-600 hover:bg-gray-800  mt-2 inline-block">
                        View Product
                    </Link>
                </div>
                <img src={order.productId.imageUrl.split(',')[0]} alt='' className=' h-40 w-40 object-cover object-center rounded-lg'/>
            </div>

            <div className="bg-slate-300 border hover:shadow-lg p-4 rounded-xl shadow-sm mt-6">
            <h2 className="text-2xl font-bold text-gray-800  mb-2">Shipping Details:</h2>
                <p className="text-gray-700"><FaMapMarkerAlt className="inline text-orange-500" /> {order.address.addressLine1}</p>
                {order.address.addressLine2 && <p className="text-gray-700 ml-5">{order.address.addressLine2}</p>}
                <p className="text-gray-700 ml-5">{order.address.city}, {order.address.state}, {order.address.pinCode}</p>
                <p className="text-gray-700 mt-4"><FaPhone className="inline text-orange-500" /> <span className="font-bold text-gray-700 text-sm">Phone:</span> {order.phone}</p>
                <p className="text-gray-700"><FiMail className="inline text-orange-500" /> <span className="font-bold text-gray-700 text-sm">Email:</span> {order.email}</p>
            </div>

        </div>
    );
};

export default OrderDetailsPage;
