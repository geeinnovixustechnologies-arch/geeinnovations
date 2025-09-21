import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb.js";
import AccessRequest from "@/models/AccessRequest.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.js";

// GET /api/access-requests/[id] - Get single access request
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

    const accessRequest = await AccessRequest.findById(id)
      .populate("user", "name email")
      .populate("project", "title category pricing")
      .populate("approvedBy", "name")
      .lean();

    if (!accessRequest) {
      return NextResponse.json(
        { success: false, message: "Access request not found" },
        { status: 404 }
      );
    }

    // Check if user can view this request (owner or admin)
    if (
      accessRequest.user._id.toString() !== session.user.id &&
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: accessRequest,
    });
  } catch (error) {
    console.error("Error fetching access request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch access request" },
      { status: 500 }
    );
  }
}

// PUT /api/access-requests/[id] - Update access request (Admin only)
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Await params before using its properties
    const { id } = await params;

    const body = await request.json();
    const { action, adminNotes, rejectionReason } = body;

    const accessRequest = await AccessRequest.findById(id);

    if (!accessRequest) {
      return NextResponse.json(
        { success: false, message: "Access request not found" },
        { status: 404 }
      );
    }

    try {
      if (action === "approve") {
        await accessRequest.approve(session.user.id, adminNotes);
      } else if (action === "reject") {
        await accessRequest.reject(rejectionReason);
      } else {
        return NextResponse.json(
          { success: false, message: "Invalid action" },
          { status: 400 }
        );
      }
    } catch (error) {
      if (error.message.includes("already")) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: 400 }
        );
      }
      throw error;
    }

    // Populate the response
    await accessRequest.populate([
      { path: "user", select: "name email" },
      { path: "project", select: "title category" },
      { path: "approvedBy", select: "name" },
    ]);

    return NextResponse.json({
      success: true,
      message: `Access request ${action}d successfully`,
      data: accessRequest,
    });
  } catch (error) {
    console.error("Error updating access request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update access request" },
      { status: 500 }
    );
  }
}

// DELETE /api/access-requests/[id] - Delete access request (Admin only)
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Await params before using its properties
    const { id } = await params;

    const accessRequest = await AccessRequest.findByIdAndDelete(id);

    if (!accessRequest) {
      return NextResponse.json(
        { success: false, message: "Access request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Access request deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting access request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete access request" },
      { status: 500 }
    );
  }
}
