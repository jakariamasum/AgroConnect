/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf, Mail, UserLock } from "lucide-react";
import AgroForm from "@/components/form/agro-form";
import AgroInput from "@/components/form/agro-input";
import AgroCheckbox from "@/components/form/agro-checkbox";

const Login = () => {
  const handleSubmit = (data: any) => {
    console.log("Login data:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 mb-4"
            >
              <Leaf className="h-10 w-10 text-green-600" />
              <span className="text-3xl font-bold text-green-800">
                AgroConnect
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AgroForm onSubmit={handleSubmit}>
                <AgroInput
                  name="email"
                  type="email"
                  label="Email"
                  icon={<Mail />}
                  placeholder="jhon@doe.com"
                />
                <AgroInput
                  name="password"
                  type="password"
                  label="Password"
                  icon={<UserLock />}
                  placeholder="*********"
                />

                <div className="flex items-center justify-between">
                  <AgroCheckbox
                    name="remember"
                    className="text-sm text-gray-600"
                  >
                    Remeber me
                  </AgroCheckbox>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-green-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Sign In
                </Button>
              </AgroForm>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don&lsquo;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-green-600 hover:underline font-medium"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Links */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <Link href="/support" className="text-green-600 hover:underline">
                Contact Support
              </Link>
            </p>
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-green-600 hover:underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
