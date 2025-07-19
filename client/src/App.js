// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import ServicesPage from './pages/ServicesPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FeaturedServices from './components/FeaturedServices';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import ServiceArea from './components/ServiceArea';
import DownloadApp from './components/DownloadApp';

import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex-grow">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      <FeaturedServices />
                      <HowItWorks />
                      <WhyChooseUs />
                      <ServiceArea />
                      <DownloadApp />
                    </>
                  }
                />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

// RequireAuth HOC
function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-2">404 - Not Found</h1>
      <p className="text-gray-500 mb-4">The page you are looking for does not exist.</p>
      <a href="/" className="text-indigo-600 hover:underline">Go Home</a>
    </div>
  );
}

export default App;