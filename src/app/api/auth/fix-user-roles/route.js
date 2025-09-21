import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();

    // Find all users without a role or with null/undefined role
    const usersWithoutRole = await User.find({
      $or: [
        { role: { $exists: false } },
        { role: null },
        { role: "" },
        { role: undefined }
      ]
    });

    console.log(`Found ${usersWithoutRole.length} users without roles`);

    // Update all users without roles to have "client" role
    const updateResult = await User.updateMany(
      {
        $or: [
          { role: { $exists: false } },
          { role: null },
          { role: "" },
          { role: undefined }
        ]
      },
      {
        $set: {
          role: "client",
          isActive: true
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: `Updated ${updateResult.modifiedCount} users with default role`,
      usersFound: usersWithoutRole.length,
      usersUpdated: updateResult.modifiedCount,
      users: usersWithoutRole.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }))
    });
  } catch (error) {
    console.error("Error fixing user roles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fix user roles" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    // Get all users and their roles
    const users = await User.find({}, { name: 1, email: 1, role: 1, isActive: 1 });

    return NextResponse.json({
      success: true,
      users: users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }))
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
