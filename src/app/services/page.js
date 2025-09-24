"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Star, Clock, Tag } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Head from "next/head";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MagicCard } from "@/components/ui/magic-card";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  // Services offerings only (no engineering domains)
  const mockServices = useMemo(
    () => [
      {
        _id: "s1",
        name: "Publication Services",
        description:
          "Professional academic writing and publication support for research papers",
        category: "Publication",
        subcategory: "Academic Writing",
        domains: [
          "Research Paper Writing",
          "Journal Article Preparation",
          "Conference Paper Writing",
          "Literature Review",
          "Data Analysis & Interpretation",
          "Peer Review Support",
        ],
        features: ["IEEE/APA Formatting", "Plagiarism Check", "Citations"],
        deliveryTime: "2-4 weeks",
        popularity: 95,
        rating: 4.8,
        icon: "📝",
        color: "primary",
      },
      {
        _id: "s2",
        name: "Patent Services",
        description:
          "Complete patent filing and intellectual property protection services",
        category: "Patent",
        subcategory: "IP",
        domains: [
          "Patent Drafting",
          "Patent Filing",
          "Patent Search",
          "Prior Art Search",
          "Patent Analysis",
        ],
        features: ["USPTO Filing", "International Patents"],
        deliveryTime: "4-8 weeks",
        popularity: 88,
        rating: 4.7,
        icon: "⚖️",
        color: "secondary",
      },
      {
        _id: "s3",
        name: "Plagiarism Checker",
        description:
          "Advanced plagiarism detection and similarity analysis for academic work",
        category: "Quality Assurance",
        subcategory: "Research Support",
        domains: [
          "Plagiarism Detection",
          "Similarity Analysis",
          "Citation Verification",
          "Originality Reports",
        ],
        features: ["Multiple Databases", "Detailed Reports"],
        deliveryTime: "1-2 days",
        popularity: 92,
        rating: 4.9,
        icon: "🔍",
        color: "success",
      },
      {
        _id: "s4",
        name: "Manuscript Preparation",
        description:
          "Professional manuscript preparation and journal submission support",
        category: "Writing",
        subcategory: "Academic Support",
        domains: [
          "Paper Structure",
          "Abstract & Conclusion",
          "Methodology",
          "Results & Discussion",
          "Journal Guidelines",
        ],
        features: ["Multiple Formats", "Expert Review", "Revisions"],
        deliveryTime: "3-6 weeks",
        popularity: 90,
        rating: 4.8,
        icon: "📄",
        color: "warning",
      },
      {
        _id: "s5",
        name: "PhD Assistance",
        description: "Comprehensive PhD research support and guidance",
        category: "Academic Support",
        subcategory: "Research Guidance",
        domains: [
          "Thesis Writing",
          "Research Proposal",
          "Literature Review",
          "Data Collection Support",
          "Statistical Analysis",
          "Viva Preparation",
        ],
        features: ["Mentoring", "Progress Tracking", "Deadlines"],
        deliveryTime: "6-12 months",
        popularity: 85,
        rating: 4.6,
        icon: "🎓",
        color: "primary",
      },
      {
        _id: "s6",
        name: "Prototyping Services",
        description: "Rapid prototyping and product development support",
        category: "Development",
        subcategory: "Product Design",
        domains: [
          "3D Prototyping",
          "CAD Design",
          "Material Selection",
          "Testing & Validation",
          "Iterative Design",
        ],
        features: ["Fast Turnaround", "Quality Testing"],
        deliveryTime: "2-4 weeks",
        popularity: 82,
        rating: 4.7,
        icon: "🔧",
        color: "success",
      },
    ],
    []
  );

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setServices(mockServices);
      setFilteredServices(mockServices);
      setLoading(false);
    }, 1000);
  }, [mockServices]);

  useEffect(() => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Sort services
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "delivery":
          return a.deliveryTime.localeCompare(b.deliveryTime);
        default:
          return 0;
      }
    });

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedCategory, sortBy]);

  const categories = [
    "all",
    ...new Set(services.map((service) => service.category)),
  ];

  const formatDomains = (domains) => {
    if (!domains || domains.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1">
        {domains.slice(0, 3).map((domain) => (
          <Badge key={domain} variant="secondary" className="text-xs">
            {domain}
          </Badge>
        ))}
        {domains.length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{domains.length - 3} more
          </Badge>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Engineering Services | GEE INNOVIXUS</title>
        <meta
          name="description"
          content="Civil, Mechanical, Electrical, Computer Science, R&D, and Training services from GEE INNOVIXUS. Expert guidance, projects, and publication support."
        />
        <link
          rel="canonical"
          href={(process.env.APP_URL || "http://localhost:3000") + "/services"}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: process.env.APP_URL || "http://localhost:3000",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Services",
                  item:
                    (process.env.APP_URL || "http://localhost:3000") +
                    "/services",
                },
              ],
            }),
          }}
        />
      </Head>
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className="absolute inset-0 stroke-white/10 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedGradientText>
            <span className="inline-flex animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </span>
          </AnimatedGradientText>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Publication, patents, plagiarism checks, manuscript prep, PhD
            assistance, and rapid prototyping
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ShimmerButton className="text-lg px-8 py-1 text-white">
              Get Started
            </ShimmerButton>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 border-white text-blue-500 hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 sm:py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="w-full">
              <div className="relative max-w-md mx-auto sm:mx-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:max-w-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:max-w-xs">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="delivery">Delivery Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredServices.map((service) => (
              <MagicCard
                key={service._id}
                className="h-full p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50"
                gradientColor="rgba(59, 130, 246, 0.1)"
                borderColor="rgba(59, 130, 246, 0.2)"
                spotlightColor="rgba(59, 130, 246, 0.1)"
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{service.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {service.name}
                      </h3>
                      <Badge variant="secondary" className="mt-1">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {service.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm">
                  {service.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600 font-medium">
                      Domains:
                    </span>
                  </div>
                  {formatDomains(service.domains)}

                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Delivery: {service.deliveryTime}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm text-gray-900">
                    Key Features:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {service.features.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{service.features.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                <WhatsAppButton
                  subject={`Service Inquiry: ${service.name}`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Chat on WhatsApp
                </WhatsAppButton>
              </MagicCard>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No services found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className="absolute inset-0 stroke-white/10 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Contact us to discuss your service requirements and get a custom
            quote.
          </p>
          <div className="flex justify-center">
            <WhatsAppButton
              subject="Service Consultation"
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3"
            >
              Contact on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
