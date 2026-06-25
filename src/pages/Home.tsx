import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Heart, Shield, Users, Award, MapPin } from 'lucide-react';

const stats = [
  { id: 1, name: 'Students', value: '1,000+' },
  { id: 2, name: 'Teachers', value: '80+' },
  { id: 3, name: 'Campuses', value: '4' },
  { id: 4, name: 'Years of Excellence', value: '10+' },
];

const features = [
  {
    name: 'Islamic Environment',
    description: 'A nurturing environment where authentic Islamic teachings are integrated into everyday learning.',
    icon: Heart,
  },
  {
    name: 'Academic Excellence',
    description: 'Rigorous curriculum designed to challenge students and prepare them for future success.',
    icon: Award,
  },
  {
    name: 'Moral Uprightness',
    description: 'Strong emphasis on character building based on the Quran and Sunnah.',
    icon: Shield,
  },
  {
    name: 'Dedicated Staff',
    description: 'Highly qualified and passionate educators committed to your child\'s development.',
    icon: Users,
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-primary-900 pb-16 pt-14 sm:pb-20">
        <img
          src="/background.jpg"
          alt="Ath-Thabaat Campus"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent -z-10" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-24">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8 flex justify-center">
                <span className="rounded-full bg-gold-500/10 px-3 py-1 text-sm font-semibold leading-6 text-gold-400 ring-1 ring-inset ring-gold-500/20">
                  Admissions Open for 2026/2027
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gold-500 sm:text-6xl font-serif">
                Striving towards building a <span className="text-gold-500">balanced nation</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Welcome to Ath-Thabaat International Schools. We provide qualitative Western education integrated with authentic Islamic teachings based on the Quran and Sunnah.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/admissions"
                  className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors"
                >
                  Apply for Admission
                </Link>
                <Link to="/about" className="text-sm font-semibold leading-6 text-white flex items-center gap-2 hover:text-gold-400 transition-colors">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 lg:max-w-none lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col bg-white rounded-3xl p-8 shadow-sm ring-1 ring-gray-200"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700 mb-6">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-primary-900 font-serif sm:text-4xl">Our Mission</h2>
              <p className="mt-4 text-lg leading-8 text-gray-600 flex-1">
                To provide qualitative Western education integrated with authentic Islamic teachings based on the Quran and Sunnah. We nurture minds to excel in both secular and spiritual knowledge.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col bg-primary-900 rounded-3xl p-8 shadow-sm ring-1 ring-primary-800 text-white"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-800 text-gold-400 mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white font-serif sm:text-4xl">Our Vision</h2>
              <p className="mt-4 text-lg leading-8 text-primary-100 flex-1">
                To be the leading Islamic school of choice, producing academically excellent and morally upright students who will contribute positively to the global community.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-700 uppercase tracking-wider">Why Choose Ath-Thabaat</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl font-serif">
              Everything you need for a balanced education
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We offer a unique blend of academic rigor and Islamic values, ensuring your child develops holistically in a safe, supportive environment.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-primary-900">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary-50">
                      <feature.icon className="h-5 w-5 text-primary-700" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base leading-7 text-primary-200">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {/* Campuses CTA */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-3xl bg-gray-50 ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-primary-900 font-serif">4 Campuses Across Ilorin</h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                With four strategically located campuses in Kwara State, we make quality Islamic and Western education accessible to more families.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-primary-700">Locations included</h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                <li className="flex gap-x-3">
                  <MapPin className="h-6 w-5 flex-none text-primary-700" aria-hidden="true" />
                  Main Campus (Iderade Oloje Estate)
                </li>
                <li className="flex gap-x-3">
                  <MapPin className="h-6 w-5 flex-none text-primary-700" aria-hidden="true" />
                  Harmony Estate Campus (Ilorin Kwara State)
                </li>
                <li className="flex gap-x-3">
                  <MapPin className="h-6 w-5 flex-none text-primary-700" aria-hidden="true" />
                  Secondary School Campus (Idi Ape)
                </li>
                <li className="flex gap-x-3">
                  <MapPin className="h-6 w-5 flex-none text-primary-700" aria-hidden="true" />
                  Ganmo Branch
                </li>
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">Find the campus</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-xl font-bold tracking-tight text-primary-900">Nearest to you</span>
                  </p>
                  <Link
                    to="/campuses"
                    className="mt-10 block w-full rounded-md bg-primary-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    View All Campuses
                  </Link>
                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Get directions and contact information for each location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
