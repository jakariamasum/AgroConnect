/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import {
  Users,
  Search,
  MessageCircle,
  Star,
  ShoppingCart,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Filter,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import AgroForm from "@/components/form/agro-form";
import AgroInput from "@/components/form/agro-input";
import ChatSystem from "@/components/chat-system";

interface Customer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  joinDate: Date;
  totalOrders: number;
  totalSpent: number;
  averageRating: number;
  lastOrderDate: Date;
  status: "active" | "inactive" | "vip";
  preferredProducts: string[];
  notes?: string;
}
const user = {
  name: "Abdul Rahman",
  type: "farmer" as const,
  avatar: "",
};
const FarmerCustomers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "active" | "inactive" | "vip"
  >("all");
  const [sortBy, setSortBy] = useState<"name" | "orders" | "spent" | "recent">(
    "recent"
  );
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "Rashida Khatun",
      avatar: "",
      email: "rashida@email.com",
      phone: "+880 1712-345678",
      location: "Dhaka",
      joinDate: new Date("2023-06-15"),
      totalOrders: 24,
      totalSpent: 12500,
      averageRating: 4.8,
      lastOrderDate: new Date("2024-01-14"),
      status: "vip",
      preferredProducts: ["Tomatoes", "Potatoes", "Onions"],
      notes: "Regular customer, prefers organic products",
    },
    {
      id: "2",
      name: "Mohammad Hasan",
      avatar: "",
      email: "hasan@email.com",
      phone: "+880 1812-345678",
      location: "Chittagong",
      joinDate: new Date("2023-08-20"),
      totalOrders: 15,
      totalSpent: 8200,
      averageRating: 4.6,
      lastOrderDate: new Date("2024-01-12"),
      status: "active",
      preferredProducts: ["Rice", "Chilies"],
    },
    {
      id: "3",
      name: "Fatima Begum",
      avatar: "",
      email: "fatima@email.com",
      phone: "+880 1912-345678",
      location: "Sylhet",
      joinDate: new Date("2023-04-10"),
      totalOrders: 32,
      totalSpent: 18900,
      averageRating: 4.9,
      lastOrderDate: new Date("2024-01-15"),
      status: "vip",
      preferredProducts: ["Vegetables", "Fruits"],
      notes: "Restaurant owner, bulk orders",
    },
    {
      id: "4",
      name: "Karim Uddin",
      avatar: "",
      email: "karim@email.com",
      phone: "+880 1612-345678",
      location: "Rajshahi",
      joinDate: new Date("2023-11-05"),
      totalOrders: 8,
      totalSpent: 3200,
      averageRating: 4.3,
      lastOrderDate: new Date("2023-12-20"),
      status: "inactive",
      preferredProducts: ["Potatoes"],
    },
  ]);

  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || customer.status === selectedStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "orders":
          return b.totalOrders - a.totalOrders;
        case "spent":
          return b.totalSpent - a.totalSpent;
        case "recent":
          return b.lastOrderDate.getTime() - a.lastOrderDate.getTime();
        default:
          return 0;
      }
    });

  const customerStats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    vip: customers.filter((c) => c.status === "vip").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "warning";
      case "active":
        return "success";
      case "inactive":
        return "default";
      default:
        return "default";
    }
  };

  const handleContactCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowChatModal(true);
  };

  const handleSendEmail = (customer: Customer) => {
    toast.info(`Opening email to ${customer.email}`);
  };

  const handleCall = (customer: Customer) => {
    toast.info(`Calling ${customer.name} at ${customer.phone}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <main className="flex-1 p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Customer Management
              </h1>
              <p className="text-gray-600">
                Manage relationships with your buyers
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Customers</p>
                      <p className="text-2xl font-bold">
                        {customerStats.total}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Customers</p>
                      <p className="text-2xl font-bold text-green-600">
                        {customerStats.active}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">VIP Customers</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {customerStats.vip}
                      </p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-600">
                        ৳{customerStats.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <AgroForm onSubmit={() => {}}>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <AgroInput
                      placeholder="Search customers by name, email, or location..."
                      name="search"
                      icon={<Search className="w-4 h-4" />}
                    />
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="vip">VIP</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="recent">Recent Activity</option>
                      <option value="name">Name A-Z</option>
                      <option value="orders">Most Orders</option>
                      <option value="spent">Highest Spent</option>
                    </select>
                  </div>
                </div>
              </AgroForm>
            </CardContent>
          </Card>

          {/* Customers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer, index) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={customer.avatar || "/placeholder.svg"}
                        alt={customer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {customer.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={getStatusColor(customer.status) as any}
                            className="text-xs capitalize"
                          >
                            {customer.status}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">
                              {customer.averageRating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-2" />
                        {customer.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-3 h-3 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-3 h-3 mr-2" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-3 h-3 mr-2" />
                        Joined {customer.joinDate.toLocaleDateString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-green-600">
                          {customer.totalOrders}
                        </div>
                        <div className="text-xs text-gray-600">Orders</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-green-600">
                          ৳{customer.totalSpent.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Spent</div>
                      </div>
                    </div>

                    {/* Preferred Products */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Preferred Products:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {customer.preferredProducts.map((product, idx) => (
                          <Badge
                            key={idx}
                            variant="default"
                            className="text-xs"
                          >
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {customer.notes && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 italic">
                          {customer.notes}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleContactCustomer(customer)}
                        className="flex-1"
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Chat
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCall(customer)}
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendEmail(customer)}
                      >
                        <Mail className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredCustomers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No customers found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria
              </p>
            </motion.div>
          )}
        </main>
      </div>

      {/* Chat Modal */}
      <ChatSystem
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        currentUser={{
          id: user.name.toLowerCase().replace(" ", ""),
          name: user.name,
          avatar: user.avatar,
          role: user.type,
        }}
        chatWith={
          selectedCustomer
            ? {
                id: selectedCustomer.id,
                name: selectedCustomer.name,
                avatar: selectedCustomer.avatar,
                role: "buyer",
                location: selectedCustomer.location,
                isOnline: Math.random() > 0.5,
                lastSeen: new Date(Date.now() - Math.random() * 3600000),
              }
            : undefined
        }
      />
    </div>
  );
};
export default FarmerCustomers;
