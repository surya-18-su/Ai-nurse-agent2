import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Starters');

  const categories = ['Starters', 'Mains', 'Desserts', 'Wine'];

  const menuItems = {
    Starters: [
      { name: 'Oysters Mignonette', description: 'Fresh seasonal oysters, shallot vinegar, lemon', price: '$24' },
      { name: 'Wagyu Beef Tartare', description: 'Quail egg, capers, truffle oil, house-made brioche', price: '$28' },
      { name: 'Burrata & Heirloom Tomato', description: 'Basil emulsion, aged balsamic, micro greens', price: '$22' },
      { name: 'Seared Scallops', description: 'Cauliflower purée, pancetta crisp, brown butter', price: '$26' },
    ],
    Mains: [
      { name: 'Pan-Roasted Halibut', description: 'Saffron risotto, asparagus, lemon beurre blanc', price: '$42' },
      { name: 'Duck Filet', description: 'Cherry gastrique, parsnip purée, haricots verts', price: '$48' },
      { name: 'Filet Mignon', description: 'Potato gratin, wild mushrooms, bordelaise sauce', price: '$65' },
      { name: 'Truffle Mushroom Risotto', description: 'Arborio rice, porcini, parmesan crisp, shaved truffle', price: '$36' },
    ],
    Desserts: [
      { name: 'Dark Chocolate Soufflé', description: 'Vanilla bean crème anglaise (allow 20 mins)', price: '$18' },
      { name: 'Lemon Basil Tart', description: 'Torched meringue, raspberry coulis', price: '$16' },
      { name: 'Artisan Cheese Plate', description: 'Chef selection, honeycomb, marcona almonds', price: '$24' },
    ],
    Wine: [
      { name: 'Cabernet Sauvignon', description: 'Napa Valley, 2018 - Bold, dark fruits, oak', price: '$140' },
      { name: 'Pinot Noir', description: 'Burgundy, 2020 - Elegant, red cherry, earthy', price: '$110' },
      { name: 'Chardonnay', description: 'Sonoma Coast, 2021 - Crisp, green apple, vanilla', price: '$85' },
      { name: 'Champagne Brut', description: 'Reims - Crisp, brioche, citrus', price: '$160' },
    ]
  };

  return (
    <div className="flex-grow pt-24 pb-24 bg-dark-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-gold-400 tracking-[0.3em] text-sm uppercase mb-4 font-medium">Culinary Excellence</h2>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">The Menu</h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-light">
              Carefully curated seasonal ingredients prepared with passion and precision.
            </p>
          </motion.div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-sm text-sm tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gold-500 text-dark-900 font-medium'
                  : 'bg-transparent border border-white/20 text-gray-300 hover:border-gold-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
            >
              {menuItems[activeCategory].map((item, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-serif text-white group-hover:text-gold-400 transition-colors">{item.name}</h3>
                    <div className="flex-grow border-b border-white/10 border-dotted mx-4 relative top-[-6px]"></div>
                    <span className="text-gold-400 font-serif text-xl">{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm font-light italic">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Menu;