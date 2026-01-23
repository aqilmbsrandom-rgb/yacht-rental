import { useState } from 'react';
import { Calendar, Users, Ship, PartyPopper, Send, Phone, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { fleet, eventTypes, packages, companyInfo } from '../../data/mock';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: null,
    boat: '',
    packageType: '',
    guestCount: '',
    eventType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.date || !formData.boat || !formData.guestCount || !formData.eventType) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedBoat = fleet.find(b => b.id === formData.boat);
      const bookingDetails = {
        ...formData,
        boatName: selectedBoat?.name || formData.boat,
        date: formData.date ? format(formData.date, 'PPP') : ''
      };

      // Send to backend API
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        toast.success('Booking request sent successfully! We will contact you shortly.');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          date: null,
          boat: '',
          packageType: '',
          guestCount: '',
          eventType: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to send booking request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="section-padding bg-[#333333]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Info */}
          <div className="text-white">
            <p className="text-sm tracking-[0.3em] text-[#4a9494] uppercase mb-4">Book Now</p>
            <h2 className="heading-1 text-white mb-6">Reserve Your Unforgettable Experience</h2>
            <p className="body-large text-[#bcbbb4] mb-10">
              Fill out the form and our team will contact you to confirm your booking and discuss any special requirements.
            </p>

            {/* Quick Contact */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-[#bcbbb4] mb-2">Prefer to call?</p>
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center gap-3 text-xl font-light text-white hover:text-[#4a9494] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {companyInfo.phone}
                </a>
              </div>
              <div>
                <p className="text-sm text-[#bcbbb4] mb-2">Or WhatsApp us directly</p>
                <a
                  href={`https://wa.me/971503888258`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#4a9494] hover:text-[#5fb3b3] transition-colors"
                >
                  Click here to chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mt-10 pt-10 border-t border-[#4a4a4a]">
              <p className="text-sm text-[#bcbbb4] mb-2">Operating Hours</p>
              <p className="text-white">Daily {companyInfo.operatingHours}</p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#fffef2] p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Full Name *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full border-[#bcbbb4] rounded-none focus:border-[#4a9494] focus:ring-[#4a9494]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Phone Number *</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+971 XX XXX XXXX"
                    className="w-full border-[#bcbbb4] rounded-none focus:border-[#4a9494] focus:ring-[#4a9494]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Email (Optional)</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border-[#bcbbb4] rounded-none focus:border-[#4a9494] focus:ring-[#4a9494]"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Preferred Date *</label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-[#bcbbb4] rounded-none hover:bg-[#f6f5e8]"
                    >
                      <Calendar className="mr-2 h-4 w-4 text-[#4a9494]" />
                      {formData.date ? format(formData.date, 'PPP') : 'Select a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => {
                        handleChange('date', date);
                        setCalendarOpen(false);
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Boat Selection */}
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Select Boat *</label>
                <Select value={formData.boat} onValueChange={(value) => handleChange('boat', value)}>
                  <SelectTrigger className="w-full border-[#bcbbb4] rounded-none">
                    <Ship className="mr-2 h-4 w-4 text-[#4a9494]" />
                    <SelectValue placeholder="Choose a vessel" />
                  </SelectTrigger>
                  <SelectContent>
                    {fleet.map((boat) => (
                      <SelectItem key={boat.id} value={boat.id}>
                        {boat.name} (up to {boat.guests} guests)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Package & Guests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Package</label>
                  <Select value={formData.packageType} onValueChange={(value) => handleChange('packageType', value)}>
                    <SelectTrigger className="w-full border-[#bcbbb4] rounded-none">
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">{packages.basic.name} (AED {packages.basic.basePrice})</SelectItem>
                      <SelectItem value="vip">{packages.vip.name} (From AED 1300)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Number of Guests *</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4a9494]" />
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      value={formData.guestCount}
                      onChange={(e) => handleChange('guestCount', e.target.value)}
                      placeholder="Number of guests"
                      className="w-full pl-10 border-[#bcbbb4] rounded-none focus:border-[#4a9494] focus:ring-[#4a9494]"
                    />
                  </div>
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Event Type *</label>
                <Select value={formData.eventType} onValueChange={(value) => handleChange('eventType', value)}>
                  <SelectTrigger className="w-full border-[#bcbbb4] rounded-none">
                    <PartyPopper className="mr-2 h-4 w-4 text-[#4a9494]" />
                    <SelectValue placeholder="What's the occasion?" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((event) => (
                      <SelectItem key={event} value={event}>
                        {event}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">Special Requests (Optional)</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us about any special requirements, decorations, or preferences..."
                  rows={4}
                  className="w-full border-[#bcbbb4] rounded-none focus:border-[#4a9494] focus:ring-[#4a9494] resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4a9494] text-white rounded-none py-6 text-sm font-medium uppercase tracking-wider hover:bg-[#3d7a7a] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Booking Request
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;