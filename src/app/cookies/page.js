"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Cookie, Settings, Shield, BarChart3, Target, Eye } from "lucide-react";

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: Settings,
      title: "Essential Cookies",
      description:
        "These cookies are necessary for the website to function properly and cannot be disabled.",
      examples: [
        "Authentication and login status",
        "Shopping cart functionality",
        "Form submission data",
        "Security and fraud prevention",
      ],
      required: true,
    },
    {
      icon: BarChart3,
      title: "Analytics Cookies",
      description:
        "These cookies help us understand how visitors interact with our website.",
      examples: [
        "Google Analytics tracking",
        "Page views and user behavior",
        "Performance metrics",
        "Error tracking and debugging",
      ],
      required: false,
    },
    {
      icon: Target,
      title: "Marketing Cookies",
      description:
        "These cookies are used to deliver relevant advertisements and track campaign performance.",
      examples: [
        "Social media integration",
        "Advertising campaign tracking",
        "Remarketing and retargeting",
        "Conversion tracking",
      ],
      required: false,
    },
    {
      icon: Eye,
      title: "Preference Cookies",
      description:
        "These cookies remember your choices and preferences for a better user experience.",
      examples: [
        "Language and region settings",
        "Theme and display preferences",
        "Customized content delivery",
        "User interface preferences",
      ],
      required: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Cookie className="h-16 w-16 text-blue-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Learn about how we use cookies and similar technologies to enhance
            your browsing experience.
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
              What Are Cookies?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are stored on your device when
              you visit our website. They help us provide you with a better
              browsing experience by remembering your preferences and enabling
              various website features.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This Cookie Policy explains what cookies we use, why we use them,
              and how you can control them.
            </p>
          </div>

          {/* Cookie Types */}
          <div className="space-y-6">
            {cookieTypes.map((cookie, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start mb-6">
                  <cookie.icon className="h-8 w-8 text-blue-600 mr-4 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 mr-4">
                        {cookie.title}
                      </h2>
                      {cookie.required ? (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Required
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{cookie.description}</p>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Examples:
                      </h3>
                      <ul className="space-y-1">
                        {cookie.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start">
                            <span className="text-blue-600 mr-2 mt-1">•</span>
                            <span className="text-gray-600">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cookie Management */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Managing Cookies
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Browser Settings
                </h3>
                <p className="text-gray-600">
                  You can control cookies through your browser settings. Most
                  browsers allow you to refuse cookies or delete them. However,
                  disabling certain cookies may affect website functionality.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Cookie Consent
                </h3>
                <p className="text-gray-600">
                  When you first visit our website, you&apos;ll see a cookie
                  consent banner. You can choose which types of cookies to
                  accept or reject.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Third-Party Cookies
                </h3>
                <p className="text-gray-600">
                  Some cookies are set by third-party services we use. You can
                  manage these through the respective service providers&apos;
                  privacy settings.
                </p>
              </div>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-600 mb-4">
              We use the following third-party services that may set cookies:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Google Analytics
                </h3>
                <p className="text-sm text-gray-600">
                  Website analytics and performance tracking
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Google Maps
                </h3>
                <p className="text-sm text-gray-600">
                  Interactive maps and location services
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Social Media
                </h3>
                <p className="text-sm text-gray-600">
                  Social media integration and sharing
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Payment Processors
                </h3>
                <p className="text-sm text-gray-600">
                  Secure payment processing
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about our use of cookies, please contact
              us:
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
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the updated policy on this page.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
