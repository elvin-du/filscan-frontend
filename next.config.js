const path = require('path')

/** @type {import('next').NextConfig} */
  
const nextConfig = {
  reactStrictMode: false,
     env: {
    APP_ENV: process.env.NODE_ENV
  },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: `@import "var.scss";`

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
