"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  X,
} from "lucide-react";
import AgroForm from "./form/agro-form";
import AgroInput from "./form/agro-input";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
  status: "sent" | "delivered" | "read";
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  role: "farmer" | "buyer";
  location: string;
  isOnline: boolean;
  lastSeen?: Date;
}

interface ChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    id: string;
    name: string;
    avatar: string;
    role: "farmer" | "buyer";
  };
  chatWith?: ChatUser;
}

export function ChatSystem({
  isOpen,
  onClose,
  currentUser,
  chatWith,
}: ChatSystemProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "farmer1",
      senderName: "Abdul Rahman",
      senderAvatar: "",
      content: "Hello! I have fresh tomatoes available. Are you interested?",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
      status: "read",
    },
    {
      id: "2",
      senderId: "buyer1",
      senderName: "Rashida Khatun",
      senderAvatar: "",
      content: "Yes, I'm interested. What's the price per kg?",
      timestamp: new Date(Date.now() - 3000000),
      type: "text",
      status: "read",
    },
    {
      id: "3",
      senderId: "farmer1",
      senderName: "Abdul Rahman",
      senderAvatar: "",
      content:
        "৳45 per kg. They are organic and freshly harvested this morning.",
      timestamp: new Date(Date.now() - 2400000),
      type: "text",
      status: "read",
    },
    {
      id: "4",
      senderId: "buyer1",
      senderName: "Rashida Khatun",
      senderAvatar: "",
      content: "Great! Can I get 10 kg? When can I pick them up?",
      timestamp: new Date(Date.now() - 1800000),
      type: "text",
      status: "delivered",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      status: "sent",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (Math.random() > 0.5) {
        const autoResponse: Message = {
          id: (Date.now() + 1).toString(),
          senderId: chatWith?.id || "other",
          senderName: chatWith?.name || "Other User",
          senderAvatar: chatWith?.avatar || "",
          content: "Thanks for your message! I'll get back to you soon.",
          timestamp: new Date(),
          type: "text",
          status: "sent",
        };
        setMessages((prev) => [...prev, autoResponse]);
      }
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    messages.forEach((message) => {
      const dateKey = message.timestamp.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
      <div className="flex flex-col h-[600px]">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={chatWith?.avatar || ""}
                alt={chatWith?.name}
                className="w-10 h-10 rounded-full"
              />
              {chatWith?.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold">{chatWith?.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={chatWith?.role === "farmer" ? "success" : "info"}
                  className="text-xs"
                >
                  {chatWith?.role}
                </Badge>
                <span className="text-xs text-gray-500">
                  {chatWith?.isOnline
                    ? "Online"
                    : `Last seen ${chatWith?.lastSeen?.toLocaleTimeString()}`}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Object.entries(messageGroups).map(([dateKey, dayMessages]) => (
            <div key={dateKey}>
              {/* Date Separator */}
              <div className="flex justify-center mb-4">
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {formatDate(new Date(dateKey))}
                </span>
              </div>

              {/* Messages for this date */}
              {dayMessages.map((message, index) => {
                const isCurrentUser = message.senderId === currentUser.id;
                const showAvatar =
                  index === 0 ||
                  dayMessages[index - 1].senderId !== message.senderId;

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    } mb-2`}
                  >
                    <div
                      className={`flex items-end space-x-2 max-w-xs lg:max-w-md`}
                    >
                      {!isCurrentUser && (
                        <div className="w-8 h-8">
                          {showAvatar && (
                            <img
                              src={message.senderAvatar || ""}
                              alt={message.senderName}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                        </div>
                      )}

                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          isCurrentUser
                            ? "bg-green-600 text-white rounded-br-md"
                            : "bg-gray-100 text-gray-900 rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span
                            className={`text-xs ${
                              isCurrentUser ? "text-green-100" : "text-gray-500"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </span>
                          {isCurrentUser && (
                            <div className="ml-2">
                              {message.status === "sent" && (
                                <span className="text-green-100">✓</span>
                              )}
                              {message.status === "delivered" && (
                                <span className="text-green-100">✓✓</span>
                              )}
                              {message.status === "read" && (
                                <span className="text-blue-200">✓✓</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={chatWith?.avatar || ""}
                    alt={chatWith?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 0.2,
                        }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 0.4,
                        }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <AgroForm onSubmit={() => {}}>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
              <div className="flex-1">
                <AgroInput placeholder="Type a message..." name="newMessage" />
              </div>
              <Button variant="outline" size="sm">
                <Smile className="w-4 h-4" />
              </Button>
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </AgroForm>
        </div>
      </div>
    </Modal>
  );
}
export default ChatSystem;
