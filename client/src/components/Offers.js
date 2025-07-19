import React, { useState, useEffect } from "react";

const offers = [
    {
        title: "Flat 20% Off",
        description: "Enjoy 20% off on your first service. Use code below!",
        icon: "🎉",
        badge: "New User",
        coupon: "WELCOME20",
        expiresIn: 7200, // seconds (2 hours)
    },
    {
        title: "Combo Deal",
        description: "Book Cleaning + Repair together and save big!",
        icon: "🧼🔧",
        badge: "Popular",
        coupon: "COMBO50",
        expiresIn: 14400, // 4 hours
    },
    {
        title: "Refer & Earn ₹100",
        description: "Refer friends and earn ₹100 per referral.",
        icon: "👯",
        badge: "Rewards",
        coupon: "REFER100",
        expiresIn: 86400, // 24 hours
    },
];

const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
};

const Offers = () => {
    const [timers, setTimers] = useState(
        offers.map((offer) => offer.expiresIn)
    );
    const [activeOffer, setActiveOffer] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers((prev) =>
                prev.map((t) => (t > 0 ? t - 1 : 0))
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCopy = (coupon) => {
        navigator.clipboard.writeText(coupon);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <section id="offers" className="py-24 bg-gradient-to-b from-white to-slate-100">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
                    Exclusive Offers
                </h2>
                <p className="text-gray-600 text-lg mb-14 max-w-2xl mx-auto">
                    Grab our best deals before they expire!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {offers.map((offer, index) => (
                        <div
                            key={index}
                            className="relative bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-gradient-to-r hover:from-purple-500 hover:to-indigo-500 group"
                        >
                            <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                {offer.badge}
                            </span>

                            <div className="text-5xl mb-4">{offer.icon}</div>

                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {offer.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">{offer.description}</p>

                            <div className="bg-indigo-100 text-indigo-800 font-mono text-sm px-3 py-1 rounded-full inline-block mb-3 cursor-pointer hover:bg-indigo-200 transition"
                                onClick={() => handleCopy(offer.coupon)}>
                                {offer.coupon} {copied && <span className="text-green-600 ml-2">✔ Copied</span>}
                            </div>

                            <p className="text-xs text-gray-500 mb-4">
                                Expires in: <span className="font-semibold">{formatTime(timers[index])}</span>
                            </p>

                            <button
                                onClick={() => setActiveOffer(offer)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2 rounded-full transition duration-300 group-hover:-translate-y-1 shadow-md"
                            >
                                Claim Offer
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {activeOffer && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-xl">
                        <button
                            className="absolute top-3 right-4 text-gray-600 text-2xl"
                            onClick={() => setActiveOffer(null)}
                        >
                            &times;
                        </button>

                        <div className="text-6xl mb-3 text-center">{activeOffer.icon}</div>
                        <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                            {activeOffer.title}
                        </h3>
                        <p className="text-center text-sm text-gray-700 mb-4">
                            {activeOffer.description}
                        </p>

                        <div className="text-center bg-indigo-100 text-indigo-800 font-mono text-sm px-4 py-2 rounded-full inline-block mb-3">
                            Coupon Code: <span className="font-bold">{activeOffer.coupon}</span>
                        </div>

                        <p className="text-xs text-center text-gray-500 mb-4">
                            Offer expires in: <span className="font-semibold">{formatTime(activeOffer.expiresIn)}</span>
                        </p>

                        <div className="flex justify-center">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full">
                                Apply Offer & Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Offers;
