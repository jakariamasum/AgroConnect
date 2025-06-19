import {
  Clock,
  DollarSign,
  Globe,
  Handshake,
  Heart,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export const stats = [
  {
    number: "2,500+",
    label: "Active Farmers",
    icon: <Users className="w-6 h-6" />,
  },
  {
    number: "15,000+",
    label: "Happy Buyers",
    icon: <Star className="w-6 h-6" />,
  },
  {
    number: "৳50L+",
    label: "Direct Sales",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    number: "25+",
    label: "Districts Covered",
    icon: <MapPin className="w-6 h-6" />,
  },
];

export const features = [
  {
    icon: <Leaf className="h-8 w-8 text-green-600" />,
    title: "Direct Farm-to-Market",
    description:
      "Connect directly with farmers, eliminating middlemen and ensuring fair prices for everyone.",
  },
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Community Driven",
    description:
      "Build lasting relationships between farmers and buyers in your local community.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
    title: "Fair Pricing",
    description:
      "Transparent pricing that benefits both farmers and buyers with real-time market rates.",
  },
  {
    icon: <Shield className="h-8 w-8 text-red-600" />,
    title: "Secure Transactions",
    description:
      "Safe and secure payment processing with buyer protection and farmer guarantees.",
  },
  {
    icon: <Smartphone className="h-8 w-8 text-orange-600" />,
    title: "Mobile Optimized",
    description:
      "Easy-to-use mobile interface designed for farmers and buyers across Bangladesh.",
  },
  {
    icon: <Globe className="h-8 w-8 text-teal-600" />,
    title: "Local & Regional",
    description:
      "Connect with farmers in your area or expand to regional markets across the country.",
  },
];

export const recentProducts = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    farmer: "Abdul Rahman",
    location: "Jessore",
    price: 45,
    image: "https://i.ibb.co/60HNk1vN/AN313-Tomatoes-732x549-Thumb-732x549.jpg",
    rating: 4.8,
    organic: true,
  },
  {
    id: 2,
    name: "Basmati Rice",
    farmer: "Fatima Khatun",
    location: "Rangpur",
    price: 65,
    image:
      "https://i.ibb.co/pB6txRBb/images-q-tbn-ANd9-Gc-Q3m-Qs2-Tw-RDYQOFf-Tn7w649sbyfpm1rn-U3-G7w-s.jpg",
    rating: 4.9,
    organic: false,
  },
  {
    id: 3,
    name: "Fresh Mangoes",
    farmer: "Mohammad Ali",
    location: "Rajshahi",
    price: 120,
    image:
      "https://i.ibb.co/yFFmhqRC/images-q-tbn-ANd9-Gc-Rfetiy-Z1-Vzhw-TSq-i-wf-h5pn-CEQy-Pj-D4-T5-Q-s.jpg",
    rating: 4.7,
    organic: true,
  },
];

export const categories = [
  { value: "all", label: "All Categories", count: 156 },
  { value: "vegetables", label: "Vegetables", count: 45 },
  { value: "fruits", label: "Fruits", count: 32 },
  { value: "grains", label: "Grains", count: 28 },
  { value: "fish", label: "Fish", count: 18 },
  { value: "dairy", label: "Dairy", count: 15 },
  { value: "spices", label: "Spices", count: 18 },
];

export const locations = [
  { value: "All Locations", label: "All Locations" },
  { value: "Dhaka", label: "Dhaka" },
  { value: "Chittagong", label: "Chittagong" },
  { value: "Rajshahi", label: "Rajshahi" },
  { value: "Khulna", label: "Khulna" },
  { value: "Barisal", label: "Barisal" },
  { value: "Sylhet", label: "Sylhet" },
  { value: "Rangpur", label: "Rangpur" },
  { value: "Mymensingh", label: "Mymensingh" },
];

export const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

export const distanceOptions = [
  { value: "any", label: "Any distance" },
  { value: "10km", label: "Within 10 km" },
  { value: "25km", label: "Within 25 km" },
  { value: "50km", label: "Within 50 km" },
  { value: "100km", label: "Within 100 km" },
];

