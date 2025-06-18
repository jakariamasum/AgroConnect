"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Calendar } from "lucide-react";
import Title from "@/components/ui/title";
import TopHero from "@/components/common-hero";
import { milestones, stats, team, values } from "@/constants";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-10">
        <TopHero
          title1="Connecting Farms"
          title2="Empowering Agriculture in Bangladesh"
          subtitle="AgroConnect is on a mission to transform the agricultural landscape of Bangladesh by connecting farmers directly with consumers, ensuring fair prices, and promoting sustainable practices."
        />
      </div>
      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Title
                title="Our Mission"
                subtitle="To empower farmers with technology and create a sustainable
                agricultural ecosystem that benefits both producers and
                consumers across Bangladesh."
              />
              <Title
                title=""
                subtitle="We believe that by eliminating middlemen and creating direct
                connections, we can ensure fair prices for farmers while
                providing fresh, quality produce to consumers at affordable
                rates."
              />

              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">
                    Empower farmers with technology
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">
                    Provide fresh produce to consumers
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">
                    Build sustainable agricultural practices
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="?height=500&width=600"
                alt="Our Mission"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title
              title="Our Values"
              subtitle="The principles that guide everything we do"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center p-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title
              title="Our Journey"
              subtitle="Key milestones in our mission to transform agriculture"
            />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <Card className="p-6">
                    <div className="flex items-center mb-3">
                      <Calendar className="w-5 h-5 text-green-600 mr-2" />
                      <Badge variant="info">{milestone.year}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </Card>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title
              title="Our Team"
              subtitle="Meet the dedicated individuals driving AgroConnect forward"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="overflow-hidden">
                  <img
                    src={member.image || ""}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Connect on LinkedIn
                    </Button>
                  </CardContent>
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
              title="Join the AgroConnect Community"
              subtitle="Be part of the movement to transform agriculture in Bangladesh"
            />

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/register">
                <Button size="lg" variant="outline">
                  Register Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col text-green-500 sm:flex-row justify-center items-center gap-4 text-sm ">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 " />
                Fresh produce from local farmers
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 " />
                Better prices than supermarkets
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 " />
                Support local agriculture
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default AboutPage;
