/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["b0ebb354ca0759ee26818a65c3f951ea.ipfscdn.io"],
    formats: ["image/webp"],
  },
}

module.exports = nextConfig
