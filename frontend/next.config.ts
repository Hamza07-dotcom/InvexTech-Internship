/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Quick fix for your 400s from the backend:
    unoptimized: true,
  },
};

module.exports = nextConfig;
