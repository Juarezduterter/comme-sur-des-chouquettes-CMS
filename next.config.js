import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const NEXT_PUBLIC_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL

const remotePatterns = [NEXT_PUBLIC_SERVER_URL, NEXT_PUBLIC_CMS_URL]
  .filter(Boolean)
  .map((item) => {
    const url = new URL(item)

    return {
      hostname: url.hostname,
      protocol: url.protocol.replace(':', ''),
    }
  })

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
