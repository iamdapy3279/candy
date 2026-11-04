/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["framer-motion"],
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
