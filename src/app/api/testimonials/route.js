import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb.js";
import Testimonial from "@/models/Testimonial.js";
import { testimonialValidation } from "@/lib/validations.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.js";

// GET /api/testimonials - Get approved testimonials
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const featured = searchParams.get("featured");
    const rating = searchParams.get("rating");
    const projectCategory = searchParams.get("projectCategory");
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") || "desc";

    // Build query
    const query = {
      isApproved: true,
      isPublic: true,
    };

    if (featured === "true") {
      query.isFeatured = true;
    }

    if (rating) {
      query.rating = parseInt(rating);
    }

    if (projectCategory) {
      query.projectCategory = projectCategory;
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === "desc" ? -1 : 1;

    // Calculate skip
    const skip = (page - 1) * limit;

    // Execute query
    const [testimonials, total] = await Promise.all([
      Testimonial.find(query).sort(sortObj).skip(skip).limit(limit).lean(),
      Testimonial.countDocuments(query),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      data: testimonials,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST /api/testimonials - Submit testimonial
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate data
    const validation = testimonialValidation.create.validate(body);
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
    const testimonialData = {
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

    const testimonial = new Testimonial(testimonialData);
    await testimonial.save();

    // TODO: Send email notification to admin for approval

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your testimonial! It will be reviewed and published soon.",
        data: {
          id: testimonial._id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit testimonial. Please try again.",
      },
      { status: 500 }
    );
  }
}

