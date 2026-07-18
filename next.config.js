/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/sohye-homepage',
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
