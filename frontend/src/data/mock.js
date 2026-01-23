// Classy Boat Mock Data

export const companyInfo = {
  name: "Classy Boat",
  tagline: "Where Luxury Meets The Waves",
  phone: "+971 50 388 8258",
  instagram: "@classy.boat",
  email: "aqilmbsrandom@gmail.com",
  established: 2019,
  rating: 4.8,
  reviews: 130,
  operatingHours: "07:00 - 01:00",
  locations: [
    { name: "Al Bandar Marina", tour: "Yas Island Tour", city: "Abu Dhabi" },
    { name: "Marina Mall", tour: "Corniche Tour", city: "Abu Dhabi" }
  ]
};

export const fleet = [
  {
    id: "serene",
    name: "Classy Serene",
    type: "Houseboat",
    length: "80FT",
    width: "26FT",
    guests: 50,
    bedrooms: 3,
    location: "Al Bandar - Abu Dhabi",
    description: "3 bedrooms, 3 floors, a grand hall, and a living area. This delightful houseboat offers luxurious amenities and stunning ocean views, creating a joyful experience.",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8fDE3NjkxNzE1MDF8MA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: "aqua",
    name: "Classy Aqua",
    type: "Houseboat",
    length: "40FT",
    width: "16FT",
    guests: 15,
    bedrooms: 1,
    location: "Al Bandar - Abu Dhabi",
    description: "Perfect for an unforgettable sea experience. Bask in the sun and salty air as you cruise along the coastline, taking in breathtaking views of Abu Dhabi.",
    image: "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8fDE3NjkxNzE1MDF8MA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: "waves",
    name: "Classy Waves",
    type: "Houseboat",
    length: "40FT",
    width: "16FT",
    guests: 20,
    bedrooms: 0,
    location: "Marina Mall - Corniche - Abu Dhabi",
    description: "Boasts an expansive living area with comfortable seating, generously furnished spaces, and a high-quality sound system for an unforgettable charter experience.",
    image: "https://images.unsplash.com/photo-1562281302-809108fd533c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8fDE3NjkxNzE1MDF8MA&ixlib=rb-4.1.0&q=85"
  }
];

export const packages = {
  basic: {
    name: "Basic Package",
    basePrice: 800,
    duration: "2 Hours",
    maxGuests: 15,
    additionalHourPrice: 400,
    includes: ["Water", "Karak Tea", "Arabic Coffee"],
    addons: ["Cake", "Snacks", "Balloons", "Arrangements", "Cold Drinks"]
  },
  vip: {
    name: "VIP Package",
    duration: "2 Hours",
    additionalHourPrice: 500,
    additionalGuestPrice: 100,
    pricing: [
      { guests: "2 people", price: 1300 },
      { guests: "3-5 people", price: 1500 },
      { guests: "6-10 people", price: 1700 },
      { guests: "11-15 people", price: 1900 }
    ],
    includes: ["Cake", "Snacks", "Balloons", "Arrangements", "Cold Drinks", "Hot Drinks", "Setting up & Decoration"]
  }
};

export const services = [
  { name: "Birthday Party", icon: "cake" },
  { name: "Wedding", icon: "heart" },
  { name: "Anniversary", icon: "sparkles" },
  { name: "Engagement", icon: "gem" },
  { name: "Gender Reveal", icon: "baby" },
  { name: "Bride to Be", icon: "crown" },
  { name: "Graduation", icon: "graduationCap" },
  { name: "Corporate Gathering", icon: "briefcase" },
  { name: "Family Gathering", icon: "users" }
];

export const eventTypes = [
  "Birthday Party",
  "Wedding",
  "Anniversary",
  "Engagement",
  "Gender Reveal",
  "Bride to Be / Bridal Shower",
  "Graduation",
  "Corporate Gathering",
  "Family Gathering",
  "Sunset Cruise",
  "Private Party",
  "Other"
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Al Maktoum",
    event: "Birthday Celebration",
    rating: 5,
    text: "Absolutely stunning experience! The crew was professional and the boat was immaculate. Perfect for my 30th birthday celebration."
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    event: "Anniversary",
    rating: 5,
    text: "Our anniversary was made extra special by Classy Boat. The sunset views of Abu Dhabi skyline were breathtaking."
  },
  {
    id: 3,
    name: "Fatima Al Rashid",
    event: "Corporate Event",
    rating: 5,
    text: "Excellent service for our corporate gathering. The team was cooperative and supportive throughout. Highly recommended!"
  },
  {
    id: 4,
    name: "Mohammed Khan",
    event: "Family Gathering",
    rating: 5,
    text: "Clean, well-prepared boat with friendly staff. Our family had an amazing time cruising along the coastline."
  }
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1562281302-809108fd533c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8fDE3NjkxNzE1MDF8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8fDE3NjkxNzE1MDF8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjB5YWNodHxlbnwwfHx8fDE3NjkxNzE1MDF8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1602867612779-3aaf54b425c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHBhcnR5fGVufDB8fHx8MTc2OTE3MTUwN3ww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1628336707631-68131ca720c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHx5YWNodCUyMHBhcnR5fGVufDB8fHx8MTc2OTE3MTUwN3ww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1552600337-6f42e4fb2e78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHx5YWNodCUyMHBhcnR5fGVufDB8fHx8MTc2OTE3MTUwN3ww&ixlib=rb-4.1.0&q=85"
];