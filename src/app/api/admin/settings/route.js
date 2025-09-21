import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// In-memory settings store (in production, you'd use a database)
let settings = {
  general: {
    siteName: "Gee Innovations",
    siteDescription:
      "Leading academic project consultancy and research publication services",
    siteUrl: "https://geeinnovations.com",
    contactEmail: "contact@geeinnovations.com",
    supportEmail: "support@geeinnovations.com",
    timezone: "UTC",
    language: "en",
    currency: "USD",
  },
  email: {
    smtpHost: "",
    smtpPort: 587,
    smtpUser: "",
    smtpPassword: "",
    fromEmail: "noreply@geeinnovations.com",
    fromName: "Gee Innovations",
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
};

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // In a real application, you would fetch settings from a database
    // For now, we'll return the in-memory settings
    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { message: "Error fetching settings", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { settings: newSettings } = body;

    // Validate settings structure
    if (!newSettings || typeof newSettings !== "object") {
      return NextResponse.json(
        { message: "Invalid settings format" },
        { status: 400 }
      );
    }

    // Update settings (in production, save to database)
    settings = {
      ...settings,
      ...newSettings,
    };

    // In a real application, you would save to database here
    // await SettingsModel.findOneAndUpdate({}, settings, { upsert: true });

    return NextResponse.json(
      { message: "Settings updated successfully", settings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { message: "Error updating settings", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Reset to default settings
    settings = {
      general: {
        siteName: "Gee Innovations",
        siteDescription:
          "Leading academic project consultancy and research publication services",
        siteUrl: "https://geeinnovations.com",
        contactEmail: "contact@geeinnovations.com",
        supportEmail: "support@geeinnovations.com",
        timezone: "UTC",
        language: "en",
        currency: "USD",
      },
      email: {
        smtpHost: "",
        smtpPort: 587,
        smtpUser: "",
        smtpPassword: "",
        fromEmail: "noreply@geeinnovations.com",
        fromName: "Gee Innovations",
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
    };

    // In a real application, you would update the database here
    // await SettingsModel.findOneAndUpdate({}, settings, { upsert: true });

    return NextResponse.json(
      { message: "Settings reset to defaults", settings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting settings:", error);
    return NextResponse.json(
      { message: "Error resetting settings", error: error.message },
      { status: 500 }
    );
  }
}
