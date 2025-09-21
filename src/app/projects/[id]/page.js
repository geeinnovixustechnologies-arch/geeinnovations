"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Star,
  Eye,
  Calendar,
  DollarSign,
  Clock,
  Tag,
  Users,
  Award,
  Lock,
  Unlock,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProjectDetailPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [error, setError] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessRequest, setAccessRequest] = useState(null);
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [submittingRequest, setSubmittingRequest] = useState(false);
  const [requestForm, setRequestForm] = useState({
    paymentProof: "",
    paymentMethod: "",
    paymentAmount: "",
    paymentCurrency: "USD",
    transactionId: "",
    message: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the specific project
        const projectResponse = await fetch(`/api/projects/${params.id}`);
        if (!projectResponse.ok) {
          throw new Error("Project not found");
        }
        const projectResult = await projectResponse.json();
        setProject(projectResult.data);

        // Check if user has access to this project
        if (session) {
          const accessResponse = await fetch(
            `/api/projects/${params.id}/access`
          );
          if (accessResponse.ok) {
            const accessData = await accessResponse.json();
            setHasAccess(accessData.data.hasAccess);
            setAccessRequest(accessData.data.accessRequest);
          }
        }

        // Fetch related projects (same category)
        const relatedResponse = await fetch(
          `/api/projects?category=${encodeURIComponent(
            projectResult.data.category
          )}&limit=4`
        );
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          // Filter out the current project and limit to 3
          const related = relatedData.projects
            .filter((p) => p._id !== projectResult.data._id)
            .slice(0, 3);
          setRelatedProjects(related);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      case "expert":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Utility function to safely render values
  const safeRender = (value, fallback = "N/A") => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === "object") {
      // If it's an object, try to extract a meaningful value
      if (value.average !== undefined) return value.average;
      if (value.count !== undefined) return value.count;
      if (value.name !== undefined) return value.name;
      if (value.title !== undefined) return value.title;
      return JSON.stringify(value);
    }
    return value;
  };

  // Handle access request submission
  const handleAccessRequest = async (e) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please sign in to request access");
      return;
    }

    setSubmittingRequest(true);

    try {
      const response = await fetch("/api/access-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: params.id,
          ...requestForm,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Access request submitted successfully!");
        setShowAccessForm(false);
        setRequestForm({
          paymentProof: "",
          paymentMethod: "",
          paymentAmount: "",
          paymentCurrency: "USD",
          transactionId: "",
          message: "",
        });
        // Refresh access status
        const accessResponse = await fetch(`/api/projects/${params.id}/access`);
        if (accessResponse.ok) {
          const accessData = await accessResponse.json();
          setAccessRequest(accessData.data.accessRequest);
        }
      } else {
        toast.error(result.message || "Failed to submit access request");
      }
    } catch (error) {
      console.error("Error submitting access request:", error);
      toast.error("Failed to submit access request");
    } finally {
      setSubmittingRequest(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading project...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || (!loading && !project)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            {error || "The project you're looking for doesn't exist."}
          </p>
          <Link href="/projects">
            <Button className="inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Safety check to ensure project data is valid
  if (!project || typeof project !== "object") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/projects"
              className="text-gray-500 hover:text-gray-700"
            >
              Projects
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{project.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge className={getDifficultyColor(project.difficulty)}>
                        {safeRender(project.difficulty)}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {safeRender(
                            project.rating?.average || project.rating
                          )}
                        </span>
                        {project.rating?.count && (
                          <span className="text-xs text-gray-500">
                            ({project.rating.count})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {safeRender(project.views, 0)} views
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link href="/projects">
                    <Button
                      variant="outline"
                      className="inline-flex items-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 mb-6">
                  {project.shortDescription || project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Images */}
            <Card>
              <CardHeader>
                <CardTitle>Project Screenshots</CardTitle>
              </CardHeader>
              <CardContent>
                {project.images && project.images.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-video bg-gray-100 rounded-lg overflow-hidden border"
                      >
                        <Image
                          src={image.url || image}
                          alt={
                            image.alt ||
                            `${project.title} screenshot ${index + 1}`
                          }
                          className="w-full h-full object-cover"
                          width={400}
                          height={225}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-6xl text-gray-400 mb-4">
                      {project.category === "AI/ML" && "🤖"}
                      {project.category === "Blockchain" && "⛓️"}
                      {project.category === "Web Development" && "🌐"}
                      {project.category === "Mobile Development" && "📱"}
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
                    <p className="text-gray-500 text-center">
                      <span className="font-medium">
                        No screenshots available
                      </span>
                      <br />
                      <span className="text-sm">
                        Contact us to see more details
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{project.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, index) => (
                        <Badge key={index} variant="default">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features?.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {hasAccess ? (
                    <>
                      <Unlock className="w-5 h-5 text-green-600" />
                      Project Resources
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 text-gray-500" />
                      Project Resources
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hasAccess ? (
                  <div className="flex flex-wrap gap-4">
                    {project.demoUrl && (
                      <Button asChild>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.downloadUrl && (
                      <Button variant="outline" asChild>
                        <a
                          href={project.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    )}
                    <div className="w-full mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">Access Granted</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        You have access to all project resources. Thank you for
                        your purchase!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Lock className="w-4 h-4" />
                        <span className="font-medium">Access Required</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        To access the project resources (GitHub repository,
                        downloads, etc.), you need to purchase access to this
                        project. You can either submit a formal request or
                        contact us directly on WhatsApp.
                      </p>
                      {session ? (
                        <div className="space-y-3">
                          {accessRequest ? (
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-center gap-2 text-blue-800 mb-2">
                                <AlertCircle className="w-4 h-4" />
                                <span className="font-medium">
                                  Request Status: {accessRequest.status}
                                </span>
                              </div>
                              <p className="text-sm text-blue-700">
                                {accessRequest.status === "pending" &&
                                  "Your access request is being reviewed by our admin team. You can also contact us on WhatsApp for faster processing."}
                                {accessRequest.status === "approved" &&
                                  "Your access request has been approved!"}
                                {accessRequest.status === "rejected" &&
                                  `Your request was rejected: ${accessRequest.rejectionReason}`}
                              </p>
                              {accessRequest.status === "pending" && (
                                <div className="mt-3">
                                  <WhatsAppButton
                                    project={project}
                                    type="purchase"
                                    variant="outline"
                                    buttonProps={{ size: "sm" }}
                                    className="w-full"
                                  >
                                    Contact Admin on WhatsApp
                                  </WhatsAppButton>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <Button
                                onClick={() => setShowAccessForm(true)}
                                className="w-full"
                              >
                                Submit Access Request
                              </Button>
                              <div className="text-center text-sm text-gray-500">
                                or
                              </div>
                              <WhatsAppButton
                                project={project}
                                type="purchase"
                                className="w-full"
                              >
                                Contact Admin on WhatsApp
                              </WhatsAppButton>
                              <p className="text-xs text-gray-500 text-center">
                                WhatsApp contact is faster for immediate
                                assistance
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">
                            Please sign in to request access to this project.
                          </p>
                          <Button asChild className="w-full">
                            <Link href="/auth/signin">
                              Sign In to Request Access
                            </Link>
                          </Button>
                          <div className="text-center text-sm text-gray-500">
                            or
                          </div>
                          <WhatsAppButton
                            project={project}
                            type="purchase"
                            className="w-full"
                          >
                            Contact Admin on WhatsApp
                          </WhatsAppButton>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Domains</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.domain?.map((domain, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">
                      {project.estimatedTime || "TBD"}
                    </p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold">
                      {safeRender(project.category)}
                    </p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-semibold">
                      {project.createdAt
                        ? formatDate(project.createdAt)
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <Button className="w-full" size="lg">
                  Get Quote
                </Button>
              </CardContent>
            </Card>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedProjects.map((relatedProject) => (
                      <Link
                        key={relatedProject._id}
                        href={`/projects/${relatedProject._id}`}
                      >
                        <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                          <h4 className="font-medium text-sm mb-1">
                            {relatedProject.title}
                          </h4>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {relatedProject.shortDescription ||
                              relatedProject.description}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">
                                {safeRender(
                                  relatedProject.rating?.average ||
                                    relatedProject.rating
                                )}
                              </span>
                            </div>
                            <Badge
                              className={getDifficultyColor(
                                relatedProject.difficulty
                              )}
                            >
                              {safeRender(relatedProject.difficulty)}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Access Request Form Modal */}
      {showAccessForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Request Project Access
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAccessForm(false)}
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleAccessRequest} className="space-y-4">
                <div>
                  <Label htmlFor="paymentMethod">Payment Method *</Label>
                  <Select
                    value={requestForm.paymentMethod}
                    onValueChange={(value) =>
                      setRequestForm({ ...requestForm, paymentMethod: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="stripe">Credit Card</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paymentAmount">Amount *</Label>
                    <Input
                      id="paymentAmount"
                      type="number"
                      step="0.01"
                      value={requestForm.paymentAmount}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          paymentAmount: e.target.value,
                        })
                      }
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentCurrency">Currency</Label>
                    <Select
                      value={requestForm.paymentCurrency}
                      onValueChange={(value) =>
                        setRequestForm({
                          ...requestForm,
                          paymentCurrency: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="transactionId">Transaction ID *</Label>
                  <Input
                    id="transactionId"
                    value={requestForm.transactionId}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        transactionId: e.target.value,
                      })
                    }
                    placeholder="Enter transaction ID or reference"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="paymentProof">Payment Proof URL *</Label>
                  <Input
                    id="paymentProof"
                    type="url"
                    value={requestForm.paymentProof}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        paymentProof: e.target.value,
                      })
                    }
                    placeholder="https://example.com/payment-proof"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload your payment proof to a cloud service and paste the
                    link here
                  </p>
                </div>

                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={requestForm.message}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        message: e.target.value,
                      })
                    }
                    placeholder="Any additional information..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAccessForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submittingRequest}
                    className="flex-1"
                  >
                    {submittingRequest ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
