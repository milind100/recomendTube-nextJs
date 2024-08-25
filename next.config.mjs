/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // YouTube image URLs use HTTP
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
