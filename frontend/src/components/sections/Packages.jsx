import { Check, Clock, Users, Plus } from 'lucide-react';
import { packages } from '../../data/mock';

const Packages = () => {
  return (
    <section id="packages" className="section-padding bg-[#fffef2]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-[#4a9494] uppercase mb-4">Pricing</p>
          <h2 className="heading-1 text-[#333333] mb-4">Transparent Pricing Packages</h2>
          <p className="body-regular text-[#666666] max-w-2xl mx-auto">
            Choose the perfect package for your event. All packages include captain and crew.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Package */}
          <div className="border border-[#bcbbb4] p-8 transition-all duration-300 hover:border-[#4a9494]">
            <div className="mb-6">
              <h3 className="heading-2 text-[#333333] mb-2">{packages.basic.name}</h3>
              <p className="body-small text-[#666666]">Perfect for casual cruises and small gatherings</p>
            </div>

            {/* Main Price */}
            <div className="mb-6 pb-6 border-b border-[#ebeade]">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-light text-[#333333]">AED {packages.basic.basePrice}</span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-[#666666]">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {packages.basic.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> Up to {packages.basic.maxGuests} guests
                </span>
              </div>
              <p className="text-sm text-[#4a9494] mt-2">
                <Plus className="w-3 h-3 inline mr-1" />
                AED {packages.basic.additionalHourPrice} per additional hour
              </p>
            </div>

            {/* Includes */}
            <div className="mb-6">
              <p className="text-sm font-medium text-[#333333] mb-3 uppercase tracking-wider">Includes</p>
              <ul className="space-y-2">
                {packages.basic.includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-[#666666]">
                    <Check className="w-4 h-4 text-[#4a9494]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Available Addons */}
            <div className="mb-8">
              <p className="text-sm font-medium text-[#333333] mb-3 uppercase tracking-wider">Available Addons</p>
              <div className="flex flex-wrap gap-2">
                {packages.basic.addons.map((addon, index) => (
                  <span key={index} className="text-xs px-3 py-1.5 bg-[#f6f5e8] text-[#666666]">
                    {addon}
                  </span>
                ))}
              </div>
            </div>

            <a href="#booking" className="w-full btn-primary text-center block">
              Book Basic Package
            </a>
          </div>

          {/* VIP Package */}
          <div className="border-2 border-[#4a9494] p-8 relative">
            <div className="absolute -top-3 left-8">
              <span className="bg-[#4a9494] text-white text-xs px-4 py-1.5 uppercase tracking-wider">
                Most Popular
              </span>
            </div>

            <div className="mb-6">
              <h3 className="heading-2 text-[#333333] mb-2">{packages.vip.name}</h3>
              <p className="body-small text-[#666666]">All-inclusive premium experience with decorations</p>
            </div>

            {/* Pricing Tiers */}
            <div className="mb-6 pb-6 border-b border-[#ebeade]">
              <p className="text-sm font-medium text-[#333333] mb-3">{packages.vip.duration} packages:</p>
              <div className="space-y-2">
                {packages.vip.pricing.map((tier, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">{tier.guests}</span>
                    <span className="text-lg font-medium text-[#333333]">AED {tier.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#ebeade] space-y-1">
                <p className="text-sm text-[#4a9494]">
                  <Plus className="w-3 h-3 inline mr-1" />
                  AED {packages.vip.additionalGuestPrice} per additional guest
                </p>
                <p className="text-sm text-[#4a9494]">
                  <Plus className="w-3 h-3 inline mr-1" />
                  AED {packages.vip.additionalHourPrice} per additional hour
                </p>
              </div>
            </div>

            {/* VIP Includes */}
            <div className="mb-8">
              <p className="text-sm font-medium text-[#333333] mb-3 uppercase tracking-wider">Everything Included</p>
              <ul className="space-y-2">
                {packages.vip.includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-[#666666]">
                    <Check className="w-4 h-4 text-[#4a9494]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a href="#booking" className="w-full bg-[#4a9494] text-white border-0 btn-primary text-center block hover:bg-[#3d7a7a]">
              Book VIP Package
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;