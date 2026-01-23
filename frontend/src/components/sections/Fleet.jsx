import { Users, Ruler, MapPin, BedDouble } from 'lucide-react';
import { fleet } from '../../data/mock';

const Fleet = () => {
  return (
    <section id="fleet" className="section-padding bg-[#f6f5e8]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-[#4a9494] uppercase mb-4">Our Fleet</p>
          <h2 className="heading-1 text-[#333333] mb-4">Exceptional Vessels for Every Occasion</h2>
          <p className="body-regular text-[#666666] max-w-2xl mx-auto">
            Choose from our collection of premium houseboats, each meticulously maintained and fully crewed for your comfort.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {fleet.map((boat) => (
            <div
              key={boat.id}
              className="bg-[#fffef2] group transition-all duration-300 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={boat.image}
                  alt={boat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#4a9494] text-white text-xs px-3 py-1.5 uppercase tracking-wider">
                    {boat.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="heading-3 text-[#333333] mb-3">{boat.name}</h3>
                <p className="body-small text-[#666666] mb-6 line-clamp-2">{boat.description}</p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#4a9494]" />
                    <span className="text-sm text-[#666666]">Up to {boat.guests} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#4a9494]" />
                    <span className="text-sm text-[#666666]">{boat.length}</span>
                  </div>
                  {boat.bedrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-[#4a9494]" />
                      <span className="text-sm text-[#666666]">{boat.bedrooms} Bedroom{boat.bedrooms > 1 ? 's' : ''}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#4a9494]" />
                    <span className="text-sm text-[#666666] truncate">{boat.location.split(' - ')[0]}</span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#booking"
                  className="w-full btn-primary text-center block"
                >
                  Book This Vessel
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;