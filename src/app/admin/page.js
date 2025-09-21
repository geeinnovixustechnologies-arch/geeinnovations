"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  FileText,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Eye,
  Star,
  Calendar,
  Download,
  Upload,
  Settings,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalAccessRequests: 0,
    totalRevenue: 0,
    totalClients: 0,
    pendingInquiries: 0,
    pendingAccessRequests: 0,
    monthlyRevenue: 0,
    clientSatisfaction: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchDashboardData();
    }
  }, [session, status]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/dashboard");
      const data = await response.json();

      if (response.ok) {
        setStats({
          totalProjects: data.stats.totalProjects,
          totalAccessRequests: data.stats.totalAccessRequests,
          totalRevenue: data.stats.totalRevenue,
          totalClients: data.stats.totalUsers,
          pendingInquiries: data.stats.pendingInquiries,
          pendingAccessRequests: data.stats.pendingAccessRequests,
          monthlyRevenue: data.stats.monthlyRevenue,
          clientSatisfaction: data.stats.clientSatisfaction,
        });

        // Format recent activity timestamps
        const formattedActivity = data.recentActivity.map((activity) => ({
          ...activity,
          timestamp: new Date(activity.timestamp).toLocaleString(),
        }));

        setRecentActivity(formattedActivity);
      } else {
        console.error("Error fetching dashboard data:", data.message);
        // Fallback to mock data
        setStats({
          totalProjects: 0,
          totalAccessRequests: 0,
          totalRevenue: 0,
          totalClients: 0,
          pendingInquiries: 0,
          pendingAccessRequests: 0,
          monthlyRevenue: 0,
          clientSatisfaction: 0,
        });
        setRecentActivity([]);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Fallback to mock data
      setStats({
        totalProjects: 0,
        totalAccessRequests: 0,
        totalRevenue: 0,
        totalClients: 0,
        pendingInquiries: 0,
        pendingAccessRequests: 0,
        monthlyRevenue: 0,
        clientSatisfaction: 0,
      });
      setRecentActivity([]);
    } finally {
      setLoading(false);
    }
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

  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Access Requests",
      value: stats.totalAccessRequests,
      icon: FileText,
      color: "from-green-500 to-green-600",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-purple-500 to-purple-600",
      change: "+15%",
      changeType: "positive",
    },
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      color: "from-orange-500 to-orange-600",
      change: "+5%",
      changeType: "positive",
    },
  ];

  const quickActions = [
    {
      title: "Add New Project",
      description: "Create a new project listing",
      icon: Briefcase,
      href: "/admin/projects/new",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Manage Access Requests",
      description: "View and manage access requests",
      icon: FileText,
      href: "/admin/access-requests",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "View Inquiries",
      description: "Respond to client inquiries",
      icon: MessageSquare,
      href: "/admin/inquiries",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Import Data",
      description: "Import projects from Excel",
      icon: Upload,
      href: "/admin/import",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "access_request":
        return FileText;
      case "inquiry":
        return MessageSquare;
      case "testimonial":
        return Star;
      case "project":
        return Briefcase;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "access_request":
        return "text-green-600 bg-green-100";
      case "inquiry":
        return "text-blue-600 bg-blue-100";
      case "testimonial":
        return "text-yellow-600 bg-yellow-100";
      case "project":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {session.user.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? (
                      <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      from last month
                    </span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${action.color} mr-4`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <Link
                  href="/admin/activity"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>

              <div className="space-y-4">
                {loading
                  ? [...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="animate-pulse flex items-center space-x-4"
                      >
                        <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))
                  : recentActivity.map((activity) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div
                          key={activity.id}
                          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className={`p-2 rounded-full ${getActivityColor(
                              activity.type
                            )}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {activity.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {activity.description}
                            </p>
                            {activity.amount && (
                              <p className="text-sm font-medium text-green-600">
                                ${activity.amount.toLocaleString()}
                              </p>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {activity.timestamp}
                          </div>
                        </div>
                      );
                    })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Inquiries
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {loading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                  ) : (
                    stats.pendingInquiries
                  )}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Access Requests
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {loading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                  ) : (
                    stats.pendingAccessRequests
                  )}
                </p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Client Satisfaction
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {loading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                  ) : (
                    `${stats.clientSatisfaction}/5`
                  )}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
