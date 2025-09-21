import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb.js";
import Service from "@/models/Service.js";
import { serviceValidation } from "@/lib/validations.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.js";

// GET /api/services - Get all services
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const popular = searchParams.get("popular");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Check if this is an admin request
    const session = await getServerSession(authOptions);
    const isAdmin = session && session.user.role === "admin";

    // Build query - admin can see all services, others only active
    const query = isAdmin ? {} : { isActive: true };

    if (category) {
      query.category = category;
    }

    if (subcategory) {
      query.subcategory = subcategory;
    }

    if (popular === "true") {
      query.isPopular = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Calculate skip
    const skip = (page - 1) * limit;

    // Execute query
    const [services, total] = await Promise.all([
      Service.find(query).sort(sortObj).skip(skip).limit(limit).lean(),
      Service.countDocuments(query),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      services,
      totalServices: total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPrevPage,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST /api/services - Create new service (Admin only)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Validate data
    const validation = serviceValidation.create.validate(body);
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

    const service = new Service(validation.data);
    await service.save();

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        data: service,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create service" },
      { status: 500 }
    );
  }
}
