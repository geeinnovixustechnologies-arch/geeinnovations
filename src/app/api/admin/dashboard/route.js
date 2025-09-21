import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import {
  User,
  Project,
  Service,
  Inquiry,
  Testimonial,
  AccessRequest,
} from "@/models";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    // Get all statistics in parallel
    const [
      totalProjects,
      totalServices,
      totalAccessRequests,
      totalUsers,
      totalInquiries,
      totalTestimonials,
      pendingAccessRequests,
      pendingInquiries,
      approvedTestimonials,
    ] = await Promise.all([
      Project.countDocuments({ isActive: true }),
      Service.countDocuments({ isActive: true }),
      AccessRequest.countDocuments(),
      User.countDocuments({ isActive: true }),
      Inquiry.countDocuments(),
      Testimonial.countDocuments(),
      AccessRequest.countDocuments({ status: "pending" }),
      Inquiry.countDocuments({ status: "pending" }),
      Testimonial.countDocuments({ isApproved: true }),
    ]);

    // Calculate revenue from approved access requests
    const revenueData = await AccessRequest.aggregate([
      { $match: { status: "approved" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$paymentAmount" },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Calculate monthly revenue
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const monthlyRevenueData = await AccessRequest.aggregate([
      {
        $match: {
          status: "approved",
          approvedAt: { $gte: currentMonth },
        },
      },
      {
        $group: {
          _id: null,
          monthlyRevenue: { $sum: "$paymentAmount" },
        },
      },
    ]);

    const monthlyRevenue =
      monthlyRevenueData.length > 0 ? monthlyRevenueData[0].monthlyRevenue : 0;

    // Calculate average rating
    const ratingData = await Testimonial.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    const clientSatisfaction =
      ratingData.length > 0
        ? Math.round(ratingData[0].averageRating * 10) / 10
        : 0;

    // Get recent activity
    const recentAccessRequests = await AccessRequest.find()
      .populate("user", "name email")
      .populate("project", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentInquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentTestimonials = await Testimonial.find()
      .populate("clientId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentActivity = [
      ...recentAccessRequests.map((request) => ({
        id: request._id,
        type: "access_request",
        title: "New access request",
        description: `${request.user?.name || "Unknown"} requested access to ${
          request.project?.title || "project"
        }`,
        timestamp: request.createdAt,
        amount: request.paymentAmount,
      })),
      ...recentInquiries.map((inquiry) => ({
        id: inquiry._id,
        type: "inquiry",
        title: "New inquiry submitted",
        description: inquiry.subject,
        timestamp: inquiry.createdAt,
      })),
      ...recentTestimonials.map((testimonial) => ({
        id: testimonial._id,
        type: "testimonial",
        title: "New testimonial received",
        description: `${testimonial.rating}-star review from ${
          testimonial.clientId?.name || testimonial.clientName
        }`,
        timestamp: testimonial.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);

    const stats = {
      totalProjects,
      totalServices,
      totalAccessRequests,
      totalUsers,
      totalInquiries,
      totalTestimonials,
      totalRevenue,
      monthlyRevenue,
      pendingAccessRequests,
      pendingInquiries,
      approvedTestimonials,
      clientSatisfaction,
    };

    return NextResponse.json({ stats, recentActivity }, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { message: "Error fetching dashboard data", error: error.message },
      { status: 500 }
    );
  }
}
