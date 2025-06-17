"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Leaf, Menu, X, Bell, ShoppingCart, User, Search } from "lucide-react";
import { Button } from "./ui/button";
import AgroForm from "./form/agro-form";
import AgroInput from "./form/agro-input";

interface HeaderProps {
  user?: {
    name: string;
    type: "farmer" | "buyer";
    avatar?: string;
  };
}

const onSubmit = (data: { search: string }) => {
  console.log("Search query:", data.search);
};

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Leaf className="h-8 w-8 text-green-600" />
            </motion.div>
            <span className="text-2xl font-bold text-green-800">
              AgroConnect
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <AgroForm onSubmit={onSubmit}>
              <div className="relative w-full">
                <AgroInput
                  placeholder="Search products, farmers..."
                  name="search"
                  about="Search for products, farmers, or buyers"
                  icon={<Search className="w-4 h-4 text-gray-500" />}
                  className="pr-20"
                />
                <Button
                  size="sm"
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
                >
                  Search
                </Button>
              </div>
            </AgroForm>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/marketplace"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/farmers"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              For Farmers
            </Link>
            <Link
              href="/buyers"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              For Buyers
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-600 hover:text-green-600 transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-600 hover:text-green-600 transition-colors relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </motion.button>

                <Link href={`/${user.type}/dashboard`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                  </motion.div>
                </Link>
              </>
            ) : (
              <div className="sm:hidden md:block">
                <Button variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            <AgroForm onSubmit={onSubmit}>
              <div className="relative">
                <AgroInput
                  placeholder="Search products, farmers..."
                  name="search"
                  about="Search for products, farmers, or buyers"
                  className="pr-20"
                />
                <Button
                  size="sm"
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
                >
                  Search
                </Button>
              </div>
            </AgroForm>

            <nav className="flex flex-col space-y-2 px-1">
              <Link
                href="/marketplace"
                className="text-gray-600 hover:text-green-600"
              >
                Marketplace
              </Link>
              <Link
                href="/farmers"
                className="text-gray-600 hover:text-green-600"
              >
                For Farmers
              </Link>
              <Link
                href="/buyers"
                className="text-gray-600 hover:text-green-600"
              >
                For Buyers
              </Link>

              {!user && (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-green-600 pt-2 border-t mt-2"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-gray-600 hover:text-green-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
