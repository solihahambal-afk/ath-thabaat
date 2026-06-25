import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">Contact Us</h1>
            <p className="mt-4 text-lg leading-8 text-primary-200">
              We'd love to hear from you. Get in touch with any inquiries or visit one of our campuses.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl font-serif mb-8">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-12">
              Whether you have a question about admissions, our curriculum, or anything else, our team is ready to answer all your questions.
            </p>

            <dl className="space-y-8 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                    <MapPin className="h-6 w-6 text-primary-700" aria-hidden="true" />
                  </div>
                </dt>
                <dd className="flex flex-col justify-center">
                  <p className="font-semibold text-primary-900">Main Campus</p>
                  <p>Iderade, Oloje Estate</p>
                  <p>Ilorin, Kwara State, Nigeria</p>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                    <Phone className="h-6 w-6 text-primary-700" aria-hidden="true" />
                  </div>
                </dt>
                <dd className="flex flex-col justify-center">
                  <p className="font-semibold text-primary-900">Phone</p>
                  <a className="hover:text-primary-600" href="tel:+2349038617008">+234 903 861 7008</a>
                  <a className="hover:text-primary-600" href="tel:+2347042226091">+234 704 222 6091</a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                    <Mail className="h-6 w-6 text-primary-700" aria-hidden="true" />
                  </div>
                </dt>
                <dd className="flex flex-col justify-center">
                  <p className="font-semibold text-primary-900">Email</p>
                  <a className="hover:text-primary-600" href="mailto:abiola.nura@gmail.com">abiola.nura@gmail.com</a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg ring-1 ring-gray-200">
            <h3 className="text-2xl font-bold tracking-tight text-primary-900 font-serif mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-primary-900">First name</label>
                  <div className="mt-2.5">
                    <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-primary-900">Last name</label>
                  <div className="mt-2.5">
                    <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-primary-900">Email</label>
                  <div className="mt-2.5">
                    <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-primary-900">Phone number</label>
                  <div className="mt-2.5">
                    <input type="tel" name="phone-number" id="phone-number" autoComplete="tel" className="block w-full rounded-md border-0 px-3.5 py-2 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-primary-900">Message</label>
                  <div className="mt-2.5">
                    <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-primary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" defaultValue={''} />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  type="button" 
                  onClick={() => {
                    const firstName = (document.getElementById('first-name') as HTMLInputElement)?.value || '';
                    const lastName = (document.getElementById('last-name') as HTMLInputElement)?.value || '';
                    const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
                    const phone = (document.getElementById('phone-number') as HTMLInputElement)?.value || '';
                    const message = (document.getElementById('message') as HTMLTextAreaElement)?.value || '';
                    const body = `Name: ${firstName} ${lastName}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
                    window.location.href = `mailto:abiola.nura@gmail.com?subject=Contact Inquiry&body=${body}`;
                  }}
                  className="flex flex-1 justify-center items-center gap-2 rounded-md bg-primary-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Send via Email
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    const firstName = (document.getElementById('first-name') as HTMLInputElement)?.value || '';
                    const lastName = (document.getElementById('last-name') as HTMLInputElement)?.value || '';
                    const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
                    const phone = (document.getElementById('phone-number') as HTMLInputElement)?.value || '';
                    const message = (document.getElementById('message') as HTMLTextAreaElement)?.value || '';
                    const text = `Contact Inquiry:%0AName: ${firstName} ${lastName}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
                    window.open(`https://wa.me/2347042226091?text=${text}`, '_blank');
                  }}
                  className="flex flex-1 justify-center items-center gap-2 rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
