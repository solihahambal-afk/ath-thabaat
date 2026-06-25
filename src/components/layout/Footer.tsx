import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Phone, Mail, Facebook, Youtube, MessageCircle } from 'lucide-react';

const navigation = {
  main: [
    { name: 'About Us', href: '/about' },
    { name: 'Academics', href: '/academics' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Campuses', href: '/campuses' },
    { name: 'News & Events', href: '/news' },
  ],
  support: [
    { name: 'Contact', href: '/contact' },
    { name: 'Parent/Student Portal', href: '/portal' },
  ],
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com/AththabaatInternationalSchools', icon: Facebook },
    { name: 'Youtube', href: 'https://www.youtube.com/@ath-thabaatschools1294', icon: Youtube },
    { name: 'WhatsApp', href: 'https://wa.me/2347042226091', icon: MessageCircle },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary-900 mt-auto" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Ath-Thabaat Logo" className="h-12 w-auto bg-white p-1 rounded-sm object-contain" />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold leading-tight text-white">
                  Ath-Thabaat
                </span>
                <span className="text-xs font-medium text-gold-500 uppercase tracking-wider">
                  International Schools
                </span>
              </div>
            </Link>
            <p className="text-sm leading-6 text-primary-200">
              Striving towards building a balanced nation. Providing qualitative Western education integrated with authentic Islamic teachings.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Quick Links</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Contact Us</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                    <span className="text-sm leading-6 text-gray-300">
                      Iderade, Oloje Estate, Ilorin, Kwara State.
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                    <div className="flex flex-col">
                      <a href="tel:+2349038617008" className="text-sm leading-6 text-gray-300 hover:text-white">
                        +234 903 861 7008
                      </a>
                      <a href="tel:+2347042226091" className="text-sm leading-6 text-gray-300 hover:text-white">
                        +234 704 222 6091
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                    <a href="mailto:abiola.nura@gmail.com" className="text-sm leading-6 text-gray-300 hover:text-white">
                      abiola.nura@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Ath-Thabaat International Schools. All rights reserved.
          </p>
          <p className="text-xs leading-5 text-gray-500">
            Designed for educational excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
