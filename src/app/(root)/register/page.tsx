/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Leaf,
  User,
  Store,
  User2Icon,
  Phone,
  Mail,
  UserLock,
} from "lucide-react";
import AgroForm from "@/components/form/agro-form";
import AgroInput from "@/components/form/agro-input";
import AgroSelect from "@/components/form/agro-select";
import { businessTypeOptions, experienceOptions, locations } from "@/constants";
import AgroCheckbox from "@/components/form/agro-checkbox";
import AgroTextarea from "@/components/form/agro-textarea";
import Label from "@/components/ui/label";

const Register = () => {
  const [userType, setUserType] = useState<"farmer" | "buyer">("farmer");

  const handleSubmit = (data: any) => {
    console.log("Registration data:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">
              AgroConnect
            </span>
          </Link>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              Already have an account?
            </span>
            <Button variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join AgroConnect
            </h1>
            <p className="text-gray-600">
              Connect directly with farmers and buyers across Bangladesh
            </p>
          </div>

          {/* User Type Selection */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card
              className={`cursor-pointer transition-all ${
                userType === "farmer"
                  ? "ring-2 ring-green-600 bg-green-50"
                  : "hover:shadow-md"
              }`}
              onClick={() => setUserType("farmer")}
            >
              <CardContent className="p-6 text-center">
                <User className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  I&lsquo;m a Farmer
                </h3>
                <p className="text-sm text-gray-600">
                  Sell your produce directly to buyers and get fair prices
                </p>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all ${
                userType === "buyer"
                  ? "ring-2 ring-green-600 bg-green-50"
                  : "hover:shadow-md"
              }`}
              onClick={() => setUserType("buyer")}
            >
              <CardContent className="p-6 text-center">
                <Store className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  I&lsquo;m a Buyer
                </h3>
                <p className="text-sm text-gray-600">
                  Buy fresh produce directly from farmers at fair prices
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                {userType === "farmer"
                  ? "Farmer Registration"
                  : "Buyer Registration"}
              </CardTitle>
              <CardDescription>
                {userType === "farmer"
                  ? "Tell us about your farm and start selling your produce"
                  : "Create your account to start buying fresh produce"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AgroForm onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <AgroInput
                    label="Full Name"
                    placeholder="John Doe"
                    name="name"
                    icon={<User2Icon />}
                  />
                  <AgroInput
                    label="Phone Number"
                    placeholder="8801xxxxxx"
                    name="phone"
                    icon={<Phone />}
                  />
                </div>
                <AgroInput
                  label="Email Address"
                  placeholder="john@doe"
                  name="email"
                  icon={<Mail />}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <AgroInput
                    type="password"
                    label="Password"
                    placeholder="****"
                    name="password"
                    icon={<UserLock />}
                  />
                  <AgroInput
                    type="password"
                    label="Confirm Password"
                    placeholder="****"
                    name="confirmCassword"
                    icon={<UserLock />}
                  />
                </div>
                <div>
                  <Label label="Location" />

                  <AgroSelect name="location" options={locations} />
                </div>

                {/* Farmer-specific fields */}
                {userType === "farmer" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <AgroInput
                          label="Farm Size (in acres)"
                          placeholder="e.g., 5 acres"
                          name="farmSize"
                          icon={<UserLock />}
                        />
                      </div>
                      <div>
                        <Label label="Years of Experience" />

                        <AgroSelect
                          name="experience"
                          options={experienceOptions}
                        />
                      </div>
                    </div>
                    <Label label="Main Crops/Products" />

                    <AgroTextarea name="crops" />
                  </>
                )}

                {/* Buyer-specific fields */}
                {userType === "buyer" && (
                  <div>
                    <Label label="Business Type" />
                    <AgroSelect
                      name="businessType"
                      options={businessTypeOptions}
                    />
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <AgroCheckbox name="terms" className="text-sm">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-green-600 hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-green-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </AgroCheckbox>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Create {userType === "farmer" ? "Farmer" : "Buyer"} Account
                </Button>
              </AgroForm>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center mt-8 text-sm text-gray-600">
            <p>
              By registering, you&lsquo;re joining a community of farmers and
              buyers committed to fair trade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
