/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/jean-nycole',
  assetPrefix: '/jean-nycole/',
}

export default nextConfig