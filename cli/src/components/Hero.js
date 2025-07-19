import React, { useEffect, useState } from 'react';
import { FaStar, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const HeroSection = () => {
    const navigate = useNavigate(); // ✅ Hook for navigation

    const services = [
        { name: "Women's Salon & Spa", icon: "💇‍♀️", color: "bg-pink-50", textColor: "text-pink-600" },
        { name: "Men's Salon & Massage", icon: "💇‍♂️", color: "bg-blue-50", textColor: "text-blue-600" },
        { name: "AC & Appliance Repair", icon: "❄️", color: "bg-teal-50", textColor: "text-teal-600" },
        { name: "Cleaning & Pest Control", icon: "🧹", color: "bg-green-50", textColor: "text-green-600" },
        { name: "Electrician, Plumber & Carpenter", icon: "🔧", color: "bg-yellow-50", textColor: "text-yellow-600" },
        { name: "Native Water Purifier", icon: "💧", color: "bg-cyan-50", textColor: "text-cyan-600" },
        { name: "Painting & Waterproofing", icon: "🎨", color: "bg-purple-50", textColor: "text-purple-600" },
        { name: "Wall Panels", icon: "🧱", color: "bg-orange-50", textColor: "text-orange-600" }
    ];

    const taglines = [
        {
            blackPart: "Home services",
            colorPart: " at your doorstep",
            color: "text-blue-600"
        },
        {
            blackPart: "Trusted Professionals,",
            colorPart: " Anytime",
            color: "text-blue-600"
        },
        {
            blackPart: "One Stop Solution",
            colorPart: " for All Your Needs",
            color: "text-blue-600"
        }
    ];

    const [displayedText, setDisplayedText] = useState('');
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    const currentTagline = taglines[taglineIndex];
    const fullText = currentTagline.blackPart + currentTagline.colorPart;

    useEffect(() => {
        const speed = deleting ? 30 : 100;
        const delay = deleting || charIndex < fullText.length ? speed : 1500;

        const timer = setTimeout(() => {
            if (!deleting && charIndex < fullText.length) {
                setDisplayedText(fullText.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            } else if (deleting && charIndex > 0) {
                setDisplayedText(fullText.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            } else if (!deleting && charIndex === fullText.length) {
                setTimeout(() => setDeleting(true), 1000);
            } else if (deleting && charIndex === 0) {
                setDeleting(false);
                setTaglineIndex((taglineIndex + 1) % taglines.length);
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [charIndex, deleting, taglineIndex]);

    const blackLength = currentTagline.blackPart.length;
    const colorClass = currentTagline.color;

    const blackText = displayedText.slice(0, Math.min(blackLength, displayedText.length));
    const colorText = displayedText.slice(blackLength);

    return (
        <div id='hero' className="py-6 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                {/* Typewriter Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-20">
                    <span className="text-black">{blackText}</span>
                    <span className={`ml-1 ${colorClass}`}>{colorText}</span>
                    <span className="blinking-cursor">|</span>
                </h1>

                {/* Grid: Left Services | Right Images + Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start">
                    {/* Left: Services */}
                    <div>
                        <h2 className="text-xl md:text-2xl text-center text-gray-600 mb-6 font-medium">
                            What are you looking for?
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {services.map((service, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                            navigate('/');
                                            window.scrollTo({ top: 0, behavior: 'instant' });
                                        } 
                                    }
                                    className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
                                >
                                    <div className="text-center">
                                        <div className={`h-10 w-12 mx-auto ${service.color} rounded-xl flex items-center justify-center shadow-inner`}>
                                            <span className={`text-2xl ${service.textColor}`}>{service.icon}</span>
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-800">{service.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Images + Stats */}
                    <div className="flex flex-col gap-8">
                        <div className="hidden sm:grid grid-cols-2 grid-rows-6 gap-4 lg:h-[360px] h-auto">
                            <img
                                src="https://images.unsplash.com/photo-1718364673405-14a782b64f7a?q=80&w=2127&auto=format&fit=crop"
                                alt="Salon"
                                className="w-full h-full object-cover rounded-xl row-span-4"
                            />
                            <img
                                src="https://plus.unsplash.com/premium_photo-1682126012378-859ca7a9f4cf?w=600&auto=format&fit=crop"
                                alt="Massage"
                                className="w-full h-full object-cover rounded-xl row-span-2"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1676210133055-eab6ef033ce3?q=80&w=1941&auto=format&fit=crop"
                                alt="Repair"
                                className="w-full h-full object-cover rounded-xl row-span-4"
                            />
                            <img
                                src="https://plus.unsplash.com/premium_photo-1661405901537-79b6628d6061?w=600&auto=format&fit=crop"
                                alt="Cleaning"
                                className="w-full h-full object-cover rounded-xl row-span-2"
                            />
                        </div>

                        {/* Stats Below Images */}
                        <div className="flex justify-center items-center gap-12 text-center">
                            <div className="flex flex-col items-center animate-fade-in">
                                <FaStar className="text-2xl text-yellow-500 mb-2" />
                                <p className="text-4xl font-bold text-blue-600">4.8</p>
                                <p className="text-gray-600 mt-1 text-xs uppercase tracking-wider">Service Rating*</p>
                            </div>
                            <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
                            <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
                                <FaUsers className="text-2xl text-gray-700 mb-2" />
                                <p className="text-4xl font-bold text-blue-600">12M+</p>
                                <p className="text-gray-600 mt-1 text-xs uppercase tracking-wider">Customers Globally*</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Extra styles */}
            <style jsx global>{`
                .blinking-cursor {
                    font-weight: 100;
                    font-size: 2rem;
                    color: #3b82f6;
                    animation: blink 1s step-start infinite;
                }

                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default HeroSection;
