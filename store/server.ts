import axios from 'axios';
import {notification } from 'antd';
import { apiUrl } from '@/contants/apiUrl';

// 拦截器
axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    const errorMessage = error?.response?.data?.message ||'';
   return notification.error({
        className:'custom-notification',
       message: 'Error',
       duration:100,
        description:error.message + ' ' + errorMessage
    })
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
export async function postAxios(url: string = '', data: Record<string, any> = {}
) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            data
        }).then(res => {
            resolve(res?.data)
        }).catch(err => {
            reject(err)
        })
    })
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