import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Lottie from 'lottie-react';
import successAnim from '../animations/success.json';
import confirmationSound from '../data/mixkit-long-pop-2358.wav';

const Checkout = () => {
    const { cartItems, removeFromCart } = useCart();
    const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showOrderToast, setShowOrderToast] = useState(false);


    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.address || !formData.datetime) return;

        // Play confirmation sound
        const audio = new Audio(confirmationSound);
        audio.play();

        // Show Lottie success toast
        setShowOrderToast(true);

        // Hide toast and reload or redirect after 3 seconds
        setTimeout(() => {
            setShowOrderToast(false);
            setOrderPlaced(true);
            localStorage.removeItem('cart');
            // Optional: Redirect or reset form
            window.location.href = "/";
        }, 3000);
    };



    if (cartItems.length === 0 && !orderPlaced) {
        return <div className="text-center py-20 text-gray-500 text-xl">Your cart is empty.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-10">
                {!orderPlaced ? (
                    <>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-700">Checkout</h2>

                        {/* Cart Items */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3">Your Items</h3>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between bg-indigo-50 rounded-lg p-3 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-indigo-600 font-semibold">₹{item.price}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="text-right mt-4 font-bold text-lg text-indigo-700">
                                Total: ₹{totalPrice}
                            </div>
                        </div>

                        {/* User Details Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h3 className="text-lg font-semibold mb-2">Your Details</h3>

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-300"
                                />
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="9876543210"
                                    pattern="[0-9]{10}"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-300"
                                />
                            </div>

                            {/* Date & Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    name="datetime"
                                    value={formData.datetime}
                                    onChange={handleChange}
                                    required
                                    min={new Date().toISOString().slice(0, 16)}
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-300"
                                />
                            </div>

                            {/* Service Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service Address</label>
                                <textarea
                                    name="address"
                                    placeholder="Complete Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-300"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold"
                            >
                                Place Order
                            </button>
                        </form>

                    </>
                ) : (
                    <div className="text-center">
                        <Lottie animationData={successAnim} className="w-40 mx-auto mb-4" loop={false} />
                        <h2 className="text-2xl font-bold text-green-600">Order Placed Successfully!</h2>
                        <p className="text-gray-600 mt-2">Thank you for choosing our service.</p>
                    </div>
                )}
            </div>
            {showOrderToast && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
                    <div className="bg-white border border-green-300 shadow-2xl rounded-xl p-6 flex flex-col items-center animate-fadeInUp w-[90%] max-w-xs text-center">
                        <Lottie
                            animationData={successAnim}
                            loop={false}
                            className="w-24 h-24 mb-2"
                        />
                        <h3 className="text-lg font-semibold text-green-700">Order Placed Successfully!</h3>
                        <p className="text-sm text-gray-500 mt-1">We’ll be at your doorstep soon ✨</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;