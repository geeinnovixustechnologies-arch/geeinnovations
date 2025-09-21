"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ExternalLink,
  Calendar,
  DollarSign,
  User,
  FileText,
  AlertCircle,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AccessRequestsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [accessRequests, setAccessRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchAccessRequests = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });

      if (selectedStatus !== "all") {
        params.append("status", selectedStatus);
      }

      const response = await fetch(`/api/access-requests?${params}`);
      if (response.ok) {
        const data = await response.json();
        setAccessRequests(data.data.accessRequests);
        setTotalPages(data.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching access requests:", error);
      toast.error("Failed to fetch access requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchAccessRequests();
    }
  }, [status, session, currentPage, selectedStatus]);

  const handleAction = async (requestId, action) => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/access-requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          adminNotes: action === "approve" ? adminNotes : undefined,
          rejectionReason: action === "reject" ? rejectionReason : undefined,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Request ${action}d successfully`);
        setShowModal(false);
        setSelectedRequest(null);
        setAdminNotes("");
        setRejectionReason("");
        fetchAccessRequests();
      } else {
        toast.error(result.message || `Failed to ${action} request`);
      }
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
      toast.error(`Failed to ${action} request`);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
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
                Access Requests
              </h1>
              <p className="text-gray-600 mt-1">
                Manage project access requests from users
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="status-filter">Status:</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Access Requests List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading access requests...</p>
            </div>
          ) : accessRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No access requests found
                </h3>
                <p className="text-gray-600">
                  No access requests match your current filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            accessRequests.map((request) => (
              <Card key={request._id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={getStatusColor(request.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(request.status)}
                            {request.status}
                          </div>
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {formatDate(request.createdAt)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            User
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request.user?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {request.user?.email}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Project
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request.project?.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {request.project?.category}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">
                              {request.paymentAmount} {request.paymentCurrency}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              {request.paymentMethod.replace("_", " ")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">
                              Transaction ID
                            </p>
                            <p className="text-xs text-gray-500 font-mono">
                              {request.transactionId}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-purple-600" />
                          <div>
                            <p className="text-sm font-medium">Payment Proof</p>
                            <a
                              href={request.paymentProof}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline"
                            >
                              View Proof
                            </a>
                          </div>
                        </div>
                      </div>

                      {request.message && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-1">
                            Message
                          </h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                            {request.message}
                          </p>
                        </div>
                      )}

                      {request.adminNotes && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-1">
                            Admin Notes
                          </h4>
                          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                            {request.adminNotes}
                          </p>
                        </div>
                      )}

                      {request.rejectionReason && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-1">
                            Rejection Reason
                          </h4>
                          <p className="text-sm text-red-600 bg-red-50 p-3 rounded">
                            {request.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowModal(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                      {request.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowModal(true);
                            }}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowModal(true);
                            }}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Action Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {selectedRequest.status === "pending"
                  ? "Review Request"
                  : "Request Details"}
              </h2>

              {selectedRequest.status === "pending" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="adminNotes">Admin Notes (Optional)</Label>
                    <Textarea
                      id="adminNotes"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add any notes about this approval..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="rejectionReason">
                      Rejection Reason (If rejecting)
                    </Label>
                    <Textarea
                      id="rejectionReason"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Explain why this request is being rejected..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedRequest(null);
                    setAdminNotes("");
                    setRejectionReason("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                {selectedRequest.status === "pending" && (
                  <>
                    <Button
                      onClick={() =>
                        handleAction(selectedRequest._id, "approve")
                      }
                      disabled={actionLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      {actionLoading ? "Approving..." : "Approve"}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        handleAction(selectedRequest._id, "reject")
                      }
                      disabled={actionLoading}
                      className="flex-1"
                    >
                      {actionLoading ? "Rejecting..." : "Reject"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
