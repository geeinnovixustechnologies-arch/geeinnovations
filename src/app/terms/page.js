"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  FileText,
  Scale,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function TermsOfServicePage() {
  const sections = [
    {
      icon: Users,
      title: "Service Agreement",
      content: [
        "By using our services, you agree to be bound by these Terms of Service",
        "You must be at least 18 years old to use our services",
        "You are responsible for providing accurate information",
        "You agree to use our services for lawful purposes only",
        "We reserve the right to refuse service to anyone",
      ],
    },
    {
      icon: FileText,
      title: "Service Description",
      content: [
        "We provide engineering consultancy, project development, and research services",
        "Services include but are not limited to: AI/ML projects, blockchain development, web development, research publications",
        "Project timelines and deliverables will be agreed upon before commencement",
        "We reserve the right to modify or discontinue services with notice",
        "All services are provided on a best-effort basis",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: [
        "Payment terms will be specified in individual project agreements",
        "All prices are in INR unless otherwise specified",
        "Payment is due according to the agreed schedule",
        "Late payments may incur additional charges",
        "Refunds are subject to our refund policy",
      ],
    },
    {
      icon: Scale,
      title: "Intellectual Property",
      content: [
        "You retain ownership of your original ideas and requirements",
        "We retain ownership of our methodologies, tools, and processes",
        "Project deliverables will be owned by you upon full payment",
        "We may use anonymized project data for portfolio and marketing purposes",
        "Any third-party intellectual property will be properly licensed",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Limitations and Disclaimers",
      content: [
        "Our services are provided 'as is' without warranties",
        "We are not liable for indirect, incidental, or consequential damages",
        "Our liability is limited to the amount paid for services",
        "We do not guarantee specific project outcomes or results",
        "You are responsible for compliance with applicable laws and regulations",
      ],
    },
    {
      icon: CheckCircle,
      title: "Termination",
      content: [
        "Either party may terminate services with written notice",
        "Upon termination, you must pay for all completed work",
        "We will deliver completed work within 30 days of final payment",
        "Confidentiality obligations survive termination",
        "We may suspend services for non-payment or breach of terms",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Scale className="h-16 w-16 text-blue-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Please read these terms carefully before using our services. By
            using our services, you agree to these terms.
          </p>
          <p className="text-sm text-blue-200 mt-4">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service ("Terms") govern your use of Gee
              Innovations' website and services. By accessing or using our
              services, you agree to be bound by these Terms. If you disagree
              with any part of these terms, you may not access our services.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <section.icon className="h-8 w-8 text-blue-600 mr-4" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600">
              These Terms shall be governed by and construed in accordance with
              the laws of India. Any disputes arising from these Terms or our
              services shall be subject to the exclusive jurisdiction of the
              courts in Hyderabad, Telangana, India.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Email:</strong> legal@geeinnovations.com
              </p>
              <p>
                <strong>Phone:</strong> Available on WhatsApp
              </p>
              <p>
                <strong>Address:</strong> 18-78/A, FLAT NO 304, KAMALA NIVAS,
                NEAR METRO PILLAR NO 1558, SAROORNAGAR, DILSUKHNAGAR,
                HYDERABAD–500060, TELANGANA, INDIA
              </p>
            </div>
          </div>

          {/* Updates */}
          <div className="bg-blue-50 rounded-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-600">
              We reserve the right to modify these Terms at any time. We will
              notify users of any material changes by posting the new Terms on
              this page and updating the "Last updated" date. Your continued use
              of our services after any modifications constitutes acceptance of
              the updated Terms.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
