import React, { useEffect, useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from "react-simple-maps";
import AOS from "aos";
import "aos/dist/aos.css";
import indiaTopoJson from "../data/india.topo.json";

const cities = [
    { name: "Ahmedabad", coordinates: [72.5714, 23.0225] },
    { name: "Mumbai", coordinates: [72.8777, 19.076] },
    { name: "Delhi", coordinates: [77.1025, 28.7041] },
    { name: "Pune", coordinates: [73.8567, 18.5204] },
    { name: "Bangalore", coordinates: [77.5946, 12.9716] },
    { name: "Hyderabad", coordinates: [78.4867, 17.385] },
    { name: "Chennai", coordinates: [80.2707, 13.0827] },
    { name: "Surat", coordinates: [72.8311, 21.1702] },
    { name: "Jaipur", coordinates: [75.7873, 26.9124] },
    { name: "Kolkata", coordinates: [88.3639, 22.5726] },
];

const defaultCenter = [80, 22];
const defaultScale = 1000;
const zoomedScale = 5000;

const ServiceArea = () => {
    const [center, setCenter] = useState(defaultCenter);
    const [scale, setScale] = useState(defaultScale);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleCityHover = (coordinates) => {
        setCenter(coordinates);
        setScale(zoomedScale);
    };

    const resetMap = () => {
        setCenter(defaultCenter);
        setScale(defaultScale);
    };

    return (
        <section id="service-area" className="py-20 bg-gradient-to-b from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-400 tracking-tight">
                        We are Expanding Across Cities
                    </h2>
                    <p
                        className="text-gray-600 dark:text-gray-300 text-lg mt-3 max-w-xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        Serving metro & tier-2 cities with seamless urban experiences.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Map Container */}
                    <div
                        className="w-full lg:w-1/2 transition-all duration-700 ease-in-out"
                        data-aos="fade-right"
                    >
                        <ComposableMap
                            projection="geoMercator"
                            projectionConfig={{ center, scale }}
                            width={600}
                            height={600}
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                        >
                            <Geographies geography={indiaTopoJson}>
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill="#f3f4f6"
                                            stroke="#e5e7eb"
                                            strokeWidth={0.5}
                                        />
                                    ))
                                }
                            </Geographies>
                            {cities.map(({ name, coordinates }, index) => (
                                <Marker key={name} coordinates={coordinates}>
                                    <g data-aos="zoom-in" data-aos-delay={index * 100}>
                                        {/* Glowing pulse */}
                                        <circle
                                            r={10}
                                            fill="#6366F1"
                                            className="opacity-40 animate-ping"
                                        />
                                        <circle r={5} fill="#4F46E5" />
                                        <text
                                            textAnchor="middle"
                                            y={-12}
                                            style={{
                                                fontFamily: "system-ui",
                                                fill: "#374151",
                                                fontSize: 10,
                                            }}
                                        >
                                            {name}
                                        </text>
                                    </g>
                                </Marker>
                            ))}
                        </ComposableMap>
                    </div>

                    {/* City List */}
                    <div className="w-full lg:w-1/2" data-aos="fade-left">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                            Active Cities
                        </h3>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {cities.map((city, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2 bg-white dark:bg-gray-700 shadow-lg p-3 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    onMouseEnter={() => handleCityHover(city.coordinates)}
                                    onMouseLeave={resetMap}
                                >
                                    <span className="text-indigo-500 text-lg">📍</span>
                                    <span className="text-gray-800 dark:text-gray-100 font-medium">
                                        {city.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-sm text-gray-500 italic dark:text-gray-400">
                            More cities launching soon... 🚀
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceArea;