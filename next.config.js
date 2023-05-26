const path = require('path');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  swcMinify: false,
  sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: `@import "var.scss";`

  },
  images: {
    unoptimized: true,
  },
    
   env: {
     APP_BASE_URL: process.env['NEXT_PUBLIC_APP_BASE_URL'],
     environment:process.env['NEXT_PUBLIC_environment'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
       config.resolve.alias = {
      ...config.resolve.alias,
         '@': path.resolve(__dirname),
       };
    return config
  },
}

module.exports = nextConfig
