import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      // Add other domains as needed for production
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**',
      },
      // Google profile pictures
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
