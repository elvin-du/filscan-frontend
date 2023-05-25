const path = require('path');

/** @type {import('next').NextConfig} */



const publicPa = process.env.NODE_ENV
const environment = process.env.environment;
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
    APP_BASE_URL: process.env.APP_BASE_URL,
  },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
       config.resolve.alias = {
      ...config.resolve.alias,
         '@': path.resolve(__dirname),
       };
        //  config.devServer ={
        //         ////配置跨域
        //         proxy: {
        //             "/api_fvm": {
        //                 ///代理地址 /跨域地址
        //                 target: "https://filscan-v2.oss-cn-hongkong.aliyuncs.com/fvm_manage/",
        //                 //开启代理
        //                 changeOrigin: true,
        //                 ///
        //                 pathRewrite: {
        //                     "^/api": ""
        //                 }
        //      },
                  
        //     }
        // }
    return config
  },
}

module.exports = nextConfig
