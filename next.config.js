// /** @type {import('next').NextConfig} */

// const withPWA = require('next-pwa');

// module.exports = withPWA({
//   reactStrictMode: true,
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     disable: process.env.NODE_ENV === 'development',    
//   }
//   // images: {
//   //   remotePatterns: [
//   //     {
//   //       protocol: 'https',
//   //       hostname: '**.example.com',
//   //     },
//   //     ]
//   // },
// })


const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
    images: {
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: 'lh3.googleusercontent.com',
        //     },
        // ],
        domains: ['lh3.googleusercontent.com'],
    },
});
module.exports = nextConfig;

// module.exports = nextConfig

