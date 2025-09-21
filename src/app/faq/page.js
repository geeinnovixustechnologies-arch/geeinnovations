"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqCategories = [
    {
      title: "General Questions",
      icon: "❓",
      questions: [
        {
          question: "What services does Gee Innovations offer?",
          answer:
            "We offer comprehensive engineering consultancy services including AI/ML projects, blockchain development, web development, research publications, assignment writing, and training programs across various engineering domains.",
        },
        {
          question: "How can I get started with your services?",
          answer:
            "You can get started by contacting us through our website, WhatsApp, or email. We'll schedule a consultation to understand your requirements and provide a customized solution.",
        },
        {
          question: "Do you work with international clients?",
          answer:
            "Yes, we serve clients worldwide. We have experience working with students, researchers, and organizations from various countries and can accommodate different time zones.",
        },
        {
          question:
            "What makes Gee Innovations different from other consultancies?",
          answer:
            "Our combination of academic expertise, industry experience, and commitment to innovation sets us apart. We provide end-to-end solutions with ongoing support and training.",
        },
      ],
    },
    {
      title: "Project Services",
      icon: "🚀",
      questions: [
        {
          question: "What types of projects do you handle?",
          answer:
            "We handle projects across Civil Engineering, Mechanical Engineering, Electrical & Electronic Engineering, Computer Science Engineering, and Research & Development. This includes AI/ML, blockchain, web development, IoT, and more.",
        },
        {
          question: "How long does a typical project take?",
          answer:
            "Project timelines vary based on complexity and requirements. Simple projects may take 1-2 weeks, while complex research projects can take 2-6 months. We provide detailed timelines during consultation.",
        },
        {
          question: "Do you provide project documentation and reports?",
          answer:
            "Yes, we provide comprehensive documentation including project reports, user manuals, technical specifications, and source code (where applicable). All deliverables are included in our service.",
        },
        {
          question: "Can you help with project presentations and defense?",
          answer:
            "Absolutely! We provide presentation support, help with project defense preparation, and can assist with technical explanations and demonstrations.",
        },
      ],
    },
    {
      title: "Research & Publications",
      icon: "📚",
      questions: [
        {
          question: "Do you help with research paper writing?",
          answer:
            "Yes, we provide comprehensive research support including paper writing, literature review, data analysis, manuscript preparation, and publication assistance across various engineering domains.",
        },
        {
          question: "What journals do you publish in?",
          answer:
            "We publish in various international and national journals, conferences, and proceedings. We help identify suitable venues based on your research area and requirements.",
        },
        {
          question: "Do you provide plagiarism checking?",
          answer:
            "Yes, we provide plagiarism checking services using advanced tools to ensure originality and academic integrity in all our work.",
        },
        {
          question: "Can you help with PhD thesis writing?",
          answer:
            "We provide comprehensive PhD assistance including thesis writing, research proposal development, literature review, data collection support, and viva preparation.",
        },
      ],
    },
    {
      title: "Training & Courses",
      icon: "🎓",
      questions: [
        {
          question: "What training programs do you offer?",
          answer:
            "We offer training in various engineering software and technologies including AutoCAD, SolidWorks, MATLAB, ANSYS, programming languages, and domain-specific tools across engineering disciplines.",
        },
        {
          question: "Do you provide certificates upon completion?",
          answer:
            "Yes, we provide completion certificates for all our training programs. We also offer industry-recognized certifications where applicable.",
        },
        {
          question: "Are the training sessions online or offline?",
          answer:
            "We offer both online and offline training options. Online sessions are conducted through video conferencing with hands-on practice, while offline sessions are available at our facility.",
        },
        {
          question: "Do you provide placement assistance?",
          answer:
            "Yes, we provide placement assistance and career guidance to help our students and trainees find suitable opportunities in the industry.",
        },
      ],
    },
    {
      title: "Pricing & Payment",
      icon: "💰",
      questions: [
        {
          question: "How do you determine project pricing?",
          answer:
            "Pricing is based on project complexity, timeline, required expertise, and deliverables. We provide detailed quotes after understanding your requirements during consultation.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept various payment methods including bank transfers, UPI, online payments, and international transfers. Payment terms are discussed during project initiation.",
        },
        {
          question: "Do you offer installment payment options?",
          answer:
            "Yes, we offer flexible payment options including installments for larger projects. Payment schedules are agreed upon before project commencement.",
        },
        {
          question: "What is your refund policy?",
          answer:
            "We have a fair refund policy based on project completion status and client satisfaction. Details are provided in our terms of service and project agreements.",
        },
      ],
    },
    {
      title: "Support & Communication",
      icon: "💬",
      questions: [
        {
          question: "How can I contact you for support?",
          answer:
            "You can contact us through WhatsApp (fastest response), email, phone, or our website contact form. We typically respond within a few hours during business days.",
        },
        {
          question: "Do you provide ongoing support after project completion?",
          answer:
            "Yes, we provide ongoing support and maintenance services. We also offer training sessions to help you understand and maintain your project.",
        },
        {
          question: "What are your business hours?",
          answer:
            "Our business hours are Monday to Friday, 9 AM to 6 PM IST. However, we're available on WhatsApp for urgent queries and can accommodate different time zones for international clients.",
        },
        {
          question: "Do you provide project updates during development?",
          answer:
            "Yes, we provide regular project updates and progress reports. You'll be kept informed about milestones, challenges, and any changes to the project timeline.",
        },
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
            <HelpCircle className="h-16 w-16 text-blue-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find answers to common questions about our services, processes, and
            policies.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    {category.title}
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {category.questions.map((item, itemIndex) => {
                    const globalIndex = `${categoryIndex}-${itemIndex}`;
                    const isOpen = openItems[globalIndex];

                    return (
                      <div key={itemIndex} className="p-6">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {item.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="mt-4 pl-2">
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our team is here to
              help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919515364654"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Chat on WhatsApp
              </a>
              <a
                href="mailto:info@geeinnovations.com"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Email
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
