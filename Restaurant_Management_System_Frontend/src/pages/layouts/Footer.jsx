import { MapPin, Phone, Clock, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-[#1f1f23] text-white pt-12 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
        {/* Address */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-red-600">
            <MapPin size={20} />
            <h4 className="font-semibold">Address</h4>
          </div>
          <p className="text-sm text-gray-300">A108 Adam Street<br />New York, NY 535022</p>
        </div>

        {/* Contact */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-red-600">
            <Phone size={20} />
            <h4 className="font-semibold">Contact</h4>
          </div>
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-white">Phone:</span> +1 5589 55488 55<br />
            <span className="font-semibold text-white">Email:</span> info@example.com
          </p>
        </div>

        {/* Opening Hours */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-red-600">
            <Clock size={20} />
            <h4 className="font-semibold">Opening Hours</h4>
          </div>
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-white">Mon-Sat:</span> 11AM - 23PM<br />
            <span className="font-semibold text-white">Sunday:</span> Closed
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-3">
            {[
              { icon: Twitter, path: '/twitter' },
              { icon: Facebook, path: '/facebook' },
              { icon: Instagram, path: '/instagram' },
              { icon: Linkedin, path: '/linkedin' }
            ].map((social, index) => (
              <Link
                key={index}
                to={social.path}
                className="text-gray-300 border border-gray-500 hover:border-red-600 hover:text-red-600 w-9 h-9 flex items-center justify-center rounded-full transition"
              >
                <social.icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-400 pt-6">
        <p>© Copyright <span className="text-white font-semibold">Yummy</span> All Rights Reserved</p>
        <p className="text-sm pt-2">
          Designed by <Link to="#" className="text-red-600 hover:underline">BootstrapMade</Link> Distributed by <Link to="#" className="text-red-600 hover:underline">ThemeWagon</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
