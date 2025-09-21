import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import connectDB from "./mongodb.js";
import User from "@/models/User.js";
import Account from "@/models/Account.js";
import Session from "@/models/Session.js";

// Remove MongoDB client since we're not using the adapter

export const authOptions = {
  // Remove the adapter to handle user creation manually
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true, // Allow linking accounts with same email
    }),
    // GitHub OAuth Provider (if you want to add it later)
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //   allowDangerousEmailAccountLinking: true,
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();

          const user = await User.findOne({
            email: credentials.email.toLowerCase(),
            isActive: true,
          });

          if (!user) {
            return null;
          }

          // For now, we'll use a simple password check
          // In production, you should hash passwords properly
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password || ""
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.avatar, // Use 'image' to match NextAuth convention
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.image = user.image; // Add image to token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.image; // Add image to session
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectDB();

          // Check if user exists in our custom User model
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user with role
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              avatar: user.image,
              role: "client", // Set default role
              isActive: true,
            });
            console.log("Created new user with role:", existingUser.role);
          } else {
            // Update existing user's last login and avatar
            await User.findByIdAndUpdate(existingUser._id, {
              lastLogin: new Date(),
              avatar: user.image || existingUser.avatar,
            });
            console.log("Updated existing user:", existingUser.email);
          }

          // Create or update OAuth account record
          await Account.findOneAndUpdate(
            {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
            {
              userId: existingUser._id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
            },
            { upsert: true }
          );

          // Set the role and image in the user object for the session
          user.role = existingUser.role;
          user.id = existingUser._id.toString();
          user.image = existingUser.avatar; // Ensure image is set from database
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
