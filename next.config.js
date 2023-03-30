/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
        "localhost",
        "i.dummyjson.com",
    ],
},
}

module.exports = nextConfig
