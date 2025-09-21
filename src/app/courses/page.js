"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  Clock,
  Star,
  Users,
  Award,
  Play,
  Download,
  ExternalLink,
  GraduationCap,
  Code,
  Calculator,
  Wrench,
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

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Courses data based on client structure
  const mockCourses = useMemo(
    () => [
      {
        _id: "1",
        title: "Civil Engineering Software Training",
        description:
          "Comprehensive training in civil engineering design and analysis software",
        category: "Civil Engineering",
        level: "Beginner to Advanced",
        duration: "4-8 weeks",
        modules: [
          "AutoCAD Fundamentals",
          "STAAD.Pro Analysis",
          "ETABS Design",
          "Revit Architecture",
          "Tekla Structures",
          "BIM Implementation",
        ],
        software: ["AutoCAD", "STAAD.Pro", "ETABS", "Revit", "Tekla", "BIM"],
        features: [
          "Hands-on Projects",
          "Industry Certification",
          "Job Placement Support",
        ],
        popularity: 95,
        rating: 4.8,
        icon: "🏗️",
        color: "primary",
      },
      {
        _id: "2",
        title: "Mechanical Engineering Software",
        description:
          "Complete mechanical design and simulation software training",
        category: "Mechanical Engineering",
        level: "Beginner to Advanced",
        duration: "6-10 weeks",
        modules: [
          "Solidworks Basics",
          "NX Advanced Modeling",
          "CATIA Design",
          "ANSYS Simulation",
          "Altair Inspire",
          "3D Printing & Prototyping",
        ],
        software: [
          "Solidworks",
          "NX",
          "CATIA",
          "ANSYS",
          "Altair Inspire",
          "Fusion 360",
        ],
        features: [
          "Real Projects",
          "Industry Mentors",
          "Portfolio Development",
        ],
        popularity: 88,
        rating: 4.7,
        icon: "⚙️",
        color: "secondary",
      },
      {
        _id: "3",
        title: "Electrical & Electronics Software",
        description:
          "Power systems, electronics, and communication software training",
        category: "Electrical Engineering",
        level: "Intermediate to Advanced",
        duration: "4-6 weeks",
        modules: [
          "MATLAB Programming",
          "Power System Analysis",
          "VLSI Design Tools",
          "Embedded Systems",
          "RF & Microwave Design",
          "Control Systems",
        ],
        software: ["MATLAB", "Simulink", "Cadence", "Altium", "ADS", "LabVIEW"],
        features: [
          "Hardware Labs",
          "Project-based Learning",
          "Industry Standards",
        ],
        popularity: 92,
        rating: 4.9,
        icon: "⚡",
        color: "success",
      },
      {
        _id: "4",
        title: "Computer Science & Programming",
        description:
          "Software development, AI/ML, and computer systems training",
        category: "Computer Science",
        level: "Beginner to Advanced",
        duration: "8-12 weeks",
        modules: [
          "Programming Fundamentals",
          "Data Structures & Algorithms",
          "Machine Learning",
          "Web Development",
          "Database Systems",
          "Cybersecurity",
        ],
        software: ["Python", "Java", "React", "Node.js", "TensorFlow", "MySQL"],
        features: ["Live Coding Sessions", "Hackathons", "Industry Projects"],
        popularity: 90,
        rating: 4.8,
        icon: "💻",
        color: "warning",
      },
      {
        _id: "5",
        title: "Data Analysis & Statistics",
        description: "Statistical analysis and data science software training",
        category: "Data Science",
        level: "Beginner to Intermediate",
        duration: "3-5 weeks",
        modules: [
          "SPSS Fundamentals",
          "Statistical Analysis",
          "Data Visualization",
          "Regression Analysis",
          "Hypothesis Testing",
          "Report Generation",
        ],
        software: ["SPSS", "R", "Python", "Excel", "Tableau", "Power BI"],
        features: ["Real Datasets", "Statistical Methods", "Report Writing"],
        popularity: 85,
        rating: 4.6,
        icon: "📊",
        color: "primary",
      },
      {
        _id: "6",
        title: "3D Modeling & Animation",
        description: "3D design, modeling, and animation software training",
        category: "Design & Animation",
        level: "Beginner to Advanced",
        duration: "5-8 weeks",
        modules: [
          "3ds Max Basics",
          "Advanced Modeling",
          "Texturing & Materials",
          "Lighting & Rendering",
          "Animation Techniques",
          "Post-Production",
        ],
        software: [
          "3ds Max",
          "Maya",
          "Blender",
          "V-Ray",
          "After Effects",
          "Photoshop",
        ],
        features: [
          "Creative Projects",
          "Portfolio Building",
          "Industry Techniques",
        ],
        popularity: 82,
        rating: 4.7,
        icon: "🎨",
        color: "success",
      },
      {
        _id: "7",
        title: "Project Management Software",
        description: "Project planning and management software training",
        category: "Project Management",
        level: "Beginner to Intermediate",
        duration: "2-4 weeks",
        modules: [
          "Primavera P6",
          "MS Project",
          "Project Planning",
          "Resource Management",
          "Risk Analysis",
          "Reporting & Analytics",
        ],
        software: [
          "Primavera P6",
          "MS Project",
          "Trello",
          "Asana",
          "Jira",
          "Smartsheet",
        ],
        features: ["Real Projects", "PMI Standards", "Certification Prep"],
        popularity: 78,
        rating: 4.5,
        icon: "📋",
        color: "secondary",
      },
      {
        _id: "8",
        title: "Highway & Road Design",
        description:
          "Transportation engineering and road design software training",
        category: "Transportation",
        level: "Intermediate to Advanced",
        duration: "3-5 weeks",
        modules: [
          "MX Road Design",
          "Civil 3D",
          "Highway Geometry",
          "Drainage Design",
          "Pavement Design",
          "Traffic Analysis",
        ],
        software: [
          "MX Road",
          "Civil 3D",
          "AutoCAD",
          "HEC-RAS",
          "VISSIM",
          "Synchro",
        ],
        features: [
          "Real Highway Projects",
          "Industry Standards",
          "Design Codes",
        ],
        popularity: 75,
        rating: 4.4,
        icon: "🛣️",
        color: "warning",
      },
    ],
    []
  );

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, [mockCourses]);

  useEffect(() => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.software.some((software) =>
            software.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Filter by level
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, selectedLevel]);

  const categories = [
    "all",
    ...new Set(courses.map((course) => course.category)),
  ];

  const levels = ["all", ...new Set(courses.map((course) => course.level))];

  const formatSoftware = (software) => {
    if (!software || software.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1">
        {software.slice(0, 4).map((item) => (
          <Badge key={item} variant="secondary" className="text-xs">
            {item}
          </Badge>
        ))}
        {software.length > 4 && (
          <Badge variant="secondary" className="text-xs">
            +{software.length - 4} more
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
            <p className="mt-4 text-gray-600">Loading courses...</p>
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
              Professional Courses
            </span>
          </AnimatedGradientText>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Industry-focused software training courses across engineering
            domains
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ShimmerButton className="text-lg px-8 py-1 text-white">
              Browse Courses
            </ShimmerButton>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 border-white text-blue-500 hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              View Syllabus
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
                  placeholder="Search courses..."
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

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full sm:max-w-xs">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredCourses.map((course) => (
              <MagicCard
                key={course._id}
                className="h-full p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50"
                gradientColor="rgba(59, 130, 246, 0.1)"
                borderColor="rgba(59, 130, 246, 0.2)"
                spotlightColor="rgba(59, 130, 246, 0.1)"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mb-4 gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl sm:text-3xl">{course.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                        {course.title}
                      </h3>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {course.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 self-start sm:self-auto">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {course.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {course.description}
                </p>

                <div className="space-y-2 sm:space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600">
                      Duration: {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600">
                      Level: {course.level}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm text-gray-900">
                    Software Covered:
                  </h4>
                  {formatSoftware(course.software)}
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm text-gray-900">
                    Key Features:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {course.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <WhatsAppButton
                  subject={`Course Inquiry: ${course.title}`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Enroll Now
                </WhatsAppButton>
              </MagicCard>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No courses found matching your criteria.
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
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Contact us today to enroll in any course and start your professional
            development journey.
          </p>
          <div className="flex justify-center">
            <WhatsAppButton
              subject="Course Enrollment"
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
