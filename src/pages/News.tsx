import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const newsItems = [
  {
    id: 'vid-2',
    type: 'video',
    title: 'Visitors Marvel at Students\' Arabic Understanding',
    excerpt: 'visitors, who specializes in Arabic language, marvels at the understanding of our students about a topic they were taught',
    date: 'Recent',
    category: 'Visits',
    src: '/news-2.mp4',
  },
  {
    id: 'vid-1',
    type: 'video',
    title: 'A Friendly Visit by Professor Luqman Oyedele',
    excerpt: 'A friendly visit by Professor Luqman Oyedele, the first vice-chancellor of a university in Europe from Africa, who is a well-known professor among the people of technology, applications and administrative data  حفظه الله ورعاه',
    date: 'Recent',
    category: 'Visits',
    src: '/news-1.mp4',
  },
];

export default function News() {
  return (
    <div className="bg-gray-50 pb-24 sm:pb-32">
      {/* Header */}
      <div className="bg-primary-900 py-24 sm:py-32 mb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">News & Events</h1>
            <p className="mt-4 text-lg leading-8 text-primary-200">
              Stay updated with the latest happenings at Ath-Thabaat.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {newsItems.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex max-w-xl flex-col items-start justify-between bg-white rounded-3xl overflow-hidden shadow-sm ring-1 ring-gray-200"
            >
              <div className="relative w-full">
                {post.type === 'video' ? (
                  <video
                    src={post.src}
                    controls
                    className="aspect-[16/9] w-full object-cover bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                ) : (
                  <img
                    src={(post as any).image}
                    alt={post.title}
                    className="aspect-[16/9] w-full object-cover bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                )}
                <div className="absolute inset-0 rounded-t-3xl ring-1 ring-inset ring-gray-900/10 pointer-events-none" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-x-4 text-xs mb-4">
                  <time dateTime={post.date} className="text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </time>
                  <span className="relative z-10 rounded-full bg-primary-50 px-3 py-1.5 font-medium text-primary-700">
                    {post.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-xl font-bold leading-6 text-primary-900 group-hover:text-primary-600 transition-colors font-serif">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
