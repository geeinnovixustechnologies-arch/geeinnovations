"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Eye, Lock, Database, UserCheck, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number) when you contact us or request services",
        "Project requirements and specifications you provide",
        "Communication records and correspondence",
        "Website usage data and analytics",
        "Payment information (processed securely through third-party providers)",
      ],
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: [
        "To provide and deliver our engineering services",
        "To communicate with you about projects and services",
        "To process payments and manage billing",
        "To improve our website and services",
        "To send you important updates and notifications",
        "To comply with legal obligations",
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "We implement industry-standard security measures to protect your data",
        "All data transmission is encrypted using SSL/TLS protocols",
        "Access to personal information is restricted to authorized personnel only",
        "Regular security audits and updates are performed",
        "We use secure third-party services for payment processing",
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Right to access your personal data",
        "Right to correct inaccurate information",
        "Right to delete your personal data",
        "Right to restrict processing of your data",
        "Right to data portability",
        "Right to object to processing",
      ],
    },
    {
      icon: Globe,
      title: "Data Sharing",
      content: [
        "We do not sell your personal information to third parties",
        "We may share data with trusted service providers who assist in our operations",
        "We may disclose information if required by law or to protect our rights",
        "Project data may be shared with relevant team members for service delivery",
        "We ensure all third parties maintain appropriate data protection standards",
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
            <Shield className="h-16 w-16 text-blue-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and
            protect your personal information.
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
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Gee Innovations ("we," "our," or "us") is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website or use our engineering services.
            </p>
          </div>

          {/* Policy Sections */}
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

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Email:</strong> privacy@geeinnovations.com
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
              Policy Updates
            </h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last updated" date. You are advised to
              review this Privacy Policy periodically for any changes.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
