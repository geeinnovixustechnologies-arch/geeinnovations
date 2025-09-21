"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Edit,
  Eye,
  Calendar,
  Star,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Trash2,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AdminTestimonialsPage() {
  const { data: session, status } = useSession();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const statuses = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "approved",
      label: "Approved",
      color: "bg-green-100 text-green-800",
    },
    { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
    {
      value: "featured",
      label: "Featured",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const ratings = [5, 4, 3, 2, 1];

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchTestimonials();
    }
  }, [
    session,
    status,
    searchTerm,
    selectedStatus,
    selectedRating,
    sortBy,
    sortOrder,
    currentPage,
  ]);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(selectedStatus &&
          selectedStatus !== "all" && { status: selectedStatus }),
        ...(selectedRating &&
          selectedRating !== "all" && { rating: selectedRating }),
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/testimonials?${params}`);
      const data = await response.json();

      if (response.ok) {
        setTestimonials(data.testimonials || []);
        setTotalPages(Math.ceil((data.totalTestimonials || 0) / 10));
      } else {
        toast.error("Failed to fetch testimonials");
        // Fallback to mock data
        setTestimonials(getMockTestimonials());
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Error fetching testimonials");
      // Fallback to mock data
      setTestimonials(getMockTestimonials());
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const getMockTestimonials = () => [
    {
      _id: "1",
      client: {
        name: "John Doe",
        email: "john@example.com",
        company: "Tech Corp",
        position: "CTO",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      },
      project: {
        title: "AI-Powered Medical Diagnosis System",
        category: "AI/ML",
      },
      order: {
        orderNumber: "ORD-2024-001",
        completedAt: "2024-01-20T10:30:00Z",
      },
      rating: 5,
      review:
        "GEE INNOVIXUS delivered an exceptional AI-powered medical diagnosis system that exceeded our expectations. The team's expertise in machine learning and medical imaging was evident throughout the project. The system is now being used in our research lab and has significantly improved our diagnostic accuracy.",
      isApproved: true,
      isFeatured: true,
      isPublic: true,
      helpfulness: {
        helpful: 12,
        notHelpful: 1,
      },
      createdAt: "2024-01-22T14:30:00Z",
      updatedAt: "2024-01-22T14:30:00Z",
      approvedAt: "2024-01-22T15:00:00Z",
      approvedBy: "admin",
    },
    {
      _id: "2",
      client: {
        name: "Sarah Johnson",
        email: "sarah@university.edu",
        company: "University of Technology",
        position: "Research Scholar",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      },
      project: {
        title: "Blockchain Voting System",
        category: "Blockchain",
      },
      order: {
        orderNumber: "ORD-2024-002",
        completedAt: "2024-01-15T16:20:00Z",
      },
      rating: 5,
      review:
        "The blockchain voting system developed by GEE INNOVIXUS was perfect for our university elections. It provided transparency, security, and ease of use. The team was professional, responsive, and delivered the project on time. Highly recommended for any blockchain development needs.",
      isApproved: true,
      isFeatured: false,
      isPublic: true,
      helpfulness: {
        helpful: 8,
        notHelpful: 0,
      },
      createdAt: "2024-01-18T11:15:00Z",
      updatedAt: "2024-01-18T11:15:00Z",
      approvedAt: "2024-01-18T12:00:00Z",
      approvedBy: "admin",
    },
    {
      _id: "3",
      client: {
        name: "Mike Chen",
        email: "mike@startup.com",
        company: "StartupXYZ",
        position: "Founder",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      project: {
        title: "Web Development Consultation",
        category: "Web Development",
      },
      order: {
        orderNumber: "ORD-2024-003",
        completedAt: "2024-01-10T14:45:00Z",
      },
      rating: 4,
      review:
        "Great consultation service! The team provided valuable insights into our e-commerce platform architecture. They were knowledgeable and gave us practical recommendations that we could implement immediately. The only reason for 4 stars instead of 5 is that we wished the consultation was longer.",
      isApproved: true,
      isFeatured: false,
      isPublic: true,
      helpfulness: {
        helpful: 5,
        notHelpful: 1,
      },
      createdAt: "2024-01-12T09:30:00Z",
      updatedAt: "2024-01-12T09:30:00Z",
      approvedAt: "2024-01-12T10:00:00Z",
      approvedBy: "admin",
    },
    {
      _id: "4",
      client: {
        name: "Emily Rodriguez",
        email: "emily@company.com",
        company: "DataCorp",
        position: "Data Scientist",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      },
      project: {
        title: "IoT Smart Home Automation",
        category: "IoT",
      },
      order: {
        orderNumber: "ORD-2024-004",
        completedAt: "2024-01-05T12:00:00Z",
      },
      rating: 5,
      review:
        "Outstanding IoT solution! The smart home automation system is exactly what we needed. The integration with various devices is seamless, and the user interface is intuitive. The team's attention to detail and technical expertise is impressive. We're planning to work with them again for future projects.",
      isApproved: false,
      isFeatured: false,
      isPublic: false,
      helpfulness: {
        helpful: 0,
        notHelpful: 0,
      },
      createdAt: "2024-01-08T16:20:00Z",
      updatedAt: "2024-01-08T16:20:00Z",
      approvedAt: null,
      approvedBy: null,
    },
    {
      _id: "5",
      client: {
        name: "David Wilson",
        email: "david@enterprise.com",
        company: "Enterprise Solutions",
        position: "IT Director",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      },
      project: {
        title: "Cybersecurity Threat Detection System",
        category: "Cybersecurity",
      },
      order: {
        orderNumber: "ORD-2024-005",
        completedAt: "2024-01-01T18:30:00Z",
      },
      rating: 3,
      review:
        "The cybersecurity system works well but took longer than expected to implement. The team was responsive to our feedback and made necessary adjustments. The final product meets our basic requirements, though we had hoped for more advanced features. Overall, a decent solution for the price.",
      isApproved: false,
      isFeatured: false,
      isPublic: false,
      helpfulness: {
        helpful: 0,
        notHelpful: 0,
      },
      createdAt: "2024-01-03T10:45:00Z",
      updatedAt: "2024-01-03T10:45:00Z",
      approvedAt: null,
      approvedBy: null,
    },
  ];

  const handleApprovalToggle = async (testimonialId, currentStatus) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isApproved: !currentStatus,
          approvedAt: !currentStatus ? new Date().toISOString() : null,
          approvedBy: !currentStatus ? session.user.id : null,
        }),
      });

      if (response.ok) {
        toast.success(
          `Testimonial ${!currentStatus ? "approved" : "rejected"} successfully`
        );
        fetchTestimonials();
      } else {
        toast.error("Failed to update testimonial status");
      }
    } catch (error) {
      console.error("Error updating testimonial status:", error);
      toast.error("Error updating testimonial status");
    }
  };

  const handleFeaturedToggle = async (testimonialId, currentStatus) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFeatured: !currentStatus }),
      });

      if (response.ok) {
        toast.success(
          `Testimonial ${
            !currentStatus ? "featured" : "unfeatured"
          } successfully`
        );
        fetchTestimonials();
      } else {
        toast.error("Failed to update testimonial featured status");
      }
    } catch (error) {
      console.error("Error updating testimonial featured status:", error);
      toast.error("Error updating testimonial featured status");
    }
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Testimonial deleted successfully");
        fetchTestimonials();
        setShowDeleteModal(false);
        setSelectedTestimonial(null);
      } else {
        toast.error("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Error deleting testimonial");
    }
  };

  const getStatusBadge = (isApproved, isFeatured) => {
    if (isFeatured) {
      return <Badge className="bg-purple-100 text-purple-800">Featured</Badge>;
    }
    if (isApproved) {
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getDaysSinceSubmission = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-8">
            You need admin privileges to access this page.
          </p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Testimonials Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage client testimonials and reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search testimonials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <Select
                  value={selectedRating}
                  onValueChange={setSelectedRating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    {ratings.map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} Star{rating > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <Select
                  value={`${sortBy}-${sortOrder}`}
                  onValueChange={(value) => {
                    const [field, order] = value.split("-");
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt-desc">Newest First</SelectItem>
                    <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                    <SelectItem value="rating-desc">Highest Rating</SelectItem>
                    <SelectItem value="rating-asc">Lowest Rating</SelectItem>
                    <SelectItem value="helpfulness.helpful-desc">
                      Most Helpful
                    </SelectItem>
                    <SelectItem value="client.name-asc">Client A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Helpfulness</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="animate-pulse flex items-center">
                        <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-32"></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse flex">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="h-4 w-4 bg-gray-200 rounded mr-1"
                          ></div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse h-6 bg-gray-200 rounded w-16"></div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse h-4 bg-gray-200 rounded w-12"></div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse h-4 bg-gray-200 rounded w-20"></div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="animate-pulse h-8 bg-gray-200 rounded w-8"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : testimonials.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan="8"
                    className="text-center py-12 text-gray-500"
                  >
                    No testimonials found
                  </TableCell>
                </TableRow>
              ) : (
                testimonials.map((testimonial) => (
                  <TableRow key={testimonial._id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {testimonial.client.avatar ? (
                            <Image
                              className="h-10 w-10 rounded-full object-cover"
                              src={testimonial.client.avatar}
                              alt={testimonial.client.name}
                              width={40}
                              height={40}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {testimonial.client.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {testimonial.client.company}
                          </div>
                          <div className="text-xs text-gray-400">
                            {testimonial.client.position}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {testimonial.project.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.project.category}
                        </div>
                        <div className="text-xs text-gray-400">
                          {testimonial.order.orderNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {testimonial.rating}/5
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 line-clamp-3">
                          {testimonial.review}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(
                        testimonial.isApproved,
                        testimonial.isFeatured
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          {testimonial.helpfulness.helpful}
                        </span>
                        {testimonial.helpfulness.notHelpful > 0 && (
                          <span className="text-sm text-gray-400 ml-1">
                            ({testimonial.helpfulness.notHelpful})
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm">
                          {getDaysSinceSubmission(testimonial.createdAt)}d ago
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            href={`/admin/testimonials/${testimonial._id}`}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleApprovalToggle(
                              testimonial._id,
                              testimonial.isApproved
                            )
                          }
                          className={
                            testimonial.isApproved
                              ? "text-red-600 hover:text-red-900"
                              : "text-green-600 hover:text-green-900"
                          }
                          title={testimonial.isApproved ? "Reject" : "Approve"}
                        >
                          {testimonial.isApproved ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        {testimonial.isApproved && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleFeaturedToggle(
                                testimonial._id,
                                testimonial.isFeatured
                              )
                            }
                            className={
                              testimonial.isFeatured
                                ? "text-purple-600 hover:text-purple-900"
                                : "text-gray-600 hover:text-gray-900"
                            }
                            title={
                              testimonial.isFeatured
                                ? "Remove from Featured"
                                : "Add to Featured"
                            }
                          >
                            <Star
                              className={`h-4 w-4 ${
                                testimonial.isFeatured ? "fill-current" : ""
                              }`}
                            />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Testimonial"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing page {currentPage} of {totalPages}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial from{" "}
              {selectedTestimonial?.client?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedTestimonial(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteTestimonial(selectedTestimonial._id)}
            >
              Delete Testimonial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
