import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Account from "@/models/Account";

export async function POST(request) {
  try {
    await connectDB();

    // Get all OAuth account records from the old structure
    const oauthAccounts = await Account.find({});

    console.log(`Found ${oauthAccounts.length} OAuth accounts to migrate`);

    let migratedCount = 0;
    let createdUsersCount = 0;

    for (const account of oauthAccounts) {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: account.email });

        if (!user) {
          // Create new user with role
          user = await User.create({
            name: account.name || "OAuth User",
            email: account.email,
            avatar: account.picture,
            role: "client", // Set default role
            isActive: true,
          });
          createdUsersCount++;
          console.log(`Created user: ${user.email} with role: ${user.role}`);
        } else {
          // Update existing user's role if not set
          if (!user.role) {
            await User.findByIdAndUpdate(user._id, {
              role: "client",
              isActive: true,
            });
            console.log(`Updated user role: ${user.email}`);
          }
        }

        // Update the account record to link to our User model
        await Account.findByIdAndUpdate(account._id, {
          userId: user._id,
        });

        migratedCount++;
      } catch (error) {
        console.error(`Error migrating account ${account._id}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Migration completed successfully`,
      totalAccounts: oauthAccounts.length,
      migratedAccounts: migratedCount,
      createdUsers: createdUsersCount,
    });
  } catch (error) {
    console.error("Error migrating OAuth users:", error);
    return NextResponse.json(
      { success: false, error: "Failed to migrate OAuth users" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    // Get all users and their roles
    const users = await User.find({}, { name: 1, email: 1, role: 1, isActive: 1 });
    const accounts = await Account.find({}, { provider: 1, email: 1, userId: 1 });

    return NextResponse.json({
      success: true,
      users: users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      })),
      accounts: accounts.map(account => ({
        id: account._id,
        provider: account.provider,
        email: account.email,
        userId: account.userId
      }))
    });
  } catch (error) {
    console.error("Error fetching migration data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch migration data" },
      { status: 500 }
    );
  }
}
