
export const version = 1.0;

export const baseUrl = process.env.TARO_ENV === 'h5' ? '/v1/api' : 'http://127.0.0.1:8081/v1/api';
//export const baseUrl = process.env.TARO_ENV === 'h5' ? '/v1/api' : 'http://172.20.16.167:8081/v1/api';

// 输出日志信息
export const noConsole = process.env.NODE_ENV !== 'development';

export const wx = {
  appId : 'wx6e1582c22e0b799b',
  secret : 'c7708a30369454ad37b8036518d3dc6b'
};


