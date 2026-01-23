import { Anchor, Phone, Instagram, Mail, MapPin, Clock } from 'lucide-react';
import { companyInfo } from '../../data/mock';

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white">
      <div className="container-custom section-padding-small">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Anchor className="w-8 h-8 text-[#4a9494]" strokeWidth={1.5} />
              <div>
                <span className="text-xl font-medium tracking-wide">Classy Boat</span>
                <span className="block text-[10px] tracking-[0.2em] text-[#bcbbb4] uppercase">Abu Dhabi</span>
              </div>
            </div>
            <p className="text-[#bcbbb4] text-sm leading-relaxed">
              Where Luxury Meets The Waves. Premium boat rental experiences in Abu Dhabi since 2019.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <a href="#fleet" className="text-[#bcbbb4] text-sm hover:text-white transition-colors">Our Fleet</a>
              <a href="#packages" className="text-[#bcbbb4] text-sm hover:text-white transition-colors">Packages</a>
              <a href="#services" className="text-[#bcbbb4] text-sm hover:text-white transition-colors">Services</a>
              <a href="#booking" className="text-[#bcbbb4] text-sm hover:text-white transition-colors">Book Now</a>
            </nav>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-lg font-medium mb-6">Locations</h4>
            <div className="flex flex-col gap-4">
              {companyInfo.locations.map((location, index) => (
                <div key={index} className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#4a9494] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{location.name}</p>
                    <p className="text-xs text-[#bcbbb4]">{location.tour}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium mb-6">Contact Us</h4>
            <div className="flex flex-col gap-4">
              <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-3 text-[#bcbbb4] text-sm hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#4a9494]" />
                {companyInfo.phone}
              </a>
              <a href="https://instagram.com/classy.boat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#bcbbb4] text-sm hover:text-white transition-colors">
                <Instagram className="w-4 h-4 text-[#4a9494]" />
                {companyInfo.instagram}
              </a>
              <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-3 text-[#bcbbb4] text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#4a9494]" />
                {companyInfo.email}
              </a>
              <div className="flex items-center gap-3 text-[#bcbbb4] text-sm">
                <Clock className="w-4 h-4 text-[#4a9494]" />
                Daily {companyInfo.operatingHours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#4a4a4a] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#bcbbb4]">
            © {new Date().getFullYear()} Classy Boat Rental LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#bcbbb4]">Established</span>
            <span className="text-xs font-medium text-[#4a9494]">{companyInfo.established}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;