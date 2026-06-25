import { motion } from 'motion/react';
import { Target, Compass, Award, Heart, BookOpen, Star, Shield } from 'lucide-react';

const values = [
  {
    name: 'Taqwa (Piety)',
    description: 'Instilling the consciousness of Allah in all aspects of life.',
    icon: Heart,
  },
  {
    name: 'Excellence',
    description: 'Striving for the highest standards in academics and moral character.',
    icon: Star,
  },
  {
    name: 'Integrity',
    description: 'Promoting honesty, trustworthiness, and strong moral principles.',
    icon: Shield, // Will import Shield
  },
  {
    name: 'Lifelong Learning',
    description: 'Fostering a continuous desire for knowledge and self-improvement.',
    icon: BookOpen,
  },
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-primary-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">About Us</h1>
            <p className="mt-4 text-lg leading-8 text-primary-200">
              Learn about our history, founder, and the core values that drive our institution.
            </p>
          </motion.div>
        </div>
      </div>

      {/* History & Founder Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl font-serif">Our History</h2>
            <div className="mt-6 text-base leading-7 text-gray-600 space-y-4">
              <p>
                Ath-Thabaat International Schools was established with a clear mandate: to bridge the gap between qualitative Western education and authentic Islamic teachings. Over the years, we have grown from a modest beginning to a multi-campus institution recognized for excellence in Kwara State.
              </p>
              <p>
                Our journey has been guided by our motto: "Striving towards building a balanced nation." We believe that true success lies in equipping the next generation with both secular knowledge and strong moral foundations rooted in the Quran and Sunnah.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-3xl p-8 ring-1 ring-gray-200"
          >
            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl font-serif">The Founder</h2>
            <div className="mt-6 flex flex-col items-start gap-6">
              <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                <Award className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-900">Ash Shaykh, Dr. Zunuraen Jibreel Sahban</h3>
                <p className="text-sm font-medium text-gold-600 mt-1">PhD Islamic Jurisprudence, Islamic University, Saudi Arabia</p>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Dr. Zunuraen Jibreel Sahban founded Ath-Thabaat with a visionary approach to education. His dedication to Islamic scholarship and community development forms the cornerstone of our school's philosophy. Under his guidance, the school continues to produce students who excel academically while remaining steadfast in their faith.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vision & Mission (Reiterated with more depth) */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl font-serif">Our Guiding Principles</h2>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            <div className="flex gap-x-6 p-8 bg-white rounded-3xl shadow-sm ring-1 ring-gray-200">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                <Target className="h-6 w-6 text-primary-700" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-7 text-primary-900">Mission</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  To provide qualitative Western education integrated with authentic Islamic teachings based on the Quran and Sunnah. We aim to nurture well-rounded individuals prepared for the challenges of the modern world without compromising their faith.
                </p>
              </div>
            </div>
            <div className="flex gap-x-6 p-8 bg-white rounded-3xl shadow-sm ring-1 ring-gray-200">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                <Compass className="h-6 w-6 text-primary-700" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-7 text-primary-900">Vision</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  To be the leading Islamic school of choice, producing academically excellent and morally upright students. We envision a generation that positively impacts society through leadership, innovation, and unwavering adherence to Islamic principles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl font-serif">Our Core Values</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              These principles guide our interactions, curriculum, and everyday life at Ath-Thabaat.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center bg-gray-50 p-8 rounded-3xl ring-1 ring-gray-200"
                >
                  <dt className="flex flex-col items-center gap-y-4 text-lg font-semibold leading-7 text-primary-900">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
                      <value.icon className="h-8 w-8 text-primary-600" aria-hidden="true" />
                    </div>
                    {value.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{value.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
