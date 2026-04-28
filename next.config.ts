import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    // Active WebP + AVIF automatiquement
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      // Backend Render (nouveau)
      {
        protocol: "https",
        hostname: "kasa-backend-2jkk.onrender.com",
        pathname: "/**",
      },

      // S3 (images du projet OC)
      {
        protocol: "https",
        hostname: "s3-eu-west-1.amazonaws.com",
        pathname: "/course.oc-static.com/**",
      },

      // Backend local
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },

      // Avatar API
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
