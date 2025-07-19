import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

function DownloadApp() {
    return (
        <section id="download-app" className="py-20 bg-indigo-50">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-center md:text-left space-y-4">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Get the Urban Services App
                    </h2>
                    <p className="text-gray-600 max-w-md">
                        Book trusted professionals on the go. Fast, secure, and reliable services delivered at your doorstep.
                    </p>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <a
                            href="https://play.google.com/store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 hover:scale-110 transition"
                        >
                            <FaGooglePlay size={20} />
                            <span>Play Store</span>
                        </a>

                        <a
                            href="https://www.apple.com/in/app-store/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 hover:scale-110 transition"
                        >
                            <FaApple size={20} />
                            <span>App Store</span>
                        </a>
                    </div>
                </div>

                <img
                    src="https://cdn-icons-png.flaticon.com/512/2983/2983067.png"
                    alt="Mobile App"
                    className="w-56 h-56 object-contain mx-auto md:mx-0"
                />
            </div>
        </section>
    );
}

export default DownloadApp;