/** @type {import('next').NextConfig} */
const isNativeApp = process.env.NEXT_PUBLIC_BASE_PATH === '';

const nextConfig = {
  output: 'export',
  basePath: isNativeApp ? '' : '/CFSTT2026-Golf',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
