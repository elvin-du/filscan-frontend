const path = require('path')

/** @type {import('next').NextConfig} */



const publicPa = process.env.NODE_ENV
const environment = process.env.environment
const ossAddress = {
  dev: 'http://localhost:3000/',
  test: 'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan-185/client',
  uat: 'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan_uat/client',
  production:
    'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan/client',
  ali:
    'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan_aliyun/client',
  cali:
    'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan-cali/client',
  wallaby:
    'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan-wallaby/client',
  hyperspace:
    'https://forcepool-file.oss-accelerate.aliyuncs.com/filscan-hyperspace/client'
}

let publicUrl = ossAddress['production']
if (publicPa && publicPa === 'production' && environment) {
  publicUrl = ossAddress[environment]
}

if (publicPa === 'devlopment') {
  publicUrl = null
}


const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: `@import "var.scss";`

  },
     images: {
    unoptimized: true,
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
