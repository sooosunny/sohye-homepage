/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/sohye-portfolio',
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
