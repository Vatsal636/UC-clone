import React from "react";

const steps = [
    {
        title: "Choose a Service",
        description: "Browse through our wide range of trusted urban services.",
        icon: "🛠️",
    },
    {
        title: "Schedule a Slot",
        description: "Pick a date and time that works best for you.",
        icon: "📅",
    },
    {
        title: "Relax & Get Served",
        description: "Sit back while our professional completes the service.",
        icon: "🛋️",
    },
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-slate-200">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
                    How It Works
                </h2>
                <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
                    Getting started is easy! Follow these 3 simple steps to get the service you need.
                </p>

                <div className="relative grid gap-12 md:grid-cols-3 items-start">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center text-center px-4"
                        >
                            {/* Connecting line (horizontal) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 right-[-50%] w-[100%] h-1 bg-gradient-to-r from-indigo-400 to-purple-500 z-0" />
                            )}

                            <div className="relative z-10 bg-white p-6 rounded-full shadow-md text-4xl mt-2 mb-6">
                                {step.icon}
                            </div>

                            {/* Step Number */}
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                                {index + 1}
                            </span>

                            <h3 className="text-xl font-bold text-gray-800 mb-1">{step.title}</h3>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;