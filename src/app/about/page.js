"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Target, Award, Lightbulb, Globe, Heart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We constantly push the boundaries of technology to deliver cutting-edge solutions that drive real-world impact.",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "We maintain the highest standards in everything we do, from project delivery to customer service.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and work closely with our clients to achieve their goals.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description:
        "We conduct business with honesty, transparency, and ethical practices in all our interactions.",
    },
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "200+", label: "Happy Clients" },
    { number: "50+", label: "Research Publications" },
    { number: "5+", label: "Years of Experience" },
  ];

  const team = [
    {
      name: "Dr. Swamy Venkata Naga Murali",
      role: "Founder & CEO",
      description:
        "Leading expert in engineering solutions with extensive experience in research and development.",
      image: "/team/ceo.jpg",
    },
    {
      name: "Engineering Team",
      role: "Technical Specialists",
      description:
        "Dedicated professionals specializing in various engineering domains and cutting-edge technologies.",
      image: "/team/engineering.jpg",
    },
    {
      name: "Research Team",
      role: "Research & Development",
      description:
        "Academic experts focused on innovation, publication, and advancing engineering knowledge.",
      image: "/team/research.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About GEE INNOVIXUS
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We are a leading engineering consultancy firm dedicated to
            transforming innovative ideas into groundbreaking solutions through
            cutting-edge technology and expert guidance.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <Target className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower students, researchers, and organizations with
                innovative engineering solutions that drive technological
                advancement and create real-world impact. We bridge the gap
                between academic knowledge and practical implementation.
              </p>
            </div>
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <Globe className="h-12 w-12 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the global leader in engineering innovation, recognized
                for our expertise in transforming complex challenges into
                elegant solutions that shape the future of technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Founded with a passion for engineering excellence and innovation
            </p>
          </div>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              GEE INNOVIXUS was established with a clear vision: to bridge the
              gap between academic knowledge and real-world engineering
              solutions. Our journey began when our founder, Dr. Swamy Venkata
              Naga Murali, recognized the need for comprehensive engineering
              support services that could help students, researchers, and
              organizations turn their innovative ideas into reality.
            </p>
            <p className="mb-6">
              Starting as a small consultancy focused on academic projects, we
              have grown into a comprehensive engineering solutions provider.
              Our expertise spans across multiple domains including Civil
              Engineering, Mechanical Engineering, Electrical & Electronic
              Engineering, Computer Science Engineering, and Research &
              Development.
            </p>
            <p className="mb-6">
              Today, we are proud to serve clients across India and
              internationally, delivering high-quality engineering solutions,
              research publications, and training programs. Our commitment to
              excellence and innovation continues to drive us forward as we help
              shape the future of engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  <value.icon className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experts behind our innovative solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose GEE INNOVIXUS?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What sets us apart in the engineering consultancy industry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Award className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Expert Team
              </h3>
              <p className="text-gray-600">
                Our team consists of highly qualified engineers and researchers
                with extensive industry experience.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Lightbulb className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Innovation Focus
              </h3>
              <p className="text-gray-600">
                We stay at the forefront of technology, implementing the latest
                tools and methodologies.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Client-Centric
              </h3>
              <p className="text-gray-600">
                We prioritize our clients&apos; success and work closely with
                them throughout the project lifecycle.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                Every project undergoes rigorous quality checks to ensure the
                highest standards.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Globe className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Global Reach
              </h3>
              <p className="text-gray-600">
                We serve clients worldwide with our comprehensive engineering
                solutions.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Heart className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Support & Training
              </h3>
              <p className="text-gray-600">
                We provide ongoing support and training to ensure your success
                beyond project completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
