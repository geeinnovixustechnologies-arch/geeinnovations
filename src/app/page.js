"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Award,
  Globe,
  Code,
  Database,
  Brain,
  Shield,
  Zap,
  Target,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCounter } from "@/hooks/useCounter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Counter hooks for animated statistics
  const projectsCount = useCounter(500, 0, 2000);
  const clientsCount = useCounter(1000, 0, 2000);
  const publicationsCount = useCounter(200, 0, 2000);
  const satisfactionCount = useCounter(98, 0, 2000);

  // Fetch real data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, servicesRes, testimonialsRes] = await Promise.all([
          fetch("/api/projects?limit=4"),
          fetch("/api/services?limit=4"),
          fetch("/api/testimonials?limit=3"),
        ]);

        const [projectsData, servicesData, testimonialsData] =
          await Promise.all([
            projectsRes.json(),
            servicesRes.json(),
            testimonialsRes.json(),
          ]);

        setProjects(projectsData.projects || []);
        setServices(servicesData.services || []);
        setTestimonials(testimonialsData.testimonials || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to mock data
        setProjects([]);
        setServices([]);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fallback services data
  const fallbackServices = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description:
        "Cutting-edge AI solutions, machine learning models, and intelligent automation systems.",
      features: [
        "Deep Learning",
        "Computer Vision",
        "NLP",
        "Predictive Analytics",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Database,
      title: "Blockchain Development",
      description:
        "Secure blockchain applications, smart contracts, and decentralized solutions.",
      features: ["Smart Contracts", "DeFi", "NFTs", "Web3"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Code,
      title: "Web Development",
      description:
        "Modern, responsive web applications with cutting-edge technologies.",
      features: [
        "React/Next.js",
        "Full Stack",
        "API Development",
        "Cloud Integration",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Research Publication",
      description:
        "Academic research papers, journal publications, and scholarly writing services.",
      features: [
        "Journal Papers",
        "Conference Papers",
        "Thesis Writing",
        "Research Support",
      ],
      color: "from-orange-500 to-red-500",
    },
  ];

  // Fallback testimonials data (India)
  const fallbackTestimonials = [
    {
      name: "Murali Krishna",
      title: "M.Tech Student",
      company: "JNTU Hyderabad",
      rating: 5,
      review:
        "GEE INNOVIXUS guided me end-to-end for my AI thesis and publication. The support was timely and the outcomes were excellent.",
      project: "AI-Powered Medical Diagnosis System",
    },
    {
      name: "Govardhan Reddy",
      title: "Software Engineer",
      company: "Hyderabad",
      rating: 5,
      review:
        "Their blockchain implementation for my academic project was robust and well-documented. Delivery was on schedule.",
      project: "Decentralized Voting System",
    },
    {
      name: "Revanth Kumar",
      title: "Research Scholar",
      company: "Osmania University",
      rating: 5,
      review:
        "The team built a clean and scalable web platform for our research visualization. Great experience overall.",
      project: "Data Visualization Platform",
    },
  ];

  // Use real data or fallback
  const displayServices = services.length > 0 ? services : fallbackServices;
  const displayTestimonials =
    testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Innovating the Future with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                GEE INNOVIXUS
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Leading academic project consultancy and research publication
              services. We transform your ideas into groundbreaking solutions
              with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Target,
                label: "Projects Completed",
                value: projectsCount.count,
                suffix: "+",
                ref: projectsCount.ref,
              },
              {
                icon: Users,
                label: "Students Helped",
                value: clientsCount.count,
                suffix: "+",
                ref: clientsCount.ref,
              },
              {
                icon: Award,
                label: "Publications",
                value: publicationsCount.count,
                suffix: "+",
                ref: publicationsCount.ref,
              },
              {
                icon: Star,
                label: "Satisfaction Rate",
                value: satisfactionCount.count,
                suffix: "%",
                ref: satisfactionCount.ref,
              },
            ].map((stat, index) => (
              <div key={index} ref={stat.ref} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for academic projects, research
              publications, and cutting-edge technology development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg mb-4`}
                    >
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what students
              and researchers say about our services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;{testimonial.review}&quot;
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {testimonial.project}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of students and researchers who have successfully
              completed their projects with GEE INNOVIXUS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
