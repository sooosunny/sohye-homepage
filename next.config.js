/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Keep production bundles from exposing source maps in the deployed site.
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
