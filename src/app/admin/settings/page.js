"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Settings,
  Save,
  RefreshCw,
  Globe,
  Mail,
  Shield,
  Database,
  FileText,
  Bell,
  Palette,
  Key,
  Server,
  AlertTriangle,
  CheckCircle,
  X,
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

export default function AdminSettingsPage() {
  const { data: session, status } = useSession();
  const [settings, setSettings] = useState({
    general: {
      siteName: "GEE INNOVIXUS",
      siteDescription:
        "Leading academic project consultancy and research publication services",
      siteUrl: "https://geeinnovixus.com",
      contactEmail: "contact@geeinnovixus.com",
      supportEmail: "support@geeinnovixus.com",
      timezone: "UTC",
      language: "en",
      currency: "USD",
    },
    email: {
      smtpHost: "",
      smtpPort: 587,
      smtpUser: "",
      smtpPassword: "",
      fromEmail: "noreply@geeinnovixus.com",
      fromName: "GEE INNOVIXUS",
      enableNotifications: true,
    },
    security: {
      enableRegistration: true,
      requireEmailVerification: true,
      enableTwoFactor: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
    },
    storage: {
      maxFileSize: 10,
      allowedFileTypes: "jpg,jpeg,png,gif,pdf,doc,docx,xlsx,xls",
      enableCloudStorage: true,
      storageProvider: "tigris",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      adminNotifications: true,
      userNotifications: true,
    },
    appearance: {
      theme: "light",
      primaryColor: "#3b82f6",
      secondaryColor: "#8b5cf6",
      logoUrl: "",
      faviconUrl: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [showResetModal, setShowResetModal] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "email", label: "Email", icon: Mail },
    { id: "security", label: "Security", icon: Shield },
    { id: "storage", label: "Storage", icon: Database },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  const currencies = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "INR", label: "Indian Rupee (₹)" },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
  ];

  const timezones = [
    { value: "UTC", label: "UTC" },
    { value: "America/New_York", label: "Eastern Time" },
    { value: "America/Chicago", label: "Central Time" },
    { value: "America/Denver", label: "Mountain Time" },
    { value: "America/Los_Angeles", label: "Pacific Time" },
    { value: "Europe/London", label: "London" },
    { value: "Europe/Paris", label: "Paris" },
    { value: "Asia/Tokyo", label: "Tokyo" },
    { value: "Asia/Shanghai", label: "Shanghai" },
    { value: "Asia/Kolkata", label: "India" },
  ];

  const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];

  const storageProviders = [
    { value: "tigris", label: "Tigris S3" },
    { value: "aws", label: "AWS S3" },
    { value: "local", label: "Local Storage" },
  ];

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchSettings();
    }
  }, [session, status]);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/settings");
      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
      } else {
        // Use default settings if API fails
        toast.error("Failed to load settings");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Error loading settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ settings }),
      });

      if (response.ok) {
        toast.success("Settings saved successfully");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch("/api/admin/settings", {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Settings reset to defaults");
        fetchSettings();
        setShowResetModal(false);
      } else {
        toast.error("Failed to reset settings");
      }
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast.error("Error resetting settings");
    }
  };

  const updateSetting = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Name
          </label>
          <Input
            value={settings.general.siteName}
            onChange={(e) =>
              updateSetting("general", "siteName", e.target.value)
            }
            placeholder="Enter site name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site URL
          </label>
          <Input
            value={settings.general.siteUrl}
            onChange={(e) =>
              updateSetting("general", "siteUrl", e.target.value)
            }
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Description
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={settings.general.siteDescription}
          onChange={(e) =>
            updateSetting("general", "siteDescription", e.target.value)
          }
          placeholder="Enter site description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <Input
            type="email"
            value={settings.general.contactEmail}
            onChange={(e) =>
              updateSetting("general", "contactEmail", e.target.value)
            }
            placeholder="contact@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Support Email
          </label>
          <Input
            type="email"
            value={settings.general.supportEmail}
            onChange={(e) =>
              updateSetting("general", "supportEmail", e.target.value)
            }
            placeholder="support@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <Select
            value={settings.general.timezone}
            onValueChange={(value) =>
              updateSetting("general", "timezone", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <Select
            value={settings.general.language}
            onValueChange={(value) =>
              updateSetting("general", "language", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <Select
            value={settings.general.currency}
            onValueChange={(value) =>
              updateSetting("general", "currency", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Host
          </label>
          <Input
            value={settings.email.smtpHost}
            onChange={(e) => updateSetting("email", "smtpHost", e.target.value)}
            placeholder="smtp.gmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Port
          </label>
          <Input
            type="number"
            value={settings.email.smtpPort}
            onChange={(e) =>
              updateSetting("email", "smtpPort", parseInt(e.target.value))
            }
            placeholder="587"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Username
          </label>
          <Input
            value={settings.email.smtpUser}
            onChange={(e) => updateSetting("email", "smtpUser", e.target.value)}
            placeholder="your-email@gmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Password
          </label>
          <Input
            type="password"
            value={settings.email.smtpPassword}
            onChange={(e) =>
              updateSetting("email", "smtpPassword", e.target.value)
            }
            placeholder="Your app password"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Email
          </label>
          <Input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) =>
              updateSetting("email", "fromEmail", e.target.value)
            }
            placeholder="noreply@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Name
          </label>
          <Input
            value={settings.email.fromName}
            onChange={(e) => updateSetting("email", "fromName", e.target.value)}
            placeholder="Your Company Name"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="enableNotifications"
          checked={settings.email.enableNotifications}
          onChange={(e) =>
            updateSetting("email", "enableNotifications", e.target.checked)
          }
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor="enableNotifications"
          className="text-sm font-medium text-gray-700"
        >
          Enable email notifications
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes)
          </label>
          <Input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) =>
              updateSetting(
                "security",
                "sessionTimeout",
                parseInt(e.target.value)
              )
            }
            placeholder="30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Login Attempts
          </label>
          <Input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) =>
              updateSetting(
                "security",
                "maxLoginAttempts",
                parseInt(e.target.value)
              )
            }
            placeholder="5"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Password Length
        </label>
        <Input
          type="number"
          value={settings.security.passwordMinLength}
          onChange={(e) =>
            updateSetting(
              "security",
              "passwordMinLength",
              parseInt(e.target.value)
            )
          }
          placeholder="8"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="enableRegistration"
            checked={settings.security.enableRegistration}
            onChange={(e) =>
              updateSetting("security", "enableRegistration", e.target.checked)
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="enableRegistration"
            className="text-sm font-medium text-gray-700"
          >
            Enable user registration
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="requireEmailVerification"
            checked={settings.security.requireEmailVerification}
            onChange={(e) =>
              updateSetting(
                "security",
                "requireEmailVerification",
                e.target.checked
              )
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="requireEmailVerification"
            className="text-sm font-medium text-gray-700"
          >
            Require email verification
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="enableTwoFactor"
            checked={settings.security.enableTwoFactor}
            onChange={(e) =>
              updateSetting("security", "enableTwoFactor", e.target.checked)
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="enableTwoFactor"
            className="text-sm font-medium text-gray-700"
          >
            Enable two-factor authentication
          </label>
        </div>
      </div>
    </div>
  );

  const renderStorageSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max File Size (MB)
          </label>
          <Input
            type="number"
            value={settings.storage.maxFileSize}
            onChange={(e) =>
              updateSetting("storage", "maxFileSize", parseInt(e.target.value))
            }
            placeholder="10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Storage Provider
          </label>
          <Select
            value={settings.storage.storageProvider}
            onValueChange={(value) =>
              updateSetting("storage", "storageProvider", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {storageProviders.map((provider) => (
                <SelectItem key={provider.value} value={provider.value}>
                  {provider.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Allowed File Types
        </label>
        <Input
          value={settings.storage.allowedFileTypes}
          onChange={(e) =>
            updateSetting("storage", "allowedFileTypes", e.target.value)
          }
          placeholder="jpg,jpeg,png,gif,pdf,doc,docx"
        />
        <p className="text-sm text-gray-500 mt-1">
          Comma-separated list of allowed file extensions
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="enableCloudStorage"
          checked={settings.storage.enableCloudStorage}
          onChange={(e) =>
            updateSetting("storage", "enableCloudStorage", e.target.checked)
          }
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor="enableCloudStorage"
          className="text-sm font-medium text-gray-700"
        >
          Enable cloud storage
        </label>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={settings.notifications.emailNotifications}
            onChange={(e) =>
              updateSetting(
                "notifications",
                "emailNotifications",
                e.target.checked
              )
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="emailNotifications"
            className="text-sm font-medium text-gray-700"
          >
            Email notifications
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="smsNotifications"
            checked={settings.notifications.smsNotifications}
            onChange={(e) =>
              updateSetting(
                "notifications",
                "smsNotifications",
                e.target.checked
              )
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="smsNotifications"
            className="text-sm font-medium text-gray-700"
          >
            SMS notifications
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="pushNotifications"
            checked={settings.notifications.pushNotifications}
            onChange={(e) =>
              updateSetting(
                "notifications",
                "pushNotifications",
                e.target.checked
              )
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="pushNotifications"
            className="text-sm font-medium text-gray-700"
          >
            Push notifications
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="adminNotifications"
            checked={settings.notifications.adminNotifications}
            onChange={(e) =>
              updateSetting(
                "notifications",
                "adminNotifications",
                e.target.checked
              )
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="adminNotifications"
            className="text-sm font-medium text-gray-700"
          >
            Admin notifications
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="userNotifications"
            checked={settings.notifications.userNotifications}
            onChange={(e) =>
              updateSetting(
                "notifications",
                "userNotifications",
                e.target.checked
              )
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="userNotifications"
            className="text-sm font-medium text-gray-700"
          >
            User notifications
          </label>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Theme
        </label>
        <Select
          value={settings.appearance.theme}
          onValueChange={(value) => updateSetting("appearance", "theme", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme.value} value={theme.value}>
                {theme.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={settings.appearance.primaryColor}
              onChange={(e) =>
                updateSetting("appearance", "primaryColor", e.target.value)
              }
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <Input
              value={settings.appearance.primaryColor}
              onChange={(e) =>
                updateSetting("appearance", "primaryColor", e.target.value)
              }
              placeholder="#3b82f6"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secondary Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={settings.appearance.secondaryColor}
              onChange={(e) =>
                updateSetting("appearance", "secondaryColor", e.target.value)
              }
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <Input
              value={settings.appearance.secondaryColor}
              onChange={(e) =>
                updateSetting("appearance", "secondaryColor", e.target.value)
              }
              placeholder="#8b5cf6"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo URL
          </label>
          <Input
            value={settings.appearance.logoUrl}
            onChange={(e) =>
              updateSetting("appearance", "logoUrl", e.target.value)
            }
            placeholder="https://example.com/logo.png"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Favicon URL
          </label>
          <Input
            value={settings.appearance.faviconUrl}
            onChange={(e) =>
              updateSetting("appearance", "faviconUrl", e.target.value)
            }
            placeholder="https://example.com/favicon.ico"
          />
        </div>
      </div>
    </div>
  );

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
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">
                Configure your platform settings and preferences
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={fetchSettings}
                disabled={loading}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-none border-l-4 transition-colors ${
                        activeTab === tab.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <tab.icon className="h-4 w-4 mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="mt-6 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  onClick={() => setShowResetModal(true)}
                  className="w-full"
                >
                  Reset to Defaults
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  {tabs.find((tab) => tab.id === activeTab)?.label} Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "general" && renderGeneralSettings()}
                    {activeTab === "email" && renderEmailSettings()}
                    {activeTab === "security" && renderSecuritySettings()}
                    {activeTab === "storage" && renderStorageSettings()}
                    {activeTab === "notifications" &&
                      renderNotificationSettings()}
                    {activeTab === "appearance" && renderAppearanceSettings()}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Dialog open={showResetModal} onOpenChange={setShowResetModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Reset Settings
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to reset all settings to their default
              values? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              Reset Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
