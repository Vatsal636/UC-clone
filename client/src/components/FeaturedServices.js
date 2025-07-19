import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import cleaningAnim from '../animations/cleaning.json';
import repairAnim from '../animations/repair.json';
import salonAnim from '../animations/salon.json';
import electricAnim from '../animations/electric.json';
import plumbingAnim from '../animations/plumbing.json';
import movingAnim from '../animations/moving.json';
import successAnim from '../animations/success.json';
import confirmationSound from '../data/mixkit-long-pop-2358.wav';

const services = [
    {
        title: 'Home Cleaning',
        tagline: 'Sparkling clean, stress-free!',
        description: 'Deep cleaning services for every corner of your home.',
        animation: cleaningAnim,
    },
    {
        title: 'Appliance Repair',
        tagline: 'Quick fixes. No stress.',
        description: 'Fix your AC, fridge, or washing machine quickly.',
        animation: repairAnim,
    },
    {
        title: 'Salon at Home',
        tagline: 'Feel fabulous, instantly.',
        description: 'Beauty and grooming services in the comfort of your home.',
        animation: salonAnim,
    },
    {
        title: 'Electric Services',
        tagline: 'Wiring worries? We’re on it.',
        description: 'Fan, light, wiring – all done professionally.',
        animation: electricAnim,
    },
    {
        title: 'Plumbing',
        tagline: 'Leaks? Blocked drains? Sorted.',
        description: 'Fix leaks, blockages, and installations easily.',
        animation: plumbingAnim,
    },
    {
        title: 'Packing & Moving',
        tagline: 'Your stuff. Safe & smooth.',
        description: 'Relocation help made simple and affordable.',
        animation: movingAnim,
    },
];

const FeaturedServices = () => {
    const navigate = useNavigate();
    const carouselRef = useRef(null);
    const [centerIndex, setCenterIndex] = useState(services.length);
    const activeDotIndex = centerIndex % services.length;

    const [selectedService, setSelectedService] = useState(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const cardWidth = carouselRef.current?.children[0]?.offsetWidth + 16 || 300;
        carouselRef.current.scrollLeft = cardWidth * centerIndex;
    }, []);

    const scrollToCard = (direction) => {
        const carousel = carouselRef.current;
        if (!carousel || !carousel.children.length) return;

        const cardWidth = carousel.children[0].offsetWidth + 16;
        let newIndex = centerIndex + (direction === 'left' ? -1 : 1);

        if (newIndex < services.length) {
            newIndex += services.length;
            carousel.scrollLeft += cardWidth * services.length;
        } else if (newIndex >= services.length * 2) {
            newIndex -= services.length;
            carousel.scrollLeft -= cardWidth * services.length;
        }

        setCenterIndex(newIndex);
        carousel.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
    };

    return (
        <section id="services" className="py-16 bg-gradient-to-b from-slate-100 to-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-6">
                    Featured Services
                </h2>
                <p className="text-center text-gray-600 text-lg mb-14">
                    Your convenience, our commitment. Explore the top services we offer.
                </p>

                {/* Mobile Carousel */}
                <div className="sm:hidden mb-10">
                    <div className="relative">
                        <div ref={carouselRef} className="flex overflow-x-hidden snap-x snap-mandatory gap-6 px-4">
                            {services.concat(services, services).map((service, index) => (
                                <div
                                    key={index}
                                    className="snap-center flex-shrink-0 w-[85%] bg-white/30 backdrop-blur-md border border-slate/50 rounded-2xl p-6 transition-transform duration-300"
                                >
                                    <div className="w-24 h-24 mx-auto mb-5 flex items-center justify-center rounded-full shadow-inner bg-slate-100">
                                        <Lottie animationData={service.animation} loop autoplay />
                                    </div>
                                    <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm font-medium text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 mb-2">
                                        {service.tagline}
                                    </p>
                                    <p className="text-sm text-gray-600 text-center mb-6 px-2">
                                        {service.description}
                                    </p>
                                    <div className="flex justify-center">
                                        <button
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-6 py-2 rounded-full shadow-lg transition-all duration-300"
                                            onClick={() => setSelectedService(service)}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-4 space-x-2">
                            {services.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 w-2 rounded-full transition-all duration-300 ${activeDotIndex === index ? 'bg-indigo-600 w-4' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center gap-6 mt-6">
                            <button
                                onClick={() => scrollToCard('left')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-md"
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                onClick={() => scrollToCard('right')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-md"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="relative bg-white/30 backdrop-blur-md border border-slate/50 rounded-2xl p-6 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-t-4 hover:border-r-0 hover:border-b-0 hover:border-l-0 hover:border-indigo-500 group"
                        >
                            <div className="w-24 h-24 mx-auto mb-5 flex items-center justify-center rounded-full shadow-inner bg-slate-100 transition-transform duration-300 group-hover:scale-110">
                                <Lottie animationData={service.animation} loop autoplay />
                            </div>
                            <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                                {service.title}
                            </h3>
                            <p className="text-sm font-medium text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 mb-2">
                                {service.tagline}
                            </p>
                            <p className="text-sm text-gray-600 text-center mb-6 px-2">
                                {service.description}
                            </p>
                            <div className="flex justify-center">
                                <button
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-6 py-2 rounded-full shadow-lg transition-all duration-300 group-hover:-translate-y-1"
                                    onClick={() => setSelectedService(service)}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <button
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                navigate('/services');
                        }}
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-medium text-sm sm:text-base shadow-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Browse All Services
                    </button>
                </div>

            </div>

            {/* Booking Modal */}
            {selectedService && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-2xl relative transition-all duration-300 transform scale-95 animate-fadeZoom">
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
                            <Lottie
                                animationData={selectedService.animation}
                                className="w-16 h-16 object-cover rounded-lg border"
                                loop
                                autoplay
                            />
                            <div>
                                <p className="font-semibold text-gray-800 text-lg">{selectedService.title}</p>
                                <p className="text-indigo-600 font-medium text-sm">{selectedService.tagline}</p>
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
                <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
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
        </section>
    );
};

export default FeaturedServices;