"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import {
  MessageCircle,
  Phone,
  Video,
  MoreVertical,
  Star,
  Archive,
  Filter,
  User,
  Package,
} from "lucide-react";
import AgroForm from "@/components/form/agro-form";
import AgroInput from "@/components/form/agro-input";
import ChatSystem from "@/components/chat-system";

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: "buyer" | "farmer";
  participantLocation: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  lastSeen?: Date;
  conversationType: "inquiry" | "order" | "support" | "negotiation";
  priority: "low" | "medium" | "high";
  tags: string[];
  orderValue?: number;
  productInquiry?: string;
}

const FarmerMessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [filterType, setFilterType] = useState("all");
  const [showChatModal, setShowChatModal] = useState(false);

  const conversations: Conversation[] = [
    {
      id: "conv1",
      participantId: "buyer1",
      participantName: "Rashida Khatun",
      participantAvatar: "/placeholder.svg?height=40&width=40",
      participantRole: "buyer",
      participantLocation: "Dhaka",
      lastMessage: "When will the tomatoes be ready for delivery?",
      lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 2,
      isOnline: true,
      conversationType: "order",
      priority: "high",
      tags: ["urgent", "delivery"],
      orderValue: 450,
      productInquiry: "Organic Tomatoes",
    },
    {
      id: "conv2",
      participantId: "buyer2",
      participantName: "Mohammad Hasan",
      participantAvatar: "/placeholder.svg?height=40&width=40",
      participantRole: "buyer",
      participantLocation: "Chittagong",
      lastMessage: "Can you provide 50kg of rice weekly?",
      lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 1,
      isOnline: false,
      lastSeen: new Date(Date.now() - 900000),
      conversationType: "negotiation",
      priority: "medium",
      tags: ["bulk-order", "weekly"],
      orderValue: 3250,
      productInquiry: "Basmati Rice",
    },
    {
      id: "conv3",
      participantId: "buyer3",
      participantName: "Fatima Begum",
      participantAvatar: "/placeholder.svg?height=40&width=40",
      participantRole: "buyer",
      participantLocation: "Sylhet",
      lastMessage: "Thank you for the fresh vegetables!",
      lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 0,
      isOnline: false,
      lastSeen: new Date(Date.now() - 1800000),
      conversationType: "support",
      priority: "low",
      tags: ["feedback", "satisfied"],
      orderValue: 280,
    },
    {
      id: "conv4",
      participantId: "buyer4",
      participantName: "Abdul Karim",
      participantAvatar: "/placeholder.svg?height=40&width=40",
      participantRole: "buyer",
      participantLocation: "Rajshahi",
      lastMessage: "What's your best price for mangoes?",
      lastMessageTime: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 0,
      isOnline: true,
      conversationType: "inquiry",
      priority: "medium",
      tags: ["price-inquiry", "seasonal"],
      productInquiry: "Alphonso Mangoes",
    },
    {
      id: "conv5",
      participantId: "buyer5",
      participantName: "Salma Akter",
      participantAvatar: "/placeholder.svg?height=40&width=40",
      participantRole: "buyer",
      participantLocation: "Khulna",
      lastMessage: "I need help with my order status",
      lastMessageTime: new Date(Date.now() - 10800000), // 3 hours ago
      unreadCount: 1,
      isOnline: false,
      lastSeen: new Date(Date.now() - 3600000),
      conversationType: "support",
      priority: "high",
      tags: ["order-issue", "help-needed"],
      orderValue: 650,
    },
  ];

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.productInquiry?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      (filterType === "unread" && conv.unreadCount > 0) ||
      (filterType === "priority" && conv.priority === "high") ||
      (filterType === "orders" && conv.conversationType === "order") ||
      (filterType === "inquiries" && conv.conversationType === "inquiry");

    return matchesSearch && matchesFilter;
  });

  const totalUnread = conversations.reduce(
    (sum, conv) => sum + conv.unreadCount,
    0
  );
  const highPriorityCount = conversations.filter(
    (conv) => conv.priority === "high"
  ).length;
  const orderConversations = conversations.filter(
    (conv) => conv.conversationType === "order"
  ).length;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="w-4 h-4" />;
      case "inquiry":
        return <MessageCircle className="w-4 h-4" />;
      case "support":
        return <User className="w-4 h-4" />;
      case "negotiation":
        return <Star className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const openChat = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowChatModal(true);
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
                <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
                <p className="text-gray-600 mt-1">
                  Communicate with your customers and buyers
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
                <Button>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  New Message
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Messages
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {conversations.length}
                      </p>
                    </div>
                    <MessageCircle className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Unread
                      </p>
                      <p className="text-2xl font-bold text-orange-600">
                        {totalUnread}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">
                        {totalUnread}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        High Priority
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        {highPriorityCount}
                      </p>
                    </div>
                    <Star className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Order Related
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {orderConversations}
                      </p>
                    </div>
                    <Package className="w-8 h-8 text-green-600" />
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
                        placeholder="Search conversations"
                      />
                    </div>
                    <div className="flex gap-3">
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="all">All Messages</option>
                        <option value="unread">Unread</option>
                        <option value="priority">High Priority</option>
                        <option value="orders">Order Related</option>
                        <option value="inquiries">Inquiries</option>
                      </select>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        More Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </AgroForm>
            </Card>

            {/* Conversations List */}
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredConversations.map((conversation, index) => (
                    <motion.div
                      key={conversation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => openChat(conversation)}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Avatar */}
                        <div className="relative">
                          <img
                            src={
                              conversation.participantAvatar ||
                              "/placeholder.svg"
                            }
                            alt={conversation.participantName}
                            className="w-12 h-12 rounded-full"
                          />
                          {conversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900">
                                {conversation.participantName}
                              </h3>
                              <Badge className="text-xs">
                                {conversation.participantRole}
                              </Badge>
                              <div
                                className={`flex items-center ${getPriorityColor(
                                  conversation.priority
                                )}`}
                              >
                                {getTypeIcon(conversation.conversationType)}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">
                                {formatTime(conversation.lastMessageTime)}
                              </span>
                              {conversation.unreadCount > 0 && (
                                <div className="w-6 h-6 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                                  {conversation.unreadCount}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">
                              {conversation.participantLocation}
                            </p>
                            {conversation.orderValue && (
                              <span className="text-sm font-medium text-green-600">
                                ৳{conversation.orderValue}
                              </span>
                            )}
                          </div>

                          <p className="text-gray-800 text-sm mb-2 line-clamp-1">
                            {conversation.lastMessage}
                          </p>

                          {/* Tags and Product */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {conversation.tags.slice(0, 2).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {conversation.productInquiry && (
                                <span className="text-xs text-blue-600 font-medium">
                                  {conversation.productInquiry}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Phone className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Video className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* No Results */}
            {filteredConversations.length === 0 && (
              <div className="text-center py-16">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No conversations found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or start a new conversation
                </p>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Chat Modal */}
      {showChatModal && selectedConversation && (
        <ChatSystem
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
          currentUser={{
            id: "farmer1",
            name: "Abdul Rahman",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "farmer",
          }}
          chatWith={{
            id: selectedConversation.participantId,
            name: selectedConversation.participantName,
            avatar: selectedConversation.participantAvatar,
            role: selectedConversation.participantRole,
            location: selectedConversation.participantLocation,
            isOnline: selectedConversation.isOnline,
            lastSeen: selectedConversation.lastSeen,
          }}
        />
      )}
    </div>
  );
};
export default FarmerMessagesPage;
