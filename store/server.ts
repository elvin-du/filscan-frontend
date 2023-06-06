import axios from 'axios';
import {notification } from 'antd';
import { apiUrl } from '@/contants/apiUrl';

// 拦截器
axios.interceptors.response.use((response) => {
    return response
}, (err) => {
    var config = err.config;
    console.log('======444',config)
    const errorMessage = err?.response?.data?.message ||'';
    if (!config || !config.retry) {
        return notification.error({
            className: 'custom-notification',
            message: 'Error',
            duration: 100,
            description: err.message + ' ' + errorMessage
        })
    }
     // 设置变量以跟踪重试次数
    config.__retryCount = config.__retryCount || 3;
         if (config.__retryCount >= config.retry) {
        // 返回错误并退出自动重试   
            return notification.error({
                className: 'custom-notification',
                message: 'Error',
                duration: 100,
                description: err.message + ' ' + errorMessage
            })
         }
     // 增加重试次数
        config.__retryCount += 1;
 // 创建新的Promise
    let backoff = new Promise<void>(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });
     // 返回重试请求
    return backoff.then(function () {
        return axios(config);
    });


   
  //  return Promise.reject(error)
})

axios.interceptors.request.use((config) => {
    config.headers['Accept'] = 'application/vnd.dpexpo.v1+json'
    //config.timeout = 10000;
    return config;
}, (error) => {
    return Promise.reject(error)
})

// axios的get请求
export function getAxios( url:string ='',params={}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// axios的post请求
export async function postAxios(url: string = '', data: Record<string, any> = {}, config?:any) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            data,
        }).then(res => {
            resolve(res?.data)
        }).catch(err => {
            reject(err)
        })
    })
}

function retryAdapterEnhancer(adapter:any, options:any) {
  const { times = 0, delay = 300 } = options;

  return async (config: { retryTimes?: any; retryDelay?: any; }) => {
    const { retryTimes = times, retryDelay = delay } = config;
    let __retryCount = 0;
    const request:any = async () => {
      try {
        return await adapter(config);
      } catch (err) {
        // 判断是否进行重试
        if (!retryTimes || __retryCount >= retryTimes) {
          return Promise.reject(err);
        }
        __retryCount++; // 增加重试次数
        // 延时处理
        const delay = new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, retryDelay);
         });
         // 重新发起请求
         return delay.then(() => {
           return request();
         });
        }
      };
    return request();
  };
}



export function account_detail(address: string) { 
    return new Promise((resolve, reject) => { 
         postAxios(apiUrl.detail_account, { account_id: address }).then(
         (res: any) => {
                 const data = res?.result?.account_info || {};
                 const type = res?.result?.account_type;
           const keys = Object.keys(data);
           let content: any = []
          let mainKey = '';
           if (keys.length > 0) { 
             mainKey = keys[0];
             if (mainKey) { 
             //  content= general_overview_type[mainKey]
             }
           }
        //    setContent(content)
        //   setType(mainKey)
        //   setData(res?.result?.account_info[mainKey]);
        }
      );

    })
     
}

export default axios;