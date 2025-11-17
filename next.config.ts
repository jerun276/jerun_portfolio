import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Allow cross-origin requests from local network devices for /_next/* resources
  allowedDevOrigins: [
    '192.168.1.4',
    '192.168.1.*',
    'localhost',
    '127.0.0.1'
  ] as any, // Type assertion to bypass TypeScript error for newer Next.js feature
};

export default nextConfig;
