/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
