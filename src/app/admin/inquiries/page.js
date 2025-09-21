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
  Mail,
  Phone,
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Send,
  FileText,
} from "lucide-react";
import Link from "next/link";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AdminInquiriesPage() {
  const { data: session, status } = useSession();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const statuses = [
    { value: "new", label: "New", color: "bg-blue-100 text-blue-800" },
    {
      value: "in_progress",
      label: "In Progress",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "responded",
      label: "Responded",
      color: "bg-green-100 text-green-800",
    },
    { value: "closed", label: "Closed", color: "bg-gray-100 text-gray-800" },
  ];

  const types = [
    { value: "general", label: "General Inquiry" },
    { value: "project", label: "Project Inquiry" },
    { value: "service", label: "Service Inquiry" },
    { value: "support", label: "Support Request" },
    { value: "partnership", label: "Partnership" },
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
  ];

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchInquiries();
    }
  }, [
    session,
    status,
    searchTerm,
    selectedStatus,
    selectedType,
    selectedPriority,
    sortBy,
    sortOrder,
    currentPage,
  ]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(selectedStatus &&
          selectedStatus !== "all" && { status: selectedStatus }),
        ...(selectedType && selectedType !== "all" && { type: selectedType }),
        ...(selectedPriority &&
          selectedPriority !== "all" && { priority: selectedPriority }),
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/inquiries?${params}`);
      const data = await response.json();

      if (response.ok) {
        setInquiries(data.inquiries || []);
        setTotalPages(Math.ceil((data.totalInquiries || 0) / 10));
      } else {
        toast.error("Failed to fetch inquiries");
        // Fallback to mock data
        setInquiries(getMockInquiries());
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast.error("Error fetching inquiries");
      // Fallback to mock data
      setInquiries(getMockInquiries());
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const getMockInquiries = () => [
    {
      _id: "1",
      sender: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        company: "Tech Corp",
      },
      subject: "AI Project Development Inquiry",
      message:
        "I'm interested in developing an AI-powered medical diagnosis system for my research project. Could you provide more information about your AI/ML services and pricing?",
      type: "project",
      projectType: "AI/ML",
      budget: {
        min: 2000,
        max: 5000,
        currency: "USD",
      },
      timeline: "3-4 months",
      status: "new",
      priority: "high",
      source: "website",
      createdAt: "2024-01-25T10:30:00Z",
      updatedAt: "2024-01-25T10:30:00Z",
      responses: [],
      tags: ["ai", "medical", "research"],
      metadata: {
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0...",
        referrer: "https://google.com",
      },
    },
    {
      _id: "2",
      sender: {
        name: "Sarah Johnson",
        email: "sarah@university.edu",
        phone: "+1234567891",
        company: "University of Technology",
      },
      subject: "Blockchain Development Service",
      message:
        "We need a blockchain-based voting system for our university elections. What are your rates for blockchain development services?",
      type: "service",
      projectType: "Blockchain",
      budget: {
        min: 1500,
        max: 3000,
        currency: "USD",
      },
      timeline: "2-3 months",
      status: "in_progress",
      priority: "medium",
      source: "contact_form",
      createdAt: "2024-01-24T14:20:00Z",
      updatedAt: "2024-01-25T09:15:00Z",
      responses: [
        {
          id: "1",
          message:
            "Thank you for your inquiry. We'll get back to you within 24 hours with a detailed proposal.",
          sentAt: "2024-01-24T16:30:00Z",
          sentBy: "admin",
        },
      ],
      tags: ["blockchain", "voting", "university"],
      metadata: {
        ipAddress: "192.168.1.2",
        userAgent: "Mozilla/5.0...",
        referrer: "https://ourwebsite.com/contact",
      },
    },
    {
      _id: "3",
      sender: {
        name: "Mike Chen",
        email: "mike@startup.com",
        phone: "+1234567892",
        company: "StartupXYZ",
      },
      subject: "Web Development Consultation",
      message:
        "We're looking for a consultation on our e-commerce platform architecture. Do you offer consultation services?",
      type: "general",
      projectType: "Web Development",
      budget: {
        min: 500,
        max: 1000,
        currency: "USD",
      },
      timeline: "1 month",
      status: "responded",
      priority: "low",
      source: "email",
      createdAt: "2024-01-23T11:45:00Z",
      updatedAt: "2024-01-24T08:20:00Z",
      responses: [
        {
          id: "1",
          message:
            "Yes, we offer consultation services. I've attached our consultation package details.",
          sentAt: "2024-01-23T15:30:00Z",
          sentBy: "admin",
        },
        {
          id: "2",
          message:
            "Please let me know if you have any questions about our services.",
          sentAt: "2024-01-24T08:20:00Z",
          sentBy: "admin",
        },
      ],
      tags: ["consultation", "ecommerce", "architecture"],
      metadata: {
        ipAddress: "192.168.1.3",
        userAgent: "Mozilla/5.0...",
        referrer: "direct",
      },
    },
  ];

  const handleSendResponse = async () => {
    if (!responseMessage.trim()) {
      toast.error("Please enter a response message");
      return;
    }

    try {
      const response = await fetch(
        `/api/inquiries/${selectedInquiry._id}/respond`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: responseMessage,
            status: "responded",
          }),
        }
      );

      if (response.ok) {
        toast.success("Response sent successfully");
        fetchInquiries();
        setShowResponseModal(false);
        setSelectedInquiry(null);
        setResponseMessage("");
      } else {
        toast.error("Failed to send response");
      }
    } catch (error) {
      console.error("Error sending response:", error);
      toast.error("Error sending response");
    }
  };

  const handleStatusUpdate = async (inquiryId, newStatus) => {
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success("Inquiry status updated successfully");
        fetchInquiries();
      } else {
        toast.error("Failed to update inquiry status");
      }
    } catch (error) {
      console.error("Error updating inquiry status:", error);
      toast.error("Error updating inquiry status");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = statuses.find((s) => s.value === status);
    return (
      <Badge className={statusConfig?.color || "bg-gray-100 text-gray-800"}>
        {statusConfig?.label || status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = priorities.find((p) => p.value === priority);
    return (
      <Badge className={priorityConfig?.color || "bg-gray-100 text-gray-800"}>
        {priorityConfig?.label || priority}
      </Badge>
    );
  };

  const formatCurrency = (min, max, currency) => {
    const formatAmount = (amount) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "USD",
      }).format(amount);

    return `${formatAmount(min)} - ${formatAmount(max)}`;
  };

  const getDaysSinceInquiry = (createdAt) => {
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
                Inquiries Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage client inquiries and responses
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search inquiries..."
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
                  Type
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {types.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <Select
                  value={selectedPriority}
                  onValueChange={setSelectedPriority}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
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
                    <SelectItem value="priority-desc">
                      Highest Priority
                    </SelectItem>
                    <SelectItem value="status-asc">Status A-Z</SelectItem>
                    <SelectItem value="sender.name-asc">Sender A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inquiries Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inquiry</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-48"></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-28"></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse h-6 bg-gray-200 rounded w-16"></div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse h-4 bg-gray-200 rounded w-20"></div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse h-6 bg-gray-200 rounded w-16"></div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse h-6 bg-gray-200 rounded w-12"></div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse h-4 bg-gray-200 rounded w-8"></div>
                    </TableCell>
                    <TableCell>
                      <div className="animate-pulse h-4 bg-gray-200 rounded w-20"></div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="animate-pulse h-8 bg-gray-200 rounded w-8"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : inquiries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan="9"
                    className="text-center py-12 text-gray-500"
                  >
                    No inquiries found
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((inquiry) => (
                  <TableRow key={inquiry._id}>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {inquiry.subject}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {inquiry.message.substring(0, 60)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {inquiry.sender.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {inquiry.sender.email}
                        </div>
                        {inquiry.sender.company && (
                          <div className="text-xs text-gray-400">
                            {inquiry.sender.company}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {types.find((t) => t.value === inquiry.type)?.label ||
                          inquiry.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {inquiry.budget ? (
                        <span className="text-sm">
                          {formatCurrency(
                            inquiry.budget.min,
                            inquiry.budget.max,
                            inquiry.budget.currency
                          )}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Not specified
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                    <TableCell>{getPriorityBadge(inquiry.priority)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm">
                          {getDaysSinceInquiry(inquiry.createdAt)}d
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            href={`/admin/inquiries/${inquiry._id}`}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedInquiry(inquiry);
                            setShowResponseModal(true);
                          }}
                          title="Send Response"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleStatusUpdate(inquiry._id, "closed")
                          }
                          title="Close Inquiry"
                        >
                          <XCircle className="h-4 w-4" />
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

      {/* Response Modal */}
      <Dialog open={showResponseModal} onOpenChange={setShowResponseModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Response</DialogTitle>
            <DialogDescription>
              Respond to inquiry from {selectedInquiry?.sender?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Message
              </label>
              <div className="p-3 bg-gray-50 rounded-lg text-sm">
                {selectedInquiry?.message}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Response
              </label>
              <Textarea
                placeholder="Type your response here..."
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowResponseModal(false);
                setSelectedInquiry(null);
                setResponseMessage("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendResponse}
              disabled={!responseMessage.trim()}
            >
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
