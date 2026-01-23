import { Star, Quote } from 'lucide-react';
import { testimonials, companyInfo } from '../../data/mock';

const Testimonials = () => {
  return (
    <section className="section-padding bg-[#fffef2]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-[#4a9494] uppercase mb-4">Testimonials</p>
          <h2 className="heading-1 text-[#333333] mb-4">What Our Guests Say</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#4a9494] text-[#4a9494]" />
              ))}
            </div>
            <span className="text-lg font-medium text-[#333333]">{companyInfo.rating}</span>
            <span className="text-sm text-[#666666]">from {companyInfo.reviews}+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#f6f5e8] p-8 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#bcbbb4]" />
              
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#4a9494] text-[#4a9494]" />
                ))}
              </div>

              {/* Quote */}
              <p className="body-regular text-[#333333] mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div>
                <p className="font-medium text-[#333333]">{testimonial.name}</p>
                <p className="text-sm text-[#666666]">{testimonial.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;