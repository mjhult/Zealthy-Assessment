/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.kym-cdn.com',
      },
    ],
  },
};

module.exports = nextConfig;
