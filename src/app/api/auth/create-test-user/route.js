import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    const { email, password, name } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name: name || "Test User",
      email,
      password: hashedPassword,
      role: "client",
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: "Test user created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error creating test user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create test user" },
      { status: 500 }
    );
  }
}
