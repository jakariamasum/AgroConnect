/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Star,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  Clock,
  Leaf,
  SlidersHorizontal,
} from "lucide-react";
import AgroForm from "@/components/form/agro-form";
import AgroInput from "@/components/form/agro-input";
import Modal from "@/components/ui/modal";
import TopHero from "@/components/common-hero";
import AgroSelect from "@/components/form/agro-select";
import AgroCheckbox from "@/components/form/agro-checkbox";
import { cn } from "@/utils/cn";
import {
  categories,
  distanceOptions,
  locations,
  products,
  sortOptions,
} from "@/constants";

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "All Locations" ||
      product.location === selectedLocation;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-10 ">
        <TopHero
          title1="Fresh Produce"
          title2="Marketplace"
          subtitle="Discover fresh, quality produce directly from local farmers across Bangladesh"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border p-6 mb-10 sticky top-4 z-20"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full">
              <AgroForm onSubmit={() => {}}>
                <AgroInput
                  name="search"
                  placeholder="Search products, farmer, or locations"
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                  className="h-12 text-lg"
                  icon={<Search className="w-5 h-5 text-gray-400" />}
                />
              </AgroForm>
            </div>

            {/* Quick Filters */}
            <div className="flex  gap-3 w-full lg:w-auto">
              <AgroForm onSubmit={() => {}}>
                <div className="flex items-center gap-3">
                  <AgroSelect name="selectedCategory" options={categories} />
                  <AgroSelect name="selectedLocation" options={locations} />
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(true)}
                    className="h-12 px-6 border-green-200 bg-green-50 hover:bg-green-100"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    More
                  </Button>
                </div>
              </AgroForm>
            </div>
          </div>
        </motion.div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gray-600 text-lg">
              Showing{" "}
              <span className="font-semibold text-green-700">
                {filteredProducts.length}
              </span>{" "}
              products
              {searchQuery && (
                <span>
                  {" "}
                  for <span className="font-semibold">{searchQuery}</span>
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <AgroForm onSubmit={() => {}}>
              <AgroSelect name="sortBy" options={sortOptions} />
            </AgroForm>

            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors duration-150 ${
                  viewMode === "grid"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="Grid view"
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors duration-150 ${
                  viewMode === "list"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="List view"
              >
                <div className="w-4 h-4 flex flex-col gap-1">
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card
                hover
                className={cn(
                  "overflow-hidden bg-white rounded-2xl border transition-all duration-200 group",
                  viewMode === "grid"
                    ? "shadow-md hover:shadow-xl"
                    : "flex flex-col md:flex-row gap-4 shadow-sm hover:shadow-md hover:bg-gray-50"
                )}
              >
                {/* Image Section */}
                <div
                  className={cn(
                    "relative flex-shrink-0",
                    viewMode === "grid"
                      ? ""
                      : "md:w-56 w-full aspect-[4/3] md:aspect-square rounded-l-2xl md:rounded-none md:rounded-l-2xl overflow-hidden"
                  )}
                >
                  <img
                    src={product.image || ""}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    {product.organic && (
                      <Badge variant="success" className="text-xs shadow">
                        <Leaf className="w-3 h-3 mr-1" />
                        Organic
                      </Badge>
                    )}
                    {product.discount > 0 && (
                      <Badge variant="danger" className="text-xs shadow">
                        {product.discount}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" />
                    </motion.button>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 left-3 bg-white rounded-full px-2 py-1 flex items-center space-x-1 shadow text-yellow-500 font-semibold text-xs">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent
                  className={cn(
                    "p-5 flex flex-col justify-between",
                    viewMode === "grid" ? "" : "flex-1"
                  )}
                >
                  <div className="mb-3 space-y-1">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {product.farmer}, {product.location}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Truck className="w-3 h-3 mr-1" />
                      {product.farmDistance}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-2 mt-2 mb-4 flex-wrap">
                    {product.fastDelivery && (
                      <div className="flex items-center text-xs text-green-600 font-medium">
                        <Clock className="w-3 h-3 mr-1" />
                        Fast Delivery
                      </div>
                    )}
                    {product.inStock && (
                      <div className="flex items-center text-xs text-blue-600 font-medium">
                        <Shield className="w-3 h-3 mr-1" />
                        In Stock
                      </div>
                    )}
                  </div>

                  {/* Price & Ratings */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">
                          ৳{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-400 line-through">
                            ৳{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-gray-500 text-sm">
                        per {product.unit}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Button className="flex-1" size="sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="sm">
                      <Link href={`/products/${product.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse our categories
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedLocation("All Locations");
                setPriceRange([0, 1000]);
              }}
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-14">
            <Button
              variant="outline"
              size="lg"
              className="border-green-200 bg-green-50 hover:bg-green-100"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>

      {/* Advanced Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Advanced Filters"
        size="md"
      >
        <AgroForm onSubmit={() => {}}>
          <div className="p-6 space-y-8">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Price Range (৳)
              </label>
              <div className="flex items-center space-x-4">
                <AgroInput
                  name="priceRange"
                  type="number"
                  placeholder="Enter price"
                />
                <span className="text-gray-500">to</span>
                <AgroInput
                  name="priceRange"
                  type="number"
                  placeholder="Enter price"
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Features
              </label>
              <AgroCheckbox name="features.products">
                Organic Products
              </AgroCheckbox>
              <AgroCheckbox name="features.delivery">
                {" "}
                Fast Delivery{" "}
              </AgroCheckbox>
              <AgroCheckbox name="features.stock"> In Stock Only </AgroCheckbox>
              <AgroCheckbox name="features.items">
                {" "}
                Discounted Items{" "}
              </AgroCheckbox>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Distance from you
              </label>
              <AgroSelect name="distance" options={distanceOptions} />
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <Button variant="outline" onClick={() => setShowFilters(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </AgroForm>
      </Modal>
    </div>
  );
};
export default MarketplacePage;
