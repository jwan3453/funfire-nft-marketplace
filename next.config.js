/** @type {import('next').NextConfig} */
// import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["b0ebb354ca0759ee26818a65c3f951ea.ipfscdn.io"],
    formats: ["image/webp"],
  },
}

if (process.env.NODE_ENV === 'development') {
  // await setupDevPlatform();
}


module.exports = nextConfig
