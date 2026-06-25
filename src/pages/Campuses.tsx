import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

const campuses = [
  {
    name: 'Main Campus',
    type: 'Headquarters / Primary',
    address: 'Iderade, Oloje Estate, Ilorin, Kwara State.',
    image: '/main-campus.jpg',
    phone: '+234 704 222 6091, +234 903 861 7008',
    email: 'abiola.nura@gmail.com',
  },
  {
    name: 'Harmony Estate Campus',
    type: 'Primary / Nursery',
    address: 'Harmony Estate, Ilorin, Kwara State.',
    image: '/harmony-estate-campus.jpg',
    phone: '+234 704 222 6091, +234 903 861 7008',
    email: 'abiola.nura@gmail.com',
  },
  {
    name: 'Secondary School Campus',
    type: 'Secondary / College',
    address: 'Idi Ape, Kwara State.',
    image: '/secondary-school-campus.jpg',
    phone: '+234 704 222 6091, +234 903 861 7008',
    email: 'abiola.nura@gmail.com',
  },
  {
    name: 'Ganmo Branch',
    type: 'Primary / Nursery',
    address: 'Ganmo, Ilorin, Kwara State.',
    image: '/ganmo-campus.jpg',
    phone: '+234 704 222 6091, +234 903 861 7008',
    email: 'abiola.nura@gmail.com',
  },
];

export default function Campuses() {
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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">Our Campuses</h1>
            <p className="mt-4 text-lg leading-8 text-primary-200 max-w-2xl mx-auto">
              With four locations across Ilorin, we bring qualitative Islamic and Western education closer to you. Explore our campuses below.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {campuses.map((campus, index) => (
            <motion.div
              key={campus.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm ring-1 ring-gray-200 flex flex-col"
            >
              <div className="relative h-64 w-full bg-primary-800">
                {campus.image ? (
                  <img
                    src={campus.image}
                    alt={campus.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 h-full w-full bg-primary-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="inline-flex items-center rounded-full bg-gold-500/90 px-2.5 py-0.5 text-xs font-semibold text-white mb-2 shadow-sm backdrop-blur-sm">
                    {campus.type}
                  </span>
                  <h2 className="text-2xl font-bold text-white font-serif">{campus.name}</h2>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{campus.address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary-600 shrink-0" />
                    <span className="text-gray-700 text-sm">{campus.phone}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-600 shrink-0" />
                    <span className="text-gray-700 text-sm">{campus.email}</span>
                  </li>
                </ul>
                
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`Ath-Thabaat International Schools, ${campus.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex w-full justify-center items-center gap-2 rounded-md bg-gray-50 px-3 py-2.5 text-sm font-semibold text-primary-700 ring-1 ring-inset ring-primary-700/20 hover:bg-primary-50 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Map Section */}
      <div className="w-full h-96 relative mt-16 sm:mt-24">
        <iframe
          src="https://maps.google.com/maps?q=Ath-Thabaat+International+Schools,+Ilorin,+Kwara+State&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ath-Thabaat International Schools Map"
        ></iframe>
      </div>
    </div>
  );
}
