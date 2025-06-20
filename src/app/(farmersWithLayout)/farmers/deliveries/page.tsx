"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Modal from "@/components/ui/modal";
import {
  Truck,
  Package,
  MapPin,
  Clock,
  Phone,
  Eye,
  Filter,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Navigation,
  Download,
} from "lucide-react";
import AgroForm from "@/components/form/agro-form";
import AgroInput from "@/components/form/agro-input";
import AgroSelect from "@/components/form/agro-select";

interface Delivery {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  products: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  totalAmount: number;
  deliveryDate: Date;
  deliveryTime: string;
  status: "pending" | "confirmed" | "in_transit" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  deliveryMethod: "pickup" | "home_delivery" | "collection_point";
  distance: string;
  estimatedTime: string;
  driverName?: string;
  driverPhone?: string;
  trackingNumber: string;
  notes?: string;
}
const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in_transit", label: "In Transit" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const dateOptions = [
  { value: "all", label: "All Dates" },
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "week", label: "This Week" },
];

const FarmerDeliveriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);

  const deliveries: Delivery[] = [
    {
      id: "DEL001",
      orderId: "ORD001",
      customerName: "Rashida Khatun",
      customerPhone: "+880 1712-345678",
      customerAddress: "House 45, Road 12, Dhanmondi, Dhaka-1205",
      products: [
        { name: "Organic Tomatoes", quantity: 5, unit: "kg" },
        { name: "Fresh Potatoes", quantity: 3, unit: "kg" },
      ],
      totalAmount: 340,
      deliveryDate: new Date(2024, 0, 20),
      deliveryTime: "10:00 AM - 12:00 PM",
      status: "confirmed",
      paymentStatus: "paid",
      deliveryMethod: "home_delivery",
      distance: "12 km",
      estimatedTime: "45 mins",
      driverName: "Karim Ahmed",
      driverPhone: "+880 1798-765432",
      trackingNumber: "TRK001234567",
      notes: "Please call before delivery",
    },
    {
      id: "DEL002",
      orderId: "ORD002",
      customerName: "Mohammad Hasan",
      customerPhone: "+880 1856-789012",
      customerAddress: "Flat 3B, Green View Apartment, Uttara, Dhaka-1230",
      products: [
        { name: "Basmati Rice", quantity: 10, unit: "kg" },
        { name: "Green Chilies", quantity: 1, unit: "kg" },
      ],
      totalAmount: 730,
      deliveryDate: new Date(2024, 0, 20),
      deliveryTime: "2:00 PM - 4:00 PM",
      status: "in_transit",
      paymentStatus: "paid",
      deliveryMethod: "home_delivery",
      distance: "18 km",
      estimatedTime: "1 hour 15 mins",
      driverName: "Nasir Uddin",
      driverPhone: "+880 1634-567890",
      trackingNumber: "TRK001234568",
    },
    {
      id: "DEL003",
      orderId: "ORD003",
      customerName: "Fatima Begum",
      customerPhone: "+880 1923-456789",
      customerAddress: "Village: Savar, Upazila: Savar, Dhaka",
      products: [{ name: "Fresh Mangoes", quantity: 8, unit: "kg" }],
      totalAmount: 960,
      deliveryDate: new Date(2024, 0, 21),
      deliveryTime: "9:00 AM - 11:00 AM",
      status: "pending",
      paymentStatus: "pending",
      deliveryMethod: "pickup",
      distance: "5 km",
      estimatedTime: "20 mins",
      trackingNumber: "TRK001234569",
      notes: "Customer will pickup from farm",
    },
    {
      id: "DEL004",
      orderId: "ORD004",
      customerName: "Abdul Karim",
      customerPhone: "+880 1745-678901",
      customerAddress: "Shop 12, New Market, Chittagong",
      products: [
        { name: "Fresh Fish", quantity: 15, unit: "kg" },
        { name: "Prawns", quantity: 2, unit: "kg" },
      ],
      totalAmount: 1850,
      deliveryDate: new Date(2024, 0, 19),
      deliveryTime: "8:00 AM - 10:00 AM",
      status: "delivered",
      paymentStatus: "paid",
      deliveryMethod: "collection_point",
      distance: "25 km",
      estimatedTime: "1 hour 30 mins",
      trackingNumber: "TRK001234570",
    },
    {
      id: "DEL005",
      orderId: "ORD005",
      customerName: "Salma Akter",
      customerPhone: "+880 1567-890123",
      customerAddress: "House 78, Sector 7, Uttara, Dhaka-1230",
      products: [{ name: "Organic Vegetables Mix", quantity: 12, unit: "kg" }],
      totalAmount: 540,
      deliveryDate: new Date(2024, 0, 18),
      deliveryTime: "3:00 PM - 5:00 PM",
      status: "cancelled",
      paymentStatus: "refunded",
      deliveryMethod: "home_delivery",
      distance: "15 km",
      estimatedTime: "50 mins",
      trackingNumber: "TRK001234571",
      notes: "Customer requested cancellation",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "in_transit":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || delivery.status === statusFilter;

    const matchesDate =
      dateFilter === "all" ||
      (() => {
        const today = new Date();
        const deliveryDate = delivery.deliveryDate;

        switch (dateFilter) {
          case "today":
            return deliveryDate.toDateString() === today.toDateString();
          case "tomorrow":
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return deliveryDate.toDateString() === tomorrow.toDateString();
          case "week":
            const weekFromNow = new Date(today);
            weekFromNow.setDate(weekFromNow.getDate() + 7);
            return deliveryDate >= today && deliveryDate <= weekFromNow;
          default:
            return true;
        }
      })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = {
    total: deliveries.length,
    pending: deliveries.filter((d) => d.status === "pending").length,
    confirmed: deliveries.filter((d) => d.status === "confirmed").length,
    inTransit: deliveries.filter((d) => d.status === "in_transit").length,
    delivered: deliveries.filter((d) => d.status === "delivered").length,
    cancelled: deliveries.filter((d) => d.status === "cancelled").length,
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
                <h1 className="text-3xl font-bold text-gray-900">Deliveries</h1>
                <p className="text-gray-600 mt-1">
                  Manage and track your product deliveries
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Delivery
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total</p>
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
                        Pending
                      </p>
                      <p className="text-2xl font-bold text-orange-600">
                        {stats.pending}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Confirmed
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {stats.confirmed}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        In Transit
                      </p>
                      <p className="text-2xl font-bold text-purple-600">
                        {stats.inTransit}
                      </p>
                    </div>
                    <Truck className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Delivered
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {stats.delivered}
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
                        Cancelled
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        {stats.cancelled}
                      </p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <AgroForm onSubmit={() => {}}>
                    <div className="flex-1">
                      <AgroInput
                        name="search"
                        placeholder="Search by customer, order ID or tracking number..."
                      />
                    </div>
                    <div className="flex gap-3">
                      <AgroSelect name="status" options={statusOptions} />
                      <AgroSelect name="date" options={dateOptions} />
                    </div>
                  </AgroForm>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Deliveries List */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Order Details
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Customer
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Products
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Delivery Info
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Status
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Amount
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDeliveries.map((delivery, index) => (
                        <motion.tr
                          key={delivery.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {delivery.orderId}
                              </p>
                              <p className="text-sm text-gray-600">
                                {delivery.trackingNumber}
                              </p>
                              <p className="text-xs text-gray-500">
                                {delivery.deliveryDate.toLocaleDateString()}
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {delivery.customerName}
                              </p>
                              <p className="text-sm text-gray-600">
                                {delivery.customerPhone}
                              </p>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                {delivery.distance}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              {delivery.products.map((product, idx) => (
                                <p key={idx} className="text-sm text-gray-900">
                                  {product.quantity} {product.unit}{" "}
                                  {product.name}
                                </p>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {delivery.deliveryTime}
                              </p>
                              <p className="text-xs text-gray-600 capitalize">
                                {delivery.deliveryMethod.replace("_", " ")}
                              </p>
                              {delivery.driverName && (
                                <p className="text-xs text-gray-500">
                                  Driver: {delivery.driverName}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-2">
                              <Badge className="flex items-center w-fit">
                                {getStatusIcon(delivery.status)}
                                <span className="ml-1 capitalize">
                                  {delivery.status.replace("_", " ")}
                                </span>
                              </Badge>
                              <Badge
                                variant={
                                  delivery.paymentStatus === "paid"
                                    ? "success"
                                    : "warning"
                                }
                                className="text-xs"
                              >
                                {delivery.paymentStatus}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-medium text-gray-900">
                              ৳{delivery.totalAmount}
                            </p>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedDelivery(delivery)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Navigation className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Phone className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* No Results */}
            {filteredDeliveries.length === 0 && (
              <div className="text-center py-16">
                <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No deliveries found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Delivery Details Modal */}
      {selectedDelivery && (
        <Modal
          isOpen={!!selectedDelivery}
          onClose={() => setSelectedDelivery(null)}
          title="Delivery Details"
          size="lg"
        >
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedDelivery.orderId}
                </h3>
                <p className="text-gray-600">
                  {selectedDelivery.trackingNumber}
                </p>
              </div>
              <Badge className="flex items-center">
                {getStatusIcon(selectedDelivery.status)}
                <span className="ml-1 capitalize">
                  {selectedDelivery.status.replace("_", " ")}
                </span>
              </Badge>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">
                Customer Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{selectedDelivery.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">
                    {selectedDelivery.customerPhone}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">
                    {selectedDelivery.customerAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Products</h4>
              <div className="space-y-2">
                {selectedDelivery.products.map((product, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span>{product.name}</span>
                    <span className="font-medium">
                      {product.quantity} {product.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Delivery Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>
                      {selectedDelivery.deliveryDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span>{selectedDelivery.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method:</span>
                    <span className="capitalize">
                      {selectedDelivery.deliveryMethod.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span>{selectedDelivery.distance}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Payment Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">
                      ৳{selectedDelivery.totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge
                      variant={
                        selectedDelivery.paymentStatus === "paid"
                          ? "success"
                          : "warning"
                      }
                    >
                      {selectedDelivery.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Info */}
            {selectedDelivery.driverName && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">
                  Driver Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedDelivery.driverName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">
                      {selectedDelivery.driverPhone}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {selectedDelivery.notes && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedDelivery.notes}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call Customer
              </Button>
              <Button variant="outline">
                <Navigation className="w-4 h-4 mr-2" />
                Track Location
              </Button>
              <Button>Update Status</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default FarmerDeliveriesPage;
