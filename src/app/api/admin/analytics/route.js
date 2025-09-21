import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Project from "@/models/Project";
import Service from "@/models/Service";
import Order from "@/models/Order";
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
      totalOrders,
      totalTestimonials,
      totalInquiries,
    ] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Service.countDocuments(),
      Order.countDocuments(),
      Testimonial.countDocuments(),
      Inquiry.countDocuments(),
    ]);

    // Calculate total revenue
    const revenueResult = await Order.aggregate([
      { $match: { status: { $in: ["completed", "delivered"] } } },
      { $group: { _id: null, total: { $sum: "$budget.amount" } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Get monthly growth data
    const lastMonth = new Date();
    lastMonth.setMonth(now.getMonth() - 1);

    const [
      lastMonthUsers,
      lastMonthProjects,
      lastMonthOrders,
      lastMonthRevenue,
    ] = await Promise.all([
      User.countDocuments({ createdAt: { $lt: lastMonth } }),
      Project.countDocuments({ createdAt: { $lt: lastMonth } }),
      Order.countDocuments({ createdAt: { $lt: lastMonth } }),
      Order.aggregate([
        {
          $match: {
            createdAt: { $lt: lastMonth },
            status: { $in: ["completed", "delivered"] },
          },
        },
        { $group: { _id: null, total: { $sum: "$budget.amount" } } },
      ]),
    ]);

    const lastMonthRevenueAmount =
      lastMonthRevenue.length > 0 ? lastMonthRevenue[0].total : 0;

    const monthlyGrowth = {
      users:
        lastMonthUsers > 0
          ? ((totalUsers - lastMonthUsers) / lastMonthUsers) * 100
          : 0,
      projects:
        lastMonthProjects > 0
          ? ((totalProjects - lastMonthProjects) / lastMonthProjects) * 100
          : 0,
      orders:
        lastMonthOrders > 0
          ? ((totalOrders - lastMonthOrders) / lastMonthOrders) * 100
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

    // Get top services by order count
    const topServices = await Service.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "service",
          as: "orders",
        },
      },
      {
        $addFields: {
          orderCount: { $size: "$orders" },
          totalRevenue: {
            $sum: {
              $map: {
                input: "$orders",
                as: "order",
                in: {
                  $cond: [
                    { $eq: ["$$order.status", "completed"] },
                    "$$order.budget.amount",
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      { $sort: { orderCount: -1 } },
      { $limit: 5 },
      { $project: { name: 1, orderCount: 1, totalRevenue: 1 } },
    ]);

    // Get recent activity
    const recentActivity = await getRecentActivity();

    const analytics = {
      overview: {
        totalUsers,
        totalProjects,
        totalServices,
        totalOrders,
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

    // Revenue data
    const revenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: { $in: ["completed", "delivered"] },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          totalRevenue: { $sum: "$budget.amount" },
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
      revenue: revenue.map((item) => ({
        date: `${item._id.year}-${String(item._id.month).padStart(
          2,
          "0"
        )}-${String(item._id.day).padStart(2, "0")}`,
        revenue: item.totalRevenue,
      })),
    };
  } catch (error) {
    console.error("Error getting chart data:", error);
    return {
      userGrowth: [],
      projectViews: [],
      revenue: [],
    };
  }
}

async function getRecentActivity() {
  try {
    const [recentOrders, recentUsers, recentTestimonials, recentProjects] =
      await Promise.all([
        Order.find()
          .sort({ createdAt: -1 })
          .limit(3)
          .populate("client", "name")
          .lean(),
        User.find().sort({ createdAt: -1 }).limit(3).lean(),
        Testimonial.find().sort({ createdAt: -1 }).limit(3).lean(),
        Project.find().sort({ createdAt: -1 }).limit(3).lean(),
      ]);

    const activities = [];

    // Add recent orders
    recentOrders.forEach((order) => {
      activities.push({
        type: "order",
        message: `New order received for ${
          order.project ? "project" : "service"
        }`,
        timestamp: order.createdAt,
        value: order.budget?.amount,
        user: order.client?.name,
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
