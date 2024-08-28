import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userToken, setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function signOut() {
    setUserToken("");
    localStorage.removeItem("token");
    navigate("/login");
    window.open("http://localhost:5173")
  }

  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className='flex items-center'>
            <Link to="/" className="text-white font-bold text-xl me-4">
              FreshCart
            </Link>

            {userToken && (
              <div className="hidden md:block">
                <ul className="flex items-center space-x-2">
                  <NavLink to="/" className={({ isActive }) => `text-white ${isActive ? 'bg-gray-900 px-2 py-1 rounded' : ''}`}>Home</NavLink>
                  <NavLink to="/products" className={({ isActive }) => `text-white ${isActive ? 'bg-gray-900 px-2 py-1 rounded' : ''}`}>Products</NavLink>
                  <NavLink to="/categories" className={({ isActive }) => `text-white ${isActive ? 'bg-gray-900 px-2 py-1 rounded' : ''}`}>Categories</NavLink>
                  <NavLink to="/brands" className={({ isActive }) => `text-white ${isActive ? 'bg-gray-900 px-2 py-1 rounded' : ''}`}>Brands</NavLink>
                  <NavLink to="/cart" className={({ isActive }) => `text-white ${isActive ? 'bg-gray-900 px-2 py-1 rounded' : ''}`}>Cart</NavLink>
                </ul>
              </div>
            )}

            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                aria-label="Toggle navigation" 
                className="outline-none mobile-menu-button">
                <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className='flex items-center'>
            <div className="social-media">
              <i className="fa-brands text-white mx-2 fa-facebook-f"></i>
              <i className="fa-brands text-white mx-2 fa-twitter"></i>
              <i className="fa-brands text-white mx-2 fa-linkedin"></i>
              <i className="fa-brands text-white mx-2 fa-youtube"></i>
              <i className="fa-brands text-white mx-2 fa-tiktok"></i>
            </div>
            <ul className='flex gap-1'>
              {!userToken ? (
                <>
                  <li><NavLink to="/login" className="block px-3 py-2 text-white hover:bg-gray-700 rounded">Login</NavLink></li>
                  <li><NavLink to="/register" className="block px-3 py-2 text-white hover:bg-gray-700 rounded">Register</NavLink></li>
                </>
              ) : (
                <li><button onClick={signOut} className="block px-3 py-2 text-white hover:bg-gray-700 rounded">Sign Out</button></li>
              )}
            </ul>
          </div>
        </div>

        {userToken && (
          <div className={isOpen ? "mobile-menu block md:hidden" : "mobile-menu hidden"}>
            <ul className="mt-4 space-y-4">
              <li><NavLink to="/" className="block px-4 py-2 text-white bg-gray-900 rounded">Home</NavLink></li>
              <li><NavLink to="/products" className="block px-4 py-2 text-white bg-gray-900 rounded">Products</NavLink></li>
              <li><NavLink to="/categories" className="block px-4 py-2 text-white bg-gray-900 rounded">Categories</NavLink></li>
              <li><NavLink to="/brands" className="block px-4 py-2 text-white bg-gray-900 rounded">Brands</NavLink></li>
              <li><NavLink to="/cart" className="block px-4 py-2 text-white bg-gray-900 rounded">Cart</NavLink></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
