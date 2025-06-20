"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Modal from "@/components/ui/modal";
import {
  Package,
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  Star,
  Heart,
  ShoppingCart,
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import AgroForm from "@/components/form/agro-form";
import AgroInput from "@/components/form/agro-input";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  unit: string;
  stock: number;
  minOrder: number;
  images: string[];
  status: "active" | "inactive" | "out_of_stock" | "pending";
  isOrganic: boolean;
  harvestDate: Date;
  expiryDate?: Date;
  views: number;
  likes: number;
  orders: number;
  revenue: number;
  rating: number;
  reviews: number;
  tags: string[];
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const FarmerMarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const products: Product[] = [
    {
      id: "prod1",
      name: "Organic Tomatoes",
      description:
        "Fresh, juicy tomatoes grown without pesticides. Perfect for cooking and salads.",
      category: "vegetables",
      price: 45,
      originalPrice: 55,
      unit: "kg",
      stock: 150,
      minOrder: 2,
      images: [""],
      status: "active",
      isOrganic: true,
      harvestDate: new Date(2024, 0, 15),
      expiryDate: new Date(2024, 0, 25),
      views: 245,
      likes: 32,
      orders: 18,
      revenue: 810,
      rating: 4.8,
      reviews: 24,
      tags: ["organic", "fresh", "local"],
      location: "Jessore",
      createdAt: new Date(2024, 0, 10),
      updatedAt: new Date(2024, 0, 18),
    },
    {
      id: "prod2",
      name: "Premium Basmati Rice",
      description:
        "Aromatic long-grain basmati rice, perfect for biryanis and special dishes.",
      category: "grains",
      price: 65,
      originalPrice: 70,
      unit: "kg",
      stock: 500,
      minOrder: 5,
      images: [""],
      status: "active",
      isOrganic: false,
      harvestDate: new Date(2023, 11, 20),
      views: 189,
      likes: 28,
      orders: 25,
      revenue: 1625,
      rating: 4.9,
      reviews: 45,
      tags: ["premium", "aromatic", "long-grain"],
      location: "Rangpur",
      createdAt: new Date(2023, 11, 25),
      updatedAt: new Date(2024, 0, 15),
    },
    {
      id: "prod3",
      name: "Sweet Alphonso Mangoes",
      description:
        "Sweet and juicy mangoes, perfect for summer. Limited seasonal availability.",
      category: "fruits",
      price: 120,
      originalPrice: 140,
      unit: "kg",
      stock: 0,
      minOrder: 3,
      images: [""],
      status: "out_of_stock",
      isOrganic: true,
      harvestDate: new Date(2024, 4, 1),
      expiryDate: new Date(2024, 4, 15),
      views: 156,
      likes: 45,
      orders: 12,
      revenue: 1440,
      rating: 4.7,
      reviews: 18,
      tags: ["seasonal", "sweet", "premium"],
      location: "Rajshahi",
      createdAt: new Date(2024, 3, 20),
      updatedAt: new Date(2024, 4, 5),
    },
    {
      id: "prod4",
      name: "Fresh Green Chilies",
      description:
        "Spicy green chilies for authentic Bengali cooking. Freshly harvested.",
      category: "vegetables",
      price: 80,
      unit: "kg",
      stock: 75,
      minOrder: 1,
      images: [""],
      status: "active",
      isOrganic: false,
      harvestDate: new Date(2024, 0, 18),
      expiryDate: new Date(2024, 0, 28),
      views: 98,
      likes: 15,
      orders: 8,
      revenue: 640,
      rating: 4.6,
      reviews: 12,
      tags: ["spicy", "fresh", "cooking"],
      location: "Sylhet",
      createdAt: new Date(2024, 0, 12),
      updatedAt: new Date(2024, 0, 19),
    },
    {
      id: "prod5",
      name: "Farm Fresh Potatoes",
      description:
        "Fresh potatoes perfect for curries and fries. Grown in fertile soil.",
      category: "vegetables",
      price: 35,
      originalPrice: 40,
      unit: "kg",
      stock: 200,
      minOrder: 5,
      images: [""],
      status: "pending",
      isOrganic: false,
      harvestDate: new Date(2024, 0, 10),
      views: 67,
      likes: 8,
      orders: 5,
      revenue: 175,
      rating: 4.5,
      reviews: 31,
      tags: ["versatile", "fresh", "bulk"],
      location: "Munshiganj",
      createdAt: new Date(2024, 0, 8),
      updatedAt: new Date(2024, 0, 16),
    },
  ];

  const categories = [
    { id: "all", name: "All Categories", count: products.length },
    {
      id: "vegetables",
      name: "Vegetables",
      count: products.filter((p) => p.category === "vegetables").length,
    },
    {
      id: "fruits",
      name: "Fruits",
      count: products.filter((p) => p.category === "fruits").length,
    },
    {
      id: "grains",
      name: "Grains",
      count: products.filter((p) => p.category === "grains").length,
    },
    {
      id: "fish",
      name: "Fish",
      count: products.filter((p) => p.category === "fish").length,
    },
    {
      id: "dairy",
      name: "Dairy",
      count: products.filter((p) => p.category === "dairy").length,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "inactive":
        return <XCircle className="w-4 h-4" />;
      case "out_of_stock":
        return <AlertCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === "active").length,
    outOfStock: products.filter((p) => p.status === "out_of_stock").length,
    totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
    totalViews: products.reduce((sum, p) => sum + p.views, 0),
    totalOrders: products.reduce((sum, p) => sum + p.orders, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Marketplace
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your products and marketplace presence
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Store
                </Button>
                <Button onClick={() => setShowAddProduct(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Products
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.total}
                      </p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Active
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {stats.active}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Out of Stock
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        {stats.outOfStock}
                      </p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Revenue
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        ৳{stats.totalRevenue}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Views
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {stats.totalViews}
                      </p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Orders
                      </p>
                      <p className="text-2xl font-bold text-purple-600">
                        {stats.totalOrders}
                      </p>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <AgroForm onSubmit={() => {}}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <AgroInput
                        name="search"
                        placeholder="Search products.."
                      />
                    </div>
                    <div className="flex gap-3">
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name} ({category.count})
                          </option>
                        ))}
                      </select>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="pending">Pending</option>
                      </select>
                      <Button
                        variant="outline"
                        onClick={() => setShowFilters(true)}
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        More Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </AgroForm>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover className="overflow-hidden h-full">
                    <div className="relative">
                      <img
                        src={product.images[0] || ""}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />

                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="flex items-center">
                          {getStatusIcon(product.status)}
                          <span className="ml-1 capitalize">
                            {product.status.replace("_", " ")}
                          </span>
                        </Badge>
                      </div>

                      {/* Organic Badge */}
                      {product.isOrganic && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="success" className="text-xs">
                            Organic
                          </Badge>
                        </div>
                      )}

                      {/* Performance Metrics */}
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                        <div className="bg-white rounded-full px-2 py-1 flex items-center space-x-1 shadow-md">
                          <Eye className="w-3 h-3 text-gray-600" />
                          <span className="text-xs font-medium">
                            {product.views}
                          </span>
                        </div>
                        <div className="bg-white rounded-full px-2 py-1 flex items-center space-x-1 shadow-md">
                          <Heart className="w-3 h-3 text-red-500" />
                          <span className="text-xs font-medium">
                            {product.likes}
                          </span>
                        </div>
                        <div className="bg-white rounded-full px-2 py-1 flex items-center space-x-1 shadow-md">
                          <ShoppingCart className="w-3 h-3 text-green-600" />
                          <span className="text-xs font-medium">
                            {product.orders}
                          </span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-3">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {product.location}
                        </div>
                      </div>

                      {/* Stock Info */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Stock:</span>
                          <span
                            className={`font-medium ${
                              product.stock > 50
                                ? "text-green-600"
                                : product.stock > 0
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {product.stock} {product.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Min Order:</span>
                          <span className="font-medium">
                            {product.minOrder} {product.unit}
                          </span>
                        </div>
                      </div>

                      {/* Price and Revenue */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-green-600">
                              ৳{product.price}
                            </span>
                            {product.originalPrice &&
                              product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ৳{product.originalPrice}
                                </span>
                              )}
                          </div>
                          <span className="text-gray-500 text-sm">
                            per {product.unit}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ৳{product.revenue}
                          </div>
                          <div className="text-xs text-gray-500">Revenue</div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {product.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({product.reviews})
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Updated {product.updatedAt.toLocaleDateString()}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or add your first product
                </p>
                <Button onClick={() => setShowAddProduct(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title="Product Details"
          size="lg"
        >
          <div className="p-6 space-y-6">
            {/* Product Header */}
            <div className="flex items-start space-x-4">
              <img
                src={selectedProduct.images[0] || ""}
                alt={selectedProduct.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">
                    {selectedProduct.name}
                  </h3>
                  <Badge className="flex items-center">
                    {getStatusIcon(selectedProduct.status)}
                    <span className="ml-1 capitalize">
                      {selectedProduct.status.replace("_", " ")}
                    </span>
                  </Badge>
                </div>
                <p className="text-gray-600 mb-2">
                  {selectedProduct.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedProduct.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Harvested:{" "}
                    {selectedProduct.harvestDate.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  {selectedProduct.views}
                </div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">
                  {selectedProduct.likes}
                </div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <ShoppingCart className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {selectedProduct.orders}
                </div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  ৳{selectedProduct.revenue}
                </div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Product Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="capitalize">
                      {selectedProduct.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">
                      ৳{selectedProduct.price} per {selectedProduct.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock:</span>
                    <span
                      className={
                        selectedProduct.stock > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {selectedProduct.stock} {selectedProduct.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Order:</span>
                    <span>
                      {selectedProduct.minOrder} {selectedProduct.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Organic:</span>
                    <span>{selectedProduct.isOrganic ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>
                        {selectedProduct.rating} ({selectedProduct.reviews}{" "}
                        reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>
                      {selectedProduct.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span>
                      {selectedProduct.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                  {selectedProduct.expiryDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span className="text-red-600">
                        {selectedProduct.expiryDate.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Product
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View in Store
              </Button>
              <Button>Update Stock</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        title="Add New Product"
        size="lg"
      >
        <div className="p-6">
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Add Product Form
            </h3>
            <p className="text-gray-600 mb-6">
              Product creation form would be implemented here
            </p>
            <Button onClick={() => setShowAddProduct(false)}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default FarmerMarketplacePage;
