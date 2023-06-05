const path = require('path');

/** @type {import('next').NextConfig} */

const publicPa = process.env.NODE_ENV
const environment = process.env.environment
const ossAddress = {
  dev: 'http://localhost:3003/',
  mainner:
    'https://filscan-v2.oss-cn-hongkong.aliyuncs.com/client',
}
let publicUrl = ossAddress['mainner'];
if (publicPa && publicPa === 'production' && environment) {
  publicUrl = ossAddress[environment]
}


if (publicPa === 'devlopment') {
  publicUrl = undefined;
}



const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  swcMinify: false,
  sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: `@import "var.scss";`

  },
   generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
  images: {
    unoptimized: true,
  },
    assetPrefix:publicUrl,
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
