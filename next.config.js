/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',    
  }
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '**.example.com',
  //     },
  //     ]
  // },
})

module.exports = nextConfig

