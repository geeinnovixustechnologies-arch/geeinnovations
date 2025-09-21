import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb.js";
import Project from "@/models/Project.js";
import { projectValidation, validateData } from "@/lib/validations.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/projects - Get all projects
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const category = searchParams.get("category");
    const domain = searchParams.get("domain");
    const technology = searchParams.get("technology");
    const difficulty = searchParams.get("difficulty");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Check if this is an admin request
    const session = await getServerSession(authOptions);
    const isAdmin = session && session.user.role === "admin";

    // Build query - admin can see all projects, others only active
    const query = isAdmin ? {} : { isActive: true };

    if (category) {
      query.category = category;
    }

    if (domain) {
      query.domain = { $in: [domain] };
    }

    if (technology) {
      query.technologies = { $in: [technology] };
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Calculate skip
    const skip = (page - 1) * limit;

    // Execute query
    const [projects, total] = await Promise.all([
      Project.find(query).sort(sortObj).skip(skip).limit(limit).lean(),
      Project.countDocuments(query),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      projects,
      totalProjects: total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPrevPage,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project (Admin only)
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
    console.log("Received project data:", JSON.stringify(body, null, 2));

    // Validate data
    const validation = validateData(body, projectValidation.create);
    if (!validation.isValid) {
      console.log("Validation errors:", validation.errors);
      console.log("Submitted data:", body);
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const project = new Project(validation.data);
    await project.save();

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create project" },
      { status: 500 }
    );
  }
}
