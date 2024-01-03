/** @type {import('next').NextConfig} */
const nextConfig = {
  // fix for https://github.com/vercel/next.js/issues/50870
  typescript: {
    ignoreBuildErrors: true
  },
  // fix for https://github.com/vercel/next.js/issues/37825
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1338",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

module.exports = nextConfig;
