import React, { useState, useEffect } from 'react';

import Lottie from 'lottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

import servicesData from '../data/servicesData';
import successAnim from '../animations/success.json';
import confirmationSound from '../data/mixkit-long-pop-2358.wav';

const categories = ["All", ...Array.from(new Set(servicesData.map(s => s.category)))];

const Services = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedService, setSelectedService] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [showCartToast, setShowCartToast] = useState(false);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    const filteredServices = servicesData.filter(service => {
        const matchesCategory =
            selectedCategory === "All" || service.category === selectedCategory;
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 800); // simulate fetch
        return () => clearTimeout(timer);
    }, [searchTerm, selectedCategory]);

    const handleAddToCart = (service) => {
        addToCart(service); // Call context function
        const audio = new Audio(confirmationSound);
        audio.play();
        setShowCartToast(true);
        setTimeout(() => setShowCartToast(false), 2000);
    };

    return (
        <div className="min-h-screen px-4 md:px-12 py-10 bg-gradient-to-tl from-blue-50 to-white relative">
            <h1
                className="text-4xl md:text-5xl font-bold text-center mb-8"
                data-aos="fade-up"
            >
                Explore Our Services
            </h1>

            {/* Search Input */}
            <div className="flex justify-center mb-6" data-aos="fade-up" data-aos-delay="100">
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
            </div>

            {/* Category Filters */}
            <div className="block md:hidden mb-6" data-aos="fade-up" data-aos-delay="150">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full max-w-xs mx-auto block px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="hidden md:flex flex-wrap justify-center gap-3 mb-10" data-aos="fade-up" data-aos-delay="200">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition duration-200 ${selectedCategory === category
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-100"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Service Cards or Loader */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 animate-pulse"
                        >
                            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-full mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-5/6 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="flex space-x-2">
                                <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
                                <div className="flex-1 h-8 bg-gray-300 rounded-lg"></div>
                            </div>
                        </div>
                    ))
                ) : filteredServices.length === 0 ? (
                    <p className="text-center text-gray-600 col-span-full">No services found.</p>
                ) : (
                    filteredServices.map((service, i) => (
                        <div
                            key={service.id}
                            data-aos="zoom-in"
                            data-aos-delay={(i % 4) * 100}
                            className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col justify-between border border-gray-100"
                        >
                            <div className="relative group">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute top-2 left-2 bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                                    {service.category}
                                </span>
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>

                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                    {service.description || "Get top-quality service right at your home with experienced professionals."}
                                </p>

                                {(() => {
                                    const rating = Math.floor(Math.random() * 3) + 3; // random rating between 3 and 5
                                    const totalReviews = Math.floor(Math.random() * 200) + 50; // random reviews between 50 and 250
                                    return (
                                        <div className="flex items-center mt-2 space-x-1 text-yellow-400 text-sm">
                                            {[...Array(5)].map((_, index) => (
                                                <span key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'}>
                                                    ★
                                                </span>
                                            ))}
                                            <span className="text-gray-500 ml-1">({totalReviews})</span>
                                        </div>
                                    );
                                })()}


                                <div className="mt-2 text-lg font-bold text-indigo-700">₹{service.price}</div>

                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => handleAddToCart(service)}
                                        className="flex-1 bg-white-950 border-y-2 border-x-2 text-gray-800 py-2 rounded-lg font-medium hover:bg-stone-200 transition flex items-center justify-center gap-2 text-sm"
                                    >
                                        <FaShoppingCart /> Add to Cart
                                    </button>
                                    <button
                                        onClick={() => setSelectedService(service)}
                                        className="flex-1 bg-indigo-500 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition text-sm"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {selectedService && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center transition-all duration-300 ease-out"
                >
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 w-11/12 max-w-md shadow-2xl relative transform scale-95 opacity-0 animate-fadeZoom border border-indigo-100">

                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-3xl font-bold transition"
                            onClick={() => setSelectedService(null)}
                        >
                            &times;
                        </button>

                        <div className="text-center mb-4">
                            <h2 className="text-3xl font-extrabold text-indigo-700">Book Your Service</h2>
                            <p className="text-gray-600 mt-1">We’ll be at your doorstep soon!</p>
                        </div>

                        <div className="flex items-center gap-4 p-3 rounded-lg bg-indigo-50 shadow-inner mb-5">
                            <img src={selectedService.image} alt={selectedService.name} className="w-16 h-16 object-cover rounded-lg border" />
                            <div>
                                <p className="font-semibold text-gray-800 text-lg">{selectedService.name}</p>
                                <p className="text-indigo-600 font-medium text-sm">₹{selectedService.price}</p>
                            </div>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const audio = new Audio(confirmationSound);
                                audio.play();
                                setShowToast(true);
                                setSelectedService(null);
                                setTimeout(() => setShowToast(false), 3000);
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    pattern="[0-9]{10}"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    required
                                    min={new Date().toISOString().slice(0, 16)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Address</label>
                                <textarea
                                    placeholder="Complete Address"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
                            >
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            )}


            {/* Toast */}
            {showToast && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"
                    data-aos="fade-up"
                >
                    <div className="bg-white rounded-xl p-6 shadow-xl border border-green-200 animate-fadeInUp w-[90%] max-w-xs text-center">
                        <Lottie
                            animationData={successAnim}
                            loop={false}
                            className="w-24 h-24 mx-auto mb-2"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">Booking Confirmed!</h3>
                        <p className="text-sm text-gray-500 mt-1">Thank you for trusting us!</p>
                    </div>
                </div>
            )}
            {showCartToast && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"
                    data-aos="fade-up"
                >
                    <div className="fixed top-6 right-6 z-[9999] bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeInUp pointer-events-none">
                        <FaShoppingCart className="text-white text-lg" />
                        <span className="text-sm font-medium">Item added to cart!</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;