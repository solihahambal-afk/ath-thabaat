import { motion } from 'motion/react';
import { CheckCircle2, Download, FileText, Send, Mail } from 'lucide-react';

const requirements = [
  'Completed application form',
  'Two recent passport photographs',
  'Birth certificate or declaration of age',
  'Last term report card (for transfer students)',
  'Medical fitness certificate',
];

const steps = [
  {
    name: 'Step 1: Application',
    description: 'Purchase and complete the admission form online or at any of our campuses.',
  },
  {
    name: 'Step 2: Assessment',
    description: 'Candidates will be scheduled for an entrance examination (Math, English, and basic Islamic Knowledge) and an interview.',
  },
  {
    name: 'Step 3: Offer of Admission',
    description: 'Successful candidates will be notified and issued an admission letter with fee payment details.',
  },
  {
    name: 'Step 4: Registration',
    description: 'Complete fee payment and submit all required documentation to finalize registration.',
  },
];

export default function Admissions() {
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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">Admissions</h1>
            <p className="mt-4 text-lg leading-8 text-primary-200">
              Join the Ath-Thabaat family. Start your child's journey to excellence today.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Process & Requirements */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl font-serif mb-8">Admission Process</h2>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.name} className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gold-100 text-gold-600 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-900">{step.name}</h3>
                    <p className="mt-2 text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-gray-50 rounded-3xl ring-1 ring-gray-200">
              <h3 className="text-2xl font-bold tracking-tight text-primary-900 font-serif mb-6">Requirements</h3>
              <ul className="space-y-4">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary-600 shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Offline Admission Form (PDF)
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Online Form */}
          <div className="bg-white rounded-3xl p-8 shadow-lg ring-1 ring-gray-200">
            <h2 className="text-2xl font-bold tracking-tight text-primary-900 font-serif mb-2">Online Application</h2>
            <p className="text-gray-600 mb-8">Fill out the form below to begin the application process.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-primary-900">Student's First Name</label>
                  <div className="mt-2">
                    <input type="text" id="firstName" className="block w-full rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-primary-900">Student's Last Name</label>
                  <div className="mt-2">
                    <input type="text" id="lastName" className="block w-full rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium leading-6 text-primary-900">Date of Birth</label>
                <div className="mt-2">
                  <input type="date" id="dob" className="block w-full rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <label htmlFor="class" className="block text-sm font-medium leading-6 text-primary-900">Class Applying For</label>
                <div className="mt-2">
                  <select id="class" className="block w-full rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6">
                    <option>Pre-Nursery</option>
                    <option>Kindergarten</option>
                    <option>Primary 1 - 6</option>
                    <option>JSS 1 - 3</option>
                    <option>SSS 1 - 3</option>
                    <option>Quran Memorization</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-primary-900 mb-4">Parent/Guardian Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="parentName" className="block text-sm font-medium leading-6 text-primary-900">Full Name</label>
                    <div className="mt-2">
                      <input type="text" id="parentName" className="block w-full rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium leading-6 text-primary-900">Phone Number</label>
                      <div className="mt-2">
                        <input type="tel" id="phone" className="block w-full rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-primary-900">Email Address</label>
                      <div className="mt-2">
                        <input type="email" id="email" className="block w-full rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  className="flex flex-1 justify-center items-center gap-2 rounded-md bg-primary-700 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
                  onClick={() => {
                    const firstName = (document.getElementById('firstName') as HTMLInputElement)?.value || '';
                    const lastName = (document.getElementById('lastName') as HTMLInputElement)?.value || '';
                    const dob = (document.getElementById('dob') as HTMLInputElement)?.value || '';
                    const classApplying = (document.getElementById('class') as HTMLSelectElement)?.value || '';
                    const parentName = (document.getElementById('parentName') as HTMLInputElement)?.value || '';
                    const phone = (document.getElementById('phone') as HTMLInputElement)?.value || '';
                    const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
                    const body = `Student Name: ${firstName} ${lastName}%0ADOB: ${dob}%0AClass: ${classApplying}%0AParent Name: ${parentName}%0APhone: ${phone}%0AEmail: ${email}`;
                    window.location.href = `mailto:abiola.nura@gmail.com?subject=Admission Application for ${firstName} ${lastName}&body=${body}`;
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Submit via Email
                </button>
                <button
                  type="button"
                  className="flex flex-1 justify-center items-center gap-2 rounded-md bg-green-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
                  onClick={() => {
                    const firstName = (document.getElementById('firstName') as HTMLInputElement)?.value || '';
                    const lastName = (document.getElementById('lastName') as HTMLInputElement)?.value || '';
                    const dob = (document.getElementById('dob') as HTMLInputElement)?.value || '';
                    const classApplying = (document.getElementById('class') as HTMLSelectElement)?.value || '';
                    const parentName = (document.getElementById('parentName') as HTMLInputElement)?.value || '';
                    const phone = (document.getElementById('phone') as HTMLInputElement)?.value || '';
                    const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
                    const text = `Admission Application:%0AStudent Name: ${firstName} ${lastName}%0ADOB: ${dob}%0AClass: ${classApplying}%0AParent Name: ${parentName}%0APhone: ${phone}%0AEmail: ${email}`;
                    window.open(`https://wa.me/2347042226091?text=${text}`, '_blank');
                  }}
                >
                  <Send className="w-4 h-4" />
                  Submit via WhatsApp
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
