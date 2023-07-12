const path = require('path');
/** @type {import('next').NextConfig} */

const publicPa = process.env['NEXT_PUBLIC_NODE_ENV']
const environment = process.env['NEXT_PUBLIC_environment']

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


process.env.PORT = process.env['NEXT_PUBLIC_PORT'];

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  compiler: { styledComponents: true },
  sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: `@import "var.scss";`

  },
   generateBuildId: async () => {
      return 'build-web';
  },
  images: {
    unoptimized: true,
  },
  output:'standalone',
  assetPrefix:publicUrl,
  env: {
     APP_ENV:process.env['NEXT_PUBLIC_environment'],
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
    i18n: {
    locales: ['zh', 'en', 'kr'],
    defaultLocale: 'zh',
  },
}

module.exports = nextConfig
