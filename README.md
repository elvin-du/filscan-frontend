This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

d

//pm2 start npm --watch --name filscab_web -- run start
//pm2 start npm --watch --name filscab_cail -- run calibration


查询端口号的进程
ps -ef |grep 端口号

杀死某进程
kill -9  进程号

查看端口号占有情况
lsof -i:端口号

// --registry https://registry.npmmirror.com 

//
  stage('START') {
            steps {
                script {
                    env.LAST_STAGE_NAME = "$env.STAGE_NAME"
                }
             sh '''#!/bin/bash
                ansible 192.168.1.189 -m shell -a "cd $WEB_ROOT_PATH && tar -zxvf dist.tar.gz"
                node --version
                npm -v
                npm run start
                '''
            }
        }


       //10^9
        attoFiL  -> nanoFil-> FiL 

        /app/filscan/out;、、、、




        css 样式错乱 ，antd，样式丢失


        消息列表 数据清除， 
        <!-- 小数点 fil/3位。
        address页面
        消息数 字段取消
          只要存在节点，节点大于0，跳到owner 页面 -->
         
          <!-- 订单 搜索增加交易id, -->
          home mate 处理 —— 秒及倒数



charts tip 移到下面  
区块 奖励 区块详情 fu 父块重量重复 state_root，赢票:





区块奖励，括号内容
数据千分
 result_type 为 ‘’，跳到404，
 exit_code 修改，后端改为返回字符串
