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

  // Engineering services data based on client structure
  const mockServices = useMemo(
    () => [
      // Civil Engineering
      {
        _id: "1",
        name: "Civil Engineering",
        description:
          "Comprehensive civil engineering solutions including concrete technology and structural design",
        category: "Engineering",
        subcategory: "Civil",
        domains: [
          "3D Printing Concrete",
          "Self Healing Bacterial Concrete",
          "Ultra-High Performance Concrete",
          "Geogrids in Concrete",
          "Geopolymer Concrete",
        ],
        features: [
          "Design & Analysis Software",
          "Concrete Technology",
          "Structural Engineering",
          "Geotechnical Engineering",
          "Transportation Engineering",
          "Construction Management",
          "Environmental Engineering",
        ],
        deliveryTime: "2-8 weeks",
        popularity: 95,
        rating: 4.8,
        icon: "🏗️",
        color: "primary",
      },
      // Mechanical Engineering
      {
        _id: "2",
        name: "Mechanical Engineering",
        description:
          "Advanced mechanical engineering services including 3D printing and simulation",
        category: "Engineering",
        subcategory: "Mechanical",
        domains: [
          "3D Printing (FDM)",
          "Thermal 3D Printing",
          "Materials & Metallurgy",
          "Advanced Manufacturing",
          "Simulation",
        ],
        features: [
          "Solidworks",
          "NX",
          "Rhinoceros",
          "CATIA",
          "AutoCAD",
          "Fusion 360",
          "Inventor",
          "ANSYS",
          "Altair Inspire",
          "Abaqus",
          "Comsol",
        ],
        deliveryTime: "3-10 weeks",
        popularity: 88,
        rating: 4.7,
        icon: "⚙️",
        color: "secondary",
      },
      // Electrical & Electronic Engineering
      {
        _id: "3",
        name: "Electrical & Electronic Engineering",
        description:
          "Power systems, electronics, and communication engineering solutions",
        category: "Engineering",
        subcategory: "Electrical",
        domains: [
          "Power Systems",
          "Power Electronics",
          "Microelectronics & VLSI",
          "Control Systems",
          "Signal Processing",
          "Machine Learning",
          "Communication Systems",
        ],
        features: [
          "MATLAB",
          "EVs",
          "Embedded Systems",
          "VLSI Design",
          "RF & Microwave",
          "Nanotechnology",
        ],
        deliveryTime: "2-6 weeks",
        popularity: 92,
        rating: 4.9,
        icon: "⚡",
        color: "success",
      },
      // Computer Science Engineering
      {
        _id: "4",
        name: "Computer Science Engineering",
        description:
          "Software development, AI/ML, and computer systems engineering",
        category: "Engineering",
        subcategory: "Computer Science",
        domains: [
          "Software Development",
          "Machine Learning",
          "Data Science",
          "Computer Networks",
          "Cybersecurity",
        ],
        features: [
          "MATLAB",
          "EVs",
          "Embedded Systems",
          "VLSI",
          "Programming Languages",
          "Database Systems",
        ],
        deliveryTime: "2-8 weeks",
        popularity: 90,
        rating: 4.8,
        icon: "💻",
        color: "warning",
      },
      // Electronic Communication Engineering
      {
        _id: "5",
        name: "Electronic Communication Engineering",
        description:
          "Communication systems, embedded systems, and IoT solutions",
        category: "Engineering",
        subcategory: "Communication",
        domains: [
          "MATLAB",
          "Microelectronics & VLSI",
          "Communication Systems",
          "Embedded Systems & IoT",
          "Signal Processing",
          "Power Electronics",
          "RF & Microwave",
          "Nanotechnology",
        ],
        features: [
          "VLSI",
          "Embedded Systems",
          "EVs",
          "MATLAB",
          "Wireless Communication",
          "Optical Communication",
        ],
        deliveryTime: "2-6 weeks",
        popularity: 85,
        rating: 4.6,
        icon: "📡",
        color: "primary",
      },
      // Research & Development
      {
        _id: "6",
        name: "Research & Development",
        description: "Innovative research solutions and development services",
        category: "Research",
        subcategory: "R&D",
        domains: [
          "Publication",
          "Patents",
          "Plagiarism Checker",
          "Manuscript Preparation",
          "PhD Assistance",
          "Prototyping",
        ],
        features: [
          "Research Methodology",
          "Data Analysis",
          "Technical Writing",
          "Patent Filing",
          "Academic Support",
        ],
        deliveryTime: "4-12 weeks",
        popularity: 82,
        rating: 4.7,
        icon: "🔬",
        color: "success",
      },
      // Software Training
      {
        _id: "7",
        name: "Software Training",
        description: "Professional training in engineering and design software",
        category: "Training",
        subcategory: "Software",
        domains: [
          "Tekla",
          "Revit",
          "STAAD.Pro",
          "ETABS",
          "AutoCAD",
          "SketchUp",
          "SAP2000",
          "Abaqus",
          "Primavera",
          "BIM",
          "SPSS",
          "3ds Max",
          "Midas",
          "MX Road",
        ],
        features: [
          "Hands-on Training",
          "Project-based Learning",
          "Certification",
          "Industry Standards",
        ],
        deliveryTime: "1-4 weeks",
        popularity: 78,
        rating: 4.5,
        icon: "🎓",
        color: "secondary",
      },
      // MBA & MCA
      {
        _id: "8",
        name: "MBA & MCA Support",
        description: "Business and computer applications support services",
        category: "Education",
        subcategory: "MBA/MCA",
        domains: [
          "Business Analysis",
          "Project Management",
          "Software Development",
          "Database Management",
          "System Analysis",
        ],
        features: [
          "Case Study Analysis",
          "Project Guidance",
          "Technical Support",
          "Academic Writing",
        ],
        deliveryTime: "2-8 weeks",
        popularity: 75,
        rating: 4.4,
        icon: "📊",
        color: "warning",
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
              Our Engineering Services
            </span>
          </AnimatedGradientText>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Professional engineering solutions across Civil, Mechanical,
            Electrical, and Computer Science domains
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
            Contact us today to discuss your engineering project requirements
            and get a custom quote.
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
