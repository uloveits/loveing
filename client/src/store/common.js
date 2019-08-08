import Taro from '@tarojs/taro';
import { observable } from 'mobx'

/**
 * 注意，common不可调用任意api，否则造成引用死循环
 */
const WX_CODE = 'wxCode';
const TOKEN = 'token';

const common = observable({
  counter: 3,
  navHeight: 44,
  statusBarHeight: 0,
  specMode: false,
  category: {},
  wxCode: Taro.getStorageSync(WX_CODE) || null,
  token: Taro.getStorageSync(TOKEN) || null
});

common.setWxCode = function(wxCode) {
  this.wxCode = wxCode;
  Taro.setStorageSync(WX_CODE, wxCode)
};

common.setToken = function(token) {
  this.token = token;
  Taro.setStorageSync(TOKEN, token)
};

common.header = function() {
  let param = {};
  if (this.wxCode) {
    param.wxCode=this.wxCode
  }
  if (this.token) {
    param.token=this.token
  }
  return param
};

common.initCategory = function(category) {
  this.category = category
};


export default common
