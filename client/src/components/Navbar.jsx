import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, login, logout } = useAuth();

  useEffect(() => {
    // Only apply morphing logic on the home page where there is a hero section.
    if (location.pathname !== '/') {
      setIsScrolled(true);
      return;
    }

    setIsScrolled(false);
    
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav 
        ref={navRef}
        className={`flex items-center justify-between px-6 py-3 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border border-primary/10 text-primary w-full max-w-4xl radius-sys drop-shadow-md' 
            : 'bg-transparent text-background w-full max-w-6xl'
        }`}
      >
        <Link to="/" className="text-xl font-bold font-sans tracking-tight hover-lift flex items-center gap-2">
          Lost & Found
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/items" className="hover-lift">Browse Items</Link>
          <Link to="/messages" className="hover-lift">Messages</Link>
          <Link to="/dashboard" className="hover-lift">Dashboard</Link>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="font-data text-sm">Hi, {user.name}</span>
              <button onClick={logout} className="font-medium hover-lift text-sm text-red-500/80">Log Out</button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="font-medium hover-lift">
                Log In
              </Link>
              <Link to="/register" className="font-medium hover-lift text-accent">
                Register
              </Link>
            </div>
          )}
          <Link 
            to="/items/new" 
            className="btn-magnetic bg-accent text-background px-5 py-2.5 rounded-full font-medium shadow-lg shadow-accent/20"
          >
            Report Item
          </Link>
        </div>
      </nav>
    </div>
  );
}
