"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  CreditCard,
} from "lucide-react";

export default function RefundPolicyPage() {
  const refundScenarios = [
    {
      icon: CheckCircle,
      title: "Eligible for Full Refund",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      scenarios: [
        "Project not started due to our inability to deliver",
        "Service cancellation within 24 hours of payment",
        "Technical issues preventing project delivery",
        "Failure to meet agreed project specifications",
        "Duplicate payment processing",
      ],
    },
    {
      icon: Clock,
      title: "Eligible for Partial Refund",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      scenarios: [
        "Project cancellation after work has begun",
        "Client-requested changes beyond original scope",
        "Delays caused by client's failure to provide required information",
        "Project completion but client dissatisfaction with quality",
        "Early termination of long-term projects",
      ],
    },
    {
      icon: XCircle,
      title: "Not Eligible for Refund",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      scenarios: [
        "Project completed successfully as per agreement",
        "Client changes mind after project completion",
        "Refund request made after 30 days of project completion",
        "Services already delivered and accepted by client",
        "Training sessions already conducted",
      ],
    },
  ];

  const refundProcess = [
    {
      step: 1,
      title: "Submit Refund Request",
      description:
        "Contact us via email or WhatsApp with your refund request, including project details and reason for refund.",
    },
    {
      step: 2,
      title: "Review and Assessment",
      description:
        "Our team will review your request and assess eligibility based on project status and our refund policy.",
    },
    {
      step: 3,
      title: "Decision and Communication",
      description:
        "We will communicate our decision within 3-5 business days with detailed explanation and next steps.",
    },
    {
      step: 4,
      title: "Refund Processing",
      description:
        "If approved, refunds will be processed within 7-10 business days using the original payment method.",
    },
  ];

  const refundTimeline = [
    {
      period: "Within 24 hours",
      description: "Full refund for service cancellation before work begins",
    },
    {
      period: "Within 7 days",
      description: "Full refund for technical issues or service failures",
    },
    {
      period: "Within 30 days",
      description:
        "Partial refund for project cancellation after work has begun",
    },
    {
      period: "After 30 days",
      description:
        "No refunds for completed projects (except in special circumstances)",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <RefreshCw className="h-16 w-16 text-blue-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Refund Policy</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Our commitment to fair and transparent refund practices for all our
            services.
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Refund Commitment
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At GEE INNOVIXUS, we strive to provide exceptional service and
              ensure complete customer satisfaction. We understand that
              sometimes circumstances may require a refund, and we have
              established a fair and transparent refund policy to address such
              situations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This policy outlines the circumstances under which refunds may be
              granted, the process for requesting refunds, and the timeline for
              processing refund requests.
            </p>
          </div>

          {/* Refund Scenarios */}
          <div className="space-y-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Refund Eligibility
            </h2>
            {refundScenarios.map((scenario, index) => (
              <div
                key={index}
                className={`${scenario.bgColor} ${scenario.borderColor} border-2 rounded-lg p-8`}
              >
                <div className="flex items-center mb-6">
                  <scenario.icon
                    className={`h-10 w-10 ${scenario.color} mr-4`}
                  />
                  <h3 className={`text-2xl font-bold ${scenario.color}`}>
                    {scenario.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {scenario.scenarios.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className={`${scenario.color} mr-3 mt-1`}>•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Refund Process */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Refund Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {refundProcess.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Timeline */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Refund Timeline
            </h2>
            <div className="space-y-4">
              {refundTimeline.map((timeline, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg"
                >
                  <Clock className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {timeline.period}
                    </h3>
                    <p className="text-gray-600">{timeline.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 mb-8">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mr-4" />
              <h2 className="text-2xl font-bold text-yellow-800">
                Important Notes
              </h2>
            </div>
            <ul className="space-y-3 text-yellow-800">
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>
                  All refund requests must be submitted in writing via email or
                  WhatsApp
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>
                  Refunds will be processed using the original payment method
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>
                  Processing fees charged by payment processors may be deducted
                  from refunds
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>Refund decisions are final and binding</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>
                  We reserve the right to modify this policy with prior notice
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Request a Refund
            </h2>
            <p className="text-gray-600 mb-6">
              To request a refund, please contact us with the following
              information:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Required Information:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Project reference number or order ID</li>
                  <li>• Reason for refund request</li>
                  <li>• Payment method used</li>
                  <li>• Date of payment</li>
                  <li>• Any supporting documentation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Contact Methods:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-600">
                      Email: refunds@geeinnovixus.com
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-600">
                      WhatsApp: +91 9515364654
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-gray-600">
                      Phone: Available on WhatsApp
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
