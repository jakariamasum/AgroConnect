/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MessageCircle,
  Send,
  CheckCircle,
  Headphones,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import AgroForm from "@/components/form/agro-form";
import AgroInput from "@/components/form/agro-input";
import AgroTextarea from "@/components/form/agro-textarea";
import TopHero from "@/components/common-hero";
import AgroSelect from "@/components/form/agro-select";
import { contactInfo, departments, faqs, inquiryOptions } from "@/constants";

const ContactPage = () => {
  const submitting = true;

  const handleSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative  text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <TopHero
            title1="Get in Touch"
            title2="We're Here to Help"
            subtitle="Have questions? Need support? Want to partner with us? We‘d love to hear from you and help in any way we can."
            icon={MessageCircle}
            badge="Contact Us"
          />
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-32 relative z-10">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center p-6 h-full">
                  <div className="flex justify-center mb-4">{info.icon}</div>
                  <CardTitle className="mb-4">{info.title}</CardTitle>
                  <div className="space-y-2 mb-6">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {info.action}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we&lsquo;ll get back to you
                    within 24 hours.
                  </p>
                </CardHeader>

                {!submitting ? (
                  <AgroForm onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <AgroInput
                        label="Full Name"
                        name="name"
                        required
                        placeholder="Enter your full name"
                      />
                      <AgroInput
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <AgroInput
                        type="tel"
                        label="Phone Number"
                        name="phone"
                        placeholder="Enter your phone number"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Inquiry Type
                        </label>

                        <AgroSelect name="type" options={inquiryOptions} />
                      </div>
                    </div>

                    <AgroInput
                      type="text"
                      label="Subject"
                      name="subject"
                      required
                      placeholder="What is this regarding?"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <AgroTextarea name="message" />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </AgroForm>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We&lsquo;ll get back to you
                      within 24 hours.
                    </p>
                    <Button variant="outline" size="lg">
                      Send Another Message
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Contact Departments */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Departments</h2>
                <p className="text-gray-600 mb-6">
                  Reach out to the right department for faster assistance
                </p>
              </div>

              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <Card
                    key={index}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{dept.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {dept.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-3 h-3 mr-1" />
                            {dept.email}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-3 h-3 mr-1" />
                            {dept.phone}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Can&lsquo;t find what you&lsquo;re looking for?
            </p>
            <Button variant="outline" size="lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Social Media & Additional Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
              <p className="text-gray-600 mb-6">
                Stay connected with us on social media for the latest updates,
                farming tips, and community stories.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start p-4 h-auto">
                  <Facebook className="w-5 h-5 mr-3 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium">Facebook</div>
                    <div className="text-sm text-gray-600">25K Followers</div>
                  </div>
                </Button>

                <Button variant="outline" className="justify-start p-4 h-auto">
                  <Instagram className="w-5 h-5 mr-3 text-pink-600" />
                  <div className="text-left">
                    <div className="font-medium">Instagram</div>
                    <div className="text-sm text-gray-600">18K Followers</div>
                  </div>
                </Button>

                <Button variant="outline" className="justify-start p-4 h-auto">
                  <Twitter className="w-5 h-5 mr-3 text-blue-400" />
                  <div className="text-left">
                    <div className="font-medium">Twitter</div>
                    <div className="text-sm text-gray-600">12K Followers</div>
                  </div>
                </Button>

                <Button variant="outline" className="justify-start p-4 h-auto">
                  <Linkedin className="w-5 h-5 mr-3 text-blue-700" />
                  <div className="text-left">
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-sm text-gray-600">8K Followers</div>
                  </div>
                </Button>
              </div>
            </motion.div>

            {/* Additional Support */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Need Immediate Help?</h3>

              <div className="space-y-4">
                <Card className="p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Headphones className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">24/7 Phone Support</h4>
                      <p className="text-sm text-gray-600">
                        Call us anytime for urgent issues
                      </p>
                      <p className="text-green-600 font-medium">
                        +880 1800-AGRO
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Live Chat</h4>
                      <p className="text-sm text-gray-600">
                        Chat with our support team
                      </p>
                      <p className="text-blue-600 font-medium">
                        Available 9 AM - 6 PM
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Globe className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Help Center</h4>
                      <p className="text-sm text-gray-600">
                        Browse our knowledge base
                      </p>
                      <p className="text-purple-600 font-medium">
                        help.agroconnect.bd
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ContactPage;
