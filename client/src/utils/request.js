import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../app.config';
import common from '../store/common'

function request (options = { method: 'GET', data: {} }) {
  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【M=${options.method}】【U=${options.url}】【P=${JSON.stringify(options.data)}】`);
  }
  return Taro.request({
    url: baseUrl + options.url,
    data: {
      // ...request_data,
      ...options.data
    },
    header: {
      ...common.header(),
      'Content-Type': 'application/json',
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【U=${options.url}】【接口响应:】`,res.data);
      }
      if (parseInt(data.code) !== 200) {
        Taro.showToast({
          title: `${data.msg}~` || data.code,
          icon: 'none',
          mask: true,
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}

export default {
  get : (url, data) => {
    return request({url: url, method: 'GET', data});
  },
  put : (url, data) => {
    return request({url: url, method: 'PUT', data});
  },
  post : (url, data) => {
    return request({url: url, method: 'POST', data});
  },
  del : (url, data) => {
    return request({url: url, method: 'DELETE', data});
  }
}
