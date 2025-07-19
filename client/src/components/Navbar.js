import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import servicesData from "../data/servicesData";
import { AuthContext } from '../context/AuthContext';
import {
    FaChevronDown,
    FaSearch,
    FaUser,
    FaShoppingCart,
    FaCrosshairs,
    FaHistory,
    FaSpinner,
    FaTimes,
    FaHome
} from 'react-icons/fa';

const POPULAR_CITIES = ['Bangalore', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune'];
const ALL_CITIES = [
    'Connaught Place, New Delhi', 'Ahmedabad', 'Gurgaon', 'Noida', 'Ghaziabad', 'Faridabad',
    'Bangalore', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune'
];
const UNIQUE_CATEGORIES = Array.from(
    new Set(servicesData.map(service => service.category))
).slice(0, 4);

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { cartCount } = useCart();

    const [showServices, setShowServices] = useState(false);
    const [showCityPopup, setShowCityPopup] = useState(false);
    const [selectedCity, setSelectedCity] = useState('Connaught Place, New Delhi');
    const [locationInput, setLocationInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState(null);
    const [recentLocations, setRecentLocations] = useState([
        'Connaught Place, New Delhi', 'Gurgaon', 'Noida'
    ]);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const filterCities = useCallback((input) => {
        if (!input) return [];
        return ALL_CITIES.filter(city =>
            city.toLowerCase().includes(input.toLowerCase())
        );
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilteredCities(filterCities(locationInput));
        }, 300);
        return () => clearTimeout(timer);
    }, [locationInput, filterCities]);


    useEffect(() => {
        const isAuth = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(isAuth);
    }, []);



    const addToRecentLocations = useCallback((location) => {
        setRecentLocations(prev =>
            [location, ...prev.filter(l => l !== location)].slice(0, 3)
        );
    }, []);


    const handleUseCurrentLocation = useCallback(async () => {
        setIsLocating(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by this browser.");
            setIsLocating(false);
            return;
        }

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 10000,
                    maximumAge: 60000
                });
            });

            const { latitude, longitude } = position.coords;
            const location = await reverseGeocode(latitude, longitude);

            // Check if location exists in the city list
            const matchedCity = ALL_CITIES.find(city =>
                city.toLowerCase().includes(location.toLowerCase())
            );

            if (matchedCity) {
                setSelectedCity(matchedCity);
                addToRecentLocations(matchedCity);
                setShowCityPopup(false);
            } else {
                setLocationError("We are not serving in your area right now.");
            }

        } catch (error) {
            setLocationError(
                error.code === error.PERMISSION_DENIED
                    ? "Location access denied. Please enable location services."
                    : "Could not determine your location."
            );
        } finally {
            setIsLocating(false);
        }
    }, [addToRecentLocations]);


    const reverseGeocode = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch location");
            }

            const data = await response.json();
            const { city, town, village, state_district, county, state } = data.address;

            // Prefer most accurate available value
            return city || town || village || state_district || county || state || "Unknown Location";

        } catch (error) {
            throw new Error("Unable to fetch location name");
        }
    };


    const handleLocationSelect = useCallback((city) => {
        setSelectedCity(city);
        addToRecentLocations(city);
        setShowCityPopup(false);
        setLocationInput('');
    }, [addToRecentLocations]);


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showCityPopup && !e.target.closest('.city-selector')) {
                setShowCityPopup(false);
            }
            if (showServices && !e.target.closest('.services-dropdown')) {
                setShowServices(false);
            }
            if (showAccountMenu && !e.target.closest('.account-menu')) {
                setShowAccountMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [showCityPopup, showServices, showAccountMenu]);

    const renderCityPopup = () => (
        <div className={`city-selector absolute left-0 mt-2 bg-white shadow-xl rounded-lg p-4 z-50 ${window.innerWidth < 768 ? 'w-[90vw]' : 'min-w-[320px]'}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-base">Select Location</h3>
                <button
                    onClick={() => setShowCityPopup(false)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <FaTimes />
                </button>
            </div>

            {/* Input Search */}
            <div className="relative mb-4">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search for area, street name..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    autoFocus
                />
            </div>

            {/* Use Current Location Button */}
            <button
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 mb-4 text-sm rounded-lg transition-colors ${isLocating ? 'bg-gray-100 text-gray-600' : 'text-blue-600 hover:bg-blue-50'}`}
                onClick={handleUseCurrentLocation}
                disabled={isLocating}
            >
                {isLocating ? (
                    <>
                        <FaSpinner className="animate-spin" />
                        Detecting...
                    </>
                ) : (
                    <>
                        <FaCrosshairs />
                        Use my current location
                    </>
                )}
            </button>

            {/* Error Message */}
            {locationError && (
                <div className="text-red-500 text-sm mb-4 text-center">
                    {locationError}
                </div>
            )}

            {/* Filtered Search Results */}
            {locationInput ? (
                <div className="mb-4 max-h-[200px] overflow-y-auto">
                    {filteredCities.length > 0 ? (
                        filteredCities.map((city, index) => (
                            <div
                                key={`search-${index}`}
                                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                                onClick={() => handleLocationSelect(city)}
                            >
                                {city}
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-sm text-center text-gray-500">
                            No locations found
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {/* Recent Locations */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase mb-2">
                            <FaHistory />
                            Recent Locations
                        </div>
                        <div className="space-y-1">
                            {recentLocations.map((location, index) => (
                                <div
                                    key={`recent-${index}`}
                                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                                    onClick={() => handleLocationSelect(location)}
                                >
                                    {location}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Popular Cities */}
                    <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-2">
                            Popular Cities
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {POPULAR_CITIES.map((city, index) => (
                                <div
                                    key={`popular-${index}`}
                                    className="px-3 py-1 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                                    onClick={() => handleLocationSelect(city)}
                                >
                                    {city}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 md:px-10 py-4 lg:py-1">
            {/* DESKTOP VIEW */}
            <div className="hidden md:flex justify-between items-center h-[70px]">
                {/* Left Section */}
                <div className="flex items-center gap-4 md:gap-8">
                    {/* Logo */}
                    <div className="text-xl font-bold text-gray-800 cursor-pointer font-sans"
                        onClick={() => navigate('/')}
                    >
                        UrbanCompany
                    </div>

                    {/* Services Dropdown */}
                    <div className="relative services-dropdown">
                        <button
                            className="flex items-center gap-1 px-3 py-2 text-sm md:text-base font-medium text-gray-800 rounded hover:bg-gray-100 transition-colors"
                            onClick={() => setShowServices(!showServices)}
                        >
                            Services <FaChevronDown className={`text-xs text-gray-500 transition-transform ${showServices ? 'rotate-180' : ''}`} />
                        </button>

                        {showServices && (
                            <div className="absolute left-0 top-full bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50">
                                {UNIQUE_CATEGORIES.map((category, index) => (
                                    <a
                                        key={index}
                                        onClick={() => {
                                            setShowServices(false);
                                            navigate('/services', { state: { category } });
                                            window.scrollTo({ top: 0, behavior: 'instant' });
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        {category}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* City Selector */}
                    <div className="relative city-selector">
                        <button
                            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100 transition-colors"
                            onClick={() => setShowCityPopup(!showCityPopup)}
                        >
                            {selectedCity} <FaChevronDown className={`text-xs text-gray-500 transition-transform ${showCityPopup ? 'rotate-180' : ''}`} />
                        </button>

                        {showCityPopup && renderCityPopup()}
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3 md:gap-5">
                    {/* Search Bar */}
                    {/* <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-gray-200 transition-all w-[200px] lg:w-[250px]">
                        <FaSearch className="text-gray-500 text-sm mr-2" />
                        <input
                            type="text"
                            placeholder="Search for services..."
                            className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div> */}

                    {/* Cart */}
                    <button
                        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => {
                            navigate('/cart');
                            window.scrollTo({ top: 0, behavior: 'instant' });
                        }
                        }
                    >
                        <FaShoppingCart className="text-gray-800 text-lg" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </button>


                    {/* Account Button with Dropdown (Desktop) */}
                    <div className="relative account-menu hidden lg:block">
                        <button
                            onClick={() => setShowAccountMenu(!showAccountMenu)}
                            className="flex items-center gap-1 px-3 py-2 text-black font-semibold"
                        >
                            <FaUser className="text-black" />
                            <span>Account</span>
                        </button>

                        {showAccountMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
                                {user ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                navigate('/profile');
                                                setShowAccountMenu(false);
                                                window.scrollTo({ top: 0, behavior: 'instant' });
                                            }}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            My Profile
                                        </button>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setShowAccountMenu(false);
                                                navigate('/');
                                            }}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                navigate('/login');
                                                setShowAccountMenu(false);
                                                window.scrollTo({ top: 0, behavior: 'instant' });
                                            }}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Login / Sign Up
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>


            {/* MOBILE VIEW */}
            <div className="md:hidden space-y-3">
                {/* Top Row: Home + City Selector + Cart + Account */}
                <div className="flex justify-between items-center">
                    {/* Home Button */}
                    <button
                        className="flex items-center gap-1 px-3 py-2 text-sm text-gray-800 font-bold rounded hover:bg-gray-100 transition-colors"
                        onClick={() => {
                            navigate('/');
                            window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                    >
                        <FaHome className="text-lg mr-1" /> Home
                    </button>

                    {/* City Selector */}
                    <div className="relative city-selector">
                        <button
                            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 rounded hover:bg-gray-100 transition-colors"
                            onClick={() => setShowCityPopup(!showCityPopup)}
                            onTouchStart={() => setShowCityPopup(!showCityPopup)} // Mobile touch
                        >
                            {selectedCity}
                            <FaChevronDown
                                className={`text-xs text-gray-500 transition-transform ${showCityPopup ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {showCityPopup && renderCityPopup()}
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Cart */}
                        <button
                            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => {
                                navigate('/cart');
                                window.scrollTo({ top: 0, behavior: 'instant' });
                            }}
                        >
                            <FaShoppingCart className="text-gray-800 text-lg" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Account Dropdown (Mobile) */}
                        <div className="relative account-menu">
                            <button
                                onClick={() => setShowAccountMenu(!showAccountMenu)}
                                className="flex items-center gap-1 px-3 py-2 text-black font-semibold rounded-full hover:bg-gray-100"
                            >
                                <FaUser className="text-black" />
                                {/* <span>Account</span> */}
                            </button>

                            {showAccountMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
                                    {user ? (
                                        <>
                                            <button
                                                onClick={() => {
                                                    navigate('/profile');
                                                    setShowAccountMenu(false);
                                                    setShowMobileMenu(false);
                                                    window.scrollTo({ top: 0, behavior: 'instant' });
                                                }}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                My Profile
                                            </button>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setShowAccountMenu(false);
                                                    setShowMobileMenu(false);
                                                    navigate('/');
                                                }}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    navigate('/login');
                                                    setShowAccountMenu(false);
                                                    setShowMobileMenu(false);
                                                    window.scrollTo({ top: 0, behavior: 'instant' });
                                                }}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Login / Sign Up
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Services Dropdown (like Desktop) */}
                <div className="relative services-dropdown">
                    <button
                        className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                        onClick={() => setShowServices(!showServices)}
                    >
                        Browse Services
                        <FaChevronDown className={`transition-transform ${showServices ? 'rotate-180' : ''}`} />
                    </button>

                    {showServices && (
                        <div className="absolute left-0 w-full mt-2 bg-white rounded-lg shadow-lg z-40">
                            {UNIQUE_CATEGORIES.map((category, index) => (
                                <div
                                    key={`mobile-service-${index}`}
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        navigate(`/services`);
                                        setShowServices(false);
                                        window.scrollTo({ top: 0, behavior: 'instant' });
                                    }}
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