export const products = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    farmer: "Abdul Rahman",
    location: "Jessore",
    price: 45,
    originalPrice: 55,
    unit: "kg",
    image: "https://i.ibb.co/60HNk1vN/AN313-Tomatoes-732x549-Thumb-732x549.jpg",
    rating: 4.8,
    reviews: 24,
    category: "vegetables",
    inStock: true,
    organic: true,
    fastDelivery: true,
    discount: 18,
    description: "Fresh, juicy tomatoes grown without pesticides",
    farmDistance: "12 km away",
  },
  {
    id: 2,
    name: "Premium Basmati Rice",
    farmer: "Fatima Khatun",
    location: "Rangpur",
    price: 65,
    originalPrice: 70,
    unit: "kg",
    image: "https://i.ibb.co/60HNk1vN/AN313-Tomatoes-732x549-Thumb-732x549.jpg",
    rating: 4.9,
    reviews: 45,
    category: "grains",
    inStock: true,
    organic: false,
    fastDelivery: true,
    discount: 7,
    description: "Aromatic long-grain basmati rice",
    farmDistance: "25 km away",
  },
  {
    id: 3,
    name: "Sweet Alphonso Mangoes",
    farmer: "Mohammad Ali",
    location: "Rajshahi",
    price: 120,
    originalPrice: 140,
    unit: "kg",
    image: "https://i.ibb.co/60HNk1vN/AN313-Tomatoes-732x549-Thumb-732x549.jpg",
    rating: 4.7,
    reviews: 18,
    category: "fruits",
    inStock: true,
    organic: true,
    fastDelivery: false,
    discount: 14,
    description: "Sweet and juicy mangoes, perfect for summer",
    farmDistance: "45 km away",
  },
  {
    id: 4,
    name: "Fresh Green Chilies",
    farmer: "Rashida Begum",
    location: "Sylhet",
    price: 80,
    originalPrice: 85,
    unit: "kg",
    image: "https://i.ibb.co/60HNk1vN/AN313-Tomatoes-732x549-Thumb-732x549.jpg",
    rating: 4.6,
    reviews: 12,
    category: "vegetables",
    inStock: true,
    organic: false,
    fastDelivery: true,
    discount: 6,
    description: "Spicy green chilies for authentic Bengali cooking",
    farmDistance: "8 km away",
  },
  {
    id: 5,
    name: "Farm Fresh Potatoes",
    farmer: "Karim Uddin",
    location: "Munshiganj",
    price: 35,
    originalPrice: 40,
    unit: "kg",
    image: "https://i.ibb.co/60HNk1vN/AN313-Tomatoes-732x549-Thumb-732x549.jpg",
    rating: 4.5,
    reviews: 31,
    category: "vegetables",
    inStock: true,
    organic: false,
    fastDelivery: true,
    discount: 12,
    description: "Fresh potatoes perfect for curries and fries",
    farmDistance: "15 km away",
  },
  {
    id: 6,
    name: "Fresh Hilsa Fish",
    farmer: "Nasir Ahmed",
    location: "Barisal",
    price: 850,
    originalPrice: 900,
    unit: "kg",
    image: "https://i.ibb.co/60HNk1vN/AN313-Tomatoes-732x549-Thumb-732x549.jpg",
    rating: 4.9,
    reviews: 8,
    category: "fish",
    inStock: true,
    organic: false,
    fastDelivery: false,
    discount: 6,
    description: "Fresh Hilsa fish caught from Padma river",
    farmDistance: "60 km away",
  },
];

export const testimonials = [
  {
    name: "Abdul Rahman",
    location: "Jessore",
    image: "",
    rating: 5,
    text: "AgroConnect changed my life! I now sell directly to customers in Dhaka and earn 3x more than selling to local traders.",
    revenue: "৳45,000/month",
    crop: "Organic Vegetables",
  },
  {
    name: "Fatima Khatun",
    location: "Rangpur",
    image: "",
    rating: 5,
    text: "The platform is so easy to use. I can manage my orders from my phone while working in the field.",
    revenue: "৳32,000/month",
    crop: "Rice & Grains",
  },
  {
    name: "Mohammad Ali",
    location: "Rajshahi",
    image: "",
    rating: 5,
    text: "Best decision I made for my farm. The analytics help me understand what customers want most.",
    revenue: "৳58,000/month",
    crop: "Fruits & Mangoes",
  },
];

export const steps = [
  {
    step: "01",
    title: "Create Your Profile",
    description:
      "Sign up and create your farmer profile with farm details and certifications.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    step: "02",
    title: "List Your Products",
    description:
      "Add your products with photos, descriptions, and pricing. Set your availability.",
    icon: <Leaf className="w-6 h-6" />,
  },
  {
    step: "03",
    title: "Receive Orders",
    description:
      "Get notified when customers place orders. Accept or decline based on your capacity.",
    icon: <MessageCircle className="w-6 h-6" />,
  },
  {
    step: "04",
    title: "Get Paid",
    description:
      "Deliver your products and receive instant payments through our secure system.",
    icon: <DollarSign className="w-6 h-6" />,
  },
];

export const values = [
  {
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    title: "Sustainability",
    description:
      "We promote sustainable farming practices and environmental responsibility in everything we do.",
  },
  {
    icon: <Handshake className="w-8 h-8 text-blue-600" />,
    title: "Fair Trade",
    description:
      "Ensuring fair prices for farmers and affordable access to fresh produce for everyone.",
  },
  {
    icon: <Shield className="w-8 h-8 text-purple-600" />,
    title: "Quality First",
    description:
      "We maintain the highest standards of quality and freshness in all our products.",
  },
  {
    icon: <Heart className="w-8 h-8 text-red-600" />,
    title: "Community",
    description:
      "Building strong relationships between farmers and consumers across Bangladesh.",
  },
];

