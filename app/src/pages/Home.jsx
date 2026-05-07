import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChefHat, Clock, Award } from 'lucide-react';

const Home = () => {
  // Fade in up animation variant
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image overlay with dark gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Restaurant Ambience"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-gold-400 tracking-[0.3em] text-sm md:text-base uppercase mb-6 font-medium">A Culinary Journey</h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight">
              Art on a <br className="hidden md:block"/> <span className="italic font-light">Plate</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the perfect harmony of seasonal ingredients, innovative techniques, and timeless elegance in every bite.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/reservations"
                className="w-full sm:w-auto bg-gold-500 hover:bg-gold-600 text-dark-900 px-8 py-4 rounded-sm font-medium tracking-wider transition-all duration-300 transform hover:-translate-y-1"
              >
                Reserve a Table
              </Link>
              <Link
                to="/menu"
                className="w-full sm:w-auto border border-white/30 hover:border-gold-400 text-white px-8 py-4 rounded-sm font-medium tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Explore Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Storytelling / About Us Section */}
      <section className="py-24 md:py-32 bg-dark-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-gold-400"></div>
                <span className="text-gold-400 uppercase tracking-widest text-sm font-medium">Our Philosophy</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                Rooted in tradition,<br />crafted for the modern palate.
              </h2>

              <div className="space-y-6 text-gray-400 leading-relaxed font-light">
                <p>
                  At L'Étoile, we believe that dining is more than just a meal; it is an emotional experience. Our culinary journey began in the rustic kitchens of Provence, carrying the warmth of familial gatherings and the respect for nature's bounty.
                </p>
                <p>
                  Today, under the guidance of Executive Chef Laurent, we source the finest local ingredients to create dishes that tell a story. Every plate is a canvas where bold flavors meet delicate artistry, creating memories that linger long after the last bite.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="space-y-2">
                  <ChefHat className="w-8 h-8 text-gold-500" />
                  <h4 className="text-white font-serif text-xl">Master Chefs</h4>
                  <p className="text-sm text-gray-500">Decades of culinary excellence</p>
                </div>
                <div className="space-y-2">
                  <Award className="w-8 h-8 text-gold-500" />
                  <h4 className="text-white font-serif text-xl">Michelin Starred</h4>
                  <p className="text-sm text-gray-500">Recognized for innovation</p>
                </div>
              </div>
            </motion.div>

            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <img
                  src="https://images.unsplash.com/photo-1581182800629-7d90925ad072?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Chef plating food"
                  className="rounded-sm w-full h-[300px] md:h-[400px] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Signature Dish"
                  className="rounded-sm w-full h-[300px] md:h-[400px] object-cover mt-8 md:mt-12"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l-2 border-b-2 border-gold-400/30 -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 border-r-2 border-t-2 border-gold-400/30 -z-10"></div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;