import { 
  Cake, Heart, Sparkles, Gem, Baby, Crown, 
  GraduationCap, Briefcase, Users 
} from 'lucide-react';
import { services } from '../../data/mock';

const iconMap = {
  cake: Cake,
  heart: Heart,
  sparkles: Sparkles,
  gem: Gem,
  baby: Baby,
  crown: Crown,
  graduationCap: GraduationCap,
  briefcase: Briefcase,
  users: Users
};

const Services = () => {
  return (
    <section id="services" className="section-padding bg-[#f6f5e8]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-[#4a9494] uppercase mb-4">Our Services</p>
          <h2 className="heading-1 text-[#333333] mb-4">Celebrate Every Milestone</h2>
          <p className="body-regular text-[#666666] max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, our special subdivision 
            <span className="font-medium text-[#4a9494]"> Classy Arrangements </span> 
            creates unforgettable moments on the water.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={index}
                className="bg-[#fffef2] p-6 md:p-8 text-center group transition-all duration-300 hover:shadow-md border border-transparent hover:border-[#4a9494]"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 flex items-center justify-center bg-[#f6f5e8] text-[#4a9494] transition-colors group-hover:bg-[#4a9494] group-hover:text-white">
                  <IconComponent className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm md:text-base font-medium text-[#333333]">{service.name}</h3>
              </div>
            );
          })}
        </div>

        {/* Image Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1602867612779-3aaf54b425c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHBhcnR5fGVufDB8fHx8MTc2OTE3MTUwN3ww&ixlib=rb-4.1.0&q=85"
              alt="Party on yacht"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="aspect-square overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1628336707631-68131ca720c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHx5YWNodCUyMHBhcnR5fGVufDB8fHx8MTc2OTE3MTUwN3ww&ixlib=rb-4.1.0&q=85"
              alt="Celebration on yacht"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="aspect-square overflow-hidden hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1552600337-6f42e4fb2e78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHx5YWNodCUyMHBhcnR5fGVufDB8fHx8MTc2OTE3MTUwN3ww&ixlib=rb-4.1.0&q=85"
              alt="Group on yacht"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="aspect-square overflow-hidden hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1517696522815-46a004b80a2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwyfHxtYXJpbmElMjB3YXRlcmZyb250fGVufDB8fHx8MTc2OTE3MTUxM3ww&ixlib=rb-4.1.0&q=85"
              alt="Marina view"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;