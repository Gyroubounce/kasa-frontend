import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      "kasa-backend-production-1060.up.railway.app",
      "s3-eu-west-1.amazonaws.com"
    ],
  },
};

export default nextConfig;
