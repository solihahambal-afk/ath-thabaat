import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const categories = ['All', 'Achievements', 'Graduation', 'School Activities', 'Islamic Programs'];

const items = [
  { id: 'ach-1', category: 'Achievements', type: 'image', src: '/achievement-1.jpg', alt: 'Achievement 1' },
  { id: 'ach-2', category: 'Achievements', type: 'image', src: '/achievement-2.jpg', alt: 'Achievement 2' },
  { id: 'ach-3', category: 'Achievements', type: 'image', src: '/achievement-3.jpg', alt: 'Achievement 3' },
  { id: 'grad-2', category: 'Graduation', type: 'video', src: '/graduation-ceremony.mp4', alt: 'Graduation Ceremony 2' },
  { id: 'grad-1', category: 'Graduation', type: 'video', src: '/quran-memorisation-ceremony.mp4', alt: 'Quran Memorisation Ceremony' },
  { id: 'act-1', category: 'School Activities', type: 'video', src: '/exercise-1.mp4', alt: 'School Exercise 1' },
  { id: 'act-2', category: 'School Activities', type: 'video', src: '/exercise-2.mp4', alt: 'School Exercise 2' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = items.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="bg-white pb-24 sm:pb-32">
      {/* Header */}
      <div className="bg-primary-900 py-24 sm:py-32 mb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">Photo & Video Gallery</h1>
            <p className="mt-4 text-lg leading-8 text-primary-200">
              Glimpses into the vibrant life and activities at Ath-Thabaat.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === category
                  ? "bg-primary-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid Placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100"
            >
              {item.src && item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : item.src && item.type === 'video' ? (
                <video
                  src={item.src}
                  controls
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 h-full w-full bg-primary-200" />
              )}
              <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                <span className="text-white font-medium drop-shadow-md">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
