import { useState } from 'react';
import { Menu, X, Phone, Instagram, Anchor } from 'lucide-react';
import { companyInfo } from '../../data/mock';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Packages', href: '#packages' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fffef2]/95 backdrop-blur-sm border-b border-[#bcbbb4]">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <Anchor className="w-8 h-8 text-[#4a9494]" strokeWidth={1.5} />
            <div>
              <span className="text-xl font-medium tracking-wide text-[#333333]">Classy Boat</span>
              <span className="block text-[10px] tracking-[0.2em] text-[#666666] uppercase">Abu Dhabi</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#333333] relative py-2 transition-all hover:text-[#4a9494]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact & CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-2 text-sm text-[#666666] hover:text-[#333333] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{companyInfo.phone}</span>
            </a>
            <a
              href="https://instagram.com/classy.boat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666666] hover:text-[#333333] transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#booking"
              className="btn-primary text-xs"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#333333]"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#fffef2] border-t border-[#bcbbb4]">
          <nav className="container-custom py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-[#333333] py-2"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-[#bcbbb4]">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-sm text-[#666666]"
              >
                <Phone className="w-4 h-4" />
                <span>{companyInfo.phone}</span>
              </a>
            </div>
            <a
              href="#booking"
              onClick={() => setIsMenuOpen(false)}
              className="btn-primary text-center mt-4"
            >
              Book Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;