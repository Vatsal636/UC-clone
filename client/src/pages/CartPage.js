import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import emptyCartAnim from '../animations/empty-cart.json';

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();
    const [grandTotal, setGrandTotal] = useState(0);

    const getTotal = () => cartItems.reduce((sum, item) => sum + item.price, 0);
    const gst = Math.round(getTotal() * 0.05);

    useEffect(() => {
        let start = 0;
        const end = getTotal() + gst;
        const duration = 500;
        const increment = Math.ceil(end / (duration / 30));
        const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
                start = end;
                clearInterval(counter);
            }
            setGrandTotal(start);
        }, 30);
        return () => clearInterval(counter);
    }, [cartItems]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f6f3f6] to-[#f3f3f3] px-4 sm:px-12 py-20 relative">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-sm">
                Your Cart 🛒
            </h1>

            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-16 text-center">
                    <Lottie animationData={emptyCartAnim} className="w-60 h-60" />
                    <p className="text-lg text-gray-600 mt-4">Oops! Your cart is empty.</p>
                    <Link to="/services">
                        <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-md">
                            Browse Services
                        </button>
                    </Link>
                </div>
            ) : (
                <>
                    {/* Items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                className="relative bg-white/50 backdrop-blur-lg border border-indigo-100 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                            >
                                {/* Delete Button */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="absolute top-3 right-3 z-20 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full text-sm transition"
                                    title="Remove"
                                >
                                    <FaTrash />
                                </button>

                                {/* Image */}
                                <div className="relative z-10 overflow-hidden rounded-xl">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                    <div className="mt-3 text-xl font-bold text-indigo-700">₹{item.price}</div>
                                </div>
                            </div>

                        ))}
                    </div>

                    {/* Order Summary Card */}
                    <div className="max-w-xl mx-auto mt-20 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-indigo-100 p-6 sticky top-24">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{getTotal()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GST (5%)</span>
                                <span>₹{gst}</span>
                            </div>
                            <hr className="my-3" />
                            <div className="flex justify-between text-lg font-semibold text-indigo-700">
                                <span>Total</span>
                                <span>₹{grandTotal}</span>
                            </div>
                        </div>
                        <Link to="/checkout">
                            <button className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 shadow-lg transition">
                                Proceed to Checkout
                            </button>
                        </Link>
                        <Link to="/services">
                            <p className="mt-4 text-sm text-center text-indigo-500 hover:underline">
                                ← Continue Shopping
                            </p>
                        </Link>
                    </div>

                    {/* Sticky Mobile Checkout Bar */}
                    <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-inner p-4 z-50 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="text-xl font-bold text-indigo-700">₹{grandTotal}</p>
                        </div>
                        <Link to="/checkout" className="w-1/2">
                            <button className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-full hover:bg-indigo-700 transition">
                                Checkout
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;