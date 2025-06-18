import {
  DollarSign,
  Globe,
  Leaf,
  MapPin,
  MessageCircle,
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
