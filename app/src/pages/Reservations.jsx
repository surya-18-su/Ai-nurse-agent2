import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';

const Reservations = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert(`Thank you, ${formData.name}! Your reservation request for ${formData.guests} guests on ${formData.date} at ${formData.time} has been received.`);
  };

  return (
    <div className="flex-grow pt-24 pb-24 bg-dark-900 min-h-screen relative overflow-hidden">

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-dark-800/50 transform skew-x-12 translate-x-1/4 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-12"
          >
            <h2 className="text-gold-400 tracking-[0.3em] text-sm uppercase mb-4 font-medium">Join Us</h2>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">Reserve Your Experience</h1>
            <p className="text-gray-400 leading-relaxed font-light mb-10">
              For parties of six or more, please contact the restaurant directly. We accept reservations up to two months in advance.
            </p>

            <div className="space-y-6">
              <div className="border-l-2 border-gold-400 pl-6 py-1">
                <h4 className="text-white font-serif text-xl mb-2">Dress Code</h4>
                <p className="text-gray-500 text-sm">Smart elegant. Gentlemen are requested to wear collared shirts and closed shoes. Jackets are preferred but not required.</p>
              </div>
              <div className="border-l-2 border-gold-400 pl-6 py-1">
                <h4 className="text-white font-serif text-xl mb-2">Cancellation Policy</h4>
                <p className="text-gray-500 text-sm">We require 24 hours notice for cancellations. Late cancellations or no-shows may be subject to a fee.</p>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-dark-800 p-8 md:p-12 rounded-sm border border-white/5 shadow-2xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Date */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400 w-5 h-5" />
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-dark-900 border border-white/10 text-white pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400 w-5 h-5" />
                    <select
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-dark-900 border border-white/10 text-white pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:border-gold-400 transition-colors appearance-none"
                    >
                      <option value="">Select Time</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-light">Number of Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400 w-5 h-5" />
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-white/10 text-white pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:border-gold-400 transition-colors appearance-none"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-dark-900 border border-white/10 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-dark-900 border border-white/10 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-light">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-dark-900 border border-white/10 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-light">Special Requests (Optional)</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Allergies, anniversaries, etc."
                  className="w-full bg-dark-900 border border-white/10 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-gold-400 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-600 text-dark-900 py-4 rounded-sm font-medium tracking-wider uppercase transition-colors duration-300"
              >
                Confirm Reservation
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;