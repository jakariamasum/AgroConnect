"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { MapPin, Star, CheckCircle, ArrowRight } from "lucide-react";
import TopHero from "@/components/common-hero";
import Title from "@/components/ui/title";
import { features, steps, testimonials } from "@/constants";

const FarmersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-10">
        <TopHero
          title1="For Farmers"
          title2="Empower Your Farm"
          subtitle="Join AgroConnect to sell directly to customers, increase your profits, and grow your farming business."
        />
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title
              title="Why Choose AgroConnect?"
              subtitle="We provide everything you need to grow your farming business and reach more customers."
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center p-6">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle className="mb-3">{feature.title}</CardTitle>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Badge variant="info" className="bg-gray-100">
                    Real-time Analytics
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title
              title="How AgroConnect Works"
              subtitle="Follow these simple steps to start selling your produce and earning more."
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto -mt-8 relative z-10">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title
              title="Success Stories"
              subtitle="Hear from farmers who transformed their business with AgroConnect"
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 mb-4 italic">
                    {testimonial.text}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <div className="font-semibold text-green-600">
                        {testimonial.revenue}
                      </div>
                      <div className="text-xs text-gray-500">
                        Monthly Revenue
                      </div>
                    </div>
                    <Badge variant="info">{testimonial.crop}</Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br text-black rounded-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 pointer-events-none" />

        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Title
              title="Join AgroConnect Today"
              subtitle="Empower your farm, connect with customers, and increase your profits."
            />

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/register">
                <Button size="lg" variant="outline">
                  Start Selling Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Support
                </Button>
              </Link>
            </div>

            <div className="flex flex-col text-green-500 sm:flex-row justify-center items-center gap-4 text-sm ">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 " />
                Free to join
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 " />
                No setup fees
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 " />
                24/7 support
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default FarmersPage;
