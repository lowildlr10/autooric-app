/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    domains: [
      'autooric-api.test',
      'api.autooric.rfucor.dns-dynamic.net',
      'sensor-api.c1.is',
    ],
  },
}

export default nextConfig
