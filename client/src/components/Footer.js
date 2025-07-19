import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
    const navigate = useNavigate();

    const handleSectionClick = (e, hash) => {
        e.preventDefault();
        navigate(`/#${hash}`);
    };

    return (
        <footer className="bg-gray-900 text-gray-300 pt-14 pb-6 relative">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {/* Brand */}
                <div>
                    <h3 className="text-white text-2xl font-bold mb-4">Urban Services</h3>
                    <p className="leading-relaxed">Your one-stop destination for trusted home services.</p>
                </div>

                {/* Quick Links */}
                {/* <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a
                                href="/#hero"
                                onClick={(e) => handleSectionClick(e, 'hero')}
                                className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/#services"
                                onClick={(e) => handleSectionClick(e, 'services')}
                                className="hover:text-white transition"
                            >
                                Featured Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="/#service-area"
                                onClick={(e) => handleSectionClick(e, 'service-area')}
                                className="hover:text-white transition"
                            >
                                Service Areas
                            </a>
                        </li>
                    </ul>
                </div> */}

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Contact Us</h4>
                    <p>Email: <a href="mailto:support@urbanservices.com" className="hover:text-white transition">support@urbanservices.com</a></p>
                    <p>Phone: <a href="tel:+919876543210" className="hover:text-white transition">+91-98765-43210</a></p>
                    <p>Hours: Mon - Sat: 9am - 8pm</p>
                </div>

                {/* Social */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
                    <div className="flex space-x-4 text-xl">
                        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-transform duration-300"><FaFacebookF /></a>
                        <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-transform duration-300"><FaTwitter /></a>
                        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-transform duration-300"><FaInstagram /></a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Urban Services. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;