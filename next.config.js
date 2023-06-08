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
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: `@import "var.scss";`

  },
   generateBuildId: async () => {
    // if (process.env.BUILD_ID) {
    //   return process.env.BUILD_ID;
    // } else {
     
    // }
      return 'build-web';
  },
  images: {
    unoptimized: true,
  },
 output:'standalone',
   assetPrefix:publicUrl,
   env: {
     APP_BASE_URL: process.env['NEXT_PUBLIC_APP_BASE_URL'],
     environment: process.env['NEXT_PUBLIC_environment'],
     FVM_URL: process.env['NEXT_PUBLIC_FVM_URL'],
     PORT: process.env['NEXT_PUBLIC_PORT'],
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
