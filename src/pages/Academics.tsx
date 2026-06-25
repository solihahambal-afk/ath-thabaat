import { motion } from 'motion/react';
import { BookOpen, GraduationCap, PenTool, LayoutTemplate, Library } from 'lucide-react';

const programs = [
  {
    name: 'Pre-Nursery',
    description: 'A gentle introduction to learning, focusing on socialization, basic motor skills, and foundational Islamic etiquette in a nurturing environment.',
    icon: LayoutTemplate,
  },
  {
    name: 'Kindergarten',
    description: 'Building strong foundations in literacy, numeracy, and basic Islamic concepts. Preparing children for primary education through play and structured learning.',
    icon: PenTool,
  },
  {
    name: 'Primary School',
    description: 'A comprehensive curriculum that balances core subjects (Math, English, Science) with rigorous Islamic and Arabic studies.',
    icon: BookOpen,
  },
  {
    name: 'Secondary School',
    description: 'Advanced academic preparation for national and international examinations, alongside deep dives into Islamic jurisprudence, Tafsir, and Arabic literature.',
    icon: GraduationCap,
  },
];

export default function Academics() {
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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">Academics</h1>
            <p className="mt-4 text-lg leading-8 text-primary-200">
              A balanced curriculum designed for excellence in this world and the hereafter.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Overview */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl font-serif">Curriculum Overview</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Ath-Thabaat, we believe that education should not be compartmentalized. Our curriculum seamlessly weaves government-approved syllabi with comprehensive Islamic studies, ensuring our students are well-equipped for modern challenges while remaining grounded in their faith.
            </p>
          </div>
        </div>
      </div>

      {/* Programs */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl font-serif mb-16 text-center">Our Educational Stages</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {programs.map((program, index) => (
                <motion.div
                  key={program.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
                >
                  <div className="flex items-center gap-x-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                      <program.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-900">{program.name}</h3>
                  </div>
                  <p className="text-base leading-7 text-gray-600">{program.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Islamic & Arabic Studies Highlight */}
      <div className="py-24 sm:py-32 bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 lg:max-w-none lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-serif">Islamic & Arabic Studies</h2>
              <p className="mt-6 text-lg leading-8 text-primary-100">
                A core pillar of our institution is the profound understanding and memorization of the Quran, coupled with proficiency in the Arabic language.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-white">
                    <Library className="absolute left-1 top-1 h-5 w-5 text-gold-400" aria-hidden="true" />
                    Quran Memorization (Tahfeez).
                  </dt>{' '}
                  <dd className="inline">Structured memorization programs with emphasis on proper Tajweed and regular revision to ensure retention.</dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-white">
                    <Library className="absolute left-1 top-1 h-5 w-5 text-gold-400" aria-hidden="true" />
                    Arabic Language.
                  </dt>{' '}
                  <dd className="inline">Comprehensive instruction in reading, writing, and speaking Arabic, enabling students to understand classical texts directly.</dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-white">
                    <Library className="absolute left-1 top-1 h-5 w-5 text-gold-400" aria-hidden="true" />
                    Islamic Jurisprudence (Fiqh).
                  </dt>{' '}
                  <dd className="inline">Practical knowledge of acts of worship and daily life rulings according to the Sunnah.</dd>
                </div>
              </dl>
            </div>
            <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden bg-primary-800 ring-1 ring-white/10">
               {/* Decorative element or image placeholder */}
               <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                 <p className="text-2xl font-serif text-gold-400 italic">
                   "Seeking knowledge is an obligation upon every Muslim."
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
