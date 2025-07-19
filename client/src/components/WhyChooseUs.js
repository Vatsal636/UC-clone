import React from "react";

const features = [
    {
        title: "Trusted Professionals",
        description: "Verified and trained experts to ensure top-quality service every time.",
        icon: "🧰",
    },
    {
        title: "Seamless Booking",
        description: "Book your service in just a few clicks. Simple, fast, and convenient.",
        icon: "📲",
    },
    {
        title: "Transparent Pricing",
        description: "No hidden charges. What you see is what you pay.",
        icon: "💰",
    },
    {
        title: "On-Time Service",
        description: "We respect your time. Timely arrival, every time.",
        icon: "⏱️",
    },
];

const WhyChooseUs = () => {
    return (
        <section id="why-choose-us" className="py-24 bg-gradient-to-b from-slate-100 to-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
                    Why Choose Us
                </h2>
                <p className="text-gray-600 text-lg mb-14 max-w-2xl mx-auto">
                    We’re committed to making your life easier with reliable, convenient, and professional services.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-gradient-to-r hover:from-indigo-500 hover:to-purple-500 group"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
