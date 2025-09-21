/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix workspace root warning
  turbopack: {
    root: process.cwd(),
  },
  // Additional optimizations
  experimental: {
    optimizePackageImports: ["@nextui-org/react", "lucide-react"],
  },
  // Image optimization
  images: {
    domains: ["localhost", "t3.storage.dev", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t3.storage.dev",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
