import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb.js";
import Inquiry from "@/models/Inquiry.js";
import { contactValidation } from "@/lib/validations.js";
import { trackContactForm } from "@/lib/firebase.js";
import { sendContactNotification, sendAutoReply } from "@/lib/email.js";

// POST /api/contact - Submit contact form
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate data
    const validation = contactValidation.create.validate(body);
    if (validation.error) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.details.map((detail) => ({
            field: detail.path.join("."),
            message: detail.message,
          })),
        },
        { status: 400 }
      );
    }

    // Add metadata and required fields for Inquiry model
    const inquiryData = {
      ...validation.value,
      subject: "Contact Form Inquiry", // Auto-generate subject
      inquiryType: "general", // Default inquiry type
      metadata: {
        ipAddress:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
        source: "website",
      },
    };

    const inquiry = new Inquiry(inquiryData);
    await inquiry.save();

    // Track analytics event
    trackContactForm(inquiryData.inquiryType, inquiryData.subject);

    // Send email notification to admin
    const adminEmailResult = await sendContactNotification({
      name: inquiryData.name,
      email: inquiryData.email,
      message: inquiryData.message,
    });

    // Send auto-reply email to client
    const autoReplyResult = await sendAutoReply({
      name: inquiryData.name,
      email: inquiryData.email,
      message: inquiryData.message,
    });

    // Emails sent (success/failure logged internally)

    return NextResponse.json(
      {
        success: true,
        message:
          "Your inquiry has been submitted successfully. We will get back to you soon!",
        data: {
          id: inquiry._id,
          orderNumber: inquiry.orderNumber,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit inquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
