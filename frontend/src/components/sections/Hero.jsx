import { Star, ArrowRight, MapPin } from 'lucide-react';
import { companyInfo } from '../../data/mock';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1562281302-809108fd533c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8fDE3NjkxNzE1MDF8MA&ixlib=rb-4.1.0&q=85"
          alt="Luxury Yacht"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffef2]/95 via-[#fffef2]/70 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl">
          {/* Tagline */}
          <p className="text-sm tracking-[0.3em] text-[#4a9494] uppercase mb-6">
            Where Luxury Meets The Waves
          </p>

          {/* Main Heading */}
          <h1 className="hero-large text-[#333333] mb-6">
            Experience Abu Dhabi From The Water
          </h1>

          {/* Description */}
          <p className="body-large text-[#666666] mb-8 max-w-lg">
            Premium yacht and boat rental experiences for celebrations, events, and unforgettable moments on the Arabian Gulf.
          </p>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#4a9494] text-[#4a9494]" />
              ))}
            </div>
            <span className="text-sm text-[#666666]">
              {companyInfo.rating} rating from {companyInfo.reviews}+ reviews
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#booking" className="btn-primary">
              Book Your Experience
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <a href="#fleet" className="btn-secondary flex items-center gap-2">
              Explore Our Fleet
            </a>
          </div>

          {/* Locations */}
          <div className="flex flex-wrap gap-6">
            {companyInfo.locations.map((location, index) => (
              <div key={index} className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4a9494]" />
                <span className="text-sm text-[#666666]">{location.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-[#666666] uppercase">Scroll</span>
          <div className="w-px h-12 bg-[#bcbbb4]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;