import {
  Globe,
  Leaf,
  MapPin,
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
