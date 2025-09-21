import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb.js";
import Inquiry from "@/models/Inquiry.js";
import { inquiryValidation } from "@/lib/validations.js";
import { trackContactForm } from "@/lib/firebase.js";

// POST /api/contact - Submit contact form
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate data
    const validation = inquiryValidation.create.validate(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Add metadata
    const inquiryData = {
      ...validation.data,
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

    // TODO: Send email notification to admin
    // TODO: Send auto-reply email to client

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

