"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  Clock,
  Star,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  GraduationCap,
  Wrench,
  Code,
  Calculator,
  Beaker,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Head from "next/head";
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

export default function TrainingPage() {
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Training & Workshop data based on client structure
  const mockTrainings = useMemo(
    () => [
      {
        _id: "1",
        title: "Civil Engineering Workshop",
        description:
          "Hands-on workshop covering construction practices, QC & QA, and software training",
        category: "Civil Engineering",
        type: "Workshop/Training",
        duration: "3-5 days",
        participants: "15-25",
        location: "On-site / Online",
        topics: [
          "Construction & Practice",
          "Quality Control & Quality Assurance",
          "Tekla Structures",
          "Revit Architecture",
          "STAAD.Pro Analysis",
          "ETABS Design",
          "AutoCAD Advanced",
          "SketchUp 3D Modeling",
          "SAP2000 Analysis",
          "Abaqus Simulation",
          "Primavera P6",
          "BIM Implementation",
          "SPSS Statistics",
          "3ds Max Visualization",
          "Midas Civil",
          "MX Road Design",
        ],
        features: [
          "Hands-on Training",
          "Industry Experts",
          "Certification",
          "Project Work",
        ],
        popularity: 95,
        rating: 4.8,
        icon: "🏗️",
        color: "primary",
      },
      {
        _id: "2",
        title: "Mechanical Engineering Workshop",
        description:
          "Comprehensive mechanical design, simulation, and manufacturing workshop",
        category: "Mechanical Engineering",
        type: "Workshop/Training",
        duration: "4-6 days",
        participants: "12-20",
        location: "On-site / Online",
        topics: [
          "Design Fundamentals",
          "Simulation Techniques",
          "Thermal Analysis",
          "3D Printing Technology",
          "Materials & Metallurgy",
          "Advanced Manufacturing",
          "Solidworks Design",
          "NX Modeling",
          "Rhinoceros 3D",
          "CATIA Advanced",
          "AutoCAD Mechanical",
          "Fusion 360",
          "Inventor Professional",
          "ANSYS Simulation",
          "Altair Inspire",
          "Abaqus Analysis",
          "Comsol Multiphysics",
        ],
        features: [
          "Lab Sessions",
          "Real Projects",
          "Industry Visits",
          "Portfolio Development",
        ],
        popularity: 88,
        rating: 4.7,
        icon: "⚙️",
        color: "secondary",
      },
      {
        _id: "3",
        title: "Electrical & Electronics Workshop",
        description:
          "Power systems, electronics, and communication engineering workshop",
        category: "Electrical Engineering",
        type: "Workshop/Training",
        duration: "3-4 days",
        participants: "15-25",
        location: "On-site / Online",
        topics: [
          "MATLAB Programming",
          "Power System Analysis",
          "Power Electronics",
          "Microelectronics & VLSI",
          "Control Systems",
          "Signal Processing",
          "Machine Learning",
          "Communication Systems",
          "EVs Technology",
          "Embedded Systems",
          "VLSI Design",
          "RF & Microwave",
          "Nanotechnology",
        ],
        features: [
          "Hardware Labs",
          "Simulation Projects",
          "Industry Standards",
          "Research Methods",
        ],
        popularity: 92,
        rating: 4.9,
        icon: "⚡",
        color: "success",
      },
      {
        _id: "4",
        title: "Computer Science Workshop",
        description:
          "Software development, AI/ML, and computer systems workshop",
        category: "Computer Science",
        type: "Workshop/Training",
        duration: "5-7 days",
        participants: "20-30",
        location: "On-site / Online",
        topics: [
          "Programming Fundamentals",
          "Data Structures & Algorithms",
          "Machine Learning",
          "Web Development",
          "Database Systems",
          "Cybersecurity",
          "MATLAB Programming",
          "EVs Technology",
          "Embedded Systems",
          "VLSI Design",
          "Power Systems",
          "Control Systems",
          "Signal Processing",
        ],
        features: [
          "Coding Bootcamp",
          "Hackathons",
          "Industry Projects",
          "Job Placement",
        ],
        popularity: 90,
        rating: 4.8,
        icon: "💻",
        color: "warning",
      },
      {
        _id: "5",
        title: "MBA & MCA Support Workshop",
        description:
          "Business analysis, project management, and computer applications workshop",
        category: "Business & Management",
        type: "Workshop/Training",
        duration: "2-3 days",
        participants: "25-40",
        location: "On-site / Online",
        topics: [
          "Business Analysis",
          "Project Management",
          "Software Development",
          "Database Management",
          "System Analysis",
          "Case Study Analysis",
          "Project Guidance",
          "Technical Support",
          "Academic Writing",
          "Research Methodology",
          "Data Analysis",
          "Presentation Skills",
        ],
        features: [
          "Case Studies",
          "Group Projects",
          "Industry Mentors",
          "Career Guidance",
        ],
        popularity: 85,
        rating: 4.6,
        icon: "📊",
        color: "primary",
      },
      {
        _id: "6",
        title: "Research Methodology Workshop",
        description: "Academic research, publication, and PhD support workshop",
        category: "Research & Development",
        type: "Workshop/Training",
        duration: "2-4 days",
        participants: "10-20",
        location: "On-site / Online",
        topics: [
          "Research Methodology",
          "Literature Review",
          "Data Collection Methods",
          "Statistical Analysis",
          "Academic Writing",
          "Publication Process",
          "Patent Filing",
          "Plagiarism Check",
          "Manuscript Preparation",
          "PhD Guidance",
          "Thesis Writing",
          "Viva Preparation",
        ],
        features: [
          "One-on-One Mentoring",
          "Publication Support",
          "Research Tools",
          "Academic Network",
        ],
        popularity: 82,
        rating: 4.7,
        icon: "🔬",
        color: "success",
      },
      {
        _id: "7",
        title: "Software Certification Training",
        description: "Industry-standard software certification programs",
        category: "Certification",
        type: "Certification Program",
        duration: "4-8 weeks",
        participants: "15-25",
        location: "On-site / Online",
        topics: [
          "AutoCAD Certified Professional",
          "Solidworks CSWA/CSWP",
          "ANSYS Certified",
          "MATLAB Certification",
          "Revit Architecture",
          "STAAD.Pro Professional",
          "ETABS Expert",
          "Primavera P6",
          "BIM Professional",
          "3ds Max Certified",
        ],
        features: [
          "Official Certification",
          "Exam Preparation",
          "Industry Recognition",
          "Career Boost",
        ],
        popularity: 78,
        rating: 4.5,
        icon: "🏆",
        color: "secondary",
      },
      {
        _id: "8",
        title: "Industry-Specific Training",
        description:
          "Specialized training for specific industries and applications",
        category: "Industry Training",
        type: "Industry Training",
        duration: "1-2 weeks",
        participants: "10-30",
        location: "On-site / Online",
        topics: [
          "Construction Industry",
          "Manufacturing Sector",
          "Power & Energy",
          "Automotive Industry",
          "Aerospace Engineering",
          "Oil & Gas",
          "Telecommunications",
          "Healthcare Technology",
          "Renewable Energy",
          "Smart Cities",
        ],
        features: [
          "Industry Experts",
          "Real Case Studies",
          "Custom Curriculum",
          "Networking",
        ],
        popularity: 75,
        rating: 4.4,
        icon: "🏭",
        color: "warning",
      },
    ],
    []
  );

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTrainings(mockTrainings);
      setFilteredTrainings(mockTrainings);
      setLoading(false);
    }, 1000);
  }, [mockTrainings]);

  useEffect(() => {
    let filtered = trainings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (training) =>
          training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          training.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          training.topics.some((topic) =>
            topic.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (training) => training.category === selectedCategory
      );
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((training) => training.type === selectedType);
    }

    setFilteredTrainings(filtered);
  }, [trainings, searchTerm, selectedCategory, selectedType]);

  const categories = [
    "all",
    ...new Set(trainings.map((training) => training.category)),
  ];

  const types = ["all", ...new Set(trainings.map((training) => training.type))];

  const formatTopics = (topics) => {
    if (!topics || topics.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1">
        {topics.slice(0, 6).map((topic) => (
          <Badge key={topic} variant="secondary" className="text-xs">
            {topic}
          </Badge>
        ))}
        {topics.length > 6 && (
          <Badge variant="secondary" className="text-xs">
            +{topics.length - 6} more
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
            <p className="mt-4 text-gray-600">Loading training programs...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Training & Workshop | GEE INNOVIXUS</title>
        <meta
          name="description"
          content="Hands-on workshops and certification programs across engineering domains. Schedule custom training with GEE INNOVIXUS."
        />
        <link
          rel="canonical"
          href={(process.env.APP_URL || "http://localhost:3000") + "/training"}
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
                  name: "Training & Workshop",
                  item:
                    (process.env.APP_URL || "http://localhost:3000") +
                    "/training",
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
              Training & Workshop
            </span>
          </AnimatedGradientText>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Professional training programs and hands-on workshops across
            engineering domains
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ShimmerButton className="text-lg px-8 py-1 text-white">
              Browse Programs
            </ShimmerButton>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 border-white text-blue-500 hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Schedule Training
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
                  placeholder="Search training programs..."
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

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:max-w-xs">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredTrainings.map((training) => (
              <MagicCard
                key={training._id}
                className="h-full p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50"
                gradientColor="rgba(59, 130, 246, 0.1)"
                borderColor="rgba(59, 130, 246, 0.2)"
                spotlightColor="rgba(59, 130, 246, 0.1)"
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{training.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {training.title}
                      </h3>
                      <Badge variant="secondary" className="mt-1">
                        {training.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {training.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm">
                  {training.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Duration: {training.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Participants: {training.participants}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Location: {training.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Type: {training.type}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm text-gray-900">
                    Technologies Offered:
                  </h4>
                  {formatTopics(training.topics)}
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm text-gray-900">
                    Features:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {training.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <WhatsAppButton
                  subject={`Training Inquiry: ${training.title}`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Register Now
                </WhatsAppButton>
              </MagicCard>
            ))}
          </div>

          {filteredTrainings.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No training programs found matching your criteria.
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
            Ready to Enhance Your Skills?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Contact us today to register for any training program or schedule a
            custom workshop for your organization.
          </p>
          <div className="flex justify-center">
            <WhatsAppButton
              subject="Training Registration"
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
