"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  FileText,
  Users,
  Award,
  Clock,
  Star,
  ExternalLink,
  Lightbulb,
  Microscope,
  Beaker,
  Code,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MagicCard } from "@/components/ui/magic-card";

export default function ResearchPage() {
  const [research, setResearch] = useState([]);
  const [filteredResearch, setFilteredResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");

  // Research & Development data based on client structure
  const mockResearch = useMemo(
    () => [
      {
        _id: "1",
        title: "Publication Services",
        description:
          "Professional academic writing and publication support for research papers",
        category: "Publication",
        domain: "Academic Writing",
        services: [
          "Research Paper Writing",
          "Journal Article Preparation",
          "Conference Paper Writing",
          "Literature Review",
          "Data Analysis & Interpretation",
          "Peer Review Support",
        ],
        features: [
          "IEEE Format",
          "APA Style",
          "Plagiarism Check",
          "Citation Management",
        ],
        deliveryTime: "2-4 weeks",
        popularity: 95,
        rating: 4.8,
        icon: "📝",
        color: "primary",
      },
      {
        _id: "2",
        title: "Patent Services",
        description:
          "Complete patent filing and intellectual property protection services",
        category: "Patent",
        domain: "Intellectual Property",
        services: [
          "Patent Drafting",
          "Patent Filing",
          "Patent Search",
          "Patent Analysis",
          "Prior Art Search",
          "Patent Portfolio Management",
        ],
        features: [
          "USPTO Filing",
          "International Patents",
          "Patent Landscape Analysis",
        ],
        deliveryTime: "4-8 weeks",
        popularity: 88,
        rating: 4.7,
        icon: "⚖️",
        color: "secondary",
      },
      {
        _id: "3",
        title: "Plagiarism Checker",
        description:
          "Advanced plagiarism detection and similarity analysis tools",
        category: "Quality Assurance",
        domain: "Content Analysis",
        services: [
          "Plagiarism Detection",
          "Similarity Analysis",
          "Citation Verification",
          "Originality Reports",
          "Bulk Document Checking",
          "Real-time Checking",
        ],
        features: [
          "Multiple Databases",
          "Detailed Reports",
          "Citation Analysis",
        ],
        deliveryTime: "1-2 days",
        popularity: 92,
        rating: 4.9,
        icon: "🔍",
        color: "success",
      },
      {
        _id: "4",
        title: "Manuscript Preparation",
        description:
          "Professional manuscript preparation and paper writing services",
        category: "Writing",
        domain: "Academic Support",
        services: [
          "Manuscript Writing",
          "Paper Structure Design",
          "Abstract Writing",
          "Introduction & Conclusion",
          "Methodology Section",
          "Results & Discussion",
        ],
        features: ["Multiple Formats", "Expert Review", "Revision Support"],
        deliveryTime: "3-6 weeks",
        popularity: 90,
        rating: 4.8,
        icon: "📄",
        color: "warning",
      },
      {
        _id: "5",
        title: "PhD Assistance",
        description: "Comprehensive PhD research support and guidance services",
        category: "Academic Support",
        domain: "Research Guidance",
        services: [
          "Thesis Writing",
          "Research Proposal",
          "Literature Review",
          "Data Collection Support",
          "Statistical Analysis",
          "Viva Preparation",
        ],
        features: [
          "One-on-One Mentoring",
          "Progress Tracking",
          "Deadline Management",
        ],
        deliveryTime: "6-12 months",
        popularity: 85,
        rating: 4.6,
        icon: "🎓",
        color: "primary",
      },
      {
        _id: "6",
        title: "Prototyping Services",
        description: "Rapid prototyping and product development support",
        category: "Development",
        domain: "Product Design",
        services: [
          "3D Prototyping",
          "CAD Design",
          "Material Selection",
          "Testing & Validation",
          "Iterative Design",
          "Manufacturing Support",
        ],
        features: ["Multiple Materials", "Fast Turnaround", "Quality Testing"],
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
      setResearch(mockResearch);
      setFilteredResearch(mockResearch);
      setLoading(false);
    }, 1000);
  }, [mockResearch]);

  useEffect(() => {
    let filtered = research;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.services.some((service) =>
            service.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Filter by domain
    if (selectedDomain !== "all") {
      filtered = filtered.filter((item) => item.domain === selectedDomain);
    }

    setFilteredResearch(filtered);
  }, [research, searchTerm, selectedCategory, selectedDomain]);

  const categories = ["all", ...new Set(research.map((item) => item.category))];

  const domains = ["all", ...new Set(research.map((item) => item.domain))];

  const formatServices = (services) => {
    if (!services || services.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1">
        {services.slice(0, 3).map((service) => (
          <Badge key={service} variant="secondary" className="text-xs">
            {service}
          </Badge>
        ))}
        {services.length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{services.length - 3} more
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
            <p className="mt-4 text-gray-600">Loading research services...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              Research & Development
            </span>
          </AnimatedGradientText>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Professional research support services including publications,
            patents, and academic assistance
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
                  placeholder="Search research services..."
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

              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-full sm:max-w-xs">
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain === "all" ? "All Domains" : domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Research Services Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredResearch.map((item) => (
              <MagicCard
                key={item._id}
                className="h-full p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50"
                gradientColor="rgba(59, 130, 246, 0.1)"
                borderColor="rgba(59, 130, 246, 0.2)"
                spotlightColor="rgba(59, 130, 246, 0.1)"
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <Badge variant="secondary" className="mt-1">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {item.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm">{item.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Delivery: {item.deliveryTime}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm text-gray-900">
                    Services:
                  </h4>
                  {formatServices(item.services)}
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm text-gray-900">
                    Features:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {item.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {item.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <WhatsAppButton
                  subject={`Research Service Inquiry: ${item.title}`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Chat on WhatsApp
                </WhatsAppButton>
              </MagicCard>
            ))}
          </div>

          {filteredResearch.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No research services found matching your criteria.
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
            Ready to Start Your Research?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Contact us today to discuss your research requirements and get
            professional support.
          </p>
          <div className="flex justify-center">
            <WhatsAppButton
              subject="Research Consultation"
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
