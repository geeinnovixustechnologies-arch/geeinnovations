"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  DollarSign,
  Star,
  Calendar,
  Download,
  RefreshCw,
  Activity,
  Target,
  Award,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminAnalyticsPage() {
  const { data: session, status } = useSession();
  const [analytics, setAnalytics] = useState({
    overview: {
      totalUsers: 0,
      totalProjects: 0,
      totalAccessRequests: 0,
      totalRevenue: 0,
      monthlyGrowth: {
        users: 0,
        projects: 0,
        accessRequests: 0,
        revenue: 0,
      },
    },
    charts: {
      userGrowth: [],
      projectViews: [],
      revenue: [],
      topProjects: [],
      topServices: [],
    },
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const [chartType, setChartType] = useState("line");

  const timeRanges = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" },
  ];

  const chartTypes = [
    { value: "line", label: "Line Chart" },
    { value: "bar", label: "Bar Chart" },
    { value: "area", label: "Area Chart" },
  ];

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchAnalytics();
    }
  }, [session, status, timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        // Fallback to mock data
        setAnalytics(getMockAnalytics());
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analytics data");
      // Fallback to mock data
      setAnalytics(getMockAnalytics());
    } finally {
      setLoading(false);
    }
  };

  const getMockAnalytics = () => ({
    overview: {
      totalUsers: 1247,
      totalProjects: 89,
      totalAccessRequests: 156,
      totalRevenue: 245000,
      monthlyGrowth: {
        users: 12.5,
        projects: 8.3,
        accessRequests: 15.2,
        revenue: 22.1,
      },
    },
    charts: {
      userGrowth: [
        { date: "2024-01-01", users: 1200 },
        { date: "2024-01-08", users: 1250 },
        { date: "2024-01-15", users: 1280 },
        { date: "2024-01-22", users: 1247 },
      ],
      projectViews: [
        { date: "2024-01-01", views: 4500 },
        { date: "2024-01-08", views: 5200 },
        { date: "2024-01-15", views: 4800 },
        { date: "2024-01-22", views: 5600 },
      ],
      revenue: [
        { date: "2024-01-01", revenue: 18000 },
        { date: "2024-01-08", revenue: 22000 },
        { date: "2024-01-15", revenue: 19500 },
        { date: "2024-01-22", revenue: 25000 },
      ],
      topProjects: [
        { name: "AI Medical Diagnosis", views: 1250, orders: 12 },
        { name: "Blockchain Voting", views: 980, orders: 8 },
        { name: "E-Commerce Platform", views: 1500, orders: 15 },
        { name: "IoT Smart Home", views: 800, orders: 6 },
      ],
      topServices: [
        { name: "AI & Machine Learning", orders: 45, revenue: 67500 },
        { name: "Web Development", orders: 38, revenue: 57000 },
        { name: "Blockchain Development", orders: 25, revenue: 45000 },
        { name: "Research Publication", orders: 20, revenue: 30000 },
      ],
    },
    recentActivity: [
      {
        type: "order",
        message: "New order received for AI Medical Diagnosis project",
        timestamp: "2024-01-25T10:30:00Z",
        value: 2500,
      },
      {
        type: "user",
        message: "New user registration: Sarah Johnson",
        timestamp: "2024-01-25T09:15:00Z",
      },
      {
        type: "testimonial",
        message: "New testimonial submitted by Mike Chen",
        timestamp: "2024-01-25T08:45:00Z",
      },
      {
        type: "project",
        message: "Project 'IoT Smart Home' published",
        timestamp: "2024-01-24T16:20:00Z",
      },
    ],
  });

  const getGrowthIcon = (growth) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (growth < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return "text-green-600";
    if (growth < 0) return "text-red-600";
    return "text-gray-600";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "order":
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case "user":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "testimonial":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "project":
        return <Target className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
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
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">
                Platform performance and user insights
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={fetchAnalytics}
                disabled={loading}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Users",
              value: formatNumber(analytics.overview.totalUsers),
              growth: analytics.overview.monthlyGrowth.users,
              icon: Users,
              color: "text-blue-600",
              bgColor: "bg-blue-50",
            },
            {
              title: "Total Projects",
              value: formatNumber(analytics.overview.totalProjects),
              growth: analytics.overview.monthlyGrowth.projects,
              icon: Target,
              color: "text-green-600",
              bgColor: "bg-green-50",
            },
            {
              title: "Total Access Requests",
              value: formatNumber(analytics.overview.totalAccessRequests),
              growth: analytics.overview.monthlyGrowth.accessRequests,
              icon: Award,
              color: "text-purple-600",
              bgColor: "bg-purple-50",
            },
            {
              title: "Total Revenue",
              value: formatCurrency(analytics.overview.totalRevenue),
              growth: analytics.overview.monthlyGrowth.revenue,
              icon: DollarSign,
              color: "text-orange-600",
              bgColor: "bg-orange-50",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-2">
                        {getGrowthIcon(stat.growth)}
                        <span
                          className={`text-sm ml-1 ${getGrowthColor(
                            stat.growth
                          )}`}
                        >
                          {stat.growth > 0 ? "+" : ""}
                          {stat.growth.toFixed(1)}%
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          vs last month
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                User Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">
                    Chart visualization would go here
                  </p>
                  <p className="text-sm text-gray-400">
                    Integration with Chart.js or Recharts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">
                    Chart visualization would go here
                  </p>
                  <p className="text-sm text-gray-400">
                    Integration with Chart.js or Recharts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Top Projects by Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.charts.topProjects.map((project, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {project.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatNumber(project.views)} views
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{project.orders} orders</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Top Services by Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.charts.topServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {service.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {service.orders} orders
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(service.revenue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {activity.value && (
                    <div className="flex-shrink-0">
                      <Badge variant="outline">
                        {formatCurrency(activity.value)}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
