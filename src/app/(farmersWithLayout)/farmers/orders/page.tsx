/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import Modal from "@/components/ui/modal";
import {
  Package,
  Search,
  Filter,
  Eye,
  MessageCircle,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  DollarSign,
  Phone,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import AgroForm from "@/components/form/agro-form";
import AgroInput from "@/components/form/agro-input";
import AgroSelect from "@/components/form/agro-select";

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    avatar: string;
    phone: string;
    email: string;
    location: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: string;
    price: number;
    image: string;
  }>;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "shipped"
    | "delivered"
    | "cancelled";
  orderDate: Date;
  deliveryDate?: Date;
  deliveryType: "delivery" | "pickup";
  deliveryAddress?: string;
  pickupLocation?: string;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "refunded";
  paymentMethod: string;
  notes?: string;
  trackingNumber?: string;
}

const FarmerOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      customer: {
        name: "Rashida Khatun",
        avatar: "",
        phone: "+880 1712-345678",
        email: "rashida@email.com",
        location: "Dhaka",
      },
      items: [
        {
          id: "1",
          name: "Fresh Tomatoes",
          quantity: 5,
          unit: "kg",
          price: 45,
          image: "",
        },
        {
          id: "2",
          name: "Green Chilies",
          quantity: 2,
          unit: "kg",
          price: 80,
          image: "",
        },
      ],
      status: "pending",
      orderDate: new Date("2024-01-15T10:30:00"),
      deliveryType: "delivery",
      deliveryAddress: "House 123, Road 5, Dhanmondi, Dhaka",
      totalAmount: 385,
      paymentStatus: "pending",
      paymentMethod: "bKash",
      notes: "Please deliver fresh vegetables",
    },
  ]);

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "preparing", label: "Preparing" },
    { value: "ready", label: "Ready" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const dateOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const now = new Date();
      const orderDate = order.orderDate;

      switch (dateFilter) {
        case "today":
          matchesDate = orderDate.toDateString() === now.toDateString();
          break;
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = orderDate >= weekAgo;
          break;
        case "month":
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = orderDate >= monthAgo;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    totalRevenue: orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.totalAmount, 0),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "confirmed":
      case "preparing":
        return <Package className="w-4 h-4 text-blue-600" />;
      case "ready":
      case "shipped":
        return <Truck className="w-4 h-4 text-purple-600" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
      case "preparing":
        return "info";
      case "ready":
      case "shipped":
        return "default";
      case "delivered":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    toast.success(`Order status updated to ${newStatus}`);
  };

  const handleContactCustomer = (customer: any) => {
    toast.info(`Contacting ${customer.name}...`);
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
                Order Management
              </h1>
              <p className="text-gray-600">
                Track and manage your customer orders
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
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold">{orderStats.total}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
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
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {orderStats.pending}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
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
                      <p className="text-sm text-gray-600">Confirmed</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {orderStats.confirmed}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-600" />
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
                      <p className="text-sm text-gray-600">Delivered</p>
                      <p className="text-2xl font-bold text-green-600">
                        {orderStats.delivered}
                      </p>
                    </div>
                    <Truck className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold text-green-600">
                        ৳{orderStats.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <AgroForm onSubmit={() => {}}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <AgroInput
                      name="search"
                      placeholder="Search orders by number, customer, or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      icon={<Search className="w-4 h-4" />}
                    />
                  </div>
                  <div className="flex gap-3">
                    <AgroSelect name="status" options={statusOptions} />
                    <AgroSelect name="date" options={dateOptions} />
                  </div>
                </div>
              </CardContent>
            </AgroForm>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={order.customer.avatar || ""}
                          alt={order.customer.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">
                            {order.orderNumber}
                          </h3>
                          <p className="text-gray-600">{order.customer.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <Badge
                            variant={getStatusColor(order.status) as any}
                            className="capitalize"
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <Badge
                          variant={
                            order.paymentStatus === "paid"
                              ? "success"
                              : "warning"
                          }
                          className="capitalize"
                        >
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Order Date</p>
                        <p className="font-medium">
                          {order.orderDate.toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.orderDate.toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Delivery Type</p>
                        <p className="font-medium capitalize">
                          {order.deliveryType}
                        </p>
                        {order.deliveryDate && (
                          <p className="text-sm text-gray-500">
                            {order.deliveryDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Total Amount</p>
                        <p className="font-medium text-green-600">
                          ৳{order.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.paymentMethod}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Location</p>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <p className="font-medium text-sm">
                            {order.customer.location}
                          </p>
                        </div>
                        {order.trackingNumber && (
                          <p className="text-sm text-gray-500">
                            Track: {order.trackingNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm mb-2">
                        Items ({order.items.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2"
                          >
                            <img
                              src={item.image || ""}
                              alt={item.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <span className="text-sm">
                              {item.name} x {item.quantity} {item.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContactCustomer(order.customer)}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                      </div>

                      {order.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(order.id, "confirmed")
                            }
                          >
                            Accept Order
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(order.id, "cancelled")
                            }
                          >
                            Decline
                          </Button>
                        </div>
                      )}

                      {order.status === "confirmed" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleUpdateStatus(order.id, "preparing")
                          }
                        >
                          Start Preparing
                        </Button>
                      )}

                      {order.status === "preparing" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(order.id, "ready")}
                        >
                          Mark Ready
                        </Button>
                      )}

                      {order.status === "ready" &&
                        order.deliveryType === "delivery" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(order.id, "shipped")
                            }
                          >
                            Ship Order
                          </Button>
                        )}

                      {(order.status === "shipped" ||
                        (order.status === "ready" &&
                          order.deliveryType === "pickup")) && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleUpdateStatus(order.id, "delivered")
                          }
                        >
                          Mark Delivered
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters
              </p>
            </motion.div>
          )}
        </main>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title={`Order Details - ${selectedOrder?.orderNumber}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <img
                      src={selectedOrder.customer.avatar || ""}
                      alt={selectedOrder.customer.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">
                        {selectedOrder.customer.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedOrder.customer.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <span className="ml-2">
                        {selectedOrder.customer.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <span className="ml-2">
                        {selectedOrder.customer.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image || ""}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            {item.quantity} {item.unit} × ৳{item.price}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ৳{(item.quantity * item.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Information */}
              <div>
                <h3 className="font-semibold mb-3">Delivery Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-2 capitalize">
                        {selectedOrder.deliveryType}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <span className="ml-2">
                        {selectedOrder.deliveryDate?.toLocaleDateString() ||
                          "Not scheduled"}
                      </span>
                    </div>
                  </div>
                  {selectedOrder.deliveryAddress && (
                    <div className="mt-2">
                      <span className="text-gray-600">Address:</span>
                      <p className="mt-1">{selectedOrder.deliveryAddress}</p>
                    </div>
                  )}
                  {selectedOrder.pickupLocation && (
                    <div className="mt-2">
                      <span className="text-gray-600">Pickup Location:</span>
                      <p className="mt-1">{selectedOrder.pickupLocation}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="font-semibold mb-3">Payment Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Method:</span>
                      <span className="ml-2">
                        {selectedOrder.paymentMethod}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <Badge
                        variant={
                          selectedOrder.paymentStatus === "paid"
                            ? "success"
                            : "warning"
                        }
                        className="ml-2 capitalize"
                      >
                        {selectedOrder.paymentStatus}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="ml-2 font-medium text-green-600">
                        ৳{selectedOrder.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div>
                        <span className="text-gray-600">Tracking:</span>
                        <span className="ml-2">
                          {selectedOrder.trackingNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h3 className="font-semibold mb-3">Customer Notes</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowOrderModal(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => handleContactCustomer(selectedOrder.customer)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Customer
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default FarmerOrders;
