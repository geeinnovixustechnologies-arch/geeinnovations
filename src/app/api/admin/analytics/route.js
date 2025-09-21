import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Project from "@/models/Project";
import Service from "@/models/Service";
import AccessRequest from "@/models/AccessRequest";
import Testimonial from "@/models/Testimonial";
import Inquiry from "@/models/Inquiry";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "30d";

    // Calculate date range
    const now = new Date();
    let startDate = new Date();

    switch (range) {
      case "7d":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(now.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(now.getDate() - 90);
        break;
      case "1y":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Get overview statistics
    const [
      totalUsers,
      totalProjects,
      totalServices,
      totalAccessRequests,
      totalTestimonials,
      totalInquiries,
    ] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Service.countDocuments(),
      AccessRequest.countDocuments(),
      Testimonial.countDocuments(),
      Inquiry.countDocuments(),
    ]);

    // Calculate total approved access requests (as a proxy for revenue)
    const approvedRequests = await AccessRequest.countDocuments({
      status: "approved",
    });
    const totalRevenue = approvedRequests * 1000; // Assuming 1000 per approved request

    // Get monthly growth data
    const lastMonth = new Date();
    lastMonth.setMonth(now.getMonth() - 1);

    const [
      lastMonthUsers,
      lastMonthProjects,
      lastMonthAccessRequests,
      lastMonthApprovedRequests,
    ] = await Promise.all([
      User.countDocuments({ createdAt: { $lt: lastMonth } }),
      Project.countDocuments({ createdAt: { $lt: lastMonth } }),
      AccessRequest.countDocuments({ createdAt: { $lt: lastMonth } }),
      AccessRequest.countDocuments({
        createdAt: { $lt: lastMonth },
        status: "approved",
      }),
    ]);

    const lastMonthRevenueAmount = lastMonthApprovedRequests * 1000;

    const monthlyGrowth = {
      users:
        lastMonthUsers > 0
          ? ((totalUsers - lastMonthUsers) / lastMonthUsers) * 100
          : 0,
      projects:
        lastMonthProjects > 0
          ? ((totalProjects - lastMonthProjects) / lastMonthProjects) * 100
          : 0,
      accessRequests:
        lastMonthAccessRequests > 0
          ? ((totalAccessRequests - lastMonthAccessRequests) /
              lastMonthAccessRequests) *
            100
          : 0,
      revenue:
        lastMonthRevenueAmount > 0
          ? ((totalRevenue - lastMonthRevenueAmount) / lastMonthRevenueAmount) *
            100
          : 0,
    };

    // Get chart data
    const chartData = await getChartData(startDate, now);

    // Get top projects by views
    const topProjects = await Project.find({ isActive: true })
      .sort({ views: -1 })
      .limit(5)
      .select("title views")
      .lean();

    // Get top services by access request count
    const topServices = await Service.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: "accessrequests",
          localField: "_id",
          foreignField: "service",
          as: "accessRequests",
        },
      },
      {
        $addFields: {
          requestCount: { $size: "$accessRequests" },
          approvedCount: {
            $size: {
              $filter: {
                input: "$accessRequests",
                cond: { $eq: ["$$this.status", "approved"] },
              },
            },
          },
        },
      },
      { $sort: { requestCount: -1 } },
      { $limit: 5 },
      { $project: { name: 1, requestCount: 1, approvedCount: 1 } },
    ]);

    // Get recent activity
    const recentActivity = await getRecentActivity();

    const analytics = {
      overview: {
        totalUsers,
        totalProjects,
        totalServices,
        totalAccessRequests,
        totalTestimonials,
        totalInquiries,
        totalRevenue,
        monthlyGrowth,
      },
      charts: chartData,
      topProjects,
      topServices,
      recentActivity,
    };

    return NextResponse.json(analytics, { status: 200 });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { message: "Error fetching analytics", error: error.message },
      { status: 500 }
    );
  }
}

async function getChartData(startDate, endDate) {
  try {
    // User growth data
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // Project views data
    const projectViews = await Project.aggregate([
      {
        $match: {
          updatedAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$updatedAt" },
            month: { $month: "$updatedAt" },
            day: { $dayOfMonth: "$updatedAt" },
          },
          totalViews: { $sum: "$views" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // Access request data
    const accessRequests = await AccessRequest.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          totalRequests: { $sum: 1 },
          approvedRequests: {
            $sum: {
              $cond: [{ $eq: ["$status", "approved"] }, 1, 0],
            },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    return {
      userGrowth: userGrowth.map((item) => ({
        date: `${item._id.year}-${String(item._id.month).padStart(
          2,
          "0"
        )}-${String(item._id.day).padStart(2, "0")}`,
        users: item.count,
      })),
      projectViews: projectViews.map((item) => ({
        date: `${item._id.year}-${String(item._id.month).padStart(
          2,
          "0"
        )}-${String(item._id.day).padStart(2, "0")}`,
        views: item.totalViews,
      })),
      accessRequests: accessRequests.map((item) => ({
        date: `${item._id.year}-${String(item._id.month).padStart(
          2,
          "0"
        )}-${String(item._id.day).padStart(2, "0")}`,
        requests: item.totalRequests,
        approved: item.approvedRequests,
      })),
    };
  } catch (error) {
    console.error("Error getting chart data:", error);
    return {
      userGrowth: [],
      projectViews: [],
      accessRequests: [],
    };
  }
}

async function getRecentActivity() {
  try {
    const [
      recentAccessRequests,
      recentUsers,
      recentTestimonials,
      recentProjects,
    ] = await Promise.all([
      AccessRequest.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .populate("user", "name")
        .lean(),
      User.find().sort({ createdAt: -1 }).limit(3).lean(),
      Testimonial.find().sort({ createdAt: -1 }).limit(3).lean(),
      Project.find().sort({ createdAt: -1 }).limit(3).lean(),
    ]);

    const activities = [];

    // Add recent access requests
    recentAccessRequests.forEach((request) => {
      activities.push({
        type: "accessRequest",
        message: `New access request for ${
          request.project ? "project" : "service"
        }`,
        timestamp: request.createdAt,
        status: request.status,
        user: request.user?.name,
      });
    });

    // Add recent users
    recentUsers.forEach((user) => {
      activities.push({
        type: "user",
        message: `New user registration: ${user.name}`,
        timestamp: user.createdAt,
        user: user.name,
      });
    });

    // Add recent testimonials
    recentTestimonials.forEach((testimonial) => {
      activities.push({
        type: "testimonial",
        message: `New testimonial submitted by ${testimonial.clientName}`,
        timestamp: testimonial.createdAt,
        user: testimonial.clientName,
      });
    });

    // Add recent projects
    recentProjects.forEach((project) => {
      activities.push({
        type: "project",
        message: `Project '${project.title}' published`,
        timestamp: project.createdAt,
        user: "Admin",
      });
    });

    // Sort by timestamp and return top 10
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
  } catch (error) {
    console.error("Error getting recent activity:", error);
    return [];
  }
}