export const team = [
  {
    name: "Rashid Ahmed",
    role: "Founder & CEO",
    image: "",
    bio: "Former agricultural engineer with 15+ years experience in sustainable farming.",
    linkedin: "#",
  },
  {
    name: "Fatima Rahman",
    role: "Head of Operations",
    image: "",
    bio: "Supply chain expert ensuring seamless delivery from farm to table.",
    linkedin: "#",
  },
  {
    name: "Mohammad Karim",
    role: "Technology Director",
    image: "",
    bio: "Tech innovator building the future of agricultural commerce.",
    linkedin: "#",
  },
  {
    name: "Nasreen Sultana",
    role: "Farmer Relations",
    image: "",
    bio: "Dedicated to empowering farmers and improving their livelihoods.",
    linkedin: "#",
  },
];

export const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description:
      "Started with a vision to connect farmers directly with consumers",
  },
  {
    year: "2021",
    title: "First 1,000 Farmers",
    description: "Reached our first milestone of 1,000 registered farmers",
  },
  {
    year: "2022",
    title: "Mobile App Launch",
    description: "Launched our mobile app making shopping even more convenient",
  },
  {
    year: "2023",
    title: "50,000 Customers",
    description: "Celebrated serving 50,000+ happy customers across Bangladesh",
  },
  {
    year: "2024",
    title: "Nationwide Coverage",
    description: "Expanded to cover all 64 districts of Bangladesh",
  },
];

export const contactInfo = [
  {
    icon: <MapPin className="w-6 h-6 text-green-600" />,
    title: "Head Office",
    details: ["House 123, Road 15", "Dhanmondi, Dhaka 1209", "Bangladesh"],
    action: "Get Directions",
  },
  {
    icon: <Phone className="w-6 h-6 text-blue-600" />,
    title: "Phone Numbers",
    details: [
      "+880 1700-123456",
      "+880 2-9876543",
      "Emergency: +880 1800-AGRO",
    ],
    action: "Call Now",
  },
  {
    icon: <Mail className="w-6 h-6 text-purple-600" />,
    title: "Email Addresses",
    details: [
      "info@agroconnect.bd",
      "support@agroconnect.bd",
      "farmers@agroconnect.bd",
    ],
    action: "Send Email",
  },
  {
    icon: <Clock className="w-6 h-6 text-orange-600" />,
    title: "Business Hours",
    details: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 10:00 AM - 4:00 PM",
      "Sunday: Closed",
    ],
    action: "View Schedule",
  },
];

export const departments = [
  {
    name: "General Inquiry",
    description: "General questions about our services",
    email: "info@agroconnect.bd",
    phone: "+880 1700-123456",
  },
  {
    name: "Farmer Support",
    description: "Help for farmers using our platform",
    email: "farmers@agroconnect.bd",
    phone: "+880 1700-123457",
  },
  {
    name: "Customer Support",
    description: "Support for buyers and customers",
    email: "support@agroconnect.bd",
    phone: "+880 1700-123458",
  },
  {
    name: "Technical Support",
    description: "Technical issues and app support",
    email: "tech@agroconnect.bd",
    phone: "+880 1700-123459",
  },
  {
    name: "Business Partnership",
    description: "Partnership and collaboration opportunities",
    email: "partners@agroconnect.bd",
    phone: "+880 1700-123460",
  },
  {
    name: "Media & Press",
    description: "Media inquiries and press relations",
    email: "media@agroconnect.bd",
    phone: "+880 1700-123461",
  },
];

export const faqs = [
  {
    question: "How do I register as a farmer?",
    answer:
      "Visit our 'For Farmers' page and click 'Start Selling Today'. Fill out the registration form with your farm details and wait for verification.",
  },
  {
    question: "What are the delivery charges?",
    answer:
      "Delivery is free for orders above ৳500. For orders below ৳500, delivery charges range from ৳30-80 depending on location.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is confirmed, you'll receive a tracking link via SMS and email. You can also track orders in your account dashboard.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer 100% satisfaction guarantee. If you're not satisfied with the quality, contact us within 24 hours for a full refund or replacement.",
  },
];

export const inquiryOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "farmer", label: "Farmer Support" },
  { value: "customer", label: "Customer Support" },
  { value: "technical", label: "Technical Support" },
  { value: "partnership", label: "Partnership" },
  { value: "media", label: "Media & Press" },
];

export const experienceOptions = [
  { value: "0-2", label: "0-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "6-10", label: "6-10 years" },
  { value: "10+", label: "10+ years" },
];

export const businessTypeOptions = [
  { value: "individual", label: "Individual Consumer" },
  { value: "restaurant", label: "Restaurant" },
  { value: "retailer", label: "Retailer" },
  { value: "wholesaler", label: "Wholesaler" },
  { value: "cooperative", label: "Cooperative" },
];
