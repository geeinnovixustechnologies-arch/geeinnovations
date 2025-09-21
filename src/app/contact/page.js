"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["Fastest Response"],
      description: "Get instant replies",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@geeinnovations.com"],
      description: "For detailed inquiries",
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["Available on WhatsApp"],
      description: "Call via WhatsApp",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
      ],
      description: "We respond quickly",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Ready to start your next project? We're here to help you bring
              your ideas to life. Contact us today!
            </p>

            {/* WhatsApp CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WhatsAppButton
                subject="Project Inquiry"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                Chat on WhatsApp
              </WhatsAppButton>
              <p className="text-blue-100 text-sm">⚡ Fastest response time</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Preferred Contact Method
            </h2>
            <p className="text-lg text-gray-600">
              We're here to help! Pick the way that works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* WhatsApp Contact */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <MessageCircle className="h-6 w-6 mr-2" />
                  WhatsApp Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span>Instant response</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span>Direct communication</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span>File sharing support</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span>Voice messages</span>
                  </div>

                  <div className="pt-4">
                    <WhatsAppButton
                      subject="General Inquiry"
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Start WhatsApp Chat
                    </WhatsAppButton>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-6 w-6 mr-2" />
                  Email Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Tell us about your project or inquiry..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Quick Contact Options */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Contact Options
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <WhatsAppButton
                subject="Project Consultation"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Project
              </WhatsAppButton>

              <WhatsAppButton
                subject="Service Information"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Service
              </WhatsAppButton>

              <WhatsAppButton
                subject="Technical Support"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Support
              </WhatsAppButton>

              <WhatsAppButton
                subject="Partnership Inquiry"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Partnership
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Location Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-gray-600">
              Come and meet us in person or get directions to our location
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-96 bg-gray-200 relative">
                {/* Embedded Google Map */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1234567890123!2d78.5234567890123!3d17.3456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dac93a2b8b%3A0x1234567890abcdef!2sKamala%20Nivas%2C%20Near%20Metro%20Pillar%20No%201558%2C%20Saroornagar%2C%20Dilsukhnagar%2C%20Hyderabad%2C%20Telangana%20500060%2C%20India!5e0!3m2!1sen!2sin!4v1635781234567!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gee Innovations Office Location - Hyderabad"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Gee Innovations Office
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    <span>18-78/A, FLAT NO 304, KAMALA NIVAS</span>
                  </div>
                  <div className="flex items-center">
                    <span className="ml-7">NEAR METRO PILLAR NO 1558</span>
                  </div>
                  <div className="flex items-center">
                    <span className="ml-7">SAROORNAGAR, DILSUKHNAGAR</span>
                  </div>
                  <div className="flex items-center">
                    <span className="ml-7">
                      HYDERABAD–500060, TELANGANA, INDIA
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-blue-600" />
                    <span>Available on WhatsApp</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-blue-600" />
                    <span>info@geeinnovations.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information and WhatsApp */}
            <div className="space-y-6">
              {/* Office Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-6 w-6 mr-2" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium text-red-600">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-6 w-6 mr-2" />
                    Quick Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Need immediate assistance? Chat with us on WhatsApp for the
                    fastest response.
                  </p>
                  <div className="space-y-3">
                    <WhatsAppButton
                      subject="Office Visit Inquiry"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Chat on WhatsApp
                    </WhatsAppButton>

                    <WhatsAppButton
                      subject="Get Directions"
                      variant="outline"
                      className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      Get Directions
                    </WhatsAppButton>
                  </div>
                </CardContent>
              </Card>

              {/* Parking Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-6 w-6 mr-2" />
                    Parking & Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-600">
                    <p>• Street parking available near the building</p>
                    <p>• Wheelchair accessible entrance</p>
                    <p>
                      • Public transportation: 2 min walk from Metro Pillar 1558
                    </p>
                    <p>• Auto-rickshaw and cab services readily available</p>
                    <p>• Close to Dilsukhnagar main road for easy access</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What's the fastest way to get in touch?
                </h3>
                <p className="text-gray-600">
                  WhatsApp is the fastest way to reach us! We typically respond
                  within minutes during business hours.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer free consultations?
                </h3>
                <p className="text-gray-600">
                  Yes! We offer free initial consultations to discuss your
                  project requirements and provide estimates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What types of projects do you work on?
                </h3>
                <p className="text-gray-600">
                  We specialize in AI/ML, Blockchain, Web Development, Mobile
                  Apps, IoT, Data Science, and more. Check out our projects page
                  for examples!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How long does a typical project take?
                </h3>
                <p className="text-gray-600">
                  Project timelines vary based on complexity. Simple projects
                  can take 1-2 weeks, while complex applications may take 2-6
                  months. We'll provide a detailed timeline during consultation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
