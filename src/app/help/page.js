"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  Search,
  FileText,
  Video,
  Download,
} from "lucide-react";
import { useState } from "react";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn how to get started with our services",
      articles: [
        "How to request a project consultation",
        "Understanding our service offerings",
        "Setting up your account",
        "First steps after contacting us",
      ],
    },
    {
      icon: FileText,
      title: "Project Management",
      description: "Manage your projects effectively",
      articles: [
        "Tracking project progress",
        "Understanding project timelines",
        "Communication during development",
        "Review and feedback process",
      ],
    },
    {
      icon: Video,
      title: "Training & Support",
      description: "Get the most out of our training programs",
      articles: [
        "Accessing training materials",
        "Scheduling training sessions",
        "Technical support during training",
        "Certification process",
      ],
    },
    {
      icon: Download,
      title: "Resources & Downloads",
      description: "Access helpful resources and documents",
      articles: [
        "Project templates and guidelines",
        "Software installation guides",
        "Research methodology resources",
        "Publication guidelines",
      ],
    },
  ];

  const quickLinks = [
    {
      title: "Contact Support",
      description: "Get immediate help from our support team",
      icon: MessageCircle,
      href: "https://wa.me/919515364654",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      href: "mailto:support@geeinnovations.com",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Phone Support",
      description: "Call us for urgent assistance",
      icon: Phone,
      href: "tel:+919515364654",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "FAQ",
      description: "Find answers to common questions",
      icon: HelpCircle,
      href: "/faq",
      color: "bg-orange-600 hover:bg-orange-700",
    },
  ];

  const popularArticles = [
    {
      title: "How to Submit a Project Request",
      description: "Step-by-step guide to submitting your project requirements",
      category: "Getting Started",
      readTime: "5 min read",
    },
    {
      title: "Understanding Project Pricing",
      description: "Learn how we calculate project costs and pricing",
      category: "Billing",
      readTime: "3 min read",
    },
    {
      title: "Training Session Guidelines",
      description: "What to expect during your training sessions",
      category: "Training",
      readTime: "4 min read",
    },
    {
      title: "Research Publication Process",
      description: "How we help with research paper writing and publication",
      category: "Research",
      readTime: "6 min read",
    },
    {
      title: "Payment and Billing FAQ",
      description: "Common questions about payments and billing",
      category: "Billing",
      readTime: "3 min read",
    },
    {
      title: "Technical Support Guidelines",
      description: "How to get technical help for your projects",
      category: "Support",
      readTime: "4 min read",
    },
  ];

  const filteredArticles = popularArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <HelpCircle className="h-16 w-16 text-blue-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Find answers, get support, and learn how to make the most of our
            services.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Get Help Quickly
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`${link.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1`}
              >
                <div className="flex items-center mb-4">
                  <link.icon className="h-8 w-8 mr-3" />
                  <h3 className="text-lg font-semibold">{link.title}</h3>
                </div>
                <p className="text-white/90">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {helpCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <category.icon className="h-10 w-10 text-blue-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {category.title}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li
                      key={articleIndex}
                      className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer"
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {article}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Popular Articles"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm">{article.description}</p>
              </div>
            ))}
          </div>
          {filteredArticles.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No articles found for "{searchQuery}"
              </p>
              <p className="text-gray-500 mt-2">
                Try different keywords or browse our categories above
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our support team is here to help you succeed. Get in touch with us
            today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919515364654"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat on WhatsApp
            </a>
            <a
              href="mailto:support@geeinnovations.com"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              Email Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
