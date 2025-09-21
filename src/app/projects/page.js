"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Star,
  Eye,
  Download,
  ExternalLink,
  Calendar,
  Tag,
  ArrowRight,
  MessageCircle,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const categories = [
    "AI/ML",
    "Blockchain",
    "Web Development",
    "Mobile Development",
    "IoT",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "Other",
  ];

  const domains = [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "Blockchain",
    "Web3",
    "Frontend",
    "Backend",
    "Full Stack",
    "Mobile",
    "IoT",
    "Data Analytics",
    "Cybersecurity",
    "Cloud",
    "DevOps",
  ];

  const difficulties = ["beginner", "intermediate", "advanced"];

  const sortOptions = [
    { value: "createdAt", label: "Newest First" },
    { value: "title", label: "Title A-Z" },
    { value: "pricing.basePrice", label: "Price Low to High" },
    { value: "views", label: "Most Popular" },
    { value: "rating.average", label: "Highest Rated" },
  ];

  // Mock data for demonstration
  const mockProjects = [
    {
      _id: "1",
      title: "AI-Powered Medical Diagnosis System",
      shortDescription:
        "Advanced machine learning system for medical image analysis and diagnosis assistance.",
      category: "AI/ML",
      domain: [
        "Artificial Intelligence",
        "Machine Learning",
        "Computer Vision",
      ],
      technologies: ["Python", "TensorFlow", "OpenCV", "React"],
      pricing: {
        basePrice: 2500,
        currency: "USD",
        isOnSale: true,
        discountedPrice: 2000,
      },
      difficulty: "advanced",
      estimatedTime: "8-12 weeks",
      images: [
        { url: "/api/placeholder/400/300", alt: "AI Medical Diagnosis" },
      ],
      demoUrl: "https://demo.example.com",
      downloadUrl: "https://download.example.com",
      features: [
        "Real-time diagnosis",
        "Multi-modal analysis",
        "Cloud integration",
      ],
      views: 1250,
      rating: { average: 4.8, count: 45 },
      tags: ["healthcare", "ai", "medical", "diagnosis"],
      createdAt: "2024-01-15",
    },
    {
      _id: "2",
      title: "Blockchain Voting System",
      shortDescription:
        "Secure and transparent voting system built on blockchain technology.",
      category: "Blockchain",
      domain: ["Blockchain", "Web3", "Full Stack"],
      technologies: ["Solidity", "Web3.js", "React", "Node.js"],
      pricing: { basePrice: 1800, currency: "USD" },
      difficulty: "intermediate",
      estimatedTime: "6-8 weeks",
      images: [{ url: "/api/placeholder/400/300", alt: "Blockchain Voting" }],
      demoUrl: "https://demo.example.com",
      downloadUrl: "https://download.example.com",
      features: ["Secure voting", "Transparent results", "Smart contracts"],
      views: 980,
      rating: { average: 4.6, count: 32 },
      tags: ["blockchain", "voting", "security", "democracy"],
      createdAt: "2024-01-10",
    },
    {
      _id: "3",
      title: "E-Commerce Platform with AI Recommendations",
      shortDescription:
        "Modern e-commerce platform with AI-powered product recommendations.",
      category: "Web Development",
      domain: ["Full Stack", "Artificial Intelligence"],
      technologies: ["React", "Node.js", "MongoDB", "Python", "TensorFlow"],
      pricing: {
        basePrice: 3200,
        currency: "USD",
        isOnSale: true,
        discountedPrice: 2800,
      },
      difficulty: "advanced",
      estimatedTime: "10-14 weeks",
      images: [{ url: "/api/placeholder/400/300", alt: "E-Commerce Platform" }],
      demoUrl: "https://demo.example.com",
      downloadUrl: "https://download.example.com",
      features: [
        "AI recommendations",
        "Payment integration",
        "Admin dashboard",
      ],
      views: 2100,
      rating: { average: 4.9, count: 67 },
      tags: ["ecommerce", "ai", "recommendations", "fullstack"],
      createdAt: "2024-01-05",
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback to mock data
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [
    searchTerm,
    selectedCategory,
    selectedDomain,
    selectedDifficulty,
    sortBy,
    sortOrder,
  ]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.shortDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesDomain =
      selectedDomain === "all" || project.domain.includes(selectedDomain);
    const matchesDifficulty =
      selectedDifficulty === "all" || project.difficulty === selectedDifficulty;

    return (
      matchesSearch && matchesCategory && matchesDomain && matchesDifficulty
    );
  });

  const formatDomains = (domains) => {
    if (!domains || domains.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1">
        {domains.slice(0, 2).map((domain) => (
          <Badge key={domain} variant="secondary" className="text-xs">
            {domain}
          </Badge>
        ))}
        {domains.length > 2 && (
          <Badge variant="secondary" className="text-xs">
            +{domains.length - 2} more
          </Badge>
        )}
      </div>
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Create custom project inquiry message
  const createCustomProjectMessage = () => {
    const searchQuery = searchTerm ? ` for "${searchTerm}"` : "";
    const categoryQuery =
      selectedCategory !== "all" ? ` in ${selectedCategory}` : "";
    const domainQuery =
      selectedDomain !== "all" ? ` (${selectedDomain} domain)` : "";
    const difficultyQuery =
      selectedDifficulty !== "all" ? ` (${selectedDifficulty} level)` : "";

    return `Hi! I'm looking for a custom project${searchQuery}${categoryQuery}${domainQuery}${difficultyQuery}. Could you please help me with this? I'd like to discuss the requirements and pricing.`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20 overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className="absolute inset-0 stroke-white/10 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedGradientText>
              <span className="inline-flex animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl md:text-5xl font-bold mb-4">
                Our Engineering Projects
              </span>
            </AnimatedGradientText>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our comprehensive collection of engineering projects
              across Civil, Mechanical, Electrical, and Computer Science
              domains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Domain Filter */}
            <div className="lg:w-48">
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="All Domains" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Filter */}
            <div className="lg:w-48">
              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <Select
                value={`${sortBy}-${sortOrder}`}
                onValueChange={(value) => {
                  const [field, order] = value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={`${option.value}-desc`}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Project Request Banner */}
      <section className="py-6 bg-gradient-to-r from-green-50 to-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Lightbulb className="h-6 w-6 text-yellow-500 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Need a Custom Project?
                </h3>
                <p className="text-sm text-gray-600">
                  We can create any project tailored to your specific
                  requirements
                </p>
              </div>
            </div>
            <WhatsAppButton
              subject={createCustomProjectMessage()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Contact Admin
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex space-x-2 mb-4">
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                      <div className="h-6 w-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredProjects.length} Projects Found
                </h2>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any projects matching your criteria. Don't
                    worry - we can create a custom project for you!
                  </p>

                  {/* Custom Project Request Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 max-w-md mx-auto">
                    <div className="flex items-center justify-center mb-4">
                      <Lightbulb className="h-8 w-8 text-yellow-500 mr-2" />
                      <h4 className="text-lg font-semibold text-gray-900">
                        Can't find what you're looking for?
                      </h4>
                    </div>
                    <p className="text-gray-600 mb-6">
                      We specialize in creating custom projects tailored to your
                      specific needs. Contact us and we'll help you build
                      exactly what you need!
                    </p>
                    <WhatsAppButton
                      subject={createCustomProjectMessage()}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Contact Admin on WhatsApp
                    </WhatsAppButton>
                    <p className="text-xs text-gray-500 mt-3">
                      We'll discuss your requirements and provide a custom quote
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <MagicCard
                        className="h-full p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50"
                        gradientColor="rgba(59, 130, 246, 0.1)"
                        borderColor="rgba(59, 130, 246, 0.2)"
                        spotlightColor="rgba(59, 130, 246, 0.1)"
                      >
                        {/* Project Image */}
                        <div className="relative h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-4xl text-gray-300">
                              {project.category === "AI/ML" && "🤖"}
                              {project.category === "Blockchain" && "⛓️"}
                              {project.category === "Web Development" && "🌐"}
                              {project.category === "Mobile Development" &&
                                "📱"}
                              {project.category === "IoT" && "🔗"}
                              {project.category === "Data Science" && "📊"}
                              {project.category === "Cybersecurity" && "🔒"}
                              {project.category === "Cloud Computing" && "☁️"}
                              {![
                                "AI/ML",
                                "Blockchain",
                                "Web Development",
                                "Mobile Development",
                                "IoT",
                                "Data Science",
                                "Cybersecurity",
                                "Cloud Computing",
                              ].includes(project.category) && "💻"}
                            </div>
                          </div>
                          {project.pricing.isOnSale && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Sale
                            </div>
                          )}
                          <div className="absolute top-4 right-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                                project.difficulty
                              )}`}
                            >
                              {project.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Project Content */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant="secondary">
                              {project.category}
                            </Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm text-gray-600">
                                {project.rating.average} ({project.rating.count}
                                )
                              </span>
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {project.title}
                          </h3>

                          <p className="text-gray-600 mb-2 line-clamp-2 text-sm">
                            {project.shortDescription}
                          </p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.technologies.length - 3} more
                              </Badge>
                            )}
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {project.views} views
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {project.estimatedTime}
                            </div>
                          </div>

                          {/* Domains */}
                          <div className="mb-2">
                            <div className="text-xs text-gray-500 mb-1">
                              Domains:
                            </div>
                            {formatDomains(project.domain)}
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex space-x-2">
                              {project.demoUrl && (
                                <a
                                  href={project.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                  title="View Demo"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                              {project.downloadUrl && (
                                <a
                                  href={project.downloadUrl}
                                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                  title="Download"
                                >
                                  <Download className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                            <WhatsAppButton
                              project={project}
                              type="purchase"
                              variant="outline"
                              buttonProps={{ size: "sm" }}
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              Chat
                            </WhatsAppButton>
                          </div>

                          <ShimmerButton className="w-full text-white">
                            <Link
                              href={`/projects/${project._id}`}
                              className="w-full flex items-center justify-center text-white"
                            >
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </ShimmerButton>
                        </div>
                      </MagicCard>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
