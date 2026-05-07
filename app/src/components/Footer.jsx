import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-900 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="font-serif text-3xl tracking-wider text-white mb-6 block">
              L'ÉTOILE
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Experience the pinnacle of fine dining. A journey of flavors, crafted with passion and served with elegance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors font-serif italic text-lg">
                Ig
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors font-serif italic text-lg">
                Fb
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors font-serif italic text-lg">
                X
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">Our Story</Link></li>
              <li><Link to="/menu" className="hover:text-gold-400 transition-colors">The Menu</Link></li>
              <li><Link to="/reservations" className="hover:text-gold-400 transition-colors">Reservations</Link></li>
              <li><Link to="/gallery" className="hover:text-gold-400 transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0" />
                <span>123 Culinary Avenue<br />Gourmet District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                <span>reservations@letoile.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Opening Hours</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Mon - Thu</span>
                <span>5:00 PM - 10:30 PM</span>
              </li>
              <li className="flex justify-between text-white font-medium">
                <span>Fri - Sat</span>
                <span>5:00 PM - 11:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>4:00 PM - 10:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} L'Étoile Restaurant. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;