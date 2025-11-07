import React, { useState, useEffect, useRef } from 'react';
import { 
  FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaFacebook, 
  FaInstagram, FaTwitter, FaCalendarAlt, FaUsers, FaLeaf, 
  FaAward, FaGlobe, FaStar, FaClock, FaUser, FaArrowLeft,
  FaChevronRight, FaChevronLeft, FaPlay, FaPause, FaQuoteLeft,
  FaCheck, FaSearch, FaFilter, FaHeart, FaShare, FaPhoneAlt,
  FaShieldAlt, FaUmbrellaBeach, FaMountain, FaCity, FaTree,
  FaCamera, FaVideo, FaUtensils, FaHotel, FaCar, FaPlane,
  FaPassport, FaSuitcase, FaMoneyBillWave, FaHeadset
} from 'react-icons/fa';

const KenyaTravelLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([100, 2000]);
  const [durationFilter, setDurationFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: { name: '', email: '', phone: '', country: '' },
    trip: { travelers: '', package: '', startDate: '', endDate: '' },
    preferences: { accommodation: '', activities: [], specialRequests: '' }
  });

  const testimonialRef = useRef(null);
  const videoRef = useRef(null);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Video control
  useEffect(() => {
    if (videoRef.current) {
      if (showVideoModal) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [showVideoModal]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const handleBookingChange = (step, field, value) => {
    setFormData(prev => ({
      ...prev,
      [step]: { ...prev[step], [field]: value }
    }));
  };

  const nextBookingStep = () => {
    setBookingStep(prev => Math.min(prev + 1, 3));
  };

  const prevBookingStep = () => {
    setBookingStep(prev => Math.max(prev - 1, 1));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert('Booking request received! Our travel consultant will contact you within 2 hours.');
    setBookingStep(1);
    setFormData({
      personal: { name: '', email: '', phone: '', country: '' },
      trip: { travelers: '', package: '', startDate: '', endDate: '' },
      preferences: { accommodation: '', activities: [], specialRequests: '' }
    });
  };




    const destinations = [
    {
      id: 1,
      name: 'Maasai Mara National Reserve',
      category: 'safari',
      luxury: true,
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ],
      description: 'Witness the Great Migration and Big Five in one of Africa\'s most famous game reserves.',
      detailedDescription: 'The Maasai Mara National Reserve is Kenya\'s most famous wildlife sanctuary. Located in the Great Rift Valley, it hosts the spectacular Great Migration where over 1.5 million wildebeest, zebras, and antelopes cross from the Serengeti. Experience incredible game drives, hot air balloon safaris, and cultural visits to Maasai villages.',
      price: 450,
      duration: '3-7 days',
      bestFor: 'Wildlife Photography, Adventure, Family Safaris',
      rating: 4.9,
      reviews: 284,
      location: 'Narok County',
      bestTime: 'July - October',
      highlights: ['Great Migration', 'Big Five Safari', 'Hot Air Balloon Rides', 'Maasai Cultural Experience'],
      included: ['Luxury Tent Accommodation', 'Daily Game Drives', 'Professional Guide', 'All Meals', 'Park Fees', 'Airport Transfers'],
      excluded: ['International Flights', 'Travel Insurance', 'Personal Expenses'],
      itinerary: [
        { day: 1, title: 'Arrival & Welcome', description: 'Arrive at Nairobi, transfer to Mara with game drive en route' },
        { day: 2, title: 'Full Day Safari', description: 'Early morning and late afternoon game drives in search of the Big Five' },
        { day: 3, title: 'Balloon Safari', description: 'Optional hot air balloon ride followed by champagne breakfast' },
        { day: 4, title: 'Maasai Village', description: 'Cultural visit to authentic Maasai village' }
      ],
      whatsapp: '+254712345678',
      email: 'safari@travelstream.co.ke',
      tags: ['Luxury', 'Family Friendly', 'Photography', 'Adventure']
    },
    {
      id: 2,
      name: 'Diani Beach',
      category: 'beach',
      luxury: true,
      image: 'https://images.unsplash.com/photo-1599640842225-5158b3adce86?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1599640842225-5158b3adce86?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ],
      description: 'Pristine white sands and turquoise waters perfect for relaxation and water sports.',
      detailedDescription: 'Diani Beach is Kenya\'s premier beach destination, featuring 17km of pristine white sand beach lined with palm trees. The turquoise waters of the Indian Ocean offer excellent conditions for swimming, snorkeling, and water sports. Enjoy luxury resorts, beachfront dining, and nearby attractions like the Colobus Monkey Conservation.',
      price: 200,
      duration: '5-10 days',
      bestFor: 'Relaxation, Honeymoon, Water Sports, Family Vacation',
      rating: 4.7,
      reviews: 156,
      location: 'South Coast',
      bestTime: 'All Year',
      highlights: ['White Sand Beaches', 'Coral Reef Snorkeling', 'Luxury Resorts', 'Water Sports'],
      included: ['Beachfront Villa', 'Daily Breakfast', 'Airport Transfers', 'Beach Activities', 'Snorkeling Gear'],
      excluded: ['Scuba Diving', 'Spa Treatments', 'Optional Excursions'],
      itinerary: [
        { day: 1, title: 'Beach Arrival', description: 'Arrive and settle into your beachfront accommodation' },
        { day: 2, title: 'Ocean Exploration', description: 'Snorkeling trip to the marine park' },
        { day: 3, title: 'Island Hopping', description: 'Visit nearby islands and sandbanks' },
        { day: 4, title: 'Water Sports', description: 'Try kayaking, windsurfing, or kite surfing' }
      ],
      whatsapp: '+254712345678',
      email: 'beach@travelstream.co.ke',
      tags: ['Luxury', 'Romantic', 'Family Friendly', 'Water Sports']
    },
    {
      id: 3,
      name: 'Mount Kenya',
      category: 'mountain',
      luxury: false,
      image: 'https://images.unsplash.com/photo-1589559384033-fa5300998e0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1589559384033-fa5300998e0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1464822759849-e50e6b6d72e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ],
      description: 'Africa\'s second highest peak offering challenging climbs and breathtaking views.',
      detailedDescription: 'Mount Kenya is Africa\'s second highest mountain at 5,199 meters, offering some of the continent\'s most spectacular trekking routes. The mountain features diverse ecosystems from rainforest to alpine zones, with unique flora and fauna. Choose from technical climbing routes or scenic hikes to Point Lenana.',
      price: 350,
      duration: '4-6 days',
      bestFor: 'Adventure, Trekking, Photography, Nature Lovers',
      rating: 4.8,
      reviews: 89,
      location: 'Central Kenya',
      bestTime: 'January - February, August - September',
      highlights: ['Summit Attempts', 'Alpine Scenery', 'Unique Wildlife', 'Mountain Huts'],
      included: ['Mountain Guide', 'Park Fees', 'Mountain Hut Accommodation', 'All Meals', 'Equipment Rental'],
      excluded: ['Personal Porter', 'Travel Insurance', 'Tips'],
      itinerary: [
        { day: 1, title: 'Base Camp', description: 'Arrive at base camp and acclimatization hike' },
        { day: 2, title: 'Ascend', description: 'Trek through bamboo forest to first hut' },
        { day: 3, title: 'High Altitude', description: 'Ascend to higher altitude with acclimatization' },
        { day: 4, title: 'Summit Day', description: 'Early morning summit attempt' }
      ],
      whatsapp: '+254712345678',
      email: 'trekking@travelstream.co.ke',
      tags: ['Adventure', 'Challenging', 'Nature', 'Photography']
    },
    {
      id: 4,
      name: 'Amboseli National Park',
      category: 'safari',
      luxury: true,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ],
      description: 'Famous for its large elephant herds and spectacular views of Mount Kilimanjaro.',
      detailedDescription: 'Amboseli National Park is renowned for its large elephant populations and stunning views of Mount Kilimanjaro across the border in Tanzania. The park\'s diverse habitats include dried-up lake beds, savannah, and wetlands that attract abundant wildlife. Experience close encounters with elephants and enjoy spectacular photography opportunities.',
      price: 380,
      duration: '2-4 days',
      bestFor: 'Elephant Viewing, Photography, Family Safaris',
      rating: 4.6,
      reviews: 132,
      location: 'Kajiado County',
      bestTime: 'June - October, January - February',
      highlights: ['Elephant Herds', 'Mount Kilimanjaro Views', 'Observation Hill', 'Maasai Culture'],
      included: ['Lodge Accommodation', 'Game Drives', 'Professional Guide', 'All Meals', 'Park Fees'],
      excluded: ['International Flights', 'Travel Insurance', 'Personal Expenses'],
      itinerary: [
        { day: 1, title: 'Park Entry', description: 'Enter Amboseli and afternoon game drive' },
        { day: 2, title: 'Full Day Safari', description: 'Morning and evening game drives focusing on elephants' },
        { day: 3, title: 'Kilimanjaro Views', description: 'Photography session with Kilimanjaro backdrop' }
      ],
      whatsapp: '+254712345678',
      email: 'safari@travelstream.co.ke',
      tags: ['Luxury', 'Family Friendly', 'Photography', 'Wildlife']
    },
    {
      id: 5,
      name: 'Lamu Island',
      category: 'cultural',
      luxury: false,
      image: 'https://images.unsplash.com/photo-1597074861081-88b762f0b8b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1597074861081-88b762f0b8b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ],
      description: 'A UNESCO World Heritage Site with rich Swahili culture and beautiful architecture.',
      detailedDescription: 'Lamu Island is a UNESCO World Heritage Site that preserves Swahili culture in its purest form. The island features narrow streets, ancient stone buildings, and a rich history dating back to the 12th century. Experience traditional dhow sailing, sample Swahili cuisine, and explore the well-preserved Lamu Old Town.',
      price: 180,
      duration: '4-7 days',
      bestFor: 'Cultural Immersion, History, Relaxation, Photography',
      rating: 4.5,
      reviews: 97,
      location: 'Lamu Archipelago',
      bestTime: 'October - March',
      highlights: ['Swahili Architecture', 'Dhow Sailing', 'Local Cuisine', 'Historical Sites'],
      included: ['Boutique Hotel', 'Cultural Tours', 'Breakfast', 'Local Guide', 'Dhow Cruise'],
      excluded: ['Lunch & Dinner', 'Optional Activities', 'Personal Expenses'],
      itinerary: [
        { day: 1, title: 'Island Arrival', description: 'Arrive by boat and explore Lamu Town' },
        { day: 2, title: 'Cultural Tour', description: 'Visit historical sites and museum' },
        { day: 3, title: 'Dhow Safari', description: 'Traditional sailing trip to nearby islands' },
        { day: 4, title: 'Cooking Class', description: 'Learn to prepare Swahili dishes' }
      ],
      whatsapp: '+254712345678',
      email: 'culture@travelstream.co.ke',
      tags: ['Cultural', 'Historical', 'Relaxing', 'Authentic']
    },
    {
      id: 6,
      name: 'Samburu National Reserve',
      category: 'safari',
      luxury: true,
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ],
      description: 'Home to unique wildlife species not found in other Kenyan parks.',
      detailedDescription: 'Samburu National Reserve in northern Kenya is known for its unique wildlife species including the reticulated giraffe, Grevy\'s zebra, and Somali ostrich. The Ewaso Ng\'iro river flows through the reserve, providing a lifeline for animals in this arid region. Experience authentic cultural interactions with the Samburu people.',
      price: 320,
      duration: '3-5 days',
      bestFor: 'Unique Wildlife, Photography, Cultural Experiences',
      rating: 4.7,
      reviews: 78,
      location: 'Samburu County',
      bestTime: 'All Year',
      highlights: ['Special Five Animals', 'Samburu Culture', 'River Game Viewing', 'Wilderness Experience'],
      included: ['Lodge Stay', 'Game Drives', 'Professional Guide', 'All Meals', 'Park Fees'],
      excluded: ['International Flights', 'Travel Insurance', 'Personal Expenses'],
      itinerary: [
        { day: 1, title: 'Northern Frontier', description: 'Travel to Samburu and afternoon game drive' },
        { day: 2, title: 'River Safari', description: 'Game drives along Ewaso Ng\'iro river' },
        { day: 3, title: 'Samburu Village', description: 'Cultural visit and traditional dance performance' }
      ],
      whatsapp: '+254712345678',
      email: 'safari@travelstream.co.ke',
      tags: ['Luxury', 'Wildlife', 'Cultural', 'Photography']
    }
  ];


  // Enhanced categories with icons
  const categories = [
    { id: 'all', name: 'All Destinations', icon: FaGlobe, count: destinations.length },
    { id: 'safari', name: 'Safari Adventures', icon: FaTree, count: destinations.filter(d => d.category === 'safari').length },
    { id: 'beach', name: 'Beach Getaways', icon: FaUmbrellaBeach, count: destinations.filter(d => d.category === 'beach').length },
    { id: 'mountain', name: 'Mountain Treks', icon: FaMountain, count: destinations.filter(d => d.category === 'mountain').length },
    { id: 'cultural', name: 'Cultural Tours', icon: FaCity, count: destinations.filter(d => d.category === 'cultural').length },
    { id: 'luxury', name: 'Luxury Escapes', icon: FaAward, count: destinations.filter(d => d.luxury).length }
  ];

  const features = [
    {
      icon: FaGlobe,
      title: "Expert Local Guides",
      description: "Our experienced guides bring Kenya's wildlife and culture to life with unmatched knowledge and passion",
      stats: "200+ Certified Guides"
    },
    {
      icon: FaUsers,
      title: "Personalized Itineraries",
      description: "Every journey is crafted to match your dreams, from luxury safaris to cultural immersions",
      stats: "100% Custom Trips"
    },
    {
      icon: FaLeaf,
      title: "Eco-Friendly Travel",
      description: "We're committed to sustainable tourism that protects Kenya's natural beauty and supports local communities",
      stats: "Carbon Neutral"
    },
    {
      icon: FaAward,
      title: "Luxury Experience",
      description: "From world-class accommodations to private safari vehicles, we ensure every moment is extraordinary",
      stats: "5-Star Rated"
    },
    {
      icon: FaShieldAlt,
      title: "Complete Safety",
      description: "Your safety is our priority with 24/7 support, comprehensive insurance, and emergency protocols",
      stats: "100% Safety Record"
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description: "Round-the-clock assistance from our dedicated team throughout your Kenyan adventure",
      stats: "24/7 Concierge"
    }
  ];

  const stats = [
    { number: "15,000+", label: "Happy Travelers" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "25+", label: "Years Experience" },
    { number: "50+", label: "Destinations" }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "The Maasai Mara safari exceeded all expectations. Our guide's knowledge of animal behavior made every game drive unforgettable. The luxury camp was absolutely stunning!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      trip: "Maasai Mara Luxury Safari"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      rating: 5,
      text: "Diani Beach was paradise! The crystal-clear waters and white sand beaches were incredible. The snorkeling trip to the marine park was the highlight of our vacation.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      trip: "Diani Beach Escape"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "London, UK",
      rating: 5,
      text: "Climbing Mount Kenya was challenging but absolutely worth it. The guides were professional and encouraging. The views from Point Lenana were breathtaking!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      trip: "Mount Kenya Summit"
    },
    {
      id: 4,
      name: "James Wilson",
      location: "Sydney, Australia",
      rating: 5,
      text: "The cultural immersion in Lamu was authentic and eye-opening. The Swahili architecture, delicious cuisine, and warm hospitality made this trip truly special.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      trip: "Lamu Cultural Journey"
    }
  ];

  const partners = [
    { name: "Kenya Wildlife Service", logo: "🐘", type: "Government" },
    { name: "Sarova Hotels", logo: "🏨", type: "Luxury Accommodation" },
    { name: "Air Kenya", logo: "✈️", type: "Domestic Flights" },
    { name: "Eco Tourism Kenya", logo: "🌿", type: "Sustainability" },
    { name: "Maasai Cultural Trust", logo: "👑", type: "Community" }
  ];


  // Filter destinations based on active filters
  const filteredDestinations = destinations.filter(destination => {
    const matchesCategory = activeCategory === 'all' || 
      (activeCategory === 'luxury' ? destination.luxury : destination.category === activeCategory);
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = destination.price >= priceRange[0] && destination.price <= priceRange[1];
    const matchesDuration = durationFilter === 'all' || 
      (durationFilter === 'short' && destination.duration.includes('2-4')) ||
      (durationFilter === 'medium' && destination.duration.includes('3-5')) ||
      (durationFilter === 'long' && destination.duration.includes('5-10'));

    return matchesCategory && matchesSearch && matchesPrice && matchesDuration;
  });

  const galleryImages = [
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1599640842225-5158b3adce86?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1589559384033-fa5300998e0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1597074861081-88b762f0b8b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ];

  // Enhanced Destination Detail Modal
  const DestinationDetail = ({ destination, onClose }) => {
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    if (!destination) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900">{destination.name}</h2>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => toggleFavorite(destination.id)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <FaHeart className={`w-6 h-6 ${favorites.includes(destination.id) ? 'text-red-500 fill-current' : ''}`} />
              </button>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Main Image and Thumbnails */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
                  <img 
                    src={destination.images[activeImage]} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center bg-black/50 text-white px-3 py-1 rounded-full">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{destination.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{destination.reviews} reviews</span>
                  </div>
                </div>
                
                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {destination.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`border-2 rounded-lg overflow-hidden transition-all ${
                        activeImage === index ? 'border-orange-500 scale-105' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${destination.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Booking Sidebar */}
              <div className="bg-gray-50 p-6 rounded-xl h-fit sticky top-24">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-orange-500">${destination.price}</span>
                  <span className="text-gray-600 ml-2">per person</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{destination.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Best For</span>
                    <span className="font-semibold text-right">{destination.bestFor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold">{destination.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Best Time</span>
                    <span className="font-semibold">{destination.bestTime}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a 
                    href={`https://wa.me/${destination.whatsapp}?text=Hi, I'm interested in ${destination.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors font-semibold"
                  >
                    <FaWhatsapp className="mr-2" />
                    Instant WhatsApp Booking
                  </a>
                  <a 
                    href={`mailto:${destination.email}?subject=Inquiry about ${destination.name}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors font-semibold"
                  >
                    <FaEnvelope className="mr-2" />
                    Email Package Details
                  </a>
                  <button 
                    onClick={() => {
                      onClose();
                      scrollToSection('booking');
                      handleBookingChange('trip', 'package', destination.name);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-semibold"
                  >
                    Customize This Trip
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaShieldAlt className="text-green-500 mr-2" />
                    <span>Full refund up to 30 days before travel</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {['overview', 'itinerary', 'included', 'gallery'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Experience Overview</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{destination.detailedDescription}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Experience Highlights</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {destination.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">What's Included</h4>
                    <div className="space-y-3 mb-6">
                      {destination.included.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-semibold mb-4">Not Included</h4>
                    <div className="space-y-3">
                      {destination.excluded.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span className="text-gray-500">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Detailed Itinerary</h3>
                  <div className="space-y-6">
                    {destination.itinerary.map((day, index) => (
                      <div key={index} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                            {day.day}
                          </div>
                          {index < destination.itinerary.length - 1 && (
                            <div className="w-1 h-full bg-gray-200 my-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <h4 className="font-semibold text-lg mb-2">{day.title}</h4>
                          <p className="text-gray-600">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'included' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-green-600">Included in Your Package</h4>
                    <div className="space-y-4">
                      {destination.included.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-gray-600">Not Included</h4>
                    <div className="space-y-4">
                      {destination.excluded.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-500">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Photo Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {destination.images.map((img, index) => (
                      <div key={index} className="relative group cursor-pointer">
                        <img 
                          src={img} 
                          alt={`${destination.name} ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                          <FaCamera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Video Modal Component
  const VideoModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-4xl w-full">
          <button 
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
              className="w-full h-full object-cover"
              controls
              autoPlay
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">TS</span>
              </div>
              <div className="ml-3">
                <h1 className="font-bold text-xl text-gray-900 leading-tight">Travel Stream</h1>
                <p className="text-xs text-gray-600">Premium Kenya Tours & Travel</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection("home")} className="text-gray-700 hover:text-orange-500 transition-colors font-medium group">
                Home
                <div className="h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </button>
              <button onClick={() => scrollToSection("about")} className="text-gray-700 hover:text-orange-500 transition-colors font-medium group">
                About Us
                <div className="h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </button>
              <button onClick={() => scrollToSection("packages")} className="text-gray-700 hover:text-orange-500 transition-colors font-medium group">
                Destinations
                <div className="h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </button>
              <button onClick={() => scrollToSection("gallery")} className="text-gray-700 hover:text-orange-500 transition-colors font-medium group">
                Gallery
                <div className="h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </button>
              <button onClick={() => scrollToSection("testimonials")} className="text-gray-700 hover:text-orange-500 transition-colors font-medium group">
                Reviews
                <div className="h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </button>
              <button onClick={() => scrollToSection("booking")} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium shadow-lg hover:shadow-xl">
                Book Now
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
              <div className="flex flex-col space-y-3">
                <button onClick={() => scrollToSection("home")} className="text-left px-4 py-3 hover:bg-orange-50 rounded-lg transition-colors text-gray-700 font-medium">
                  Home
                </button>
                <button onClick={() => scrollToSection("about")} className="text-left px-4 py-3 hover:bg-orange-50 rounded-lg transition-colors text-gray-700 font-medium">
                  About Us
                </button>
                <button onClick={() => scrollToSection("packages")} className="text-left px-4 py-3 hover:bg-orange-50 rounded-lg transition-colors text-gray-700 font-medium">
                  Destinations
                </button>
                <button onClick={() => scrollToSection("gallery")} className="text-left px-4 py-3 hover:bg-orange-50 rounded-lg transition-colors text-gray-700 font-medium">
                  Gallery
                </button>
                <button onClick={() => scrollToSection("testimonials")} className="text-left px-4 py-3 hover:bg-orange-50 rounded-lg transition-colors text-gray-700 font-medium">
                  Reviews
                </button>
                <button onClick={() => scrollToSection("booking")} className="mx-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden pt-20">
        {/* Background Video/Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
            alt="Maasai Mara savannah at sunset with hot air balloons" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full animate-ping"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <FaStar className="text-yellow-400 mr-2" />
              <span className="text-white font-semibold">Kenya's Premier Travel Company Since 1998</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              Discover <span className="text-orange-400">Kenya</span>
            </h1>
            <p className="text-2xl md:text-4xl text-white/95 mb-6 font-light">
              Where <span className="italic">Adventure</span> Meets <span className="italic">Luxury</span>
            </p>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience world-class safaris, pristine beaches, and authentic cultural encounters with Kenya's most trusted travel experts
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button 
                onClick={() => scrollToSection("packages")} 
                className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-semibold text-lg min-w-[240px] shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  Explore Destinations
                  <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => setShowVideoModal(true)}
                className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-5 rounded-xl hover:bg-white/20 transition-all font-semibold text-lg min-w-[240px] hover:shadow-2xl"
              >
                <span className="flex items-center justify-center">
                  <FaPlay className="mr-2" />
                  Watch Our Story
                </span>
              </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <span className="text-white/70 text-sm mb-2">Scroll to Explore</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2 animate-bounce">
              <div className="w-1 h-3 bg-white/70 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-semibold">Trusted by Travelers Worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all">
                <div className="text-4xl mb-2">{partner.logo}</div>
                <div className="text-sm font-semibold text-gray-800">{partner.name}</div>
                <div className="text-xs text-gray-500">{partner.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Why Choose Travel Stream
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Crafting <span className="text-orange-500">Unforgettable</span> Kenyan Adventures
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                For over 25 years, we've been creating bespoke travel experiences that showcase the very best of Kenya. 
                From luxury safaris in the Maasai Mara to cultural immersions in Lamu, our expert team ensures every 
                moment of your journey is extraordinary.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <FaCheck className="text-green-500 mr-3 text-lg" />
                  <span className="text-gray-700 font-medium">Award-winning safari experiences</span>
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-green-500 mr-3 text-lg" />
                  <span className="text-gray-700 font-medium">24/7 dedicated travel concierge</span>
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-green-500 mr-3 text-lg" />
                  <span className="text-gray-700 font-medium">Sustainable & eco-friendly tourism</span>
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-green-500 mr-3 text-lg" />
                  <span className="text-gray-700 font-medium">Local expert guides with 10+ years experience</span>
                </div>
              </div>

              <button 
                onClick={() => scrollToSection("packages")}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                Discover Our Packages
              </button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <img 
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Elephants in Amboseli" 
                  className="rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                />
                <img 
                  src="https://images.unsplash.com/photo-1599640842225-5158b3adce86?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Diani Beach" 
                  className="rounded-2xl shadow-2xl transform rotate-3 mt-12 hover:rotate-0 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl">
                <div className="text-3xl font-bold text-orange-500">25+</div>
                <div className="text-gray-600 font-semibold">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Travel With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We go beyond ordinary travel to deliver extraordinary experiences that create lifelong memories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-orange-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="text-orange-500 font-semibold">
                  {feature.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Packages/Destinations Section */}
      <section id="packages" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Curated Experiences
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Discover Kenya's Wonders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From wildlife safaris to beach getaways, explore our handpicked destinations that showcase the diversity and beauty of Kenya
            </p>
          </div>

          {/* Enhanced Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Category Filter */}
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Duration Filter */}
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="all">All Durations</option>
                <option value="short">Short (2-4 days)</option>
                <option value="medium">Medium (3-5 days)</option>
                <option value="long">Long (5-10 days)</option>
              </select>
            </div>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-6 py-4 rounded-xl font-semibold transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl transform -translate-y-1'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-lg'
                }`}
              >
                <category.icon className="mr-3" />
                {category.name}
                <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-sm">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredDestinations.map(destination => (
              <div 
                key={destination.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 group cursor-pointer"
                onClick={() => setSelectedDestination(destination)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
                    </div>
                    {destination.luxury && (
                      <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Luxury
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 flex items-center bg-black/50 text-white px-3 py-1 rounded-full">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{destination.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{destination.reviews} reviews</span>
                  </div>

                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(destination.id);
                    }}
                    className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaHeart className={`w-5 h-5 ${favorites.includes(destination.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {destination.description}
                  </p>
                  
                  <div className="flex items-center text-gray-500 mb-3">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{destination.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <FaClock className="mr-2" />
                    <span>{destination.duration}</span>
                    <span className="mx-2">•</span>
                    <FaCalendarAlt className="mr-2" />
                    <span>Best: {destination.bestTime}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-3xl font-bold text-orange-500">${destination.price}</span>
                      <span className="text-gray-600 ml-2">per person</span>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {destination.bestFor}
                    </span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-semibold shadow-lg hover:shadow-xl"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <FaSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No destinations found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Visual Journey
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Kenya Through Our Lens
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every journey tells a story — discover the magic of Kenya through breathtaking moments captured by our travelers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-[200px]">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  index % 7 === 0 ? 'row-span-2' : index % 5 === 0 ? 'col-span-2' : ''
                }`}
              >
                <img 
                  src={image} 
                  alt={`Kenya travel ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <FaCamera className="w-6 h-6 mb-2" />
                    <p className="font-semibold">Kenya Adventure #{index + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-orange-500 border-2 border-orange-500 px-8 py-4 rounded-xl hover:bg-orange-500 hover:text-white transition-all font-semibold shadow-lg hover:shadow-xl">
              View Full Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Traveler Stories
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from travelers who've experienced Kenya with us
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div 
                ref={testimonialRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
                      <div className="flex items-start mb-6">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover mr-6"
                        />
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.location}</p>
                          <p className="text-sm text-orange-500 font-semibold mt-1">{testimonial.trip}</p>
                        </div>
                        <div className="ml-auto flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="relative">
                        <FaQuoteLeft className="text-orange-200 text-4xl mb-4" />
                        <p className="text-lg text-gray-700 leading-relaxed italic pl-8">
                          "{testimonial.text}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-center items-center mt-12 space-x-4">
                <button 
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
                  }}
                  className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg"
                >
                  <FaChevronLeft className="text-gray-600" />
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentTestimonial(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentTestimonial === index ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button 
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
                  }}
                  className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg"
                >
                  <FaChevronRight className="text-gray-600" />
                </button>

                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg ml-4"
                >
                  {isPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Booking Section */}
      <section id="booking" className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Start Your Journey
              </div>
              <h2 className="text-5xl font-bold text-white mb-4">
                Book Your Kenyan Adventure
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Let our travel experts craft your perfect itinerary. Get a personalized quote within 24 hours.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Booking Steps */}
              <div className="bg-gray-50 px-8 py-6 border-b">
                <div className="flex justify-between max-w-2xl mx-auto">
                  {[1, 2, 3].map(step => (
                    <div key={step} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        bookingStep >= step 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step}
                      </div>
                      <div className={`ml-3 font-medium ${
                        bookingStep >= step ? 'text-orange-500' : 'text-gray-500'
                      }`}>
                        {step === 1 && 'Personal Info'}
                        {step === 2 && 'Trip Details'}
                        {step === 3 && 'Preferences'}
                      </div>
                      {step < 3 && (
                        <div className={`w-16 h-1 mx-4 ${
                          bookingStep > step ? 'bg-orange-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8">
                <form onSubmit={handleBookingSubmit}>
                  {bookingStep === 1 && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
                        <p className="text-gray-600 mb-6">Tell us about yourself so we can create your perfect trip</p>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                          <input 
                            type="text" 
                            required
                            value={formData.personal.name}
                            onChange={(e) => handleBookingChange('personal', 'name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <input 
                            type="email" 
                            required
                            value={formData.personal.email}
                            onChange={(e) => handleBookingChange('personal', 'email', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                            <input 
                              type="tel" 
                              required
                              value={formData.personal.phone}
                              onChange={(e) => handleBookingChange('personal', 'phone', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                              placeholder="+254 712 345 678"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                            <input 
                              type="text" 
                              required
                              value={formData.personal.country}
                              onChange={(e) => handleBookingChange('personal', 'country', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                              placeholder="United States"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Trip Details</h3>
                        <p className="text-gray-600 mb-6">When and how would you like to travel?</p>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Destination</label>
                          <select 
                            value={formData.trip.package}
                            onChange={(e) => handleBookingChange('trip', 'package', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                          >
                            <option value="">Select a destination</option>
                            {destinations.map(dest => (
                              <option key={dest.id} value={dest.name}>{dest.name}</option>
                            ))}
                            <option value="custom">Custom Itinerary</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                            <input 
                              type="date" 
                              required
                              value={formData.trip.startDate}
                              onChange={(e) => handleBookingChange('trip', 'startDate', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                            <input 
                              type="date" 
                              required
                              value={formData.trip.endDate}
                              onChange={(e) => handleBookingChange('trip', 'endDate', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers *</label>
                          <select 
                            required
                            value={formData.trip.travelers}
                            onChange={(e) => handleBookingChange('trip', 'travelers', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                          >
                            <option value="">Select number</option>
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="3-4">3-4 People</option>
                            <option value="5-6">5-6 People</option>
                            <option value="7+">7+ People</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Travel Preferences</h3>
                        <p className="text-gray-600 mb-6">Help us customize your perfect experience</p>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Style</label>
                          <select 
                            value={formData.preferences.accommodation}
                            onChange={(e) => handleBookingChange('preferences', 'accommodation', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                          >
                            <option value="">Select preference</option>
                            <option value="luxury">Luxury (5-Star Lodges)</option>
                            <option value="boutique">Boutique Hotels</option>
                            <option value="tented">Luxury Tented Camps</option>
                            <option value="mid-range">Mid-Range Comfort</option>
                            <option value="budget">Budget Friendly</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Activities</label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Wildlife Safari', 'Beach Relaxation', 'Cultural Tours', 'Mountain Trekking', 'Photography', 'Adventure Sports'].map(activity => (
                              <label key={activity} className="flex items-center">
                                <input 
                                  type="checkbox"
                                  checked={formData.preferences.activities.includes(activity)}
                                  onChange={(e) => {
                                    const activities = e.target.checked
                                      ? [...formData.preferences.activities, activity]
                                      : formData.preferences.activities.filter(a => a !== activity);
                                    handleBookingChange('preferences', 'activities', activities);
                                  }}
                                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                />
                                <span className="ml-2 text-gray-700">{activity}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                          <textarea 
                            rows={4}
                            value={formData.preferences.specialRequests}
                            onChange={(e) => handleBookingChange('preferences', 'specialRequests', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                            placeholder="Dietary requirements, accessibility needs, special occasions, etc."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                    {bookingStep > 1 && (
                      <button
                        type="button"
                        onClick={prevBookingStep}
                        className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                      >
                        Back
                      </button>
                    )}
                    {bookingStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextBookingStep}
                        className="ml-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-semibold shadow-lg hover:shadow-xl"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="ml-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg hover:shadow-xl"
                      >
                        Submit Booking Request
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaWhatsapp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">WhatsApp Booking</h4>
                <p className="text-gray-300 mb-4">Instant confirmation via WhatsApp</p>
                <a 
                  href="https://wa.me/254712345678"
                  className="text-orange-400 hover:text-orange-300 font-semibold"
                >
                  +254 712 345 678
                </a>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Email Inquiry</h4>
                <p className="text-gray-300 mb-4">Detailed responses within 2 hours</p>
                <a 
                  href="mailto:info@travelstream.co.ke"
                  className="text-orange-400 hover:text-orange-300 font-semibold"
                >
                  info@travelstream.co.ke
                </a>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaPhoneAlt className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Phone Call</h4>
                <p className="text-gray-300 mb-4">Speak directly with our experts</p>
                <a 
                  href="tel:+254712345678"
                  className="text-orange-400 hover:text-orange-300 font-semibold"
                >
                  +254 712 345 678
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">TS</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-2xl leading-tight">Travel Stream</h3>
                  <p className="text-orange-400 font-semibold">Premium Tours & Travel</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Your gateway to unforgettable Kenyan adventures. From luxury safaris to pristine beaches, 
                we craft experiences that celebrate the wild beauty and rich culture of East Africa.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-orange-500 rounded-xl flex items-center justify-center transition-colors shadow-lg"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-orange-500 rounded-xl flex items-center justify-center transition-colors shadow-lg"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-orange-500 rounded-xl flex items-center justify-center transition-colors shadow-lg"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <div className="space-y-3">
                {['Home', 'About Us', 'Destinations', 'Gallery', 'Reviews', 'Contact'].map(link => (
                  <button 
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
                    className="block text-gray-300 hover:text-orange-400 transition-colors text-left"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="font-bold text-lg mb-6">Destinations</h4>
              <div className="space-y-3">
                {destinations.slice(0, 5).map(destination => (
                  <button 
                    key={destination.id}
                    onClick={() => setSelectedDestination(destination)}
                    className="block text-gray-300 hover:text-orange-400 transition-colors text-left"
                  >
                    {destination.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-orange-400" />
                  <span className="text-gray-300">Nairobi, Kenya</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="w-5 h-5 mr-3 flex-shrink-0 text-orange-400" />
                  <span className="text-gray-300">+254 712 345 678</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="w-5 h-5 mr-3 flex-shrink-0 text-orange-400" />
                  <span className="text-gray-300">info@travelstream.co.ke</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-gray-300 mb-4">Get travel inspiration and exclusive offers</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-r-xl font-semibold transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Travel Stream Tours & Travel. All rights reserved. | 
              <a href="#" className="text-orange-400 hover:text-orange-300 ml-2">Privacy Policy</a> | 
              <a href="#" className="text-orange-400 hover:text-orange-300 ml-2">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col space-y-4">
        <a 
          href="https://wa.me/254712345678"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
        >
          <FaWhatsapp className="w-6 h-6 text-white" />
        </a>
        <button 
          onClick={() => scrollToSection('booking')}
          className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
        >
          <FaCalendarAlt className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <DestinationDetail 
          destination={selectedDestination} 
          onClose={() => setSelectedDestination(null)} 
        />
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <VideoModal onClose={() => setShowVideoModal(false)} />
      )}
    </div>
  );
};

export default KenyaTravelLandingPage;