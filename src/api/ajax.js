import axios from 'axios';
import {message} from "antd";

export default function ajax(url, data, method='get') {
    // 将请求方式转为大写
    method = method.toUpperCase();
    let promise = null;
    // axios 返回的是promise对象
    if (method === 'GET') {
         promise = axios.get(url, {params: data})
    } else {
        promise = axios.post(url,data)
    }
    return promise
        .then((res)=>{
            return res.data;
          })
        .catch(err =>{
            // 说明请求失败（服务器内部错误、网络问题等）
            console.log('******* 请求失败了~ ******');
            console.log(err);
            console.log('******* 请求失败了~ ******');
            // 提示给用户
            message.error('网络异常，请刷新重试~', 2);
         })

}