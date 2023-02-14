import axios from 'axios';

export const baseUrl = 'http://192.168.1.189:17000/api/v1'


// 拦截器
axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
})
axios.interceptors.request.use((config) => {
    config.headers['Accept'] = 'application/vnd.dpexpo.v1+json'
    //config.baseURL = baseURL;
    config.timeout = 10000;
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
export async function postAxios ( url:string ='',data:Record<string,any>
) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export default axios