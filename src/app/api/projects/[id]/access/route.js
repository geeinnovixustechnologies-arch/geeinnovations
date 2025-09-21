import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb.js";
import AccessRequest from "@/models/AccessRequest.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.js";

// GET /api/projects/[id]/access - Check if user has access to project
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    await connectDB();

    // Await params before using its properties
    const { id } = await params;

    // Check if user has approved access to this project
    const accessRequest = await AccessRequest.hasActiveAccess(
      session.user.id,
      id
    ).lean();

    const hasAccess = !!accessRequest;

    return NextResponse.json({
      success: true,
      data: {
        hasAccess,
        accessRequest: hasAccess ? accessRequest : null,
      },
    });
  } catch (error) {
    console.error("Error checking project access:", error);
    return NextResponse.json(
      { success: false, message: "Failed to check project access" },
      { status: 500 }
    );
  }
}
