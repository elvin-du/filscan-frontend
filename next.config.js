const path = require('path');

/** @type {import('next').NextConfig} */

const publicPa = process.env.NODE_ENV
const environment = process.env.environment
const ossAddress = {
  dev: 'http://localhost:3003/',
  test: 'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan-185/client',
  uat: 'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan_uat/client',
  mainner:
    'https://filscan-v2.oss-cn-hongkong.aliyuncs.com/client',
  ali:
    'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan_aliyun/client',
  cali:
    'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan-cali/client',
  wallaby:
    'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan-wallaby/client',
  hyperspace:
    'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan-hyperspace/client'
}
let publicUrl = ossAddress['mainner'];
if (publicPa && publicPa === 'production' && environment) {
  publicUrl = ossAddress[environment]
}


if (publicPa === 'devlopment') {
  publicUrl = undefined;
}

console.log('===---3publicPa',publicPa,publicUrl)



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
